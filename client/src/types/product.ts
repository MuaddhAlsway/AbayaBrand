
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  badge?: string;
  colors: string[];
  sizes: string[];
  isFeatured: boolean;
};
