import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

import "../../styles/newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
  };

  const reset = () => {
    setEmail("");
    setStatus("idle");
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <div className="newsletter__header">
          <span className="newsletter__eyebrow">The Inner Circle</span>
          <span className="newsletter__index">06 — Letters from the Atelier</span>
        </div>

        <div className="newsletter__grid">
          <div className="newsletter__copy">
            <h2 id="newsletter-title" className="newsletter__title">
              Letters from
              <br />
              the <em>atelier.</em>
            </h2>
            <p className="newsletter__lede">
              Occasional notes on new silhouettes, fabric stories, and private
              previews — never noise, always considered.
            </p>

            <ul className="newsletter__benefits" aria-label="Newsletter benefits">
              <li>Early access to new collections</li>
              <li>Private atelier previews</li>
              <li>No spam, unsubscribe anytime</li>
            </ul>
          </div>

          <div className="newsletter__form-wrap">
            {status === "success" ? (
              <div className="newsletter__success" role="status" aria-live="polite">
                <span className="newsletter__success-icon">
                  <Check size={20} strokeWidth={1.8} />
                </span>
                <p>You are on the list. Watch your inbox for the next letter.</p>
                <button
                  type="button"
                  className="newsletter__reset"
                  onClick={reset}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <label className="newsletter__label" htmlFor="newsletter-email">
                  Email address
                </label>
                <div className="newsletter__field">
                  <span className="newsletter__field-icon" aria-hidden="true">
                    <Mail size={18} strokeWidth={1.4} />
                  </span>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    className="newsletter__input"
                    autoComplete="email"
                  />
                  <button type="submit" className="newsletter__button">
                    <span>Subscribe</span>
                    <ArrowRight size={16} strokeWidth={1.6} />
                  </button>
                </div>
                <p className="newsletter__note">
                  By subscribing you agree to receive occasional emails from
                  ABAYA. You can unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}