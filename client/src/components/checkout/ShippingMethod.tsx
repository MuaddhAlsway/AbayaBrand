import { shippingMethods } from "../../data/shippingMethods";
import type { ShippingMethod as ShippingMethodType } from "../../types/checkout";

type Props = {
  selectedId: string | null;
  onChange: (id: string | null) => void;
  error?: string;
};

export default function ShippingMethod({ selectedId, onChange, error }: Props) {
  const available = shippingMethods.filter((m) => m.enabled);

  return (
    <section className="checkout-section">
      <h2 className="checkout-section__title">Shipping Method</h2>
      {available.length === 0 ? (
        <p className="checkout-section__note">
          Shipping calculated at checkout. Delivery options will be available
          once shipping is configured.
        </p>
      ) : (
        <div className="checkout-radio-group" role="radiogroup" aria-label="Shipping method">
          {available.map((method: ShippingMethodType) => (
            <label key={method.id} className="checkout-radio">
              <input
                type="radio"
                name="shipping-method"
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