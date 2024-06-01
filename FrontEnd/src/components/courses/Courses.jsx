import {useEffect, useState } from "react";
import axios from "axios";
import { Background } from "../landingPage/Background";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/Card";
import { Button } from "@ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { isStudent, user,className } from "../../lib/utils";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (isStudent) {
          const coursesResponse = await axios.get(
            `http://localhost:1234/estudiante/cursos/${user.idestudiantes}`
          );
          setCourses(coursesResponse.data.courses);
          return;
        }
        const coursesResponse = await axios.get(
          `http://localhost:1234/profesor/cursos/${user.idprofesos}`
        );
        setCourses(coursesResponse.data.courses);
      } catch (error) {
        if (error.response.status === 404) {
          return;
        }
      }
    };
    fetchCourses();
  }, []);

  const getClases = (id) => {
    navigate(`/clases/${id}`);
  };
  const handleAddStudentClick = (id, event) => {
    event.stopPropagation();
    navigate("/signup", { state: { isStudent: true, courseId: id } });
  };
  return (
    <>
      <Background />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mis Cursos</h1>

          <Button className={`bg-primary ${className}`} size="sm">
            <Link to="/crearcurso">Agregar Curso</Link>
          </Button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <li
                key={course.idcursos}
                className="flex cursor-pointer"
                onClick={() => getClases(course.idcursos)}
              >
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
                        { 
                        isStudent
                        ? (
                          <Button
                            className="bg-primary"
                            size="sm"
                            onClick={(event) => getClases(course.idcursos, event)}
                          >
                            Ver Clases
                          </Button>
                          
                        ) : (
                          <Button
                            className="bg-primary"
                            size="sm"
                            onClick={(event) => handleAddStudentClick(course.idcursos, event)}
                          >
                            Agregar Estudiante
                          </Button>
                        )
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No hay Cursos</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Courses;
