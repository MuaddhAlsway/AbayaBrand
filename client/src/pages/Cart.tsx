import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import "../styles/cart.css";

export default function Cart() {
  const { items } = useCart();

  return (
    <main className="cart">
      <div className="cart__container">
        <nav className="cart__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span>/</span>
          <Link to="/shop">SHOP</Link>
          <span>/</span>
          <span>SHOPPING BAG</span>
        </nav>

        <header className="cart__header">
          <h1 className="cart__title">Your Bag.</h1>
          <p className="cart__subtitle">
            A collection of pieces chosen just for you.
          </p>
          {items.length > 0 && (
            <p className="cart__count">
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </p>
          )}
        </header>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart__content">
            <div className="cart__items">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="cart__summary">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}