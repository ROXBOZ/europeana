import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <NavLink className="nav-link" to="/">
          Berlin&nbsp;SO36
        </NavLink>
        <NavLink className="nav-link" to="about">
          About
        </NavLink>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </nav>
      {/* <Switch onChange={switchMode()} /> */}
    </header>
  );
};

export default Header;
