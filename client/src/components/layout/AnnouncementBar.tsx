import { X } from "lucide-react";
import { useState } from "react";
import "../../styles/announcement-bar.css";

const messages = [
  "Complimentary shipping on orders over 500 SAR",
  "The Musa Edit — new season, now live",
  "Free returns within 14 days",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="ab-announce" role="region" aria-label="Store announcements">
      <div className="ab-announce__marquee">
        <div className="ab-announce__track">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="ab-announce__group"
              aria-hidden={group === 1}
            >
              {messages.map((message) => (
                <span key={message} className="ab-announce__item">
                  {message}
                  <i className="ab-announce__diamond" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="ab-announce__close"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        <X size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}
