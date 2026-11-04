import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  slug: string;
  name: string;
  category: "Everyday" | "Signature" | "Occasion" | "Classic";
  price: number;
  image: string;
  images: string[];
  badge?: string;
  colors: string[];
  sizes: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Everyday", "Signature", "Occasion", "Classic"],
    },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    badge: { type: String },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);