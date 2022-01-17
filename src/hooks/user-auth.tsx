import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect, useContext, createContext, FC } from "react";
import { auth, fireStore } from "../services/api";
import { getUserByUserId } from "../services/firebase";

interface AppContextInterface {
  user: User | null;
  fireStoreUser: CurrentUserType | null;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signinWithGmail: () => Promise<UserCredential>;
  signup: (
    email: string,
    password: string,
    name: string,
    imageAsUrl: string
  ) => Promise<void>;
  signout: () => Promise<void>;
  passwordResetEmail: (email: string) => Promise<void>;
  restPassword?: (oobCode: string, newPassword: string) => Promise<void>;
}

interface CurrentUserType {
  avatar: string;
  email: string;
  name: string;
  role: string;
  status: boolean;
  user: string;
  createdAt: string;
}

const authContext = createContext<AppContextInterface | null>(null);

export const ProviderAuth: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fireStoreUser, setFireStoreUser] = useState<CurrentUserType | null>(
    null
  );

  const signin = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    imageAsUrl: string
  ) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL: imageAsUrl,
        });
        setDoc(doc(fireStore, "users", res.user.uid), {
          user: res.user.uid,
          role: "user",
          avatar: imageAsUrl,
          status: true,
          email: res.user.email,
          name: name,
          createdAt: new Date().toISOString(),
        });
      }
    );
  };

  const signinWithGmail = async () => {
    const googleProvider = new GoogleAuthProvider();
    const googleResponse = await signInWithPopup(auth, googleProvider);
    const userExist = await getUserByUserId(googleResponse.user.uid);
    if (userExist) {
      return googleResponse;
    } else {
      setDoc(doc(fireStore, "users", googleResponse.user.uid), {
        user: googleResponse.user.uid,
        role: "user",
        avatar: googleResponse.user.photoURL,
        status: true,
        email: googleResponse.user.email,
        name: googleResponse.user.displayName,
        createdAt: new Date().toISOString(),
      });
    }

    return googleResponse;
  };

  const signout = async () => {
    return await signOut(auth);
  };

  const passwordResetEmail = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.code);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const restPassword = async (oobCode: string, newPassword: string) => {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      getUserByUserId(user?.uid).then((res) => {
        if (res) {
          const currentUser: CurrentUserType = {
            name: res.name,
            avatar: res.avatar,
            email: res.email,
            role: res.role,
            status: res.status,
            user: res.user,
            createdAt: res.createdAt,
          };
          setUser(user);
          setFireStoreUser(currentUser);
        } else {
          setUser(null);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    fireStoreUser,
    signin,
    signinWithGmail,
    signup,
    signout,
    passwordResetEmail,
    restPassword,
  };
};
