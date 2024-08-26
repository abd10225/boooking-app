import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContext>
  </React.StrictMode>,
  document.getElementById("root")
);
