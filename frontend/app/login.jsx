import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      onLogin(data);
      console.log(data);
    } else {
      console.log(JSON.stringify(data.message));
    }
  };

  const createUser = () => {};
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Logga in" onPress={handleLogin} />
      <Button title="Skapa konto" onPress={createUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#000000ff",
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 10,
  },
});
