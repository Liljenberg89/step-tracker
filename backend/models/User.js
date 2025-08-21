import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  weeklyGoal: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },

  steps: [
    {
      date: { type: Date, required: true },
      count: { type: Number, required: true },
    },
  ],

  settings: {
    notifications: { type: Boolean, default: true },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
