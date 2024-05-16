import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController.js";

export const routersProfesor = Router();



routersProfesor.post("/registrarse", ProfesorController.signUp);
routersProfesor.post("/iniciarsesion", ProfesorController.login);
routersProfesor.post("/crear/curso", ProfesorController.createCourse);
routersProfesor.post("/registrar/estudiante", ProfesorController.signUpStudent);
routersProfesor.post("/clases", ProfesorController.createClassInCourse);
routersProfesor.post("/videos", ProfesorController.insertVideo);
routersProfesor.post("/recursos", ProfesorController.insertRecurso);
routersProfesor.post("/actividades", ProfesorController.insertActividad);


routersProfesor.get("/cursos/estudiantes/:idCurso", ProfesorController.getStudentsByCourse);
routersProfesor.get("/cursos/:id", ProfesorController.getCourses);
routersProfesor.get("/clases/curso/:idCurso", ProfesorController.getClassesByCourse);
routersProfesor.get("/videos/:idClase", ProfesorController.getVideosByClass);
routersProfesor.get("/recursos/:idClase", ProfesorController.getRecursosByClass);
routersProfesor.get("/actividades/:idClase", ProfesorController.getActividadesByClass);






