import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "../../types/product";
import "../../styles/products.css";

type ShopProductCardProps = {
  product: Product;
  layout?: "grid" | "list";
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ShopProductCard({ product, layout = "grid" }: ShopProductCardProps) {
  const gallery = product.images?.length ? product.images : [product.image];
  const [selectedColor, setSelectedColor] = useState(0);
  const sizeRange =
    product.sizes.length > 1
      ? `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`
      : product.sizes[0];

  const colors = product.colors;
  const hasMultipleColors = colors.length > 1;

  // Get first color for alt text
  const selectedImage = Math.min(selectedColor, gallery.length - 1);
  const firstColor = colors[selectedColor] || colors[0] || "#24211e";
  const colorName = firstColor === "#24211e" ? "charcoal" : 
                   firstColor === "#183e34" ? "dark green" : 
                   firstColor === "#e6d7c5" ? "warm beige" : 
                   firstColor === "#c4ac94" ? "champagne" : 
                   firstColor === "#51483f" ? "brown" : "color";

  return (
    <article className={`shop-product-card shop-product-card--${layout}`}>
      <Link
        to={`/product/${product.slug}`}
        className="shop-product-card__image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="shop-product-card__image-container">
          <img
            src={gallery[selectedImage]}
            alt={`${product.name} in ${colorName}`}
            loading="lazy"
            decoding="async"
            className="shop-product-card__image"
          />
          
          {product.badge && (
            <span className="shop-product-card__badge">{product.badge}</span>
          )}

          <span className="shop-product-card__overlay">
            <span>View Details</span>
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </span>
        </div>
      </Link>

      <div className="shop-product-card__info">
        <div className="shop-product-card__meta">
          <span className="shop-product-card__category">{product.category}</span>
          <span className="shop-product-card__divider" aria-hidden="true">/</span>
          <span className="shop-product-card__sizes">{sizeRange}</span>
        </div>

        <div className="shop-product-card__details">
          <Link to={`/product/${product.slug}`} className="shop-product-card__name-link">
            <h3 className="shop-product-card__name">{product.name}</h3>
          </Link>
          <span className="shop-product-card__price">{formatPrice(product.price)}</span>
        </div>

        {hasMultipleColors && (
          <div className="shop-product-card__color-swatches" aria-label={`${colors.length} color options`}>
            {colors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                type="button"
                className={`shop-product-card__color-swatch${selectedColor === index ? " is-active" : ""}`}
                style={{ backgroundColor: color }}
                aria-label={`Show ${product.name} in ${color}`}
                aria-pressed={selectedColor === index}
                onClick={() => setSelectedColor(index)}
              />
            ))}
            <span className="shop-product-card__color-count">+{colors.length}</span>
          </div>
        )}
      </div>
    </article>
  );
}
