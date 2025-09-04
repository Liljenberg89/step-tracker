import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Login from "./login.jsx";
import Settings from "./settings.jsx";
import Home from "./home.jsx";

export default function Index() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("");

  if (page === "") {
    return <Login setUser={setUser} setPage={setPage} />;
  } else if (page === "home") {
    return <Home user={user} setPage={setPage} />;
  } else if (page === "settings") {
    return <Settings user={user} setUser={setUser} setPage={setPage} />;
  }
}
