import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Inventory } from "./inventory.model";

const router = Router();

router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const items = await Inventory.find({ productId: req.params.productId });
    res.json({ data: items });
  })
);

export default router;