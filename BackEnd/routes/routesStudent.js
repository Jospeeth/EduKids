import { Router } from "express";
import { StudentsController } from "../controllers/studentsController.js";

export const routersStudent = Router();

routersStudent.post("/iniciarsesion", StudentsController.login);
routersStudent.get("/cursos/:id", StudentsController.getCourses);
routersStudent.get("/clases/:idCurso", StudentsController.getClassesByCourse);

routersStudent.get("/clase/:idClase", StudentsController.getClass);





