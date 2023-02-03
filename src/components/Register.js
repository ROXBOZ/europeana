import React, { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, setUserName, errorMessageRegister } =
    useContext(AuthContext);

  // inputting name
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  // inputting email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // inputting password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // register
  const handleRegister = () => {
    register(email, password);
  };

  // also work on enter keydown
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register(email, password);
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
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
          className="full-width-button"
          onClick={handleRegister}
          disabled={
            password.length < 6 || !email.includes("@") || !email.includes(".")
              ? true
              : false
          }
        >
          sich anmelden
        </button>
        <p>
          Schon angemeldet? <Link to="/login">Zum&nbsp;Anmelden</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
