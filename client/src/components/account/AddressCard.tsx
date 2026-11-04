import { MapPin, Trash2, Edit2 } from "lucide-react";
import type { ShippingAddress } from "../../types/checkout";

type Props = {
  address: ShippingAddress & { id: string };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AddressCard({ address, onEdit, onDelete }: Props) {
  return (
    <article className="address-card">
      <div className="address-card__head">
        <h3>{address.fullName}</h3>
        <div className="address-card__actions">
          {onEdit && (
            <button type="button" onClick={() => onEdit(address.id)} aria-label="Edit address">
              <Edit2 size={14} />
            </button>
          )}
          {onDelete && (
            <button type="button" onClick={() => onDelete(address.id)} aria-label="Delete address">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      <p className="address-card__line">
        <MapPin size={13} /> {address.street}, {address.buildingNumber}
        {address.unitNumber ? `, ${address.unitNumber}` : ""}
      </p>
      <p className="address-card__line">
        {address.district}, {address.city}
      </p>
      <p className="address-card__line">
        {address.region} · {address.postalCode}
      </p>
    </article>
  );
}