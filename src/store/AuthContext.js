import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState("stranger");
  const redirectTo = useNavigate();
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const [errorMessageLogin, setErrorMessageLogin] = useState("");

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
      redirectTo("/");
      setDoc(doc(db, "users", user.uid), {
        username: userName,
      });
    } catch (error) {
      setErrorMessageRegister(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      setUser(userCredential.user);
      redirectTo("/");
    } catch (error) {
      setErrorMessageLogin(error.message);
    }
  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        console.log("user logged in");
        setUser(user);
      } else {
        console.log("user NOT loged in");
        setUser(null);
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
