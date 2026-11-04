import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import { clerkAuthMiddleware } from "./middleware/authenticate";
import apiRoutes from "./routes";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(clerkAuthMiddleware);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;