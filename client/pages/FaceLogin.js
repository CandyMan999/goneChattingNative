import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const FacialRecognitionComponent = ({ navigation }) => {
  useEffect(() => {
    checkFaceIdSupport();
  }, []);

  const checkFaceIdSupport = async () => {
    const isSupported = await LocalAuthentication.hasHardwareAsync();

    if (!isSupported) {
      Alert.alert(
        "Facial Recognition Not Supported",
        "Facial recognition is not supported on this device.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Camera"); // Navigate to the splash screen
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleFaceIdAuthentication = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your face to authenticate",
        fallbackLabel: "Use passcode",
      });

      if (success) {
        // Facial recognition successful
        console.log("Authentication successful");
        navigation.navigate("Camera");
      } else {
        // Facial recognition failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.log("Authentication error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facial Recognition</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleFaceIdAuthentication}
      >
        <Text style={styles.buttonText}>Authenticate with Face ID</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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

export default FacialRecognitionComponent;
