import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default function Home({ user, setUser }) {
  const { name, weeklyGoal, height, weight, username, _id } = user;

  // states
  const [toggle, setToggle] = useState(true);
  const [tempGoal, setTempGoal] = useState(weeklyGoal?.toString() || "");
  const [dailyGoal, setDailyGoal] = useState(weeklyGoal || 0);
  const [userInfo, setUserInfo] = useState({
    name: name || "",
    height: height?.toString() || "",
    weight: weight?.toString() || "",
  });
  const handleLogout = () => {
  setUser(null);
  };
  

  // save user info to backend
  const handleSaveUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/userInfo/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          height: Number(userInfo.height),
          weight: Number(userInfo.weight),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User info updated:", data);
        setToggle(false); // go to goal screen
      } else {
        console.log("Error updating user:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  // save goal to backend
  const handleSaveGoal = async () => {
    try {
      const response = await fetch(`http://localhost:3000/userInfo/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weeklyGoal: Number(tempGoal) }),
      });

      const data = await response.json();
      if (response.ok) {
        setDailyGoal(Number(tempGoal));
        console.log("Goal updated:", data);
      } else {
        console.log("Error saving goal:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* top bar */}
      <View style={styles.loginBar}>
        <Text style={styles.userName}>{name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logga ut</Text>
        </TouchableOpacity>
      </View>

      {/* main content */}
      {dailyGoal === 0 && toggle ? (
        <View style={styles.settings}>
          <Icon name="user-circle" size={width * 0.3} color="#264653" />
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Namn"
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Längd"
              keyboardType="numeric"
              value={userInfo.height}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, height: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Vikt"
              keyboardType="numeric"
              value={userInfo.weight}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, weight: text })
              }
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSaveUserInfo}
            >
              <Text style={styles.buttonText}>Nästa</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.goals}>
          <Text style={styles.goalLabel}>Välj ditt dagliga steg-mål:</Text>
          <TextInput
            style={styles.inputGoal}
            value={tempGoal}
            onChangeText={setTempGoal}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleSaveGoal}>
            <Text style={styles.buttonText}>Spara</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loginBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#264653",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  logoutButton: {
    backgroundColor: "#e76f51",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  settings: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  form: {
    flex: 1,
    maxWidth: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  goals: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  goalLabel: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 12,
    color: "#333",
  },
  inputGoal: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlign: "center",
    width: 140,
  },
  primaryButton: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: 140,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
