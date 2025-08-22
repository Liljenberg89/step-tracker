import {
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  Switch,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default function Home({ user }) {
  const [toggle, setToggle] = useState(true);

  const firstLogin = () => {
    if (user.weeklyGoal === 0) {
      return (
        <View>
          <View style={styles.settings}>
            <Icon name="user" size={width * 0.35} color="#264653" />
            <View>
              <Text>Användarnamn: {user.username}</Text>
              <Text>Namn: {user.name}</Text>
              <Text>Längd: {user.height}cm</Text>
              <Text>Vikt: {user.weight}kg</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Notiser: </Text>
                <Switch
                  value={toggle}
                  onValueChange={() => setToggle(!toggle)}
                ></Switch>
              </View>
            </View>
          </View>
          <View>
            <Text>{user.steps}</Text>
            <Text>{user.weeklyGoal}</Text>
          </View>
        </View>
      );
    } else {
      <View></View>;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 70,
          backgroundColor: "#264653",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text style={styles.text}>{user.name}</Text>
        <View style={{ width: 90 }}>
          <Button title="Logga ut" />
        </View>
      </View>
      <View>{firstLogin()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
