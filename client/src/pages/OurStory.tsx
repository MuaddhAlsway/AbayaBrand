import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/Hero01.webp";
import brandStoryImage from "../assets/BrandStory.png";
import classicImage from "../assets/classicImage.png";
import "../styles/our-story.css";

const principles = ["Minimal silhouettes", "Considered details", "Versatility across moments", "Timeless styling", "Modern modest fashion"];

const storySections = [
  { number: "01 / BEGINNING", title: "Where it begins.", copy: "ABAYA begins with a simple idea: that everyday dressing can feel considered, effortless, and distinctly personal. Our approach brings together understated design and a modern perspective on modest fashion.", image: brandStoryImage, alt: "ABAYA editorial collection featuring refined modest fashion" },
  { number: "03 / INTENTION", title: "Every detail has a purpose.", copy: "From silhouette to color, each piece is designed to balance comfort with visual clarity — creating abayas that feel as good as they look, and remain relevant beyond a single season.", image: classicImage, alt: "ABAYA classic abaya editorial" },
];

type StorySection = (typeof storySections)[number];

function StorySplit({ number, title, copy, image, alt, reversed = false }: StorySection & { reversed?: boolean }) {
  return (
    <section className={`our-story__section our-story__section--split${reversed ? " our-story__section--reverse" : ""}`}>
      <div className="our-story__container our-story__container--wide"><div className="our-story__split">
        <div className="our-story__split-text"><span className="our-story__section-eyebrow">{number}</span><h2 className="our-story__section-title">{title}</h2><p>{copy}</p></div>
        <figure className="our-story__split-image"><img src={image} alt={alt} loading="lazy" decoding="async" /><figcaption>ABAYA / THE DETAILS MATTER</figcaption></figure>
      </div></div>
    </section>
  );
}

export default function OurStory() {
  return (
    <main className="our-story">
      <section className="our-story__hero" aria-labelledby="our-story-title">
        <div className="our-story__container">
          <div className="our-story__hero-topline"><nav className="our-story__breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Our story</span></nav><span className="our-story__edition">Vol. 01 — The beginning</span></div>
          <div className="our-story__hero-copy"><span className="our-story__eyebrow">The story of abaya</span><h1 id="our-story-title" className="our-story__title">Elegance,<br /><em>in its own way.</em></h1><p className="our-story__description">Rooted in the beauty of modest dressing, ABAYA explores the balance between timeless silhouettes and contemporary expression.</p><a className="our-story__scroll-link" href="#beginning">Scroll to discover <ArrowDown size={15} aria-hidden="true" /></a></div>
        </div>
        <div className="our-story__hero-image"><img src={heroImage} alt="ABAYA editorial campaign featuring modern modest fashion" loading="eager" decoding="async" /></div>
      </section>
      <div id="beginning"><StorySplit {...storySections[0]} /></div>
      <section className="our-story__section our-story__section--text"><div className="our-story__container our-story__container--narrow"><span className="our-story__section-eyebrow">02 / SIMPLICITY</span><h2 className="our-story__section-title">Less, but meaningful.</h2><p className="our-story__lead">We believe in silhouettes that do more with less — clean lines, considered details, and a quiet confidence that never needs to announce itself.</p><ul className="our-story__principles" aria-label="Our design principles">{principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span>{principle}</li>)}</ul></div></section>
      <StorySplit {...storySections[1]} reversed />
      <section className="our-story__statement" aria-label="Our philosophy"><div className="our-story__statement-mark" aria-hidden="true">عباية</div><div className="our-story__container our-story__container--narrow"><p className="our-story__statement-kicker">A point of view</p><p className="our-story__statement-text">Style is personal.<br /><em>Elegance is timeless.</em></p><p className="our-story__statement-support">We believe in pieces that complement the woman wearing them — allowing confidence, individuality, and simplicity to exist together.</p></div></section>
      <section className="our-story__cta-section"><div className="our-story__container our-story__container--narrow"><span className="our-story__section-eyebrow">The next chapter</span><h2 className="our-story__cta-title">Find your expression.</h2><p className="our-story__cta-description">Explore the collection and discover pieces that feel distinctly yours.</p><Link to="/shop" className="our-story__cta"><span>Explore the collection</span><span className="our-story__cta-icon" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.6} /></span></Link></div></section>
    </main>
  );
}

