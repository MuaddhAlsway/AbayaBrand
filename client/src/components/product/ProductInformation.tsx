import { useState } from "react";
import { Heart, Minus, Plus, Ruler } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SizeGuide from "./SizeGuide";
import "../../styles/product-information.css";
import type { Product } from "../../types/product";

type ProductInformationProps = {
  product: Product;
  colorIndex?: number;
  onColorChange?: (index: number) => void;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductInformation({
  product,
  colorIndex = 0,
  onColorChange,
}: ProductInformationProps) {
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const selectedColor = product.colors[colorIndex] ?? product.colors[0] ?? "";
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    openCart();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = () => {
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  };

  return (
    <div className="product-info">
      <p className="product-info__category">{product.category}</p>

      <h1 className="product-info__name">{product.name}</h1>

      {product.badge && <span className="product-info__badge">{product.badge}</span>}

      <p className="product-info__price">{formatPrice(product.price)}</p>

      {product.colors.length > 0 && (
        <div className="product-info__block">
          <div className="product-info__label-row">
            <span className="product-info__label">Color</span>
            <span className="product-info__value">{selectedColor}</span>
          </div>
          <div className="product-info__swatches" role="radiogroup" aria-label="Color options">
            {product.colors.map((color, index) => (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={selectedColor === color}
                aria-label={`Color ${color}`}
                className={`product-info__swatch ${
                  selectedColor === color ? "product-info__swatch--selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorChange?.(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="product-info__block">
        <div className="product-info__label-row">
          <span className="product-info__label">Size</span>
          <button
            type="button"
            className="product-info__size-guide-link"
            onClick={() => setSizeGuideOpen(true)}
          >
            <Ruler size={14} />
            Size Guide
          </button>
        </div>
        <div className="product-info__sizes" role="radiogroup" aria-label="Size options">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selectedSize === size}
              className={`product-info__size ${
                selectedSize === size ? "product-info__size--selected" : ""
              }`}
              onClick={() => {
                setSelectedSize(size);
                setSizeError(false);
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {sizeError && (
          <p className="product-info__error" role="alert">
            Please select a size before adding to your bag.
          </p>
        )}
      </div>

      <div className="product-info__block">
        <span className="product-info__label">Quantity</span>
        <div className="product-info__quantity">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="product-info__actions">
        <button
          type="button"
          className="product-info__add"
          onClick={handleAddToBag}
        >
          {added ? "Added to Bag" : "Add to Bag"}
        </button>
        <button
          type="button"
          className={`product-info__wishlist ${
            wishlisted ? "product-info__wishlist--active" : ""
          }`}
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="product-info__note">
        Crafted with care. Size and color availability may vary.
      </p>

      <SizeGuide
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        sizes={product.sizes}
      />
    </div>
  );
}