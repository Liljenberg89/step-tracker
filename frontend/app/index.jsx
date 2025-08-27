import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Login from "./login.jsx";
import Home from "./home.jsx";

export default function Index() {
  const [user, setUser] = useState(null);
  /*

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

*/

  return user ? (
    <Home user={user} setUser={setUser} />
  ) : (
    <Login onLogin={setUser} />
  );
}
