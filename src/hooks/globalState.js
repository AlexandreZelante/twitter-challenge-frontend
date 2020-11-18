import React, { useContext, useState, createContext } from "react";

const GlobalStateContext = createContext({});

export function GlobalStateProvider({ children }) {
  const [hashtags, setHashtags] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [current, setCurrent] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{ hashtags, setHashtags, tweets, setTweets, current, setCurrent }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error(
      "useGlobalState must be used within an GlobalStateProvider"
    );
  }

  return context;
}
