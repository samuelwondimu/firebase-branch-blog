import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { auth, FieldValue, fireStore, storage } from "./lib/firebase";
import FirebaseContext from "./contexts/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ auth, FieldValue, fireStore, storage }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
