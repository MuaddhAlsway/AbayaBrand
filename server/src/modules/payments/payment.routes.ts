import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.post(
  "/session",
  asyncHandler(async (_req, res) => {
    res.status(501).json({ message: "Payment session creation is not implemented yet." });
  })
);

export default router;