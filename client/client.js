import { GraphQLClient } from "graphql-request";

export const BASE_URL = "https://aol-is-back.herokuapp.com/graphql";

export const useClient = () => {
  return new GraphQLClient(BASE_URL, {
    headers: { authorization: null },
  });
};
