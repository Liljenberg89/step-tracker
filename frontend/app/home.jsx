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

export default function Home({ user }) {
  //const [toggle, setToggle] = useState(true);
  const { name, weeklyGoal, username, _id } = user;
  const [userInfo, setUserInfo] = useState({
    name: "",
    height: "",
    weight: "",
    weeklyGoal: "",
  });
  const handleLogout = () => {
  setUser(null);
  };
  

  const loggedIn = () => {
    const [toggle, setToggle] = useState(true);

    const handleSave = async (e) => {
      console.log(userInfo);

      const response = await fetch(`http://localhost:3000/userInfo/${_id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo }),
      });
      () => setToggle(true);
    };

    if (weeklyGoal === 0 && toggle && userInfo.weeklyGoal === "") {
      return (
        <>
          <View style={styles.settings}>
            <Icon name="user" size={width * 0.35} color="#264653" />
            <View>
              <TextInput
                style={styles.input}
                placeholder="Namn"
                value={userInfo.name}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, name: text })
                }
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Längd"
                value={userInfo.height}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, height: text })
                }
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Vikt"
                value={userInfo.weight}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, weight: text })
                }
              ></TextInput>
              <Button title="Nästa" onPress={() => setToggle(!toggle)}></Button>
            </View>
          </View>
        </>
      );
    } else if (!toggle) {
      return (
        <View>
          <View style={styles.goals}>
            <Text>Välj ditt dagliga steg-mål:</Text>
            <TextInput
              style={styles.inputGoal}
              value={userInfo.weeklyGoal}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, weeklyGoal: text })
              }
            ></TextInput>
            <Button
              title="spara"
              onPress={() => {
                handleSave(), setToggle(true);
              }}
            ></Button>
          </View>
        </View>
      );
    } else {
      return <Text>hej {name}</Text>;
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
