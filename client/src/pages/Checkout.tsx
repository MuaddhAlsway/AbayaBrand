import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import ContactInformation from "../components/checkout/ContactInformation";
import ShippingAddress from "../components/checkout/ShippingAddress";
import ShippingMethod from "../components/checkout/ShippingMethod";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { shippingMethods, paymentMethods } from "../data/shippingMethods";
import { isValidEmail, isValidPostalCode, isRequired, validateSaudiPhone } from "../utils/checkoutValidation";
import type { CheckoutContact, ShippingAddress as ShippingAddressType, CheckoutFieldErrors } from "../types/checkout";
import "../styles/checkout.css";

const emptyContact: CheckoutContact = { email: "", phone: "" };
const emptyAddress: ShippingAddressType = {
  fullName: "",
  country: "SA",
  region: "",
  city: "",
  district: "",
  street: "",
  buildingNumber: "",
  postalCode: "",
  unitNumber: "",
  additionalNumber: "",
  shortAddress: "",
  deliveryInstructions: "",
};

export default function Checkout() {
  const { items } = useCart();

  const [contact, setContact] = useState<CheckoutContact>(emptyContact);
  const [address, setAddress] = useState<ShippingAddressType>(emptyAddress);
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <main className="checkout checkout--empty">
        <div className="checkout__container">
          <CheckoutHeader />
          <EmptyCart />
          <div className="checkout__back">
            <Link to="/cart">Return to Bag</Link>
          </div>
        </div>
      </main>
    );
  }

  const validate = (): CheckoutFieldErrors => {
    const next: CheckoutFieldErrors = {};
    if (!isValidEmail(contact.email)) next.email = "Enter a valid email address.";
    const phoneResult = validateSaudiPhone(contact.phone);
    if (!phoneResult.valid) next.phone = phoneResult.error ?? "Enter a valid Saudi mobile number.";

    if (!isRequired(address.fullName)) next.fullName = "Full name is required.";
    if (!isRequired(address.region)) next.region = "Region is required.";
    if (!isRequired(address.city)) next.city = "City is required.";
    if (!isRequired(address.district)) next.district = "District is required.";
    if (!isRequired(address.street)) next.street = "Street name is required.";
    if (!isRequired(address.buildingNumber)) next.buildingNumber = "Building number is required.";
    if (!isValidPostalCode(address.postalCode)) next.postalCode = "Postal code must be 5 digits.";

    const availableShipping = shippingMethods.filter((m) => m.enabled);
    if (availableShipping.length > 0 && !shippingMethodId) {
      next.shippingMethod = "Select a shipping method.";
    }
    const availablePayment = paymentMethods.filter((m) => m.enabled);
    if (availablePayment.length > 0 && !paymentMethodId) {
      next.paymentMethod = "Select a payment method.";
    }

    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // focus first invalid field
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(
        firstKey === "email"
          ? "checkout-email"
          : firstKey === "phone"
          ? "checkout-phone"
          : firstKey === "fullName"
          ? "sa-fullname"
          : firstKey === "region"
          ? "sa-region"
          : firstKey === "city"
          ? "sa-city"
          : firstKey === "district"
          ? "sa-district"
          : firstKey === "street"
          ? "sa-street"
          : firstKey === "buildingNumber"
          ? "sa-building"
          : firstKey === "postalCode"
          ? "sa-postal"
          : ""
      );
      el?.focus();
      return;
    }

    // No backend/payment available: do not submit a false order.
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      // Navigate back to cart; checkout not available
    }, 400);
  };

  return (
    <main className="checkout">
      <div className="checkout__container">
        <CheckoutHeader />

        <form className="checkout__grid" onSubmit={handleSubmit} noValidate>
          <div className="checkout__form">
            <ContactInformation
              contact={contact}
              onChange={setContact}
              errors={errors}
            />
            <ShippingAddress
              address={address}
              onChange={setAddress}
              errors={errors}
            />
            <ShippingMethod
              selectedId={shippingMethodId}
              onChange={setShippingMethodId}
              error={errors.shippingMethod}
            />
            <PaymentMethod
              selectedId={paymentMethodId}
              onChange={setPaymentMethodId}
              error={errors.paymentMethod}
            />

            <div className="checkout__actions">
              <Link to="/cart" className="checkout__return">
                Return to Bag
              </Link>
              <button
                type="submit"
                className="checkout__submit"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Continue to Payment"}
              </button>
            </div>

            <p className="checkout__disclaimer">
              Checkout is not yet available. Your details are validated locally
              and no payment is processed.
            </p>
          </div>

          <div className="checkout__summary">
            <CheckoutSummary />
          </div>
        </form>
      </div>
    </main>
  );
}