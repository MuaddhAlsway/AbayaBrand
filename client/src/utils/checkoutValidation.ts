import { validateSaudiPhone } from "./saudiPhone";

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") return false;
  // Reasonable email syntax
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function hasReasonableLength(value: string, min = 1, max = 120): boolean {
  const len = value.trim().length;
  return len >= min && len <= max;
}

export { validateSaudiPhone };