import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle username/password login
  const handleLogin = () => {
    if (username && password) {
      router.push({ pathname: "/home", query: { user: username } }); // navigate to home page
    } else {
      Alert.alert("Error", "Please enter username and password");
    }
  };

  // Navigate to mobile login page
  const handleMobileLogin = () => {
    router.push("/mobile-login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Username/Password Login */}
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Separator */}
      <Text style={styles.orText}>OR</Text>

      {/* Mobile Login */}
      <TouchableOpacity style={styles.button} onPress={handleMobileLogin}>
        <Text style={styles.buttonText}>Login with Mobile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c669f",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e0e0",
    marginBottom: 30
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    backgroundColor: "#ff9800",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  orText: {
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16
  }
});
