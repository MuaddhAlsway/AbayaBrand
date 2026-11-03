import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";

import heroImage1 from "../../assets/Hero01.webp";
import heroImage2 from "../../assets/Hero02.png";
import heroImage3 from "../../assets/Hero03.png";
import "../../styles/hero.css";

// Temporary campaign images.
// Replace with licensed brand photography before launch.
const SLIDES = [
  {
    id: "musa",
    image: heroImage1,
    alt: "Model wearing a sand-toned abaya from The Musa Edit, photographed in warm light",
    eyebrow: "The New Collection — 2026",
    season: "SS / 26",
    title: "Elegance",
    accent: "in every detail.",
    lede: "A modern expression of modesty. Thoughtfully designed for the woman who defines elegance on her own terms.",
    collection: "The Musa Edit",
    pieces: "24 · Limited",
    caption: ["Sand-washed crepe,", "cut for golden hour."],
    tone: "warm",
  },
  {
    id: "sabah",
    image: heroImage2,
    alt: "Model wearing a light cotton abaya from The Sabah Edit, photographed in daylight",
    eyebrow: "The Morning Edit — 2026",
    season: "SS / 26",
    title: "Lightness",
    accent: "in every layer.",
    lede: "Airy weaves and softened lines, made for the quiet hours of the morning and the women who move through them.",
    collection: "The Sabah Edit",
    pieces: "18 · Limited",
    caption: ["Washed cotton,", "made for first light."],
    tone: "light",
  },
  {
    id: "layl",
    image: heroImage3,
    alt: "Model wearing a dark evening abaya from The Layl Edit, photographed in low light",
    eyebrow: "The Evening Edit — 2026",
    season: "AW / 26",
    title: "Presence",
    accent: "after dark.",
    lede: "Fluid crepe and a longer line. Designed for candlelight, late dinners and the elegance that needs no introduction.",
    collection: "The Layl Edit",
    pieces: "12 · Limited",
    caption: ["Midnight crepe,", "for candlelight."],
    tone: "dark",
  },
] as const;

const AUTOPLAY_MS = 7000;
const pad = (value: number) => String(value).padStart(2, "0");

export default function Hero() {
  const [index, setIndex] = useState(0);
  // Reduced-motion visitors start paused and can opt in with the play button.
  const [isPlaying, setIsPlaying] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [inView, setInView] = useState(true);
  const pointerStart = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const slide = SLIDES[index];
  const count = SLIDES.length;
  const autoplay = isPlaying && !hovered && !focused && !pageHidden && inView;

  // Don't rotate once the hero has been scrolled away.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Stop rotating in background tabs, and honour motion changes live.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onVisibility = () => setPageHidden(document.hidden);
    const onMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setIsPlaying(false);
    };

    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, index, count]);

  const goTo = (target: number) => setIndex(((target % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start === null || event.pointerType === "mouse") return;

    const distance = event.clientX - start;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) next();
    else prev();
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    // Pointer clicks focus buttons too; only pause for keyboard focus so a
    // mouse user's click doesn't silently stop the rotation for good.
    if (!(event.target as HTMLElement).matches(":focus-visible")) return;
    setFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="abaya-hero"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
      onPointerLeave={() => {
        pointerStart.current = null;
      }}
    >
      <span className="abaya-hero__watermark" lang="ar" aria-hidden="true">
        عباية
      </span>

      <p
        className="abaya-hero__live"
        aria-live={autoplay ? "off" : "polite"}
        aria-atomic="true"
      >
        {`Slide ${index + 1} of ${count}: ${slide.collection}`}
      </p>

      <div className="abaya-hero__inner">
        <div className="abaya-hero__copy">
          <div className="abaya-hero__copy-body" key={slide.id}>
            <div className="abaya-hero__topline">
              <span className="abaya-hero__eyebrow">{slide.eyebrow}</span>
              <span className="abaya-hero__rule" aria-hidden="true" />
              <span className="abaya-hero__season">{slide.season}</span>
            </div>

            <h1 id="hero-title" className="abaya-hero__title">
              <span className="abaya-hero__title-line">{slide.title}</span>
              <span className="abaya-hero__title-line abaya-hero__title-line--accent">
                {slide.accent}
              </span>
            </h1>

            <p className="abaya-hero__lede">{slide.lede}</p>
          </div>

          <div className="abaya-hero__actions">
            <Link to="/shop" className="abaya-hero__cta">
              <span>Explore Collection</span>
              <span className="abaya-hero__cta-icon" aria-hidden="true">
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </span>
            </Link>

            <Link to="/our-story" className="abaya-hero__text-link">
              Our Story
              <ArrowRight size={14} strokeWidth={1.4} />
            </Link>
          </div>

          <div className="abaya-hero__meta">
            <div className="abaya-hero__meta-item" key={`collection-${index}`}>
              <span className="abaya-hero__meta-label">Collection</span>
              <span className="abaya-hero__meta-value">{slide.collection}</span>
            </div>

            <div className="abaya-hero__meta-item" key={`pieces-${index}`}>
              <span className="abaya-hero__meta-label">Pieces</span>
              <span className="abaya-hero__meta-value">{slide.pieces}</span>
            </div>

            <a href="#featured-collection" className="abaya-hero__scroll">
              Scroll to explore
              <ArrowDown size={14} strokeWidth={1.4} />
            </a>
          </div>

          <div
            className={`abaya-hero__pager${autoplay ? " is-playing" : ""}`}
            role="group"
            aria-label="Slide controls"
          >
            <div className="abaya-hero__pager-tabs">
              {SLIDES.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  className={`abaya-hero__pager-tab${
                    itemIndex === index ? " is-active" : ""
                  }`}
                  aria-label={`Slide ${itemIndex + 1}: ${item.collection}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => goTo(itemIndex)}
                >
                  {pad(itemIndex + 1)}
                  {itemIndex === index && (
                    <span
                      className="abaya-hero__tab-progress"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="abaya-hero__pager-nav">
              <button
                type="button"
                className="abaya-hero__pager-btn"
                onClick={prev}
                aria-label="Previous slide"
              >
                <ArrowLeft size={15} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                className="abaya-hero__pager-btn"
                onClick={next}
                aria-label="Next slide"
              >
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                className="abaya-hero__pager-btn abaya-hero__pager-btn--play"
                onClick={() => setIsPlaying((playing) => !playing)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <Pause size={13} strokeWidth={1.6} />
                ) : (
                  <Play size={13} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>
        </div>

        <figure className="abaya-hero__figure">
          <div className="abaya-hero__frame">
            {SLIDES.map((item, itemIndex) => (
              <div
                key={item.id}
                className={`abaya-hero__slide${
                  itemIndex === index ? " is-active" : ""
                }`}
                aria-hidden={itemIndex !== index}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  fetchPriority={itemIndex === 0 ? "high" : "low"}
                  loading={itemIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span
                  className={`abaya-hero__scrim abaya-hero__scrim--${item.tone}`}
                  aria-hidden="true"
                />
              </div>
            ))}

            <figcaption
              className="abaya-hero__caption"
              key={`caption-${index}`}
            >
              <span className="abaya-hero__caption-index">{pad(index + 1)}</span>
              <span className="abaya-hero__caption-text">
                {slide.caption[0]}
                <br />
                {slide.caption[1]}
              </span>
            </figcaption>

            <span
              className="abaya-hero__counter"
              key={`counter-${index}`}
              aria-hidden="true"
            >
              {pad(index + 1)} / {pad(count)}
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
