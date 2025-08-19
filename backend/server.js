import express from "express";

const app = express();

app.get("/users", async (req, res) => {
  console.log("hej");
  res.json({ message: "Users route works!" });
});

export default app;
