import { products } from "../data/products";
import type { Product } from "../types/product";

export function getNewArrivals(source: Product[] = products): Product[] {
  return source.filter((product) => product.badge === "NEW");
}