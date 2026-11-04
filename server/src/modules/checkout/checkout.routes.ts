import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.post(
  "/quote",
  asyncHandler(async (_req, res) => {
    res.status(501).json({ message: "Checkout quote is not implemented yet." });
  })
);

router.post(
  "/session",
  asyncHandler(async (_req, res) => {
    res.status(501).json({ message: "Checkout session is not implemented yet." });
  })
);

export default router;