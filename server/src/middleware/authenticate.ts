import { clerkMiddleware, getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/ApiError";

export const clerkAuthMiddleware = clerkMiddleware();

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const auth = getAuth(req);
  if (!auth.userId) {
    next(unauthorized("Authentication required"));
    return;
  }
  (req as Request & { auth?: unknown }).auth = auth;
  next();
}

export function getAuthUserId(req: Request): string | null {
  const auth = getAuth(req);
  return auth.userId ?? null;
}