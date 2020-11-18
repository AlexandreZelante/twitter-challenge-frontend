import React from "react";

import Routes from "./routes";
import { GlobalStateProvider } from "./hooks/globalState";

import "./styles/global.css";

export default function App() {
  return (
    <GlobalStateProvider>
      <Routes />
    </GlobalStateProvider>
  );
}
