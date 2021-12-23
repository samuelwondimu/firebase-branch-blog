import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  FieldValue,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
// import seed from "./seed";

const firebaseConfig = {
  apiKey: "AIzaSyCsxx0CHTeSwEsjN3iiH2T_Hny07pMrHGo",
  authDomain: "cncm-cmo.firebaseapp.com",
  projectId: "cncm-cmo",
  storageBucket: "cncm-cmo.appspot.com",
  messagingSenderId: "62326565957",
  appId: "1:62326565957:web:425b593ef052a923ca472c",
  measurementId: "G-TXSDT1TZEJ",
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhooost") {
  connectFirestoreEmulator(fireStore, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
}

// seed files ONLY ONCE (for testing)
// seedFireStore(app);

export { app, fireStore, storage, auth, FieldValue };
