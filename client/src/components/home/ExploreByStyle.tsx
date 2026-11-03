import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import everydayImage from "../../assets/ExploreByStoryOne.png";
import occasionImage from "../../assets/ExploreByStoryTwo.png";
import classicImage from "../../assets/classicImage.png";

import "../../styles/explore-by-style.css";

type StyleCategory = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  path: string;
  number: string;
};

const categories: StyleCategory[] = [
  {
    id: 1,
    name: "Everyday",
    subtitle: "EFFORTLESS ELEGANCE",
    description: "Soft structure and breathable layers for the rhythm of daily life.",
    image: everydayImage,
    path: "/shop?collection=everyday",
    number: "01",
  },
  {
    id: 2,
    name: "Occasion",
    subtitle: "ELEVATED MOMENTS",
    description: "Statement silhouettes designed for celebrations and candlelight.",
    image: occasionImage,
    path: "/shop?collection=occasion",
    number: "02",
  },
  {
    id: 3,
    name: "Classic",
    subtitle: "TIMELESS SILHOUETTES",
    description: "Enduring lines and refined finishing that outlast the season.",
    image: classicImage,
    path: "/shop?collection=classic",
    number: "03",
  },
];

export default function ExploreByStyle() {
  return (
    <section className="explore-style" aria-labelledby="explore-style-title">
      <div className="explore-style__inner">
        <header className="explore-style__header">
          <div>
            <span className="explore-style__eyebrow">The Abaya Edit</span>
            <h2 id="explore-style-title" className="explore-style__title">
              Explore by <em>Style.</em>
            </h2>
          </div>

          <aside className="explore-style__aside">
            <p className="explore-style__lede">
              Discover pieces designed for every moment, every expression, and
              every version of you.
            </p>

            <Link to="/shop" className="explore-style__cta">
              <span>Explore All Collections</span>
              <span className="explore-style__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>
          </aside>
        </header>

        <div className="explore-style__grid">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.path}
              className={`explore-style__card explore-style__card--${index + 1}`}
              aria-label={`Explore ${category.name} collection`}
            >
              <span className="explore-style__giant-number" aria-hidden="true">
                {category.number}
              </span>

              <div className="explore-style__image">
                <img
                  src={category.image}
                  alt={`${category.name} abaya collection`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="explore-style__overlay" />

              <span className="explore-style__number">
                {category.number} / 03
              </span>

              <div className="explore-style__card-content">
                <span className="explore-style__subtitle">
                  {category.subtitle}
                </span>

                <div className="explore-style__card-bottom">
                  <h3>{category.name}</h3>

                  <span className="explore-style__arrow" aria-hidden="true">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="explore-style__card-detail">
                  <p>{category.description}</p>
                  <span>
                    Explore collection
                    <ArrowRight size={14} strokeWidth={1.6} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="explore-style__foot">
          <span>ABAYA — Modern Modesty</span>
          <span>Designed for every occasion</span>
        </footer>
      </div>
    </section>
  );
}