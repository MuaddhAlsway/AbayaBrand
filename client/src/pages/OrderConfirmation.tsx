import { Link, useParams } from "react-router-dom";
import "../styles/checkout.css";

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  void orderId;

  return (
    <main className="order-confirmation">
      <div className="order-confirmation__container">
        <h1 className="order-confirmation__title">Order Confirmation</h1>
        <p className="order-confirmation__text">
          Order confirmation is not available yet. A verified order reference
          is required from the backend before any purchase can be confirmed.
        </p>
        {orderId && (
          <p className="order-confirmation__ref">
            Reference: {orderId}
          </p>
        )}
        <Link to="/shop" className="order-confirmation__cta">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}