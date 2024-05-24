import  { useContext } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { FormCourses } from "./components/FormCourses";
import Clases from './components/Clases'; // Cambia esto
import { FormClasses } from "./components/FormClases";
import LandingPage from "./components/LangingPage";
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
          <Route
          path="/home/*"
          element={<Home/>}
        />
        
        
          <Route path="/crearcurso" element={<FormCourses />} />
          <Route path="/clases/:id" element={<Clases />} />
          <Route path="/agregarclase/:id" element={<FormClasses />} />
         
      
          
        </>
        
        ) : (
          <Route path="*" element={<UnauthorizedPage to="/unauthorized" />} />
        )}

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp isStudent={false} />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
