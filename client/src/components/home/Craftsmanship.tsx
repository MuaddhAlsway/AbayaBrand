import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import craftsmanshipMain from "../../assets/Hero01.webp";
import craftsmanshipDetail from "../../assets/BrandStory.png";

import "../../styles/craftsmanship.css";

type CraftPrinciple = {
  number: string;
  title: string;
  description: string;
};

const craftPrinciples: CraftPrinciple[] = [
  {
    number: "01",
    title: "Thoughtful Fabrics",
    description:
      "Our approach begins with an appreciation for texture, movement, and the way fabric feels.",
  },
  {
    number: "02",
    title: "Refined Silhouettes",
    description:
      "Clean lines and considered proportions define our vision of contemporary modest fashion.",
  },
  {
    number: "03",
    title: "Timeless Details",
    description:
      "We believe the smallest details can create the most meaningful expression of style.",
  },
];

export default function Craftsmanship() {
  return (
    <section className="craftsmanship" aria-labelledby="craftsmanship-title">
      <div className="craftsmanship__inner">
        <header className="craftsmanship__header">
          <span className="craftsmanship__eyebrow">Abaya / The Art of Design</span>
          <span className="craftsmanship__index">05 — Our Philosophy</span>
        </header>

        <div className="craftsmanship__grid">
          <figure className="craftsmanship__visual">
            <div className="craftsmanship__main-image">
              <img
                src={craftsmanshipMain}
                alt="ABAYA editorial showcasing flowing fabric and refined silhouettes"
                loading="lazy"
                decoding="async"
              />
              <span className="craftsmanship__image-label">
                An expression of elegance
              </span>
            </div>

            <div className="craftsmanship__detail-image">
              <img
                src={craftsmanshipDetail}
                alt="Close-up of elegant abaya fabric texture and draping"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>

          <div className="craftsmanship__content">
            <span className="craftsmanship__overline">Beauty in every detail</span>

            <h2 id="craftsmanship-title" className="craftsmanship__title">
              The art of
              <br />
              every <em>detail.</em>
            </h2>

            <p className="craftsmanship__intro">
              True elegance is found in the details. From the movement of a
              silhouette to the quiet beauty of simplicity, every design begins
              with intention.
            </p>

            <p className="craftsmanship__description">
              At ABAYA, our vision is to bring together contemporary design and
              timeless modesty, creating pieces that feel personal, expressive,
              and effortlessly refined.
            </p>

            <ul className="craftsmanship__principles" aria-label="Craft principles">
              {craftPrinciples.map((principle) => (
                <li
                  key={principle.number}
                  className="craftsmanship__principle"
                >
                  <span className="craftsmanship__principle-number">
                    {principle.number}
                  </span>

                  <div className="craftsmanship__principle-content">
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/our-story" className="craftsmanship__cta">
              <span>Discover Our Philosophy</span>
              <span className="craftsmanship__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </div>

        <footer className="craftsmanship__foot">
          <span>Abaya — عباية</span>
          <p>Designed with intention. Worn with confidence.</p>
          <span>Modern modesty / est. 2026</span>
        </footer>
      </div>
    </section>
  );
}