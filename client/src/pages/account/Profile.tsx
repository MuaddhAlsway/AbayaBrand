import { useState } from "react";
import { useSafeUser } from "../../hooks/useSafeUser";
import { User, Mail, Phone } from "lucide-react";

export default function Profile() {
  const { user, isLoaded } = useSafeUser();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) return <p>Loading profile…</p>;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await user?.update({ firstName, lastName });
      setMessage("Profile updated.");
      setEditing(false);
    } catch {
      setError("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setEditing(false);
    setError(null);
    setMessage(null);
  };

  return (
    <div className="account-profile">
      <span className="account-profile__eyebrow">MY PROFILE</span>
      <h1 className="account-profile__title">Your details.</h1>

      <div className="account-profile__card">
        <div className="account-profile__row">
          <span className="account-profile__label">
            <User size={14} /> First name
          </span>
          {editing ? (
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="account-profile__input"
            />
          ) : (
            <span className="account-profile__value">
              {user?.firstName || "—"}
            </span>
          )}
        </div>

        <div className="account-profile__row">
          <span className="account-profile__label">
            <User size={14} /> Last name
          </span>
          {editing ? (
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="account-profile__input"
            />
          ) : (
            <span className="account-profile__value">
              {user?.lastName || "—"}
            </span>
          )}
        </div>

        <div className="account-profile__row">
          <span className="account-profile__label">
            <Mail size={14} /> Email
          </span>
          <span className="account-profile__value">
            {user?.primaryEmailAddress?.emailAddress || "—"}
          </span>
        </div>

        <div className="account-profile__row">
          <span className="account-profile__label">
            <Phone size={14} /> Phone
          </span>
          <span className="account-profile__value">
            {user?.primaryPhoneNumber?.phoneNumber || "—"}
          </span>
        </div>
      </div>

      <div className="account-profile__actions">
        {editing ? (
          <>
            <button
              type="button"
              className="account-profile__save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              className="account-profile__cancel"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="account-profile__edit"
            onClick={() => setEditing(true)}
          >
            Edit profile
          </button>
        )}
      </div>

      {message && <p className="account-profile__success">{message}</p>}
      {error && <p className="account-profile__error">{error}</p>}
    </div>
  );
}