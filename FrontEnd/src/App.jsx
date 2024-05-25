import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  {FormCourses}  from "./components/courses/FormCourses";
import Clases from "./components/classes/Clases";
import  {FormClasses}  from "./components/classes/FormClases";
import ClassContent from "./components/classes/Clases";
import LandingPage from "./components/landingPage/LangingPage";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import UnauthorizedPage from "./components/UnauthorizedPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { state } = useContext(AuthContext);
  const { user } = state;

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/home/*" element={<Home />} />

            <Route path="/crearcurso" element={<FormCourses />} />
            <Route path="/clases/:id" element={<Clases />} />
            <Route path="/agregarclase/:id" element={<FormClasses />} />
            <Route path="/contenidoClase/:id" element={<ClassContent />} />
            <Route path="/signup" element={<SignUp />} />
            

          </>
        ) : (
          <Route path="*" element={<UnauthorizedPage to="/unauthorized" />} />
        )}

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
