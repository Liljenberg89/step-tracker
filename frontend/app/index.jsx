import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Login from "./login.jsx";
import Settings from "./settings.jsx";
import Home from "./home.jsx";

export default function Index() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("");

  if (page === "home") {
    return <Home user={user} />;
  } else {
    return user ? (
      <Settings user={user} setUser={setUser} setPage={setPage} />
    ) : (
      <Login onLogin={setUser} />
    );
  }
}
