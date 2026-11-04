import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/abaya",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  clerkSecretKey: process.env.CLERK_SECRET_KEY ?? "",
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY ?? "",
  adminEmailAllowlist: (process.env.ADMIN_EMAIL_ALLOWLIST ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean),
};

export function validateEnv(): void {
  if (!env.clerkSecretKey) {
    console.warn("CLERK_SECRET_KEY is not set; auth verification will fail.");
  }
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required.");
  }
}
