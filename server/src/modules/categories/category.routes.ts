import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Category } from "./category.model";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ data: categories });
  })
);

export default router;