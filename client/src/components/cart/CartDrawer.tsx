import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import "../../styles/cart-drawer.css";

export default function CartDrawer() {
  const { items, itemCount, subtotal, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isCartOpen) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
      if (event.key === "Tab") {
        const node = dialogRef.current;
        if (!node) return;
        const focusable = node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-SA", {
      style: "currency",
      currency: "SAR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="cart-drawer__backdrop" onClick={closeCart} aria-hidden="true" />
      <div className="cart-drawer__panel" ref={dialogRef}>
        <header className="cart-drawer__header">
          <div>
            <h2 className="cart-drawer__title">Shopping Bag</h2>
            <p className="cart-drawer__count">{itemCount} items</p>
          </div>
          <button
            type="button"
            ref={closeRef}
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close shopping bag"
          >
            <X size={18} />
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="cart-drawer__items">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/cart"
              className="cart-drawer__view"
              onClick={closeCart}
            >
              View Bag
            </Link>
            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}