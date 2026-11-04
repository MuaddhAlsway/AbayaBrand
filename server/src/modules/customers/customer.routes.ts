import { Router } from "express";
import { clerkClient } from "@clerk/express";
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
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;
    let customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      customer = await Customer.create({ clerkUserId: userId, email, firstName: clerkUser.firstName ?? undefined, lastName: clerkUser.lastName ?? undefined });
    } else {
      customer.email = email;
      customer.firstName = clerkUser.firstName ?? undefined;
      customer.lastName = clerkUser.lastName ?? undefined;
      await customer.save();
    }
    res.json({ data: customer });
  })
);

export default router;
