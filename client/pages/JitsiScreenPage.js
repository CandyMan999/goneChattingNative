import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Image,
} from "react-native";
import Jitsi from "../assets/Jitsi.png";
import { COLORS } from "../constants";

const JitsiScreenPage = ({ navigation }) => {
  const [platform, setPlatform] = useState(null);
  const appStoreUrl = "https://apps.apple.com/us/app/jitsi-meet/id1165103905";
  const googlePlayUrl = `https://play.google.com/store/apps/details?id=org.jitsi.meet`;

  useEffect(() => {
    checkPlatform();
    if (platform) {
      checkJitsiMeetAppInstalled();
    }
  }, [platform]);

  const checkPlatform = () => {
    if (Platform.OS === "ios") {
      setPlatform("ios");
    } else if (Platform.OS === "android") {
      setPlatform("android");
    } else {
      console.log("Running on other platform");
      // Perform operations or rendering for other platforms
    }
  };

  const checkJitsiMeetAppInstalled = async () => {};

  const handleSkip = () => {
    navigation.navigate("Home");
  };

  const openAppStore = () => {
    Linking.openURL(appStoreUrl);
  };

  const openGooglePlay = () => {
    Linking.openURL(googlePlayUrl);
  };

  return (
    <View style={styles.container}>
      <Image source={Jitsi} style={styles.logo} />
      <Text style={styles.downloadText}>
        Download the app now if you don't have it, to enable live video chat
        feature.
      </Text>
      {platform === "android" && (
        <TouchableOpacity
          style={styles.appStoreButton}
          onPress={openGooglePlay}
        >
          <Text style={styles.buttonText}>Download on Google Play</Text>
        </TouchableOpacity>
      )}

      {platform === "ios" && (
        <TouchableOpacity style={styles.appStoreButton} onPress={openAppStore}>
          <Text style={styles.buttonText}>Download on the App Store</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.skipButton} onPress={() => handleSkip()}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginTop: "30%",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  skipButton: {
    marginTop: 20,
    width: "50%",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    position: "absolute",
    bottom: "10%",
  },
  appStoreButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  downloadText: {
    fontSize: 20,
    marginBottom: 10,
    margin: "10%",
    textAlign: "center",
  },
});

export default JitsiScreenPage;
