import React, { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://aol-is-back.herokuapp.com/graphql";

export const useClient = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@GoneChatting");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log("err getting token in client: ", e);
    }
  };

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: token },
  });
};
