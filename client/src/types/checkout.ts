export type CheckoutContact = {
  email: string;
  phone: string;
};

export type ShippingAddress = {
  fullName: string;
  country: "SA";
  region: string;
  city: string;
  district: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
  unitNumber?: string;
  additionalNumber?: string;
  shortAddress?: string;
  deliveryInstructions?: string;
};

export type CheckoutFormData = {
  contact: CheckoutContact;
  shippingAddress: ShippingAddress;
  shippingMethodId: string | null;
  paymentMethodId: string | null;
};

export type CheckoutFieldErrors = {
  email?: string;
  phone?: string;
  fullName?: string;
  region?: string;
  city?: string;
  district?: string;
  street?: string;
  buildingNumber?: string;
  postalCode?: string;
  shippingMethod?: string;
  paymentMethod?: string;
};

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  feeMinor: number | null;
  estimatedDays?: {
    min: number;
    max: number;
  };
  enabled: boolean;
};

export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  provider: string;
};