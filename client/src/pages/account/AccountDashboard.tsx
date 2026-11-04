import { Link } from "react-router-dom";
import { useSafeUser } from "../../hooks/useSafeUser";
import { User, MapPin, Package, Heart, ShoppingBag } from "lucide-react";

export default function AccountDashboard() {
  const { user } = useSafeUser();
  const greeting = user?.firstName ? `Welcome back, ${user.firstName}.` : "Welcome to your account.";

  const cards = [
    { to: "/account/profile", label: "My Profile", icon: User, description: "Manage your personal details." },
    { to: "/account/addresses", label: "My Addresses", icon: MapPin, description: "Manage your Saudi shipping addresses." },
    { to: "/account/orders", label: "My Orders", icon: Package, description: "View your order history." },
    { to: "/account/wishlist", label: "My Wishlist", icon: Heart, description: "View your saved pieces." },
  ];

  return (
    <div className="account-dashboard">
      <span className="account-dashboard__eyebrow">YOUR PERSONAL SPACE</span>
      <h1 className="account-dashboard__title">{greeting}</h1>
      <p className="account-dashboard__subtitle">
        Manage your profile, addresses, orders, and saved pieces.
      </p>

      <div className="account-dashboard__grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className="account-dashboard__card">
              <Icon size={20} />
              <h2>{card.label}</h2>
              <p>{card.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="account-dashboard__cta">
        <Link to="/shop" className="account-dashboard__shop">
          <ShoppingBag size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}