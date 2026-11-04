import mongoose, { Document, Schema } from "mongoose";

export interface IShippingMethod extends Document {
  name: string;
  description: string;
  feeMinor: number | null;
  estimatedDays?: { min: number; max: number };
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShippingMethodSchema = new Schema<IShippingMethod>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    feeMinor: { type: Number, default: null },
    estimatedDays: {
      min: { type: Number },
      max: { type: Number },
    },
    enabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ShippingMethod = mongoose.model<IShippingMethod>("ShippingMethod", ShippingMethodSchema);