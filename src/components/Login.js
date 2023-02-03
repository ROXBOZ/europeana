import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Context
import { AuthContext } from "../store/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errorMessageLogin } = useContext(AuthContext);
  const redirectTo = useNavigate();

  // inputting email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // inputting password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // login
  const handleLogin = () => {
    login(email, password);
    if (errorMessageLogin?.includes("wrong-password")) {
      redirectTo("/ ");
    }
  };

  // also works with enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login(email, password);
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
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
          className="full-width-button"
          onClick={handleLogin}
          disabled={
            password.length < 6 || !email.includes("@") || !email.includes(".")
              ? true
              : false
          }
        >
          einloggen
        </button>

        <p>
          Nicht registriert? <Link to="/register">Zur&nbsp;Registrierung</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
