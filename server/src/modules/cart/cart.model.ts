import mongoose, { Document, Schema } from "mongoose";

export interface ICartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface ICart extends Document {
  customerId: mongoose.Types.ObjectId;
  items: ICartLine[];
  createdAt: Date;
  updatedAt: Date;
}

const CartLineSchema = new Schema<ICartLine>(
  {
    productId: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true, unique: true },
    items: { type: [CartLineSchema], default: [] },
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);