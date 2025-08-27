import express, { json } from "express";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.find();
  console.log("hello");
  console.log(users);
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = { username: username, passwordHash: passwordHash };
  const create = new User({ user });
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
  console.log(req.params.id);
  console.log(req.body);
  const user = await User.findByIdAndUpdate(req.params.id, req.body.userInfo);
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

// skapar ny användare
const createUser = async () => {
  const passwordHash = await bcrypt.hash("123", 10);

  const testUser = new User({
    username: "Tony",
    passwordHash: passwordHash,
  });

  await testUser.save();
};
export default app;
