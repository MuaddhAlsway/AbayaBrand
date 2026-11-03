import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";
import "../../styles/new-arrivals.css";

export default function NewArrivals() {
  const arrivals = products.slice(0, 4);

  return (
    <section className="new-arrivals" aria-labelledby="new-arrivals-title">
      <div className="new-arrivals__inner">
        <header className="new-arrivals__header">
          <div>
            <span className="new-arrivals__eyebrow">Just Landed</span>
            <h2 id="new-arrivals-title" className="new-arrivals__title">
              New <em>Arrivals.</em>
            </h2>
          </div>

          <aside className="new-arrivals__aside">
            <p className="new-arrivals__lede">
              Fresh silhouettes and considered details, released in limited
              numbers for the season ahead.
            </p>

            <Link to="/shop" className="new-arrivals__cta">
              <span>Shop New Arrivals</span>
              <span className="new-arrivals__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </aside>
        </header>

        <div className="new-arrivals__rail" role="list">
          {arrivals.map((product, index) => (
            <div className="new-arrivals__item" role="listitem" key={product.id}>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        <div className="new-arrivals__foot">
          <span>04 pieces — New this week</span>
          <Link to="/shop" className="new-arrivals__foot-link">
            View all
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}