import { NavLink, useNavigate } from "react-router-dom";
import { User, MapPin, Package, Heart, LogOut, LayoutDashboard } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import "../../styles/account.css";

const items = [
  { to: "/account", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/account/profile", label: "My Profile", icon: User, end: false },
  { to: "/account/addresses", label: "My Addresses", icon: MapPin, end: false },
  { to: "/account/orders", label: "My Orders", icon: Package, end: false },
  { to: "/account/wishlist", label: "My Wishlist", icon: Heart, end: false },
];

export default function AccountSidebar() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="account-sidebar" aria-label="Account navigation">
      <div className="account-sidebar__brand">
        <p className="account-sidebar__eyebrow">YOUR ACCOUNT</p>
        <p className="account-sidebar__name">
          {user?.firstName || user?.username || "Welcome"}
        </p>
      </div>
      <nav className="account-sidebar__nav">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `account-sidebar__link ${isActive ? "account-sidebar__link--active" : ""}`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          type="button"
          className="account-sidebar__link account-sidebar__link--signout"
          onClick={handleSignOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}