// Typed interfaces for future backend integration.
// These are proposed contracts, not implemented endpoints.

export type CheckoutQuoteRequest = {
  items: Array<{
    productId: string;
    size: string;
    color: string;
    quantity: number;
  }>;
  shippingAddress: {
    region: string;
    city: string;
    postalCode: string;
  };
  shippingMethodId: string | null;
};

export type CheckoutQuoteResponse = {
  items: Array<{
    productId: string;
    size: string;
    color: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  subtotal: number;
  shippingFee: number | null;
  tax: number | null;
  total: number | null;
  currency: string;
  quoteExpiresAt?: string;
};

export type CheckoutSessionRequest = {
  quoteId?: string;
  contact: { email: string; phone: string };
  shippingAddress: Record<string, string>;
  shippingMethodId: string | null;
  paymentMethodId: string | null;
};

export type CheckoutSessionResponse = {
  sessionId: string;
  paymentUrl?: string;
  status: "pending" | "requires_payment" | "confirmed";
};

export type OrderConfirmation = {
  orderId: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  total: number;
  currency: string;
  createdAt: string;
};

// Placeholder service functions. They intentionally do not call any endpoint.
export const checkoutService = {
  async requestQuote(request: CheckoutQuoteRequest): Promise<CheckoutQuoteResponse> {
    void request;
    throw new Error("Checkout quote endpoint is not implemented yet.");
  },
  async createSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    void request;
    throw new Error("Checkout session endpoint is not implemented yet.");
  },
  async getOrder(orderId: string): Promise<OrderConfirmation> {
    void orderId;
    throw new Error("Order lookup endpoint is not implemented yet.");
  },
};