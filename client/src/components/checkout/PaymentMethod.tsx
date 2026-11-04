import { paymentMethods } from "../../data/shippingMethods";
import type { PaymentMethod as PaymentMethodType } from "../../types/checkout";

type Props = {
  selectedId: string | null;
  onChange: (id: string | null) => void;
  error?: string;
};

export default function PaymentMethod({ selectedId, onChange, error }: Props) {
  const available = paymentMethods.filter((m) => m.enabled);

  return (
    <section className="checkout-section">
      <h2 className="checkout-section__title">Payment Method</h2>
      {available.length === 0 ? (
        <p className="checkout-section__note">
          Online payment is not yet available. Payment methods will be enabled
          once a secure payment provider is integrated.
        </p>
      ) : (
        <div className="checkout-radio-group" role="radiogroup" aria-label="Payment method">
          {available.map((method: PaymentMethodType) => (
            <label key={method.id} className="checkout-radio">
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                checked={selectedId === method.id}
                onChange={() => onChange(method.id)}
              />
              <span className="checkout-radio__label">{method.name}</span>
              <span className="checkout-radio__desc">{method.description}</span>
            </label>
          ))}
        </div>
      )}
      {error && <p className="checkout-field__error">{error}</p>}
    </section>
  );
}