import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  joinDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
export default User;
