import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <header>
      <Link to="/" className="title">
        Berlin&nbsp;SO36
      </Link>
      <nav>
        <NavLink className="nav-link" to={!user ? "login" : "logout"}>
          {!user ? "einloggen" : "ausloggen"}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
