import React from "react";

const Login = () => {
  return (
    <div className="login-page">
      <h2>Sign Up / Log In</h2>
      <p>
        <div className="login-container">
          <label for="login-name">Name</label>
          <input id="login-name" type="text" />
        </div>
        <div className="login-container">
          <label for="login-email">Email</label>
          <input id="login-email" type="text" />
        </div>
        <button>Senden</button>
      </p>
    </div>
  );
};

export default Login;
