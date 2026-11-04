import mongoose, { Document, Schema } from "mongoose";

export interface IOrderLine {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  orderNumber: string;
  status: "pending" | "paid" | "failed" | "cancelled" | "shipped" | "delivered";
  items: IOrderLine[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderLineSchema = new Schema<IOrderLine>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
    orderNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled", "shipped", "delivered"],
      default: "pending",
    },
    items: { type: [OrderLineSchema], default: [] },
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0, default: 0 },
    tax: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "SAR" },
    shippingAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);