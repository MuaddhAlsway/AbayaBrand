import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ShippingMethod } from "./shipping.model";

const router = Router();

router.get(
  "/methods",
  asyncHandler(async (_req, res) => {
    const methods = await ShippingMethod.find({ enabled: true });
    res.json({ data: methods });
  })
);

export default router;