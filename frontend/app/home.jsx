import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import ProgressBar from "react-native-progress-bar-horizontal";
import { Pedometer } from "expo-sensors";
import * as Updates from "expo-updates";

const quotes = [
  "Varje steg är ett steg närmare ditt mål.",
  "Små framsteg är fortfarande framsteg.",
  "Hälsa är den verkliga rikedomen.",
  "Fokusera på framsteg, inte perfektion.",
  "Din kropp förtjänar det bästa — rör på dig!",
];

export default function Home({ user }) {
  const [activeUser, setActiveUser] = useState(user);
  const [steps, setSteps] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [goal, setGoal] = useState("");

  // Hitta posten för det valda datumet
  const todayStep =
    activeUser.steps?.find(
      (s) => new Date(s.date).toDateString() === currentDate.toDateString()
    ) || null;

  const todayGoal = todayStep ? todayStep.goal : 0;
  const todayCount = todayStep ? todayStep.count : 0;
  const progress = todayGoal > 0 ? todayCount / todayGoal : 0;

  const height = user.height;
  const stepLength = (height * 0.415) / 100;
  const distance = ((steps * stepLength) / 1000).toFixed(2);

  // Pick a random motivational quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Hämta steg för ett visst datum
  const fetchStepsForDate = async (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await Pedometer.getStepCountAsync(startOfDay, endOfDay);
    setSteps(result.steps);
  };

  useEffect(() => {
    fetchStepsForDate(currentDate);
    setQuote(getRandomQuote());
  }, [currentDate]);

  useEffect(() => {
    const saveSteps = async () => {
      const response = await fetch(
        `http://192.168.68.66:3000/updateSteps/${user._id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ steps }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    };
    saveSteps();
  }, [steps]);

  const saveGoal = async () => {
    const response = await fetch(
      `http://192.168.68.66:3000/updateGoal/${user._id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: Number(goal) }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      setActiveUser(data);
      setGoal("");
    }
  };

  // Hantera knappar
  const goToNextDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate < today) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      setCurrentDate(nextDay);
    }
  };

  const goToPrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };
  //startar om appen
  const logOut = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.error("Failed to reload:", e);
    }
  };

  // Är det just dagens datum vi tittar på?
  const isToday = currentDate.toDateString() === new Date().toDateString();

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.loginBar}>
        <Text style={styles.userName}>{user.username}</Text>
        <TouchableOpacity onPress={logOut}>
          <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Date navigation */}
      <View style={{ alignItems: "center" }}>
        <View style={styles.dateRow}>
          <TouchableOpacity onPress={goToPrevDay} style={styles.navBtn}>
            <Text style={styles.navText}>⬅️</Text>
          </TouchableOpacity>
          <Text style={styles.date}>
            {currentDate.toLocaleDateString("sv-SE", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>

          <TouchableOpacity onPress={goToNextDay} style={styles.navBtn}>
            <Text style={styles.navText}>➡️</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Main content */}
      <View style={styles.container}>
        {!todayStep ? (
          isToday ? (
            <View style={{ flex: 1 }}>
              <View style={styles.goals}>
                <Text>Välj ditt dagliga steg-mål!</Text>

                <TextInput
                  style={styles.inputGoal}
                  value={goal}
                  onChangeText={setGoal}
                  keyboardType="numeric"
                />

                <Button title="spara" onPress={saveGoal} />
              </View>
            </View>
          ) : (
            <Text style={{ fontSize: 16, color: "#555", marginTop: 40 }}>
              Inget mål sparat för denna dag
            </Text>
          )
        ) : (
          <>
            {/* Steps Card */}
            <View style={styles.card}>
              <Text style={styles.steps}>{steps.toLocaleString()} steg</Text>
              <Text style={styles.goalText}>
                Mål: {todayGoal.toLocaleString()} steg
              </Text>

              <ProgressBar
                progress={progress}
                fillColor="#2a9d8f"
                unfilledColor="#e0e0e0"
                borderWidth={0}
                height={20}
                width={280}
                duration={500}
              />

              <Text style={styles.distance}>Distans: {distance} km</Text>
            </View>

            {/* Motivational quote */}
            <Text style={styles.quote}>"{quote}"</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f1f8f6",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
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
    fontSize: 22,
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  navBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navText: {
    fontSize: 22,
  },
  date: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    marginHorizontal: 15,
    textTransform: "capitalize",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: "100%",
    marginVertical: 30,
  },
  steps: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#2a9d8f",
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  distance: {
    marginTop: 20,
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 15,
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
});
