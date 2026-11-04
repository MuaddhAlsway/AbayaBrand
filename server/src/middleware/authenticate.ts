import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { forbidden, unauthorized } from "../utils/ApiError";
import { env } from "../config/env";
import { Admin } from "../modules/admin/admin.model";

export const clerkAuthMiddleware = clerkMiddleware();

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const auth = getAuth(req);
  if (!auth.userId) {
    next(unauthorized("Authentication required"));
    return;
  }
  next();
}

export function getAuthUserId(req: Request): string | null {
  const auth = getAuth(req);
  return auth.userId ?? null;
}

export async function requireAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getAuthUserId(req);
    if (!userId) { next(unauthorized("Authentication required")); return; }
    const user = await clerkClient.users.getUser(userId);
    const emails = user.emailAddresses.map((email) => email.emailAddress.toLowerCase());
    const admin = await Admin.findOne({ email: { $in: emails }, active: true });
    if (!admin) { next(forbidden("Administrator access required")); return; }
    if (admin.clerkUserId !== userId) {
      admin.clerkUserId = userId;
      await admin.save();
    }
    next();
  } catch (error) {
    next(error);
  }
}
