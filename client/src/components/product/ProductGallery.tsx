import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { Product } from "../../types/product";
import "../../styles/product-gallery.css";

type ProductGalleryProps = {
  product: Product;
  colorIndex?: number;
  onColorIndexChange?: (index: number) => void;
};

export default function ProductGallery({
  product,
  colorIndex,
  onColorIndexChange,
}: ProductGalleryProps) {
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = colorIndex ?? internalIndex;
  const [viewerOpen, setViewerOpen] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const safeIndex = Math.min(activeIndex, gallery.length - 1);

  const setIndex = (next: number | ((prev: number) => number)) => {
    const resolved =
      typeof next === "function"
        ? (next as (prev: number) => number)(activeIndex)
        : next;
    const clamped = Math.max(0, Math.min(resolved, gallery.length - 1));
    setInternalIndex(clamped);
    onColorIndexChange?.(clamped);
  };

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerOpen(false);
      if (event.key === "ArrowLeft")
        setIndex((i) => (i - 1 + gallery.length) % gallery.length);
      if (event.key === "ArrowRight")
        setIndex((i) => (i + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    viewerRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerOpen, gallery.length]);

  const openViewer = () => {
    triggerRef.current = document.activeElement as HTMLButtonElement | null;
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    triggerRef.current?.focus();
  };

  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <button
          type="button"
          className="product-gallery__main-button"
          onClick={openViewer}
          aria-label={`Open fullscreen view of ${product.name}`}
        >
          <img
            src={gallery[safeIndex]}
            alt={`${product.name} — view ${safeIndex + 1} of ${gallery.length}`}
            className="product-gallery__main-image"
          />
          <span className="product-gallery__zoom" aria-hidden="true">
            <ZoomIn size={18} />
          </span>
        </button>
      </div>

      {gallery.length > 1 && (
        <div className="product-gallery__thumbs" role="list" aria-label="Product images">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              role="listitem"
              className={`product-gallery__thumb ${
                index === safeIndex ? "product-gallery__thumb--active" : ""
              }`}
              onClick={() => setIndex(index)}
              aria-label={`Show image ${index + 1} of ${gallery.length}`}
              aria-pressed={index === safeIndex}
            >
              <img src={src} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {viewerOpen && (
        <div
          className="product-gallery__viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} fullscreen image viewer`}
          ref={viewerRef}
          tabIndex={-1}
        >
          <button
            type="button"
            className="product-gallery__viewer-close"
            onClick={closeViewer}
            aria-label="Close fullscreen viewer"
          >
            <X size={20} />
          </button>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="product-gallery__viewer-nav product-gallery__viewer-nav--prev"
                onClick={prev}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="product-gallery__viewer-nav product-gallery__viewer-nav--next"
                onClick={next}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <img
            src={gallery[safeIndex]}
            alt={`${product.name} — view ${safeIndex + 1} of ${gallery.length}`}
            className="product-gallery__viewer-image"
          />
          <p className="product-gallery__viewer-count" aria-live="polite">
            {safeIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </div>
  );
}