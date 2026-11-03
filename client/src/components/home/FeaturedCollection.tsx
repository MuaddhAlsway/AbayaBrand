import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";
import "../../styles/featured-collection.css";

export default function FeaturedCollection() {
  const featured = products.filter((product) => product.isFeatured);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [revealed, setRevealed] = useState(
    () =>
      reducedMotion || typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (revealed) return;

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  const count = String(featured.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="featured-collection"
      className={`ab-featured${revealed ? " is-visible" : ""}`}
    >
      <div className="ab-featured__inner">
        <header className="ab-featured__header">
          <div>
            <span className="ab-featured__eyebrow">The Abaya Edit</span>
            <h2 className="ab-featured__title">
              <span className="ab-featured__title-line">Our Signature</span>
              <span className="ab-featured__title-line ab-featured__title-accent">
                Pieces.
              </span>
            </h2>
          </div>

          <aside className="ab-featured__aside">
            <p className="ab-featured__lede">
              Considered silhouettes, refined fabrics, and timeless expressions
              of modern modesty.
            </p>

            <Link to="/shop" className="ab-featured__cta">
              <span>View All Pieces</span>
              <span className="ab-featured__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </aside>
        </header>

        <div className="ab-featured__grid">
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        <footer className="ab-featured__foot">
          <span className="ab-featured__foot-note">Signature selection</span>
          <span className="ab-featured__foot-count">
            {count} pieces — SS/26
          </span>
        </footer>
      </div>
    </section>
  );
}