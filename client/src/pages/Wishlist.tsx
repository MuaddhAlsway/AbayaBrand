import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import "../styles/wishlist.css";

export default function Wishlist() {
  const { items, remove } = useWishlist();

  const savedProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  if (savedProducts.length === 0) {
    return (
      <main className="wishlist wishlist--empty">
        <div className="wishlist__container">
          <nav className="wishlist__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span>/</span>
            <span>WISHLIST</span>
          </nav>
          <div className="wishlist__empty">
            <div className="wishlist__empty-icon" aria-hidden="true">
              <Heart size={44} strokeWidth={1.2} />
            </div>
            <span className="wishlist__empty-eyebrow">YOUR CURATED EDIT</span>
            <h1 className="wishlist__empty-title">Nothing saved. Yet.</h1>
            <p className="wishlist__empty-description">
              Your next favorite piece is waiting to be discovered.
            </p>
            <Link to="/shop" className="wishlist__empty-cta">
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist">
      <div className="wishlist__container">
        <nav className="wishlist__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span>/</span>
          <span>WISHLIST</span>
        </nav>

        <header className="wishlist__header">
          <span className="wishlist__eyebrow">YOUR CURATED EDIT</span>
          <h1 className="wishlist__title">Your Wishlist.</h1>
          <p className="wishlist__description">
            A collection of pieces you've fallen in love with.
          </p>
          <p className="wishlist__count">
            {savedProducts.length} saved {savedProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </header>

        <div className="wishlist__grid">
          {savedProducts.map((product, index) => (
            <div key={product.id} className="wishlist__item">
              <ProductCard product={product} index={index} />
              <button
                type="button"
                className="wishlist__remove"
                onClick={() => remove(product.id)}
                aria-label={`Remove ${product.name} from wishlist`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="wishlist__footer">
          <Link to="/shop" className="wishlist__continue">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}