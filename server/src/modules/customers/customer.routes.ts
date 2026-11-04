import { Router } from "express";
import { requireAuth, getAuthUserId } from "../../middleware/authenticate";
import { asyncHandler } from "../../utils/asyncHandler";
import { Customer } from "./customer.model";

const router = Router();

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    let customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      customer = await Customer.create({ clerkUserId: userId });
    }
    res.json({ data: customer });
  })
);

export default router;