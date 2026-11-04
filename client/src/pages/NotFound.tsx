import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import "../styles/not-found.css";
export default function NotFound(){const location=useLocation();return <main className="not-found"><div className="not-found__mark"><Compass size={22}/><span>ABAYA / ERROR 404</span></div><p className="not-found__code">404</p><h1>Page not found</h1><p className="not-found__copy">The page at <code>{location.pathname}</code> has moved, or the link may be incomplete.</p><Link to="/" className="not-found__link"><ArrowLeft size={16}/> Return home</Link></main>}
