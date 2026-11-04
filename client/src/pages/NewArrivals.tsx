import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import { getNewArrivals } from "../utils/productSelectors";
import { products } from "../data/products";
import "../styles/new-arrivals.css";

type SortOption = "featured" | "price-low" | "price-high" | "name";
type Category = "All" | "Everyday" | "Signature" | "Occasion" | "Classic";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A–Z", value: "name" },
];

export default function NewArrivals() {
  const [sort, setSort] = useState<SortOption>("featured");
  const [category, setCategory] = useState<Category>("All");
  const baseArrivals = useMemo(() => getNewArrivals(products), []);

  const categories = useMemo(() => [
    "All",
    ...Array.from(new Set(baseArrivals.map((product) => product.category))),
  ] as Category[], [baseArrivals]);

  const arrivals = useMemo(() => {
    const filtered = category === "All" ? baseArrivals : baseArrivals.filter((product) => product.category === category);
    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
    });
  }, [baseArrivals, category, sort]);

  return (
    <main className="new-arrivals-page">
      <section className="new-arrivals-hero" aria-labelledby="new-arrivals-title">
        <div className="new-arrivals-page__container">
          <div className="new-arrivals-hero__topline">
            <nav className="new-arrivals-hero__breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>New arrivals</span></nav>
            <span className="new-arrivals-hero__edition">Edition 02 — 2025</span>
          </div>
          <div className="new-arrivals-hero__layout">
            <div><span className="new-arrivals-hero__eyebrow">The latest edit</span><h1 id="new-arrivals-title" className="new-arrivals-hero__title">Just <em>arrived.</em></h1></div>
            <p className="new-arrivals-hero__description">New expressions of timeless elegance. A considered edit of silhouettes made for the moments that matter.</p>
          </div>
          <div className="new-arrivals-hero__footer"><span>{String(baseArrivals.length).padStart(2, "0")} new pieces</span><a href="#collection">Explore the edit <ArrowDown size={15} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="new-arrivals-collection" id="collection">
        <div className="new-arrivals-page__container">
          {baseArrivals.length === 0 ? (
            <div className="new-arrivals-empty"><span className="new-arrivals-empty__eyebrow">Coming soon</span><h2 className="new-arrivals-empty__title">Something beautiful is coming.</h2><p className="new-arrivals-empty__description">Our latest pieces are being prepared. Explore the collection while you wait.</p><Link to="/shop" className="new-arrivals-empty__cta">Explore all pieces <ArrowUpRight size={15} /></Link></div>
          ) : (
            <>
              <div className="new-arrivals-collection__intro"><div><span className="new-arrivals-collection__eyebrow">01 / New season</span><h2>Designed for<br /><em>now.</em></h2></div><p>Fresh proportions, familiar ease. Discover the pieces shaping the next chapter of ABAYA.</p></div>
              <div className="new-arrivals-collection__toolbar">
                <div className="new-arrivals-collection__filters" aria-label="Filter by category">{categories.map((item) => <button key={item} type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
                <div className="new-arrivals-collection__sort"><span>{arrivals.length} pieces</span><label htmlFor="na-sort">Sort by</label><div className="new-arrivals-collection__select"><select id="na-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={14} /></div></div>
              </div>
              {arrivals.length > 0 ? <div className="new-arrivals-collection__grid">{arrivals.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <p className="new-arrivals-no-results">No new pieces in this category yet. Explore another edit.</p>}
            </>
          )}
        </div>
      </section>

      <section className="new-arrivals-editorial" aria-labelledby="approach-title">
        <div className="new-arrivals-editorial__mark" aria-hidden="true">02</div>
        <div className="new-arrivals-editorial__inner">
          <div className="new-arrivals-editorial__heading"><span className="new-arrivals-editorial__eyebrow">The ABAYA approach</span><span className="new-arrivals-editorial__index">A considered point of view</span></div>
          <div className="new-arrivals-editorial__content"><h2 id="approach-title" className="new-arrivals-editorial__title">A new perspective on <em>timeless dressing.</em></h2><div className="new-arrivals-editorial__aside"><p className="new-arrivals-editorial__description">Thoughtfully considered silhouettes, designed to move with your everyday.</p><Link to="/shop" className="new-arrivals-editorial__cta">Discover the collection <ArrowUpRight size={16} /></Link></div></div>
          <div className="new-arrivals-editorial__principles" aria-label="ABAYA design principles"><span><b>01</b> Quiet confidence</span><span><b>02</b> Made to move</span><span><b>03</b> Beyond a season</span></div>
        </div>
      </section>
    </main>
  );
}

