import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errorMessageLogin } = useContext(AuthContext);
  const redirectTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password);
    if (errorMessageLogin?.includes("wrong-password")) {
      redirectTo("/ ");
    }
  };

  console.log("errorMessageLogin :>> ", errorMessageLogin);
  return (
    <>
      <h2>Sich anmelden</h2>
      <p>Dies ist eine Demo-App. Du kannst mit falschen Daten einloggen.</p>
      {errorMessageLogin?.includes("wrong-password") && (
        <p className="alert">Falsches Passwort. Go Figure.</p>
      )}
      <div className="login-form">
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
            placeholder="Email Adresse"
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Passwort</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            placeholder="Passwort"
          />
        </div>
        <button
          className="big-button"
          disabled={
            password.length < 6 || !email.includes("@") || !email.includes(".")
              ? true
              : false
          }
          onClick={handleLogin}
        >
          einloggen
        </button>

        <p>
          Nicht registriert? <Link to="/register">Zur&nbsp;Registrierung</Link>.
        </p>
      </div>
    </>
  );
};

export default Login;
