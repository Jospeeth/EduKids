import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Background } from "../landingPage/Background";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/Cards";
import { Button } from "@ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { domain } from "../../lib/utils.js";


const Courses = () => {
  const navigate = useNavigate();
  const { state, isStudent, className } = useContext(AuthContext);
  const { user } = state;
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState({});
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (isStudent) {
          const coursesResponse = await axios.get(
            `${domain}/estudiante/cursos/${user.idestudiantes}`
          );
          setCourses(coursesResponse.data.courses);
        } else {
          const coursesResponse = await axios.get(
            `${domain}/profesor/cursos/${user.idprofesos}`
          );
          setCourses(coursesResponse.data.courses);
        }
      } catch (error) {
        if (error.response.status === 404) {
          return;
        }
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const newStudents = {};
      for (const course of courses) {
        const response = await axios.get(
          `${domain}/profesor/cursos/estudiantes/${course.idcursos}`
        );
        newStudents[course.idcursos] = response.data.students[0].cantidad_estudiantes;
      }
      setStudents(newStudents);
    };    

    if (courses.length > 0) {
      fetchStudents();
    }
  }, [courses]);

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
                        {`Estudiantes Matriculados: ${
                          students[course.idcursos] || "0"
                        }`}
                      </span>

                      <div className="flex gap-2">
                        {isStudent ? (
                          <Button
                            className="bg-primary"
                            size="sm"
                            onClick={(event) =>
                              getClases(course.idcursos, event)
                            }
                          >
                            Ver Clases
                          </Button>
                        ) : (
                          <Button
                            className="bg-primary"
                            size="sm"
                            onClick={(event) =>
                              handleAddStudentClick(course.idcursos, event)
                            }
                          >
                            Agregar Estudiante
                          </Button>
                        )}
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
