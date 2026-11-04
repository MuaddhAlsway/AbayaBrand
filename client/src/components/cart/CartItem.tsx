import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import "../../styles/cart-item.css";

type CartItemProps = {
  item: {
    id: string;
    productId: string;
    slug: string;
    name: string;
    image: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
  };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find((p) => p.id === item.productId);

  if (!product) return null;

  const lineTotal = product.price * item.quantity;

  return (
    <article className="cart-item">
      <Link
        to={`/product/${product.slug}`}
        className="cart-item__image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="cart-item__image">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
      </Link>

      <div className="cart-item__details">
        <div className="cart-item__top">
          <div>
            <p className="cart-item__category">{product.category}</p>
            <Link to={`/product/${product.slug}`} className="cart-item__name">
              {product.name}
            </Link>
          </div>
          <button
            type="button"
            className="cart-item__remove"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${product.name} from bag`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="cart-item__meta">
          <span>Size {item.size}</span>
          <span className="cart-item__dot" aria-hidden="true" />
          <span className="cart-item__color">
            <span
              className="cart-item__color-swatch"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            {item.color}
          </span>
        </div>

        <div className="cart-item__bottom">
          <div className="cart-item__quantity">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-item__prices">
            <span className="cart-item__unit">{formatPrice(product.price)}</span>
            <span className="cart-item__line">{formatPrice(lineTotal)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}