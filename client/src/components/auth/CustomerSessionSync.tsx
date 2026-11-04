import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const api = (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api").replace(/\/$/, "");

export default function CustomerSessionSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    getToken().then((token) => {
      if (cancelled || !token) return;
      return fetch(`${api}/customers/me`, { headers: { Authorization: `Bearer ${token}` } });
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [getToken, isLoaded, isSignedIn]);
  return null;
}
