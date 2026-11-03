import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import experienceMain from "../../assets/Hero01.webp";
import experienceSecondary from "../../assets/ExploreByStoryOne.png";
import experienceDetail from "../../assets/ExploreByStoryTwo.png";

import "../../styles/brand-experience.css";

export default function BrandExperience() {
  return (
    <section className="brand-experience" aria-labelledby="brand-experience-title">
      <div className="brand-experience__inner">
        <span className="brand-experience__badge">03 / Lifestyle Moments</span>

        <header className="brand-experience__header">
          <div className="brand-experience__heading">
            <span className="brand-experience__eyebrow">
              The Abaya Lifestyle
            </span>

            <h2 id="brand-experience-title">
              Made for
              <br />
              <em>your moments.</em>
            </h2>
          </div>

          <div className="brand-experience__header-right">
            <p>
              For the moments that matter and the ones in between. Discover a
              vision of modern modesty inspired by confidence, individuality, and
              effortless elegance.
            </p>

            <Link to="/shop" className="brand-experience__cta">
              <span>Explore the Collection</span>
              <span className="brand-experience__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </header>

        <div className="brand-experience__grid">
          <div className="brand-experience__main">
            <div className="brand-experience__image">
              <img
                src={experienceMain}
                alt="ABAYA lifestyle campaign featuring modern modest fashion"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="brand-experience__image-overlay" />

            <div className="brand-experience__main-content">
              <span>01 / The Everyday Edit</span>

              <h3>
                Elegance in
                <br />
                every moment.
              </h3>

              <Link to="/shop?collection=everyday">
                Discover Everyday
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="brand-experience__side">
            <div className="brand-experience__secondary">
              <div className="brand-experience__image">
                <img
                  src={experienceSecondary}
                  alt="Contemporary ABAYA fashion editorial"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="brand-experience__image-overlay" />

              <div className="brand-experience__secondary-content">
                <span>02 / The Modern Edit</span>

                <h3>Defined by you.</h3>

                <Link to="/shop?collection=classic">
                  Explore Classic
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="brand-experience__detail">
              <div className="brand-experience__detail-image">
                <img
                  src={experienceDetail}
                  alt="ABAYA editorial fabric and styling detail"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="brand-experience__detail-content">
                <span>The Abaya Woman</span>

                <p>
                  Her style.
                  <br />
                  Her story.
                  <br />
                  <em>Her expression.</em>
                </p>

                <span className="brand-experience__signature">
                  Abaya — عباية
                </span>
              </div>
            </div>
          </div>
        </div>

        <footer className="brand-experience__footer">
          <span>Abaya / Modern Modesty</span>
          <p>
            Every day is an opportunity
            <br />
            to express who you are.
          </p>
          <span>The Art of Being You</span>
        </footer>
      </div>
    </section>
  );
}