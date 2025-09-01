import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress-bar-horizontal";

export default function Home({ user }) {
  const current = 3000;
  const total = user.dailyGoal;
  const progress = current / total;

  return (
    <View>
      <View style={styles.loginBar}>
        <Text style={styles.userName}>{user.username}</Text>
      </View>
      <View style={styles.container}>
        <Text>
          {current}/{user.dailyGoal}
        </Text>

        <ProgressBar
          progress={progress}
          fillColor="#4caf50"
          unfilledColor="#ddd"
          borderWidth={0}
          height={15}
          width={250}
          duration={500}
        />
        <Text>Distans: {user.distance}</Text>
        <Text>Distans: {user.distance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
});
