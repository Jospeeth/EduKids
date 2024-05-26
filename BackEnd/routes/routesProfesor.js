import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController.js";

export const routersProfesor = Router();



routersProfesor.post("/registrarse", ProfesorController.signUp);
routersProfesor.post("/iniciarsesion", ProfesorController.login);
routersProfesor.post("/crear/curso", ProfesorController.createCourse);
routersProfesor.post("/registrar/estudiante", ProfesorController.signUpStudent);
routersProfesor.post("/clases", ProfesorController.createClassInCourse);
routersProfesor.post("/actividades", ProfesorController.insertActividad);

routersProfesor.get("/clase/:idClase", ProfesorController.getClassByCourse);
routersProfesor.get("/cursos/estudiantes/:idCurso", ProfesorController.getStudentsByCourse);
routersProfesor.get("/cursos/:id", ProfesorController.getCourses);
routersProfesor.get("/clases/curso/:idCurso", ProfesorController.getClassesByCourse);
routersProfesor.get("/actividades/:idClase", ProfesorController.getActividadesByClass);






