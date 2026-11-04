import { useLocation } from "react-router-dom";

const labels: Record<string, string> = { products: "Products", inventory: "Inventory", orders: "Orders", customers: "Customers", settings: "Settings" };

export default function AdminModulePage() { const section = useLocation().pathname.split("/")[2] || "admin"; const title = labels[section] ?? "Admin module"; return <section className="admin-state"><span className="admin-kicker">ABAYA / OPERATIONS</span><h2>{title}</h2><p>This module is connected to the admin shell and ready for its MongoDB workflow. No fabricated data is shown.</p></section>; }
