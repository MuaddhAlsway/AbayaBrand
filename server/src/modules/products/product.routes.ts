import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Product } from "./product.model";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ data: products });
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ data: product });
  })
);

export default router;