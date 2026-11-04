import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";
import "../../styles/related-products.css";
import type { Product } from "../../types/product";

type RelatedProductsProps = {
  product: Product;
};

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const related = useMemo(() => {
    const sameCategory = products.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    const others = products.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (related.length === 0) return null;

  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <div className="related-products__inner">
        <header className="related-products__header">
          <h2 id="related-products-title" className="related-products__title">
            You may also love.
          </h2>
        </header>
        <div className="related-products__grid">
          {related.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
        <div className="related-products__foot">
          <Link to="/shop" className="related-products__cta">
            View all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}