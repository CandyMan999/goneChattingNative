import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useClient } from "../client";
import { GOOGLE_APP_LOGIN_MUTATION } from "../graphql/mutations";
import Icon from "../assets/Icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const SplashScreen = ({ navigation }) => {
  const client = useClient();
  const [token, setToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "822502244020-i4ed29ci87prodt7b020bfc6fmm3q0v6.apps.googleusercontent.com",
    iosClientId:
      "822502244020-3p6qcigklemcl51eb0083hf24j6g24pd.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await response.json();

      const variables = {
        googleId: userInfo.id,
      };

      const {
        googleAppLogin: { token, user },
      } = await client.request(GOOGLE_APP_LOGIN_MUTATION, variables);

      storeData(token);
      navigation.navigate("Camera");
    } catch (error) {
      console.log("error fetching: ", error);
      // Add your own error handler here
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@GoneChatting", value);
    } catch (e) {
      console.log("error saving token to storage: ", e);
    }
  };

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

  const handleFaceSignIn = () => {
    navigation.navigate("Face");
  };

  const handlePilgrimSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.logo} />
      <Text style={styles.slogan}>Never Catch A Catfish</Text>
      <View style={styles.buttonContainer}>
        {token && (
          <TouchableOpacity style={styles.button} onPress={handleFaceSignIn}>
            <Text style={styles.buttonText}>
              Sign in with Facial Recognition
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button}>
          <Button
            title={accessToken ? "Get User Info" : "Sign in with Google"}
            disabled={!request}
            onPress={
              accessToken
                ? getUserInfo
                : () => promptAsync({ useProxy: true, showInRecents: true })
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePilgrimSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    width: 200,
    height: 200,
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
