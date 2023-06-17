import React, { useRef, useContext, useReducer, useEffect } from "react";
import { View, SafeAreaView, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import queryString from "query-string";
import { ApolloProvider, Subscription } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";

import { InMemoryCache } from "apollo-cache-inmemory";
import Context from "./context";
import reducer from "./reducer";

export const WS_URL = `wss://aol-is-back.herokuapp.com/graphql`;

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const App = () => {
  const webViewRef = useRef(null);
  const intialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, intialState);

  const handleNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;

    const queryParams = await queryString.parse(url.split("?")[1]);
    const username = await queryParams.username;

    if (url.startsWith("https://www.gonechatting.com/video")) {
      checkIfJitsiMeetAppIsInstalled(username);
    }
  };

  const checkIfJitsiMeetAppIsInstalled = async (username) => {
    const appUrl = `org.jitsi.meet://meet.jit.si/AOLisBack-noi8ioj7r/${username}`; // Custom URL scheme for Jitsi Meet app
    const appStoreUrl = `https://apps.apple.com/us/app/jitsi-meet/id1165103905`; // App Store URL for Jitsi Meet app

    try {
      await Linking.openURL(appUrl);
    } catch (error) {
      console.log("Jitsi Meet app is not installed");
      Linking.openURL(appStoreUrl);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={{ state, dispatch }}>
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
              source={{ uri: "https://www.gonechatting.com" }}
              style={{ flex: 1 }}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </View>
        </SafeAreaView>
      </Context.Provider>
    </ApolloProvider>
  );
};

export default App;
