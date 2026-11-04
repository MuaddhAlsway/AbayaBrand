import { Router } from "express";
import { requireAuth, getAuthUserId } from "../../middleware/authenticate";
import { asyncHandler } from "../../utils/asyncHandler";
import { Customer } from "../customers/customer.model";
import { Cart } from "./cart.model";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.json({ data: { items: [] } });
      return;
    }
    const cart = await Cart.findOne({ customerId: customer._id });
    res.json({ data: cart ?? { items: [] } });
  })
);

router.put(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const cart = await Cart.findOneAndUpdate(
      { customerId: customer._id },
      { items: req.body.items ?? [] },
      { upsert: true, new: true }
    );
    res.json({ data: cart });
  })
);

export default router;