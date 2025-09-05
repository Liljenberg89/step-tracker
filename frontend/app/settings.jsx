import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default function Settings({ user, setPage }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    height: "",
    weight: "",
  });

  const handleSave = async (e) => {
    try {
      const response = await fetch(
        `http://192.168.1.95:3000/userInfo/${user._id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInfo }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setPage("home");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <Icon name="user" size={width * 0.35} color="#264653" />
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Namn"
            placeholderTextColor="#aaa"
            value={userInfo.name}
            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Längd (cm)"
            placeholderTextColor="#aaa"
            value={userInfo.height}
            onChangeText={(text) => setUserInfo({ ...userInfo, height: text })}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Vikt (kg)"
            placeholderTextColor="#aaa"
            value={userInfo.weight}
            onChangeText={(text) => setUserInfo({ ...userInfo, weight: text })}
          ></TextInput>
          <Button title="Spara" onPress={handleSave}></Button>
        </View>
      </View>
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
    paddingHorizontal: 30,
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
    flexDirection: "column",
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
