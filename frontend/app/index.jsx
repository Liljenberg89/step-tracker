import { Text, View } from "react-native";
import { useState } from "react";
import Login from "./login.jsx";
import Home from "./home.jsx";

export default function Index() {
  const [user, setUser] = useState(null);

  return user ? <Home user={user} /> : <Login onLogin={setUser} />;
}
