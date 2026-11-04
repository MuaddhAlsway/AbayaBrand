import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <header className="checkout-header">
      <nav className="checkout-header__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">HOME</Link>
        <span>/</span>
        <Link to="/shop">SHOP</Link>
        <span>/</span>
        <Link to="/cart">BAG</Link>
        <span>/</span>
        <span>CHECKOUT</span>
      </nav>
      <div className="checkout-header__row">
        <h1 className="checkout-header__title">Checkout.</h1>
        <span className="checkout-header__secure">
          <Lock size={14} />
          Secure checkout
        </span>
      </div>
      <p className="checkout-header__subtitle">Your pieces, delivered with care.</p>
    </header>
  );
}