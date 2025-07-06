import mongoose from "mongoose";

const SavedNewsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  source: {
    id: String,
    name: String,
  },
  category: String
});

export default mongoose.model("SavedNews", SavedNewsSchema);
