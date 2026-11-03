import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import brandStoryImage from "../../assets/BrandStory.png";
import "../../styles/brand-story.css";

const pillars = [
  { index: "01", label: "Considered silhouettes" },
  { index: "02", label: "Refined fabrics" },
  { index: "03", label: "Timeless expression" },
];

export default function BrandStory() {
  return (
    <section className="brand-story" aria-labelledby="brand-story-title">
      <div className="brand-story__inner">
        <div className="brand-story__grid">
          <figure className="brand-story__visual">
            <div className="brand-story__image-frame">
              <img
                src={brandStoryImage}
                alt="ABAYA editorial collection featuring refined modest fashion"
                loading="lazy"
                decoding="async"
              />
            </div>

            <span className="brand-story__visual-badge">01 / Philosophy</span>

            <figcaption className="brand-story__visual-meta">
              <span>ABAYA — عباية</span>
              <span>THE ART OF MODESTY</span>
            </figcaption>
          </figure>

          <div className="brand-story__content">
            <div className="brand-story__content-inner">
              <span className="brand-story__eyebrow">The Story Behind Abaya</span>

              <h2 id="brand-story-title" className="brand-story__title">
                More than
                <br />
                what you <em>wear.</em>
              </h2>

              <span className="brand-story__subtitle">
                An expression of who you are.
              </span>

              <div className="brand-story__description">
                <p>
                  At ABAYA, we believe modesty is more than a way of dressing.
                  It is a reflection of confidence, individuality, and timeless
                  elegance.
                </p>

                <p>
                  Inspired by modern women, our vision is to create thoughtful
                  silhouettes that celebrate simplicity, movement, and the beauty
                  of every detail.
                </p>
              </div>

              <Link to="/our-story" className="brand-story__cta">
                <span>Discover Our Story</span>
                <span className="brand-story__cta-icon" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={1.6} />
                </span>
              </Link>

              <ul className="brand-story__pillars" aria-label="Brand principles">
                {pillars.map((pillar) => (
                  <li key={pillar.index} className="brand-story__pillar">
                    <span className="brand-story__pillar-index">
                      {pillar.index}
                    </span>
                    <span className="brand-story__pillar-label">
                      {pillar.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="brand-story__foot">
          <span>01 / Our Philosophy</span>
          <span>Modern Modesty, Redefined.</span>
        </footer>
      </div>
    </section>
  );
}