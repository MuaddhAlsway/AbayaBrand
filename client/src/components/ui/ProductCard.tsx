import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Product } from "../../types/product";
import { useWishlist } from "../../context/WishlistContext";
import "../../styles/product-card.css";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist();
  const isFavorite = isWishlisted(product.id);
  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image];
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimer.current !== null) {
        window.clearTimeout(fadeTimer.current);
      }
    };
  }, []);
  const safeSelectedImage = Math.min(selectedImage, gallery.length - 1);
  const safeCurrentImage = Math.min(currentImage, gallery.length - 1);
  const safeNextImage = nextImage === null ? null : Math.min(nextImage, gallery.length - 1);

  const formattedPrice = new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const sizeRange =
    product.sizes.length > 1
      ? `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`
      : product.sizes[0];

  const selectImage = (index: number) => {
    if (index === safeSelectedImage || index >= gallery.length) return;

    setSelectedImage(index);
    setNextImage(index);

    if (fadeTimer.current !== null) {
      window.clearTimeout(fadeTimer.current);
    }

    window.requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    fadeTimer.current = window.setTimeout(() => {
      setCurrentImage(index);
      setNextImage(null);
      setIsTransitioning(false);
      fadeTimer.current = null;
    }, 320);
  };

  return (
    <article
      className="ab-product"
      style={{ "--ab-product-index": index ?? 0 } as React.CSSProperties}
    >
      <div className="ab-product__media">
        <Link
          to={`/product/${product.slug}`}
          className="ab-product__image-link"
          aria-label={`View ${product.name}`}
          tabIndex={-1}
        >
          <img
            className="ab-product__image ab-product__image--base"
            src={gallery[safeCurrentImage]}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
          {safeNextImage !== null && (
            <img
              className={`ab-product__image ab-product__image--next${
                isTransitioning ? " is-visible" : ""
              }`}
              src={gallery[safeNextImage]}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
          )}
        </Link>

        {product.badge && (
          <span className="ab-product__badge">{product.badge}</span>
        )}

        <button
          type="button"
          className={`ab-product__favorite ${isFavorite ? "is-active" : ""}`}
          onClick={() =>
            toggle({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.image,
              price: product.price,
            })
          }
          aria-label={
            isFavorite
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isFavorite}
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <Link
          to={`/product/${product.slug}`}
          className="ab-product__quick-view"
          aria-label={`Discover ${product.name}`}
        >
          <span className="ab-product__quick-view-label">Discover Piece</span>
          <span className="ab-product__quick-view-icon" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={1.7} />
          </span>
        </Link>
      </div>

      <div className="ab-product__info">
        <div className="ab-product__meta">
          {typeof index === "number" && (
            <span className="ab-product__index">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span className="ab-product__category">{product.category}</span>
          <span className="ab-product__rule" aria-hidden="true" />
          <span className="ab-product__sizes">{sizeRange}</span>
        </div>

        <div className="ab-product__details">
          <Link to={`/product/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>
          <span className="ab-product__price">{formattedPrice}</span>
        </div>

        <div
          className="ab-product__swatches"
          aria-label={`${product.colors.length} colourways`}
        >
          {product.colors.map((color, colorIndex) => {
            const hasImage = colorIndex < gallery.length;
            return (
              <button
                type="button"
                key={`${color}-${colorIndex}`}
                className={`ab-product__swatch${
                  colorIndex === safeSelectedImage ? " is-active" : ""
                }`}
                style={{
                  backgroundColor: color,
                  zIndex: product.colors.length - colorIndex,
                }}
                title={color}
                aria-label={`Show ${product.name} in ${color}`}
                aria-pressed={colorIndex === safeSelectedImage}
                disabled={!hasImage}
                onClick={() => {
                  if (hasImage) selectImage(colorIndex);
                }}
              />
            );
          })}
          <span className="ab-product__swatch-count" aria-hidden="true">
            {product.colors.length}
          </span>
          <span className="sr-only">
            {product.colors.length} colourways available
          </span>
        </div>
      </div>
    </article>
  );
}