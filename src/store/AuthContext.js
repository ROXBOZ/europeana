import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");
  const redirectTo = useNavigate();

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(userCredential.user);
    } catch (error) {
      console.log("error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // const [isModalVisible, setIsModalVisible] = useState(true);
      if (errorMessage.includes("email-already-in-use")) {
        return alert("hello");
        // <>
        //   <div className="modal">
        //     <div className="modal-content">
        //       <button
        //         className="close-modal"
        //         onClick={() => {
        //           setIsModalVisible(false);
        //         }}
        //       >
        //         <span className="close-icon">&times;</span>{" "}
        //         <span className="close-text">close</span>
        //       </button>

        //       <div className="modal-content-text">
        //         <p>Bereits verwendetes Passwort</p>
        //       </div>
        //     </div>
        //   </div>
        // </>
      }
    }
  };

  const login = () => {
    setUser({
      userName: "Monique",
    });
    console.log("logged in");
  };

  const logout = () => {
    setUser("");
    redirectTo("/");
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};
