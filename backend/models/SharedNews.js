import mongoose from "mongoose";

const SharedNewsSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  source: {
    id: String,
    name: String,
  },
  category: String,
  sharedAt: { type: Date, default: Date.now }
});

export default mongoose.model("SharedNews", SharedNewsSchema);

