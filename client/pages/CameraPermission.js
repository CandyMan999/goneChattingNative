import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { Camera } from "expo-camera";

const CameraPermissionScreen = ({ navigation }) => {
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();

    if (status === "granted") {
      // Camera permission granted, navigate to the Location screen
      navigation.navigate("Location");
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      // Camera permission granted, navigate to the Home screen
      navigation.navigate("Location");
    }
    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Gone Chatting needs access to your camera to send Video Messages",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: navigation.navigate("Location"),
          },
          { text: "OK", onPress: openAppSettings },
        ],
        { cancelable: false }
      );
    }
  };
  const openAppSettings = () => {
    Linking.openSettings();
  };

  const handlePress = () => {
    requestCameraPermission();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Never Catch a Catfish</Text>
      <Text style={styles.subtitle}>
        We need to enable your camera to be able to utilize our video messaging
        feature
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Continue</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default CameraPermissionScreen;
