import { Router } from "express";
import { requireAuth, getAuthUserId } from "../../middleware/authenticate";
import { asyncHandler } from "../../utils/asyncHandler";
import { Customer } from "../customers/customer.model";
import { Address } from "./address.model";
import { notFound } from "../../utils/ApiError";

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
    const addresses = await Address.find({ customerId: customer._id });
    res.json({ data: addresses });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = getAuthUserId(req);
    const customer = await Customer.findOne({ clerkUserId: userId });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const address = await Address.create({ ...req.body, customerId: customer._id });
    res.status(201).json({ data: address });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Address.findByIdAndDelete(req.params.id);
    if (!deleted) throw notFound("Address not found");
    res.status(204).send();
  })
);

export default router;