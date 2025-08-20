import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(Username);
    console.log(Password);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={Username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={Password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button title="Logga in" onPress={handleLogin} />
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
