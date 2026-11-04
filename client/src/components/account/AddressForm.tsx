import { useState } from "react";
import ShippingAddressForm from "../checkout/ShippingAddress";
import type { ShippingAddress as ShippingAddressType } from "../../types/checkout";

type Props = {
  initial?: (ShippingAddressType & { phone?: string; id?: string }) | null;
  onSubmit?: (data: ShippingAddressType & { phone: string }) => void;
  onCancel?: () => void;
};

const empty = {
  fullName: "",
  country: "SA" as const,
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

export default function AddressForm({ initial, onSubmit, onCancel }: Props) {
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [address, setAddress] = useState<ShippingAddressType>(
    initial
      ? {
          fullName: initial.fullName,
          country: initial.country,
          region: initial.region,
          city: initial.city,
          district: initial.district,
          street: initial.street,
          buildingNumber: initial.buildingNumber,
          postalCode: initial.postalCode,
          unitNumber: initial.unitNumber,
          additionalNumber: initial.additionalNumber,
          shortAddress: initial.shortAddress,
          deliveryInstructions: initial.deliveryInstructions,
        }
      : empty
  );

  return (
    <form
      className="address-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ ...address, phone });
      }}
    >
      <div className="checkout-field">
        <label htmlFor="addr-phone">Saudi mobile number</label>
        <input
          id="addr-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <ShippingAddressForm address={address} onChange={setAddress} errors={{}} />
      <div className="address-form__actions">
        <button type="submit" className="address-form__save">
          Save address
        </button>
        {onCancel && (
          <button type="button" className="address-form__cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}