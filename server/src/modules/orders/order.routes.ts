import { Router } from "express";
import { requireAuth, getAuthUserId } from "../../middleware/authenticate";
import { asyncHandler } from "../../utils/asyncHandler";
import { Customer } from "../customers/customer.model";
import { Order } from "./order.model";
import { notFound as nf } from "../../utils/ApiError";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.json({ data: [] });
      return;
    }
    const orders = await Order.find({ customerId: customer._id }).sort({ createdAt: -1 });
    res.json({ data: orders });
  })
);

router.get(
  "/:orderId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) throw nf("Order not found");
    res.json({ data: order });
  })
);

export default router;