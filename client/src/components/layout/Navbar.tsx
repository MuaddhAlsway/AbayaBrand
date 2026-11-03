import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import "../../styles/navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop All", to: "/shop" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Our Story", to: "/our-story" },
];

const collections = [
  { label: "Everyday Abayas", to: "/shop?collection=everyday" },
  { label: "Occasion Abayas", to: "/shop?collection=occasion" },
  { label: "Classic Abayas", to: "/shop?collection=classic" },
  { label: "Limited Edition", to: "/shop?collection=limited" },
];

const popularSearches = [
  "Occasion abayas",
  "Everyday essentials",
  "Limited edition",
  "Silk hijab",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lastScroll = useRef(0);
  const overlayOpen = useRef(false);
  const closeMenuTimer = useRef<number | null>(null);

  const navigate = useNavigate();

  // Replace with CartContext and WishlistContext later.
  const cartCount = 0;
  const wishlistCount = 0;

  useEffect(() => {
    overlayOpen.current = menuOpen || searchOpen || collectionsOpen;
  }, [menuOpen, searchOpen, collectionsOpen]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      setScrolled(y > 24);

      if (overlayOpen.current) {
        setHidden(false);
      } else if (y > 360 && y > lastScroll.current + 4) {
        setHidden(true);
      } else if (y < lastScroll.current - 4 || y < 120) {
        setHidden(false);
      }

      lastScroll.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Close any open overlay when the user navigates with
    // browser back/forward. In-app links close themselves.
    const closeOverlays = () => {
      setMenuOpen(false);
      setSearchOpen(false);
      setCollectionsOpen(false);
    };

    window.addEventListener("popstate", closeOverlays);
    return () => window.removeEventListener("popstate", closeOverlays);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMenuOpen(false);
      setSearchOpen(false);
      setCollectionsOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    return () => {
      if (closeMenuTimer.current) window.clearTimeout(closeMenuTimer.current);
    };
  }, []);

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setQuery("");
  };

  const openCollections = () => {
    if (closeMenuTimer.current) window.clearTimeout(closeMenuTimer.current);
    setCollectionsOpen(true);
  };

  // Small grace period so the pointer can travel from the
  // trigger into the mega panel before the menu closes.
  const scheduleCollectionsClose = () => {
    if (closeMenuTimer.current) window.clearTimeout(closeMenuTimer.current);

    closeMenuTimer.current = window.setTimeout(() => {
      setCollectionsOpen(false);
    }, 220);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(query);
  };

  const toggleSearch = () => {
    setSearchOpen((value) => !value);
    setMenuOpen(false);
    setCollectionsOpen(false);
    setHidden(false);
  };

  const toggleMenu = () => {
    setMenuOpen((value) => !value);
    setSearchOpen(false);
    setCollectionsOpen(false);
    setHidden(false);
  };

  return (
    <>
      <header
        className={[
          "ab-header",
          scrolled ? "ab-header--scrolled" : "",
          hidden ? "ab-header--hidden" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Utility rail */}
        <div className="ab-header__rail">
          <span className="ab-header__rail-group">
            <i className="ab-header__rail-dot" aria-hidden="true" />
            Crafted in limited numbers
          </span>

          <span className="ab-header__rail-group">
            <span>Riyadh · Dubai · London</span>
            <span className="ab-header__rail-sep" aria-hidden="true" />
            <span>Complimentary gift wrapping</span>
          </span>
        </div>

        <div className="ab-header__inner">
          {/* LEFT: Desktop navigation */}
          <nav className="ab-nav" aria-label="Main navigation">
            {links.slice(0, 3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `ab-nav__link ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div
              className="ab-nav__dropdown"
              onMouseEnter={openCollections}
              onMouseLeave={scheduleCollectionsClose}
            >
              <button
                type="button"
                className={`ab-nav__link ab-nav__dropdown-trigger ${
                  collectionsOpen ? "is-active" : ""
                }`}
                onClick={() => setCollectionsOpen((value) => !value)}
                aria-expanded={collectionsOpen}
                aria-controls="ab-collections"
              >
                Collections
                <ChevronDown
                  className="ab-nav__chevron"
                  size={13}
                  strokeWidth={1.5}
                />
              </button>

              {collectionsOpen && (
                <div id="ab-collections" className="ab-mega">
                  <div className="ab-mega__inner">
                    <div className="ab-mega__bar">
                      <span className="ab-mega__eyebrow">
                        The Collections
                      </span>
                      <span className="ab-mega__note">
                        Four moods. One wardrobe.
                      </span>
                    </div>

                    <div className="ab-mega__grid">
                      <div className="ab-mega__list">
                        {collections.map((item, index) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="ab-mega__item"
                            onClick={() => setCollectionsOpen(false)}
                          >
                            <span className="ab-mega__index">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="ab-mega__name">
                              {item.label}
                            </span>
                            <ArrowRight size={16} strokeWidth={1.4} />
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/shop?collection=limited"
                        className="ab-mega__feature"
                        onClick={() => setCollectionsOpen(false)}
                      >
                        <span
                          className="ab-mega__feature-arabic"
                          lang="ar"
                          aria-hidden="true"
                        >
                          عباية
                        </span>
                        <span className="ab-mega__feature-kicker">
                          Editorial · SS26
                        </span>
                        <strong className="ab-mega__feature-title">
                          The Musa Edit
                        </strong>
                        <span className="ab-mega__feature-copy">
                          Fluid silhouettes in sand-washed crepe, cut for
                          golden hour.
                        </span>
                        <span className="ab-mega__feature-cta">
                          View the edit
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                `ab-nav__link ${isActive ? "is-active" : ""}`
              }
            >
              Our Story
            </NavLink>
          </nav>

          {/* LEFT: Mobile controls */}
          <div className="ab-mobile-controls">
            <button
              className="ab-icon"
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="ab-mobile-drawer"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

            <button
              className="ab-icon"
              type="button"
              onClick={toggleSearch}
              aria-label="Search products"
              aria-expanded={searchOpen}
            >
              <Search size={21} strokeWidth={1.5} />
            </button>
          </div>

          {/* CENTER: Brand */}
          <Link to="/" className="ab-brand" aria-label="ABAYA homepage">
            <span className="ab-brand__arabic" lang="ar">
              عباية
            </span>
            <span className="ab-brand__word">ABAYA</span>
          </Link>

          {/* RIGHT: Actions */}
          <div className="ab-actions">
            <button
              className="ab-icon ab-actions__search"
              type="button"
              onClick={toggleSearch}
              aria-label="Search products"
              aria-expanded={searchOpen}
              data-label="Search"
            >
              <Search size={19} strokeWidth={1.4} />
            </button>

            <Link
              className="ab-icon ab-actions__account"
              to="/account"
              aria-label="My account"
              data-label="Account"
            >
              <UserRound size={19} strokeWidth={1.4} />
            </Link>

            <Link
              className="ab-icon ab-actions__wishlist"
              to="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              data-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.4} />
              {wishlistCount > 0 && (
                <span className="ab-icon__count">{wishlistCount}</span>
              )}
            </Link>

            <Link
              className="ab-bag"
              to="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={18} strokeWidth={1.4} />
              <span className="ab-bag__label">Bag</span>
              <span className="ab-bag__count">{cartCount}</span>
            </Link>

            <span className="ab-actions__divider" aria-hidden="true" />

            <button
              className="ab-lang"
              type="button"
              disabled
              title="Arabic language support coming soon"
            >
              EN
              <ChevronDown size={11} strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <span
          ref={progressRef}
          className="ab-header__progress"
          aria-hidden="true"
        />
      </header>

      {/* Search theatre */}
      {searchOpen && (
        <div
          className="ab-search"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <button
            type="button"
            className="ab-search__scrim"
            aria-label="Close search"
            tabIndex={-1}
            onClick={() => setSearchOpen(false)}
          />

          <div className="ab-search__sheet">
            <div className="ab-search__head">
              <span className="ab-search__eyebrow">
                Search the atelier
              </span>
              <button
                type="button"
                className="ab-search__close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </div>

            <form
              className="ab-search__form"
              onSubmit={handleSearch}
              role="search"
            >
              <Search size={26} strokeWidth={1.1} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search abayas, fabrics, collections…"
                aria-label="Search products"
              />
              <button className="ab-search__submit" type="submit">
                <span>Search</span>
                <ArrowRight size={17} strokeWidth={1.5} />
              </button>
            </form>

            <div className="ab-search__meta">
              <div className="ab-search__col">
                <span className="ab-search__label">Popular</span>
                <div className="ab-search__chips">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="ab-search__chip"
                      onClick={() => runSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ab-search__col">
                <span className="ab-search__label">Jump to</span>
                <div className="ab-search__quick">
                  {collections.slice(0, 3).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="ab-search__quick-link"
                      onClick={() => setSearchOpen(false)}
                    >
                      {item.label}
                      <ArrowRight size={14} strokeWidth={1.4} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <p className="ab-search__hint">
              Press <kbd>Esc</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <button
          className="ab-backdrop"
          type="button"
          aria-label="Close mobile navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="ab-mobile-drawer"
        className={`ab-drawer ${menuOpen ? "ab-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="ab-drawer__head">
          <span className="ab-drawer__brand">
            ABAYA
            <i lang="ar">عباية</i>
          </span>

          <button
            className="ab-drawer__close"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="ab-drawer__body">
          <nav className="ab-drawer__links" aria-label="Mobile navigation">
            {links.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="ab-drawer__link"
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 55 + 80}ms` : "0ms",
                }}
              >
                <span className="ab-drawer__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ab-drawer__label">{item.label}</span>
                <ArrowRight size={19} strokeWidth={1.3} />
              </NavLink>
            ))}
          </nav>

          <div className="ab-drawer__section">
            <span className="ab-drawer__eyebrow">Collections</span>

            <div className="ab-drawer__collections">
              {collections.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="ab-drawer__collection"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/shop?collection=limited"
            className="ab-drawer__feature"
            onClick={() => setMenuOpen(false)}
          >
            <span
              className="ab-drawer__feature-arabic"
              lang="ar"
              aria-hidden="true"
            >
              عباية
            </span>
            <span className="ab-drawer__feature-kicker">
              Editorial · SS26
            </span>
            <strong className="ab-drawer__feature-title">
              The Musa Edit
            </strong>
            <span className="ab-drawer__feature-link">
              Discover the collection
              <ArrowRight size={14} strokeWidth={1.5} />
            </span>
          </Link>
        </div>

        <div className="ab-drawer__bottom">
          <div className="ab-drawer__bottom-links">
            <Link to="/account" onClick={() => setMenuOpen(false)}>
              My Account
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Bag ({cartCount})
            </Link>
          </div>

          <p>Riyadh · Dubai · London</p>
        </div>
      </aside>
    </>
  );
}
