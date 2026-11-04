import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function Orders() {
  return (
    <div className="account-orders">
      <span className="account-orders__eyebrow">MY ORDERS</span>
      <h1 className="account-orders__title">Your Orders.</h1>
      <div className="account-orders__empty">
        <Package size={36} strokeWidth={1.2} />
        <h2>No orders just yet.</h2>
        <p>Your next favorite piece is waiting to be discovered.</p>
        <Link to="/shop" className="account-orders__cta">
          EXPLORE THE COLLECTION
        </Link>
      </div>
      <p className="account-orders__note">
        Order history will be available here once your account storage is
        connected.
      </p>
    </div>
  );
}