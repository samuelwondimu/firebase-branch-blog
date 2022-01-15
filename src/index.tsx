import React from "react";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom";
import App from "./App";
import { ProviderAuth } from "./hooks/user-auth";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <ProviderAuth>
        <App />
      </ProviderAuth>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
