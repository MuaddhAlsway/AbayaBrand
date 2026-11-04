import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { hasClerk } from "../../config/clerk";

function ProtectedRouteInner({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <main className="account-loading">
        <p>Loading your account…</p>
      </main>
    );
  }

  if (!isSignedIn) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?redirect_url=${redirect}`} replace />;
  }

  return <>{children}</>;
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!hasClerk) {
    return <Navigate to="/sign-in" replace />;
  }
  return <ProtectedRouteInner>{children}</ProtectedRouteInner>;
}