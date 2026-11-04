import { Router } from "express";
import { requireAuth, getAuthUserId } from "../../middleware/authenticate";
import { asyncHandler } from "../../utils/asyncHandler";
import { Customer } from "../customers/customer.model";
import { Wishlist } from "./wishlist.model";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.json({ data: { productIds: [] } });
      return;
    }
    const wishlist = await Wishlist.findOne({ customerId: customer._id });
    res.json({ data: wishlist ?? { productIds: [] } });
  })
);

router.post(
  "/:productId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const wishlist = await Wishlist.findOneAndUpdate(
      { customerId: customer._id },
      { $addToSet: { productIds: req.params.productId } },
      { upsert: true, new: true }
    );
    res.json({ data: wishlist });
  })
);

router.delete(
  "/:productId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const wishlist = await Wishlist.findOneAndUpdate(
      { customerId: customer._id },
      { $pull: { productIds: req.params.productId } },
      { new: true }
    );
    res.json({ data: wishlist ?? { productIds: [] } });
  })
);

export default router;