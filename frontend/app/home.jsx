import {
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  Switch,
  TextInput,
} from "react-native";
import { use, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default function Home({ user }) {
  //const [toggle, setToggle] = useState(true);
  const { name, weeklyGoal, height, weight, username, _id } = user;
  const [userInfo, setUserInfo] = useState({
    name: "",
    height: "",
    weight: "",
  });

  //första gången man loggar in
  const loggedIn = () => {
    const [toggle, setToggle] = useState(true);
    const [tempGoal, setTempGoal] = useState("");
    const [dailyGoal, setDailyGoal] = useState(weeklyGoal);
    const handleSave = (e) => {
      setDailyGoal(tempGoal);
    };

    if (dailyGoal === 0 && toggle) {
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
    } else {
      return (
        <View>
          <View style={styles.goals}>
            <Text>Välj ditt dagliga steg-mål:</Text>
            <TextInput
              style={styles.inputGoal}
              value={tempGoal}
              onChangeText={setTempGoal}
            ></TextInput>
            <Button title="spara" onPress={handleSave}></Button>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.text}>{name}</Text>
        <View style={{ width: 90 }}>
          <Button title="Logga ut" />
        </View>
      </View>
      <View>{loggedIn()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#264653",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  text: {
    color: "white",
    justifyContent: "center",
    fontSize: "x-large",
  },
  settings: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 50,
    justifyContent: "center",
    gap: 30,
  },
  goals: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "center",
  },
  inputGoal: {
    borderColor: "#000000ff",
    borderWidth: 1,
    borderRadius: 2,
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
  },
});

/*
            <View style={{ flexDirection: "row" }}>
              <Text>Notiser: </Text>
              <Switch
                value={toggle}
                onValueChange={() => setToggle(!toggle)}
              ></Switch>
            </View>
*/
