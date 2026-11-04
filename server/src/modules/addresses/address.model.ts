import mongoose, { Document, Schema } from "mongoose";

export interface IAddress extends Document {
  customerId: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  country: "SA";
  region: string;
  city: string;
  district: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
  unitNumber?: string;
  additionalNumber?: string;
  shortAddress?: string;
  deliveryInstructions?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, enum: ["SA"], default: "SA" },
    region: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    buildingNumber: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    unitNumber: { type: String, trim: true },
    additionalNumber: { type: String, trim: true },
    shortAddress: { type: String, trim: true },
    deliveryInstructions: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Address = mongoose.model<IAddress>("Address", AddressSchema);