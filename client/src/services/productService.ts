import type { Product } from "../types/product";

const apiUrl = (import.meta.env.PROD ? "/api" : (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api")).replace(/\/$/, "");

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${apiUrl}/products`, { signal });
  if (!response.ok) throw new Error(`Products request failed: ${response.status}`);
  const payload = (await response.json()) as { data?: Product[] };
  return Array.isArray(payload.data) ? payload.data : [];
}
