import express from "express";
import SavedNews from "../models/SavedNews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/save", verifyToken, async (req, res) => {
  try {
    const existing = await SavedNews.findOne({ userId: req.userId, url: req.body.url });
    if (existing) return res.status(400).json({ error: "Already saved" });

    const saved = await SavedNews.create({ ...req.body, userId: req.userId });
    res.json(saved);
  } catch {
    res.status(500).json({ error: "Failed to save" });
  }
});

router.get("/saved", verifyToken, async (req, res) => {
  try {
    const saved = await SavedNews.find({ userId: req.userId });
    res.json(saved);
  } catch {
    res.status(500).json({ error: "Failed to fetch saved news" });
  }
});

router.post("/remove", verifyToken, async (req, res) => {
  try {
    const removed = await SavedNews.findOneAndDelete({
      userId: req.userId,
      url: req.body.url,
    });

    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Removed" });
  } catch {
    res.status(500).json({ error: "Failed to remove" });
  }
});

export default router;
