import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../styles/cart-summary.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartSummary() {
  const { itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <aside className="cart-summary" aria-label="Order summary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <div className="cart-summary__row">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>

      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="cart-summary__row cart-summary__row--muted">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>

      <div className="cart-summary__row cart-summary__row--total">
        <span>Estimated Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <p className="cart-summary__note">
        Shipping calculated at checkout. Final totals are confirmed during
        checkout.
      </p>

      <button
        type="button"
        className="cart-summary__checkout"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>

      <Link to="/shop" className="cart-summary__continue">
        Continue Shopping
      </Link>
    </aside>
  );
}