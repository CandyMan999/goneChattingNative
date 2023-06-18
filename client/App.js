import React, { useContext, useReducer } from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { InMemoryCache } from "apollo-cache-inmemory";
import Context from "./context";
import reducer from "./reducer";

import {
  HomeScreen,
  CameraPermissionScreen,
  LocationPermissionScreen,
  SplashScreen,
  FacialRecognitionScreen,
} from "./pages";
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
  const intialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, intialState);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Face" component={FacialRecognitionScreen} />
            <Stack.Screen name="Camera" component={CameraPermissionScreen} />
            <Stack.Screen
              name="Location"
              component={LocationPermissionScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </Context.Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
