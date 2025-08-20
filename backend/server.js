import express from "express";

const app = express();

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

app.get("/login", async (req, res) => {
  const username = "Hasse";
  const password = "...";

  for (let i = 0; i < users.length; i++) {
    console.log("hej");
    if (username === users[i].username && password === users[i].password) {
      const user = users[i];
      console.log("användare: " + user);
    } else {
      console.log("no user found!");
    }
  }
});

export default app;
