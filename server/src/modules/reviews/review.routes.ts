import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Review } from "./review.model";

const router = Router();

router.get(
  "/product/:productId",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json({ data: reviews });
  })
);

export default router;