import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Background } from "./Background";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/Card";
import { Button } from "@ui/Button";
import { FormCourses } from "./FormCourses";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
///GET http://localhost:1234/profesor/cursos/1
///POST http://localhost:1234/profesor/crear/curso

const Courses = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await axios.get(
          `http://localhost:1234/profesor/cursos/${user.idprofesos}`
        );
        setCourses(coursesResponse.data.courses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Background></Background>

      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>

          <Button className="bg-primary" size="sm">
            <Link to="/crearcurso">Agregar Curso</Link>
          </Button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <li key={course.idcursos} className="flex">
                <Card className="flex flex-col h-[220px] flex-grow">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      {course.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-gray-500 flex-grow">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-500">
                        Enrolled: 120 students
                      </span>
                      <div className="flex gap-2">
                        <Button
                          className="bg-primary text-white hover:scale-105 transition-all duration-500  "
                          size="sm"
                        >
                          Agregar Alumno
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No courses</li>
          )}
        </ul>
      </div>

      <Routes>
        
        <Route path="/crearcurso" element={<FormCourses />} />
      </Routes>
    </>
  );
};

export default Courses;
