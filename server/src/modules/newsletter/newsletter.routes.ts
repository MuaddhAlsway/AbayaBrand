import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Newsletter } from "./newsletter.model";

const router = Router();

router.post(
  "/subscribe",
  asyncHandler(async (req, res) => {
    const { email } = req.body ?? {};
    if (!email || typeof email !== "string") {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const doc = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim() },
      { upsert: true, new: true }
    );
    res.status(201).json({ data: doc });
  })
);

export default router;