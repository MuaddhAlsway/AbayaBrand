import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  Grid2X2,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { products } from "../data/products";
import type { ProductCategory, ProductCollection } from "../types/product";
import ShopProductCard from "../components/products/ShopProductCard";
import "../styles/shop.css";

type CollectionFilter = "all" | ProductCollection;
type SortOption = "featured" | "price-low" | "price-high" | "name";
type GridColumns = 2 | 3;

const productsApiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api").replace(/\/$/, "");

const collections: {
  label: string;
  value: CollectionFilter;
}[] = [
  { label: "All Pieces", value: "all" },
  { label: "Everyday", value: "everyday" },
  { label: "Signature", value: "signature" },
  { label: "Occasion", value: "occasion" },
  { label: "Classic", value: "classic" },
];

const sortOptions: {
  label: string;
  value: SortOption;
}[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A–Z", value: "name" },
];



export default function Shop() {
  const [catalog, setCatalog] = useState(products);
  const [catalogStatus, setCatalogStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get("collection")?.toLowerCase();

  const activeCollection: CollectionFilter = (
    collections.some((item) => item.value === collectionParam)
      ? collectionParam
      : "all"
  ) as CollectionFilter;

  const [search, setSearch] = useState(
    () => searchParams.get("search") ?? searchParams.get("q") ?? ""
  );
  const lastUrlSearchRef = useRef(search);
  const [sort, setSort] = useState<SortOption>("featured");
  const [gridColumns, setGridColumns] = useState<GridColumns>(3);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<ProductCategory>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(() =>
    Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${productsApiUrl}/products`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Products request failed: ${response.status}`);
        return response.json() as Promise<{ data?: typeof products }>;
      })
      .then((payload) => payload.data ?? [])
      .then((remoteProducts) => {
        if (remoteProducts.length === 0) throw new Error("MongoDB returned no products");
        setCatalog(remoteProducts);
        setMaxPrice(Math.ceil(Math.max(...remoteProducts.map((p) => p.price)) / 100) * 100);
        setCatalogStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCatalogStatus("fallback");
      });
    return () => controller.abort();
  }, []);

  // Keep the search input in sync when the URL search param changes
  // (e.g. navbar search), without clobbering in-page typing or
  // collection tab switches.
  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? searchParams.get("q") ?? "";
    if (urlSearch !== lastUrlSearchRef.current) {
      lastUrlSearchRef.current = urlSearch;
      setSearch(urlSearch);
    }
  }, [searchParams]);

  // Get unique sizes and colors from products
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    catalog.forEach(product => {
      product.sizes.forEach(size => sizes.add(size));
    });
    return Array.from(sizes).sort((a, b) => parseInt(a) - parseInt(b));
  }, [catalog]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    catalog.forEach(product => {
      product.colors.forEach(color => colors.add(color));
    });
    return Array.from(colors);
  }, [catalog]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    
    const result = catalog.filter((product) => {
      // Collection filter (URL-driven). "limited" is not a category tab
      // but is used by homepage links, so filter by badge in that case.
      const matchesCollection =
        activeCollection !== "all"
          ? product.category.toLowerCase() === activeCollection
          : collectionParam !== "limited" || product.badge === "LIMITED";

      // Search filter (token-based so multi-word queries like
      // "occasion abayas" still match).
      const tokens = query.split(/\s+/).filter(Boolean);
      const matchesSearch =
        tokens.length === 0 ||
        tokens.some(
          (token) =>
            product.name.toLowerCase().includes(token) ||
            product.category.toLowerCase().includes(token) ||
            (product.badge ?? "").toLowerCase().includes(token)
        );

      // Category filter
      const matchesCategory = selectedCategories.size === 0 ||
        selectedCategories.has(product.category);

      // Size filter
      const matchesSize = selectedSizes.size === 0 ||
        product.sizes.some(size => selectedSizes.has(size));

      // Color filter
      const matchesColor = selectedColors.size === 0 ||
        product.colors.some(color => selectedColors.has(color));

      // Price filter
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesCollection && matchesSearch && matchesCategory && 
             matchesSize && matchesColor && matchesPrice;
    });

    // Sorting
    switch (sort) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default: // featured
        return [...result].sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
    }
  }, [activeCollection, collectionParam, search, sort, selectedCategories, selectedSizes, selectedColors, minPrice, maxPrice, catalog]);

  const handleCollectionChange = (collection: CollectionFilter) => {
    const nextParams = new URLSearchParams(searchParams);
    
    if (collection === "all") {
      nextParams.delete("collection");
    } else {
      nextParams.set("collection", collection);
    }
    
    setSearchParams(nextParams);
  };

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => {
      const next = new Set(prev);
      if (next.has(size)) {
        next.delete(size);
      } else {
        next.add(size);
      }
      return next;
    });
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => {
      const next = new Set(prev);
      if (next.has(color)) {
        next.delete(color);
      } else {
        next.add(color);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    lastUrlSearchRef.current = "";
    setSelectedCategories(new Set());
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setMinPrice(0);
    setMaxPrice(Math.ceil(Math.max(...catalog.map((p) => p.price)) / 100) * 100);
    setSort("featured");
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = selectedCategories.size > 0 || 
    selectedSizes.size > 0 || 
    selectedColors.size > 0 || 
    minPrice > 0 || 
    maxPrice < Math.max(...catalog.map(p => p.price));

  return (
    <main className="shop">
      {/* =====================================
          EDITORIAL HERO
      ===================================== */}
      <section className="shop__hero">
        <div className="shop__container">
          <nav className="shop__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span>/</span>
            <span>SHOP</span>
          </nav>

          <div className="shop__hero-content">
            <div>
              <span className="shop__eyebrow">
                ABAYA / THE COLLECTION
              </span>
              <h1>
                The <em>Collection.</em>
              </h1>
            </div>

            <p>
              An expression of modern modesty.
              Discover silhouettes designed for
              everyday confidence and timeless elegance.
            </p>
          </div>

          <div className="shop__hero-bottom">
            <span>DISCOVER YOUR EXPRESSION</span>
            <span>EST. 2026 / SAUDI ARABIA</span>
          </div>
        </div>
      </section>

      {/* =====================================
          COLLECTION TABS
      ===================================== */}
      <section className="shop__catalog">
        <div className="shop__container">
          <div className="shop__collections">
            {collections.map((collection) => (
              <button
                key={collection.value}
                type="button"
                className={`shop__collection-tab ${
                  activeCollection === collection.value
                    ? "shop__collection-tab--active"
                    : ""
                }`}
                onClick={() => handleCollectionChange(collection.value)}
                aria-pressed={activeCollection === collection.value}
              >
                {collection.label}
              </button>
            ))}
          </div>

          {/* =====================================
              TOOLBAR
          ===================================== */}
          <div className="shop__toolbar">
            <div className="shop__toolbar-left">
              <span className="shop__count">
                {catalogStatus === "loading" ? "LOADING" : `${filteredProducts.length} PIECES`}
              </span>

              <button
                type="button"
                className={`shop__filter-button ${
                  showFilters ? "shop__filter-button--active" : ""
                }`}
                onClick={() => setShowFilters(prev => !prev)}
                aria-expanded={showFilters}
                aria-controls="shop-filters"
              >
                <SlidersHorizontal size={17} />
                FILTERS
                {hasActiveFilters && (
                  <span className="shop__filter-indicator" />
                )}
              </button>
            </div>

            <div className="shop__toolbar-right">
              {/* Search */}
              <div className="shop__search">
                <Search size={17} />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search pieces..."
                  aria-label="Search products"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="shop__sort">
                <label htmlFor="shop-sort">SORT BY</label>
                <div className="shop__select">
                  <select
                    id="shop-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOption)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>

              {/* Grid Toggle */}
              <div className="shop__grid-toggle" aria-label="Product grid layout">
                <button
                  type="button"
                  className={gridColumns === 3 ? "active" : ""}
                  onClick={() => setGridColumns(3)}
                  aria-label="Three-column grid"
                  aria-pressed={gridColumns === 3}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  className={gridColumns === 2 ? "active" : ""}
                  onClick={() => setGridColumns(2)}
                  aria-label="Two-column grid"
                  aria-pressed={gridColumns === 2}
                >
                  <Grid2X2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* =====================================
              FILTER PANEL
          ===================================== */}
          {showFilters && (
            <div className="shop__filters" id="shop-filters">
              <div className="shop__filter-section">
                <h3 className="shop__filter-title">Category</h3>
                <div className="shop__filter-options">
                  {(["Everyday", "Signature", "Occasion", "Classic"] as ProductCategory[]).map((category) => (
                    <label key={category} className="shop__checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="shop__filter-section">
                <h3 className="shop__filter-title">Size</h3>
                <div className="shop__filter-options">
                  {allSizes.map((size) => (
                    <label key={size} className="shop__checkbox">
                      <input
                        type="checkbox"
                        checked={selectedSizes.has(size)}
                        onChange={() => toggleSize(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="shop__filter-section">
                <h3 className="shop__filter-title">Color</h3>
                <div className="shop__color-filter">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`shop__color-button ${
                        selectedColors.has(color) ? "shop__color-button--selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => toggleColor(color)}
                      aria-label={`${selectedColors.has(color) ? 'Remove' : 'Select'} color ${color}`}
                      aria-pressed={selectedColors.has(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="shop__filter-section">
                <h3 className="shop__filter-title">Price Range</h3>
                <div className="shop__price-range">
                  <div className="shop__price-inputs">
                    <div className="shop__price-input">
                      <label htmlFor="min-price">Min</label>
                      <div className="shop__price-input-wrapper">
                        <span className="shop__price-currency">SAR</span>
                        <input
                          id="min-price"
                          type="number"
                          min="0"
                          max={maxPrice}
                          value={minPrice}
                          onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="shop__price-input">
                      <label htmlFor="max-price">Max</label>
                      <div className="shop__price-input-wrapper">
                        <span className="shop__price-currency">SAR</span>
                        <input
                          id="max-price"
                          type="number"
                          min={minPrice}
                          max={Math.max(...catalog.map(p => p.price))}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(parseInt(e.target.value) || 1000)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="shop__price-slider">
                    <input
                      type="range"
                      min="0"
                      max={Math.max(...catalog.map(p => p.price))}
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    />
                    <input
                      type="range"
                      min="0"
                      max={Math.max(...catalog.map(p => p.price))}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="shop__clear"
                  onClick={clearFilters}
                >
                  CLEAR ALL FILTERS
                  <X size={15} />
                </button>
              )}
            </div>
          )}

          {/* =====================================
              PRODUCT GRID
          ===================================== */}
          {filteredProducts.length > 0 ? (
            <div className={`shop__grid shop__grid--${gridColumns}`}>
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop__empty">
              <span>NOTHING FOUND</span>
              <h2>No pieces found.</h2>
              <p>
                Try another search or adjust your collection filters.
              </p>
              <button type="button" onClick={clearFilters}>
                CLEAR FILTERS
              </button>
            </div>
          )}

          {/* =====================================
              BOTTOM STATEMENT
          ===================================== */}
          <div className="shop__bottom">
            <span>ABAYA — عباية</span>
            <p>
              Timeless pieces.
              <br />
              <em>Endless expression.</em>
            </p>
            <span>THE ART OF MODERN MODESTY</span>
          </div>
        </div>
      </section>
    </main>
  );
}
