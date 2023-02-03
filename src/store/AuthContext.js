import { useEffect, useState, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { auth, db } from "../config/firebaseConfig";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState("stranger");
  const redirectTo = useNavigate();
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const [errorMessageLogin, setErrorMessageLogin] = useState("");
  const [firebaseUsername, setFirebaseUsername] = useState([]);

  // register
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
      setUser(userCredential.user);
      redirectTo("/", { replace: true });
      setDoc(doc(db, "users", user.uid), {
        username: userName,
      });
    } catch (error) {
      setErrorMessageRegister(error.message);
    }
  };

  // login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      redirectTo("/", { replace: true });
    } catch (error) {
      setErrorMessageLogin(error.message);
    }
  };

  // check status
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  // logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getFirebaseUser = useCallback(async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === user.uid) {
        setFirebaseUsername(doc.data().username);
      }
    });
  }, [user, setFirebaseUsername]);

  useEffect(() => {
    if (user?.uid) {
      getFirebaseUser();
    }
  }, [user, getFirebaseUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userName,
        setUserName,
        login,
        logout,
        register,
        errorMessageRegister,
        errorMessageLogin,
        firebaseUsername,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
