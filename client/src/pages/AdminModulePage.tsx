import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const api = (import.meta.env.PROD ? "/api" : (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api")).replace(/\/$/, "");
const titles: Record<string, string> = { products: "Products", customers: "Customers", inventory: "Inventory", orders: "Orders", settings: "Settings" };

export default function AdminModulePage() {
  const section = useLocation().pathname.split("/")[2] || "products";
  const { getToken } = useAuth(); const [rows, setRows] = useState<Array<Record<string, unknown>>>([]); const [error, setError] = useState("");
  useEffect(() => { let live = true; getToken().then((token) => fetch(`${api}/${section === "customers" ? "customers" : "admin/products"}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })).then(async (response) => { if (!response.ok) throw new Error(`API request failed (${response.status})`); return response.json(); }).then((payload) => live && setRows(payload.data ?? [])).catch((reason: Error) => live && setError(reason.message)); return () => { live = false; }; }, [getToken, section]);
  return <section className="admin-dashboard"><div className="admin-welcome"><div><span className="admin-kicker">ABAYA / MONGODB</span><h2>{titles[section] ?? "Admin module"}</h2></div><span>{rows.length} records</span></div>{error ? <div className="admin-state"><h2>Unable to load data</h2><p>{error}</p></div> : rows.length === 0 ? <div className="admin-state"><p>No records found in MongoDB.</p></div> : <div className="admin-table">{rows.map((row, index) => <div className="admin-table__row" key={String(row._id ?? index)}><strong>{String(row.name ?? row.email ?? "Unnamed")}</strong><span>{String(row.category ?? row.firstName ?? "—")}</span><span>{String(row.badge ?? "Active")}</span></div>)}</div>}</section>;
}
