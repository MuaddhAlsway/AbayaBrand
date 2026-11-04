import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "../../styles/size-guide.css";

type SizeGuideProps = {
  open: boolean;
  onClose: () => void;
  sizes: string[];
};

export default function SizeGuide({ open, onClose, sizes }: SizeGuideProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="size-guide__overlay" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="size-guide__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="size-guide__panel" ref={dialogRef}>
        <div className="size-guide__head">
          <h2 className="size-guide__title">Size Guide</h2>
          <button
            type="button"
            ref={closeRef}
            className="size-guide__close"
            onClick={onClose}
            aria-label="Close size guide"
          >
            <X size={18} />
          </button>
        </div>
        <div className="size-guide__body">
          <p className="size-guide__note">
            Verified garment measurements are not available yet. Available sizes
            for this piece:
          </p>
          <ul className="size-guide__list">
            {sizes.map((size) => (
              <li key={size}>{size}</li>
            ))}
          </ul>
          <p className="size-guide__placeholder">
            Measurements (bust, length, sleeve) will be added here once verified.
          </p>
        </div>
      </div>
    </div>
  );
}