import express from "express";
import SavedNews from "../models/SavedNews.js";
import SharedNews from "../models/SharedNews.js";
import User from "../models/User.js";
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

router.post("/share", verifyToken, async (req, res) => {
  const { receiverUsername, ...newsData } = req.body;
  try {
    const receiver = await User.findOne({ username: receiverUsername });
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    const shared = await SharedNews.create({
      senderId: req.userId,
      receiverId: receiver._id,
      ...newsData
    });
    res.json(shared);
  } catch {
    res.status(500).json({ error: "Failed to share news" });
  }
});

router.get("/inbox", verifyToken, async (req, res) => {
  try {
    const inbox = await SharedNews.find({ receiverId: req.userId })
      .sort({ sharedAt: -1 })
      .populate("senderId", "username"); // <-- This line populates senderId with username
    res.json(inbox);
  } catch {
    res.status(500).json({ error: "Failed to fetch inbox" });
  }
});

export default router;
