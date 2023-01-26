import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const redirectTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password);
    redirectTo("/ ");
  };

  return (
    <>
      <h2>Einloggen</h2>
      <p>
        Dies ist eine Demo-App. Du kannst mit falschen Anmeldeinformationen
        einloggen.
      </p>
      <div className="login-form">
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
          onClick={handleLogin}
        >
          sich anmelden
        </button>
        <p>
          Nicht angemeldet? <Link to="/register">Zum&nbsp;Anmelden</Link>.
        </p>
      </div>
    </>
  );
};

export default Login;

// import React from "react";

// const Login = () => {
//   const handleInput = (e) => {
//     console.log(e.target.value);
//   };
//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <p>
//         <div className="login-container">
//           <label for="login-name">Name</label>
//           <input onChange={handleInput} id="login-name" type="text" />
//         </div>
//         <div className="login-container">
//           <label for="login-email">Email</label>
//           <input onChange={handleInput} id="login-email" type="text" />
//         </div>
//         <button>Senden</button>
//       </p>
//     </div>
//   );
// };

// export default Login;
