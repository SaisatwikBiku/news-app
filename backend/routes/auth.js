import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password, email, dateOfBirth } = req.body;
  try {
    // Validate required fields
    if (!username || !password || !email || !dateOfBirth) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ 
      username, 
      password: hashedPassword, 
      email, 
      dateOfBirth: new Date(dateOfBirth)
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      joinDate: user.joinDate || user.createdAt,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Change password
router.post("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/usernames", async (req, res) => {
  try {
    const users = await User.find({}, "username -_id");
    res.json(users.map(u => u.username));
  } catch {
    res.status(500).json({ error: "Failed to fetch usernames" });
  }
});

export default router;
