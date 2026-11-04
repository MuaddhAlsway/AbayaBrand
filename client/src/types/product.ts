
export type ProductCategory = "Everyday" | "Signature" | "Occasion" | "Classic";

export type ProductCollection = "everyday" | "signature" | "occasion" | "classic";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  images?: string[];
  badge?: string;
  colors: string[];
  sizes: string[];
  isFeatured: boolean;
};
