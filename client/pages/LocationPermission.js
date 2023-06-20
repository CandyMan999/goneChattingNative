import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import * as Location from "expo-location";

const LocationPermissionScreen = ({ navigation }) => {
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "granted") {
      // Camera permission granted, navigate to the Location screen
      navigation.navigate("Jitsi");
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      // Location permission granted, navigate to the Home screen
      navigation.navigate("Jitsi");
    }
    if (status !== "granted") {
      Alert.alert(
        "Location Permission",
        "Gone Chatting needs access to your location to find nearby Users",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: navigation.navigate("Jitsi"),
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
    requestLocationPermission();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Never Catch a Catfish</Text>
      <Text style={styles.subtitle}>
        We need to enable your location to find users closest to you!
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

export default LocationPermissionScreen;
