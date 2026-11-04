import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../data/products";
import ProductCard from "../../components/ui/ProductCard";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const wishlistedProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="account-wishlist">
        <span className="account-wishlist__eyebrow">MY WISHLIST</span>
        <h1 className="account-wishlist__title">Your Wishlist.</h1>
        <div className="account-wishlist__empty">
          <Heart size={36} strokeWidth={1.2} />
          <p>No saved pieces yet.</p>
          <Link to="/shop" className="account-wishlist__cta">
            EXPLORE THE COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-wishlist">
      <span className="account-wishlist__eyebrow">MY WISHLIST</span>
      <h1 className="account-wishlist__title">Your Wishlist.</h1>
      <div className="account-wishlist__grid">
        {wishlistedProducts.map((product, index) => (
          <div key={product.id} className="account-wishlist__item">
            <ProductCard product={product} index={index} />
            <button
              type="button"
              className="account-wishlist__remove"
              onClick={() => remove(product.id)}
              aria-label={`Remove ${product.name} from wishlist`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}