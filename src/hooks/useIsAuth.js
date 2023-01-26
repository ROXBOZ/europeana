import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const useIsAuth = () => {
  const { user } = useContext(AuthContext);
  const isUserAuthenticated = user !== "" ? true : false;
  return isUserAuthenticated();
};

export default useIsAuth;
