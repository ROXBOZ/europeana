import React from "react";

const Login = () => {
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="login-page">
      <h2>Login</h2>
      <p>
        <div className="login-container">
          <label for="login-name">Name</label>
          <input onChange={handleInput} id="login-name" type="text" />
        </div>
        <div className="login-container">
          <label for="login-email">Email</label>
          <input onChange={handleInput} id="login-email" type="text" />
        </div>
        <button>Senden</button>
      </p>
    </div>
  );
};

export default Login;
