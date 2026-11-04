import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAdmin } from "../../middleware/authenticate";
import { Product } from "../products/product.model";

const router = Router();

router.get(
  "/health",
  asyncHandler(async (_req, res) => {
    res.json({ status: "ok" });
  })
);

router.get("/dashboard", requireAdmin, asyncHandler(async (_req, res) => {
  const publishedProducts = await Product.countDocuments();
  res.json({ data: { orders: 0, revenue: 0, pendingOrders: 0, customers: 0, publishedProducts, lowStockVariants: 0, newsletterSubscribers: 0, recentOrders: [], unavailable: ["orders", "customers", "newsletter"] } });
}));

export default router;
