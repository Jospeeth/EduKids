import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@ui/Button";
import { useNavigate } from "react-router-dom";
import Courses from "./Courses";
import { Link } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch({ type: "SIGNOUT" });
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <>
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hola, {`${user.nombre} ${ user.apellido}`}</h1>
          <Button className="border-2 hover:scale-110 transition-all duration-300" onClick={handleLogoutClick}>Cerrar sesión</Button>
        </div>
      </header>

      {/* <nav className="bg-gray-200 p-4">
        <div className="container mx-auto">
          <ul className="flex space-x-4">
         
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav> */}

      <div className="container mx-auto px-4 py-8">
       
        <Courses />
      </div>
    </>
  );
};

export default Home;
