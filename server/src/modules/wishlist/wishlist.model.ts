import mongoose, { Document, Schema } from "mongoose";

export interface IWishlist extends Document {
  customerId: mongoose.Types.ObjectId;
  productIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    productIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);