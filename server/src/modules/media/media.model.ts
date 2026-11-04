import { Schema, model } from "mongoose";
export interface MediaDocument { name: string; url: string; mimeType: string; size: number; }
const schema = new Schema<MediaDocument>({ name: { type: String, required: true }, url: { type: String, required: true }, mimeType: { type: String, required: true }, size: { type: Number, required: true } }, { timestamps: true });
export const Media = model<MediaDocument>("Media", schema);
