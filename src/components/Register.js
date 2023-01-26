import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const redirectTo = useNavigate();

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
      <h2>Sich anmelden</h2>
      <p>
        Dies ist eine Demo-App. Du kannst dich mit falschen Anmeldeinformationen
        anmelden.
      </p>
      <div className="register-form">
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
          Bereits angemeldet? <Link to="/login">Zum&nbsp;Einloggen</Link>.
        </p>
      </div>
    </>
  );
};

export default Register;
