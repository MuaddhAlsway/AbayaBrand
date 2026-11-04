import cors from "cors";
import { env } from "./env";

export const corsOptions: cors.CorsOptions = {
  origin: [env.clientUrl, "https://abaya-brand.vercel.app"].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
