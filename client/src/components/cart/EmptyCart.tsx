import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "../../styles/empty-cart.css";

export default function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-cart__icon" aria-hidden="true">
        <ShoppingBag size={40} strokeWidth={1.2} />
      </div>
      <span className="empty-cart__eyebrow">YOUR BAG</span>
      <h2 className="empty-cart__title">Your bag is waiting.</h2>
      <p className="empty-cart__description">
        Discover timeless pieces made for every moment.
      </p>
      <Link to="/shop" className="empty-cart__cta">
        EXPLORE THE COLLECTION
      </Link>
    </div>
  );
}