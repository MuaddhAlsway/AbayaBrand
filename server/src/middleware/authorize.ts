import { Request, Response, NextFunction } from "express";
import { forbidden } from "../utils/ApiError";

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const role = (req as Request & { userRole?: string }).userRole;
    if (!role || !roles.includes(role)) {
      next(forbidden("Insufficient permissions"));
      return;
    }
    next();
  };
}