import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "SIGNOUT" });
    localStorage.removeItem("user");
  };
  
  const { user } = state;

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    dispatch({ type: "SIGNOUT" });
    navigate("/");
    handleLogout();
  };

  return (
    <>
      <h1>Hola ya estás dentro</h1>
      <span>{user.apellido}</span>
      <Button onClick={handleLogoutClick}>Cerrar sesión</Button>
    </>
  );
};

export default Home;
