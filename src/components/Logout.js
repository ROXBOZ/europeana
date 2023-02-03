import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const redirectTo = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectTo("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [redirectTo]);

  return (
    <div>
      <h2>Du warst erfolgreich ausgeloggt</h2>
      <p>Du wirst zur Startseite umgeleitet werden.</p>
    </div>
  );
};

export default Logout;
