import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import { formatSAR } from "../../utils/currency";

export default function CheckoutSummary() {
  const { items, subtotal } = useCart();

  return (
    <aside className="checkout-summary" aria-label="Order summary">
      <h2 className="checkout-summary__title">Order Summary</h2>

      <ul className="checkout-summary__items">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <li key={item.id} className="checkout-summary__item">
              <div className="checkout-summary__thumb">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              </div>
              <div className="checkout-summary__info">
                <p className="checkout-summary__name">{product.name}</p>
                <p className="checkout-summary__variant">
                  {item.size} · {item.color} · ×{item.quantity}
                </p>
              </div>
              <span className="checkout-summary__line">
                {formatSAR(product.price * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="checkout-summary__row">
        <span>Subtotal</span>
        <span>{formatSAR(subtotal)}</span>
      </div>
      <div className="checkout-summary__row">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="checkout-summary__row checkout-summary__row--total">
        <span>Estimated Total</span>
        <span>{formatSAR(subtotal)}</span>
      </div>

      <p className="checkout-summary__note">
        Final totals are confirmed by the backend. Shipping and taxes are
        calculated at checkout.
      </p>

      <Link to="/cart" className="checkout-summary__return">
        Return to Bag
      </Link>
    </aside>
  );
}
