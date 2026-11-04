import { Schema, model } from "mongoose";

export interface AdminDocument {
  email: string;
  clerkUserId?: string;
  role: "admin";
  active: boolean;
}

const adminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    clerkUserId: { type: String, index: true, sparse: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Admin = model<AdminDocument>("Admin", adminSchema);
