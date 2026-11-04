/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { products } from "../data/products";
import type { Product } from "../types/product";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const STORAGE_KEY = "abaya_cart";

function findProduct(productId: string): Product | undefined {
  return products.find((p) => p.id === productId);
}

function isValidVariant(product: Product, size: string, color: string): boolean {
  return product.sizes.includes(size) && product.colors.includes(color);
}

function normalizeStoredItem(raw: unknown): CartItem | null {
  if (typeof raw !== "object" || raw === null) return null;
  const e = raw as Record<string, unknown>;
  if (
    typeof e.productId !== "string" ||
    typeof e.size !== "string" ||
    typeof e.color !== "string" ||
    typeof e.quantity !== "number" ||
    !Number.isInteger(e.quantity) ||
    e.quantity < 1
  ) {
    return null;
  }
  const product = findProduct(e.productId);
  if (!product) return null;
  if (!isValidVariant(product, e.size, e.color)) return null;

  const id = `${product.id}-${e.size}-${e.color}`;
  return {
    id,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    price: product.price,
    color: e.color,
    size: e.size,
    quantity: e.quantity,
  };
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    const result: CartItem[] = [];
    for (const entry of parsed) {
      const item = normalizeStoredItem(entry);
      if (!item) continue;
      if (seen.has(item.id)) {
        // merge duplicate variants
        const existing = result.find((r) => r.id === item.id);
        if (existing) existing.quantity += item.quantity;
        continue;
      }
      seen.add(item.id);
      result.push(item);
    }
    return result;
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      const product = findProduct(item.productId);
      if (!product) return;
      if (!isValidVariant(product, item.size, item.color)) return;
      const quantity = Math.max(1, Math.floor(item.quantity ?? 1));
      if (!Number.isFinite(quantity) || quantity < 1) return;

      const id = `${product.id}-${item.size}-${item.color}`;
      setItems((prev) => {
        const existing = prev.find((entry) => entry.id === id);
        if (existing) {
          return prev.map((entry) =>
            entry.id === id
              ? { ...entry, quantity: entry.quantity + quantity }
              : entry
          );
        }
        return [
          ...prev,
          {
            id,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            color: item.color,
            size: item.size,
            quantity,
          },
        ];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      const q = Math.floor(quantity);
      if (!Number.isFinite(q) || q < 1) return prev;
      return prev.map((entry) =>
        entry.id === id ? { ...entry, quantity: q } : entry
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce(
      (sum, entry) => sum + entry.price * entry.quantity,
      0
    );
    return {
      items,
      itemCount,
      subtotal,
      isCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    };
  }, [items, isCartOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}