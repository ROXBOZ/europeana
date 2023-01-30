import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, setUserName, errorMessageRegister } =
    useContext(AuthContext);
  const redirectTo = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <>
      <h2>Registrieren</h2>
      <p>Dies ist eine Demo-App. Du kannst mit falschen Daten einloggen.</p>
      {errorMessageRegister?.includes("email-already-in-use") && (
        <p className="alert">
          Du hast bereits ein Konto. <Link to="/login">Zum&nbsp;Anmelden</Link>
        </p>
      )}
      <div className="register-form">
        <div className="username-container">
          <label htmlFor="username">Benutzername</label>
          <input
            onChange={handleUserNameChange}
            type="username"
            name="username"
            id="username"
          />
        </div>
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          className="big-button"
          disabled={
            password.length < 6 || !email.includes("@") || !email.includes(".")
              ? true
              : false
          }
          onClick={handleRegister}
        >
          sich anmelden
        </button>
        <p>
          Schon angemeldet? <Link to="/login">Zum&nbsp;Anmelden</Link>.
        </p>
      </div>
    </>
  );
};

export default Register;
