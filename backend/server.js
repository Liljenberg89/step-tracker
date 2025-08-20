import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    _id: 1,
    username: "Filip",
    passwordHash: "...",
    name: "Filip",
    height: 187,
    weight: 80,
    weeklyGoal: 70000,
    steps: [
      { date: "2025-08-19", count: 4500 },
      { date: "2025-08-20", count: 8000 },
    ],
    settings: {
      notifications: true,
    },
  },
  {
    _id: 2,
    username: "Hasse",
    password: "...",
    name: "Harald",
    height: 187,
    weight: 80,
    weeklyGoal: 70000,
    steps: [
      { date: "2025-08-19", count: 4500 },
      { date: "2025-08-20", count: 8000 },
    ],
    settings: {
      notifications: true,
    },
  },
];

app.get("/users", async (req, res) => {
  res.json(users);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      const user = users[i];
      console.log("användare: " + JSON.stringify(user));
      res.json(user);
    } else {
      console.log("no user found!");
    }
  }
});

export default app;
