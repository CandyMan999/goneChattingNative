import React, { useRef, useEffect, useState } from "react";

import { View, SafeAreaView, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import queryString from "query-string";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [token, setToken] = useState("");
  const webViewRef = useRef(null);

  useEffect(() => {
    getToken();
    checkCameraPermission();
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@GoneChatting");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log("err getting token in client: ", e);
    }
  };

  const checkCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Gone Chatting needs access to your camera to send Video Messages",
        [
          {
            text: "Cancel",
            style: "cancel",
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

  const handleNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;

    const queryParams = await queryString.parse(url.split("?")[1]);
    const username = await queryParams.username;

    if (url.startsWith("https://www.gonechatting.com/video")) {
      checkIfJitsiMeetAppIsInstalled(username);
    }
  };

  const checkIfJitsiMeetAppIsInstalled = async (username) => {
    const appUrl = `org.jitsi.meet://meet.jit.si/AOLisBack-noi8ioj7r/${username}-328723!^*#@`; // Custom URL scheme for Jitsi Meet app
    const appStoreUrl = `https://apps.apple.com/us/app/jitsi-meet/id1165103905`; // App Store URL for Jitsi Meet app

    try {
      await Linking.openURL(appUrl);
    } catch (error) {
      console.log("Jitsi Meet app is not installed");
      Linking.openURL(appStoreUrl);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "black",
      }}
    >
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <WebView
          ref={webViewRef}
          source={{ uri: `https://www.gonechatting.com/?token=${token}` }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
