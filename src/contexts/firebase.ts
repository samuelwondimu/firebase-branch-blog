import { createContext } from "react";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { fireStore, auth, storage, FieldValue } from "../lib/firebase";

// const FirebaseContext = createContext<any | null>(null);
// firebase create context with type of firebase
const FirebaseContext = createContext<{
  auth: Auth;
  fireStore: Firestore;
  storage: FirebaseStorage;
  FieldValue: typeof FieldValue;
}>({
  auth: auth,
  fireStore: fireStore,
  storage: storage,
  FieldValue: FieldValue
});

export default FirebaseContext;
