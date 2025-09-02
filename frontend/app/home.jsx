import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress-bar-horizontal";
import { Pedometer } from "expo-sensors";

export default function Home({ user }) {
  const [steps, setSteps] = useState(0);
  const total = user.dailyGoal;
  const progress = steps / total;

  useEffect(() => {
    const fetchSteps = async () => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const now = new Date();

      const result = await Pedometer.getStepCountAsync(startOfDay, now);
      setSteps(result.steps);
    };

    fetchSteps();
  }, []);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      setSteps((prev) => prev + result.steps);
    });
    console.log("steg " + steps);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();

      if (hours === 23 && minutes === 59) {
        saveSteps();
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const saveSteps = async () => {
    const response = await fetch(
      `http://192.168.1.95:3000/updateSteps/${_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ steps }),
      }
    );
  };

  const height = user.height;
  const stepLength = (height * 0.415) / 100;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.loginBar}>
        <Text style={styles.userName}>{user.username}</Text>
      </View>
      <View style={styles.container}>
        <Text>
          {steps}/{user.dailyGoal}
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
        <Text>Distans: {stepLength}km</Text>
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
