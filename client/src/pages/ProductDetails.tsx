import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Product } from "../types/product";
import ProductGallery from "../components/product/ProductGallery";
import ProductInformation from "../components/product/ProductInformation";
import ProductAccordion from "../components/product/ProductAccordion";
import RelatedProducts from "../components/product/RelatedProducts";
import "../styles/product-details.css";

function ProductDetailsInner({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const controller = new AbortController(); const api = import.meta.env.PROD ? "/api" : (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"); fetch(`${api}/products/${slug}`, { signal: controller.signal }).then(async (response) => { if (!response.ok) throw new Error("not found"); return response.json(); }).then((payload) => setProduct({ ...payload.data, id: payload.data._id, images: payload.data.images?.length ? payload.data.images : [payload.data.image] })).catch(() => setProduct(null)).finally(() => setLoading(false)); return () => controller.abort(); }, [slug]);

  const [colorIndex, setColorIndex] = useState(0);

  if (loading) return <main className="product-details product-details--not-found"><div className="product-details__empty"><h1>Loading product…</h1></div></main>;
  if (!product) {
    return (
      <main className="product-details product-details--not-found">
        <div className="product-details__container">
          <nav className="product-details__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span>/</span>
            <Link to="/shop">SHOP</Link>
            <span>/</span>
            <span>NOT FOUND</span>
          </nav>
          <div className="product-details__empty">
            <span>NOTHING FOUND</span>
            <h1>Product not found.</h1>
            <p>
              The piece you are looking for may have moved or is no longer
              available.
            </p>
            <Link to="/shop" className="product-details__back">
              <ArrowLeft size={16} />
              Return to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="product-details__container">
        <nav className="product-details__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span>/</span>
          <Link to="/shop">SHOP</Link>
          <span>/</span>
          <span>{product.name.toUpperCase()}</span>
        </nav>

        <div className="product-details__grid">
          <div className="product-details__gallery">
            <ProductGallery
              key={product.id}
              product={product}
              colorIndex={colorIndex}
              onColorIndexChange={setColorIndex}
            />
          </div>
          <div className="product-details__info">
            <ProductInformation
              key={product.id}
              product={product}
              colorIndex={colorIndex}
              onColorChange={setColorIndex}
            />
            <ProductAccordion />
          </div>
        </div>
      </div>

      <RelatedProducts product={product} />
    </main>
  );
}

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  return <ProductDetailsInner key={slug} slug={slug ?? ""} />;
}
