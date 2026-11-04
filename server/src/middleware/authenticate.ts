import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { forbidden, unauthorized } from "../utils/ApiError";
import { env } from "../config/env";

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

export async function requireAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const userId = getAuthUserId(req);
  if (!userId) { next(unauthorized("Authentication required")); return; }
  if (env.adminEmailAllowlist.length === 0) { next(forbidden("Admin access is not configured")); return; }
  const user = await clerkClient.users.getUser(userId);
  const emails = user.emailAddresses.map((email) => email.emailAddress.toLowerCase());
  if (!emails.some((email) => env.adminEmailAllowlist.includes(email))) { next(forbidden("Administrator access required")); return; }
  next();
}
