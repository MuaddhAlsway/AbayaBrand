import { Link, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="account-order-details">
      <span className="account-order-details__eyebrow">ORDER DETAILS</span>
      <h1 className="account-order-details__title">Order {orderId}</h1>
      <p className="account-order-details__note">
        Order details will be available here once your account storage is
        connected.
      </p>
      <Link to="/account/orders" className="account-order-details__back">
        Back to orders
      </Link>
    </div>
  );
}