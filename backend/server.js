import express, { json } from "express";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/user", async (req, res) => {
  const user = await User.find({ username: "filip" });
  res.json({ user });
});

app.post("/createUser", async (req, res) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = { username: username, passwordHash: passwordHash };
    const newUser = new User(user);

    const saved = await newUser.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
    });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.passwordHash);
      if (matchPassword) {
        res.json(user);
      } else {
        res.status(401).json({ message: "Fel lösenord!" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Ingen användare med det namnet hittades" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/userInfo/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body.userInfo,
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "Ingen User hittades" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/updateSteps/:id", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const user = await User.updateOne(
      { _id: req.params.id, "steps.date": today },
      {
        $set: {
          "steps.$.count": req.body.steps,
        },
      }
    );
    if (!user) {
      res.status(404).json({ message: "Ingen User hittades" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/updateGoal/:id", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const user = await User.updateOne(
      { _id: req.params.id, "steps.date": today },
      {
        $set: {
          "steps.$.goal": req.body.goal,
        },
      }
    );
    if (user.matchedCount === 0) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $push: {
            steps: {
              date: today,
              goal: req.body.goal,
            },
          },
        }
      );
    }
    const selectedUser = await User.findById(req.params.id);

    if (!selectedUser) {
      res.status(404).json({ message: "Ingen User hittades" });
    }

    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app;
