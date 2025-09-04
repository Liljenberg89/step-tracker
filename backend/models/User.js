import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  totalSteps: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },

  steps: [
    {
      date: { type: Date, required: true },
      goal: { type: Number, default: 0 },
      count: { type: Number, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
