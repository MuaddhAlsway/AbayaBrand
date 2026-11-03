
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowUp,
 
  Mail,
  MapPin,
} from "lucide-react";

import "../../styles/footer.css";

type FooterLink = {
  label: string;
  path: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "EXPLORE",
    links: [
      { label: "Shop All", path: "/shop" },
      { label: "New Arrivals", path: "/new-arrivals" },
      { label: "Collections", path: "/collections" },
      { label: "Our Story", path: "/our-story" },
    ],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      { label: "Contact Us", path: "/contact" },
      { label: "Size Guide", path: "/size-guide" },
      { label: "Shipping & Delivery", path: "/shipping" },
      { label: "Returns & Exchanges", path: "/returns" },
      { label: "FAQs", path: "/faq" },
    ],
  },
  {
    title: "INFORMATION",
    links: [
      { label: "My Account", path: "/account" },
      { label: "Track Order", path: "/track-order" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Top Editorial Bar */}
        <div className="footer__top">
          <span>ABAYA / THE ART OF MODERN MODESTY</span>

          <button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            BACK TO TOP
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main Footer Grid */}
        <div className="footer__main">

          {/* Brand Column */}
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__brand-logo"
              aria-label="ABAYA home"
            >
              <span className="footer__brand-english">
                ABAYA.
              </span>

              <span
                className="footer__brand-arabic"
                lang="ar"
              >
                عباية
              </span>
            </Link>

            <p className="footer__brand-description">
              A modern expression of modesty.
              Timeless silhouettes, thoughtful
              details, and effortless elegance
              for every moment.
            </p>

            <div className="footer__location">
              <MapPin size={15} strokeWidth={1.5} />
              <span>Saudi Arabia</span>
            </div>

            {/* Social media */}
            <div className="footer__social">
              <span>CONNECT WITH US</span>

              <div className="footer__social-links">
                {/* Add verified social links when ready */}
                <span
                  className="footer__social-placeholder"
                  aria-label="Instagram coming soon"
                >
                 
                </span>

                <span
                  className="footer__social-placeholder"
                  aria-label="Social channels coming soon"
                >
                  <ArrowUpRight size={19} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerGroups.map((group) => (
            <nav
              key={group.title}
              className="footer__column"
              aria-label={group.title}
            >
              <h3>{group.title}</h3>

              <ul>
                {group.links.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="footer__contact">
          <div className="footer__contact-heading">
            <Mail size={18} strokeWidth={1.4} />

            <span>
              HAVE A QUESTION?
            </span>
          </div>

          <Link to="/contact" className="footer__contact-link">
            Let's talk.
            <ArrowUpRight
              size={24}
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Oversized Brand Wordmark */}
        <div className="footer__wordmark" aria-hidden="true">
          ABAYA
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <span>
            © {currentYear} ABAYA. All rights reserved.
          </span>

          <div className="footer__bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>

          <span>
            SAUDI ARABIA <span className="footer__dot">•</span> SAR
          </span>
        </div>
      </div>
    </footer>
  );
}
