import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../assets/Icon.png";

const SplashScreen = ({ navigation }) => {
  const handleGoogleSignIn = () => {
    // Handle sign-in with Google button press
  };

  const handleFaceSignIn = () => {
    navigation.navigate("Face");
  };

  const handlePilgrimSignIn = () => {};

  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.logo} />
      <Text style={styles.slogan}>Never Catch A Catfish</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFaceSignIn}>
          <Text style={styles.buttonText}>Sign in with Facial Recognition</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePilgrimSignIn}>
          <Text style={styles.buttonText}>Sign in like a Pilgrim</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  slogan: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SplashScreen;
