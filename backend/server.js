import express, { json } from "express";
import cors from "cors";
import User from "./models/User.js";

const app = express();

app.use(cors());
app.use(express.json());

const createUser = async () => {
  const testUser = new User({
    username: "admin",
    passwordHash: "admin",
    name: "Admin Admin",
    height: 200,
    weight: 95,
  });

  await testUser.save();
};

app.get("/users", async (req, res) => {
  const users = await User.find();
  console.log("hello");
  console.log(users);
  res.json(users);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
      passwordHash: password,
    });
    if (user) {
      console.log("användare: " + JSON.stringify(user));
      res.json(user);
    } else {
      console.log("Ingen användare hittades");
      res.status(401).json({ message: "Ingen användare hittades" });
    }
  } catch (error) {}
});

export default app;
