import { MapPin } from "lucide-react";

export default function Addresses() {
  return (
    <div className="account-addresses">
      <span className="account-addresses__eyebrow">MY ADDRESSES</span>
      <h1 className="account-addresses__title">Your address book.</h1>
      <p className="account-addresses__note">
        Saved addresses will be available here once your account storage is
        connected.
      </p>
      <div className="account-addresses__empty">
        <MapPin size={32} strokeWidth={1.2} />
        <p>No saved addresses yet.</p>
        <p className="account-addresses__hint">
          Add a shipping address during checkout and it can be saved to your
          account in a future update.
        </p>
      </div>
    </div>
  );
}