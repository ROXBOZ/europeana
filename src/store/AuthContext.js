import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");
  const redirectTo = useNavigate();

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
