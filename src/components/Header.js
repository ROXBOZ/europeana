import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink className="nav-link" to="/">
          Berlin&nbsp;SO36
        </NavLink>
        <NavLink className="nav-link" to="about">
          About
        </NavLink>
        <NavLink className="nav-link login-nav-link" to="login">
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
