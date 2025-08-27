import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/steptracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// GET all users (debug)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// REGISTER new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Användarnamnet är upptaget" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      username,
      passwordHash,
    });

    await newUser.save();

    // return safe user object (no passwordHash)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      weeklyGoal: newUser.weeklyGoal,
      height: newUser.height,
      weight: newUser.weight,
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(500).json({ message: "Något gick fel på servern" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Ingen användare med det namnet hittades" });
    }

    const matchPassword = await bcrypt.compare(password, user.passwordHash);
    if (!matchPassword) {
      return res.status(401).json({ message: "Fel lösenord!" });
    }

    // return safe user object
    res.json({
      _id: user._id,
      username: user.username,
      weeklyGoal: user.weeklyGoal,
      height: user.height,
      weight: user.weight,
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    res.status(500).json({ message: "Något gick fel på servern" });
  }
});

// UPDATE user info (e.g. name, height, weight, goal)
app.put("/userInfo/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Fel vid uppdatering av användare:", error);
    res.status(500).json({ message: "Kunde inte uppdatera användaren" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
