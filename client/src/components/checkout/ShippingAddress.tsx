import { saudiRegions } from "../../data/saudiRegions";
import type { ShippingAddress as ShippingAddressType } from "../../types/checkout";

type Props = {
  address: ShippingAddressType;
  onChange: (next: ShippingAddressType) => void;
  errors: {
    fullName?: string;
    region?: string;
    city?: string;
    district?: string;
    street?: string;
    buildingNumber?: string;
    postalCode?: string;
  };
};

export default function ShippingAddress({ address, onChange, errors }: Props) {
  const update = (patch: Partial<ShippingAddressType>) =>
    onChange({ ...address, ...patch });

  return (
    <section className="checkout-section">
      <h2 className="checkout-section__title">Shipping Address</h2>

      <div className="checkout-field">
        <label htmlFor="sa-fullname">Full name</label>
        <input
          id="sa-fullname"
          type="text"
          autoComplete="name"
          value={address.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "sa-fullname-error" : undefined}
        />
        {errors.fullName && (
          <p id="sa-fullname-error" className="checkout-field__error">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="checkout-field">
        <label htmlFor="sa-country">Country</label>
        <input id="sa-country" type="text" value="Saudi Arabia" readOnly />
      </div>

      <div className="checkout-field">
        <label htmlFor="sa-region">Region / Province</label>
        <select
          id="sa-region"
          value={address.region}
          onChange={(e) => update({ region: e.target.value })}
          aria-invalid={!!errors.region}
        >
          <option value="">Select a region</option>
          {saudiRegions.map((region) => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
        {errors.region && (
          <p className="checkout-field__error">{errors.region}</p>
        )}
      </div>

      <div className="checkout-grid">
        <div className="checkout-field">
          <label htmlFor="sa-city">City</label>
          <input
            id="sa-city"
            type="text"
            value={address.city}
            onChange={(e) => update({ city: e.target.value })}
            aria-invalid={!!errors.city}
          />
          {errors.city && <p className="checkout-field__error">{errors.city}</p>}
        </div>
        <div className="checkout-field">
          <label htmlFor="sa-district">District</label>
          <input
            id="sa-district"
            type="text"
            value={address.district}
            onChange={(e) => update({ district: e.target.value })}
            aria-invalid={!!errors.district}
          />
          {errors.district && (
            <p className="checkout-field__error">{errors.district}</p>
          )}
        </div>
      </div>

      <div className="checkout-field">
        <label htmlFor="sa-street">Street name</label>
        <input
          id="sa-street"
          type="text"
          value={address.street}
          onChange={(e) => update({ street: e.target.value })}
          aria-invalid={!!errors.street}
        />
        {errors.street && <p className="checkout-field__error">{errors.street}</p>}
      </div>

      <div className="checkout-grid">
        <div className="checkout-field">
          <label htmlFor="sa-building">Building number</label>
          <input
            id="sa-building"
            type="text"
            value={address.buildingNumber}
            onChange={(e) => update({ buildingNumber: e.target.value })}
            aria-invalid={!!errors.buildingNumber}
          />
          {errors.buildingNumber && (
            <p className="checkout-field__error">{errors.buildingNumber}</p>
          )}
        </div>
        <div className="checkout-field">
          <label htmlFor="sa-postal">Postal code</label>
          <input
            id="sa-postal"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={address.postalCode}
            onChange={(e) => update({ postalCode: e.target.value })}
            aria-invalid={!!errors.postalCode}
          />
          {errors.postalCode && (
            <p className="checkout-field__error">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className="checkout-grid">
        <div className="checkout-field">
          <label htmlFor="sa-unit">Apartment / Unit (optional)</label>
          <input
            id="sa-unit"
            type="text"
            value={address.unitNumber ?? ""}
            onChange={(e) => update({ unitNumber: e.target.value })}
          />
        </div>
        <div className="checkout-field">
          <label htmlFor="sa-additional">Additional number (optional)</label>
          <input
            id="sa-additional"
            type="text"
            value={address.additionalNumber ?? ""}
            onChange={(e) => update({ additionalNumber: e.target.value })}
          />
        </div>
      </div>

      <div className="checkout-field">
        <label htmlFor="sa-short">Short National Address (optional)</label>
        <input
          id="sa-short"
          type="text"
          value={address.shortAddress ?? ""}
          onChange={(e) => update({ shortAddress: e.target.value })}
        />
      </div>

      <div className="checkout-field">
        <label htmlFor="sa-instructions">Delivery instructions (optional)</label>
        <textarea
          id="sa-instructions"
          rows={3}
          value={address.deliveryInstructions ?? ""}
          onChange={(e) => update({ deliveryInstructions: e.target.value })}
        />
      </div>
    </section>
  );
}