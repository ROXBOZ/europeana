import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebaseConfig";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const redirectTo = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(userCredential.user);
      redirectTo("/");
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.includes("email-already-in-use")) {
        setShowModal(true);

        alert("already in use");
        return (
          <>
            {showModal && (
              <div id="myModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                  <p>Bereits verwendetes Passwort. Melde dich an.</p>
                </div>
              </div>
            )}
          </>
        );
      }
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(userCredential.user);
      redirectTo("/");
    } catch (error) {
      console.log("error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
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
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};
