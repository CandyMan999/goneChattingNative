import { createContext } from "react";

const Context = createContext({
  currentUser: {
    username: null,
  },
});

export default Context;
