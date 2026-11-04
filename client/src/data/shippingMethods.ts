import type { ShippingMethod, PaymentMethod } from "../types/checkout";

// No shipping methods are currently configured with verified business terms.
// Populate this array only when real carrier rates and delivery promises exist.
export const shippingMethods: ShippingMethod[] = [];

// No payment providers are currently integrated.
// Populate this array only when a PCI-compliant payment provider is configured.
export const paymentMethods: PaymentMethod[] = [];