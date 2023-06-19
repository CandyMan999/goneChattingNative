import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useClient } from "../client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const client = useClient();

  const handleLogin = async () => {
    try {
      const variables = {
        username,
        password,
      };

      const {
        login: { token },
      } = await client.request(LOGIN_MUTATION, variables);
      await storeData(token);

      if (token) {
        navigation.navigate("Camera");
      }
    } catch (err) {
      console.log("Login error:", err);
      setAuthError(err.response.errors[0].message);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@GoneChatting", value);
    } catch (e) {
      console.log("error saving token to storage: ", e);
    }
  };

  return (
    <View style={styles.container}>
      {authError && <Text style={styles.error}>{authError}</Text>}
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  error: {
    color: COLORS.textRed,
    position: "absolute",
    top: "30%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
