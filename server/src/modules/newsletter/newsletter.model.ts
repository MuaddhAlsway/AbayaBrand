import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

export const Newsletter = mongoose.model<INewsletter>("Newsletter", NewsletterSchema);