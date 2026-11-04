import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAdmin } from "../../middleware/authenticate";
import { Media } from "./media.model";
const router = Router();
router.get("/", requireAdmin, asyncHandler(async (_req, res) => res.json({ data: await Media.find().sort({ createdAt: -1 }).lean() })));
router.post("/", requireAdmin, asyncHandler(async (req, res) => { const { name, url, mimeType, size } = req.body; if (!name || !url || !mimeType) { res.status(400).json({ message: "name, url and mimeType are required" }); return; } const media = await Media.create({ name, url, mimeType, size: Number(size ?? 0) }); res.status(201).json({ data: media }); }));
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => { await Media.findByIdAndDelete(req.params.id); res.json({ data: { id: req.params.id } }); }));
export default router;
