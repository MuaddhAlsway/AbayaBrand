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

router.get("/products", requireAdmin, asyncHandler(async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.json({ data: products });
}));

router.post("/products", requireAdmin, asyncHandler(async (req, res) => {
  const { name, slug, category, price, image } = req.body;
  if (!name || !slug || !category || price === undefined || !image) {
    res.status(400).json({ message: "name, slug, category, price and image are required" }); return;
  }
  const product = await Product.create({ ...req.body, price: Number(price) });
  res.status(201).json({ data: product });
}));

router.patch("/products/:id", requireAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
  if (!product) { res.status(404).json({ message: "Product not found" }); return; }
  res.json({ data: product });
}));

router.delete("/products/:id", requireAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) { res.status(404).json({ message: "Product not found" }); return; }
  res.json({ data: { id: req.params.id } });
}));

export default router;
