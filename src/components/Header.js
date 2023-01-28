import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <Link to="/" className="logo">
        Berlin&nbsp;SO36
      </Link>
      <nav>
        {!user ? null : <NavLink to="konto">Mein Konto</NavLink>}
        <NavLink className="nav-link" to={!user ? "login" : "logout"}>
          {!user ? "einloggen" : "ausloggen"}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
