import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProviderAuth } from "./hooks/user-auth";

ReactDOM.render(
  <React.StrictMode>
    <ProviderAuth>
      <App />
    </ProviderAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
