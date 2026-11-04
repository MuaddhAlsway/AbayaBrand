import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/product-accordion.css";

type AccordionSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type ProductAccordionProps = {
  sections?: AccordionSection[];
};

const defaultSections: AccordionSection[] = [
  {
    id: "details",
    title: "Product Details",
    content: (
      <p>
        Thoughtfully designed abaya crafted for modern modesty. Detailed
        specifications will be added once verified.
      </p>
    ),
  },
  {
    id: "fabric",
    title: "Fabric & Care",
    content: (
      <p>
        Fabric composition and care instructions will be added once verified.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    content: (
      <p>
        Shipping and delivery information will be added once verified.
      </p>
    ),
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    content: (
      <p>
        Returns and exchange policy will be added once verified.
      </p>
    ),
  },
];

export default function ProductAccordion({ sections = defaultSections }: ProductAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="product-accordion">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="product-accordion__item">
            <button
              type="button"
              className="product-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-${section.id}`}
              onClick={() => setOpenId(isOpen ? null : section.id)}
            >
              <span>{section.title}</span>
              <ChevronDown
                size={16}
                className={`product-accordion__chevron ${
                  isOpen ? "product-accordion__chevron--open" : ""
                }`}
              />
            </button>
            <div
              id={`accordion-${section.id}`}
              className={`product-accordion__panel ${
                isOpen ? "product-accordion__panel--open" : ""
              }`}
              role="region"
              aria-labelledby={`accordion-trigger-${section.id}`}
              hidden={!isOpen}
            >
              <div className="product-accordion__content">{section.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}