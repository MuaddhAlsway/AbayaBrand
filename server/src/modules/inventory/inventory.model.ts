import mongoose, { Document, Schema } from "mongoose";

export interface IInventory extends Document {
  productId: string;
  sku: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema = new Schema<IInventory>(
  {
    productId: { type: String, required: true, index: true },
    sku: { type: String, required: true, unique: true, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model<IInventory>("Inventory", InventorySchema);