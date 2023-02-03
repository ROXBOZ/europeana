import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <Link to="/" className="logo">
        Berlin&nbsp;SO36
      </Link>
      <nav>
        {!user ? null : (
          <NavLink className="nav-link" to="konto">
            Mein Konto
          </NavLink>
        )}
        <NavLink className="nav-button" to={!user ? "login" : "logout"}>
          {!user ? "einloggen" : "ausloggen"}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
