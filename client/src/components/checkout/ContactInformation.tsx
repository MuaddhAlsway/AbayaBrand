import type { CheckoutContact } from "../../types/checkout";

type Props = {
  contact: CheckoutContact;
  onChange: (next: CheckoutContact) => void;
  errors: { email?: string; phone?: string };
};

export default function ContactInformation({ contact, onChange, errors }: Props) {
  return (
    <section className="checkout-section">
      <h2 className="checkout-section__title">Contact Information</h2>
      <div className="checkout-field">
        <label htmlFor="checkout-email">Email address</label>
        <input
          id="checkout-email"
          type="email"
          autoComplete="email"
          value={contact.email}
          onChange={(e) => onChange({ ...contact, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "checkout-email-error" : undefined}
        />
        {errors.email && (
          <p id="checkout-email-error" className="checkout-field__error">
            {errors.email}
          </p>
        )}
      </div>
      <div className="checkout-field">
        <label htmlFor="checkout-phone">Saudi mobile number</label>
        <input
          id="checkout-phone"
          type="tel"
          autoComplete="tel"
          placeholder="05XXXXXXXX"
          value={contact.phone}
          onChange={(e) => onChange({ ...contact, phone: e.target.value })}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="checkout-phone-error" className="checkout-field__error">
            {errors.phone}
          </p>
        )}
      </div>
    </section>
  );
}