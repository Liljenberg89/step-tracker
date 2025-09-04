import express, { json } from "express";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/activeUser:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

app.get("/user", async (req, res) => {
  const user = await User.find({ username: "test" });

  res.json(user);
});
app.get("/users", async (req, res) => {
  const user = await User.find();

  res.json(user);
});
app.post("/createUser", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = { username: username, passwordHash: passwordHash };
    const newUser = new User(user);

    const saved = await newUser.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Något gick fel när användaren skapandes" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({
      username: username,
    });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.passwordHash);
      if (matchPassword) {
        console.log("användare: " + JSON.stringify(user));
        res.json(user);
      } else {
        console.log("Fel lösenord!");
        res.status(401).json({ message: "Fel lösenord!" });
      }
    } else {
      console.log("Ingen användare med det namnet hittades");
      res
        .status(401)
        .json({ message: "Ingen användare med det namnet hittades" });
    }
  } catch (error) {}
});

app.put("/userInfo/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body.userInfo);
  res.status(200).json(user);
});

app.put("/updateSteps/:id", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const user = await User.updateOne(
    { _id: req.params.id, "steps.date": today },
    {
      $set: {
        "steps.$.count": req.body.steps,
      },
    }
  );

  res.status(200).json(user);
});
app.put("/updateGoal/:id", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

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
  const selUser = await User.findById(req.params.id);
  console.log(selUser);

  res.status(200).json(selUser);
});

//------ tas bort senare ------
// tar bort alla användare ▬
const clearUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("Alla användare har raderats!");
  } catch (error) {
    console.error("Kunde inte rensa användare:", error);
  }
};

const createTestUser = async () => {
  try {
    // Hårdkodade datum och stegdata
    const stepsData = [
      { date: new Date("2025-09-01"), goal: 10000, count: 7500 },
      { date: new Date("2025-09-02"), goal: 12000, count: 9000 },
      { date: new Date("2025-09-03"), goal: 8000, count: 8000 },
    ];

    // Hårdkodade användaruppgifter
    const username = "test";
    const password = "1";
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      passwordHash,
      name: "Test User",
      height: 180,
      weight: 75,
      totalSteps: stepsData.reduce((sum, s) => sum + s.count, 0),
      distance: 0, // kan beräknas senare
      steps: stepsData,
    });

    const savedUser = await newUser.save();
    console.log("User created:", savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

export default app;
