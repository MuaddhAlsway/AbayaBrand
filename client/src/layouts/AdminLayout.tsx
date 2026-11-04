import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, Box, Image, LayoutDashboard, LogOut, Menu, Settings, ShoppingBag, Users, X } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "../styles/admin.css";

const links = [{ to: "/admin", label: "Overview", icon: LayoutDashboard, end: true }, { to: "/admin/products", label: "Products", icon: Box }, { to: "/admin/media", label: "Media", icon: Image }, { to: "/admin/inventory", label: "Inventory", icon: ShoppingBag }, { to: "/admin/orders", label: "Orders", icon: BarChart3 }, { to: "/admin/customers", label: "Customers", icon: Users }, { to: "/admin/settings", label: "Settings", icon: Settings }];

export default function AdminLayout() {
  const [open, setOpen] = useState(false); const { user } = useUser(); const { signOut } = useClerk(); const navigate = useNavigate();
  return <div className="admin-shell"><button className="admin-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle admin navigation">{open ? <X /> : <Menu />}</button><aside className={`admin-sidebar${open ? " is-open" : ""}`}><div className="admin-brand">ABAYA <span>ADMIN</span></div><nav>{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}><Icon size={17} /><span>{label}</span></NavLink>)}</nav><button className="admin-signout" onClick={async () => { await signOut(); navigate("/"); }}><LogOut size={17} />Sign out</button></aside><main className="admin-main"><header className="admin-header"><div><span className="admin-kicker">ABAYA / OPERATIONS</span><h1>Admin dashboard</h1></div><div className="admin-user">{user?.firstName || user?.primaryEmailAddress?.emailAddress || "Administrator"}</div></header><Outlet /></main></div>;
}
