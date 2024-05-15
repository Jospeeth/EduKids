import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController.js";

export const routersProfesor = Router();


routersProfesor.post("/signup", ProfesorController.signUp)
routersProfesor.post("/login", ProfesorController.login)
routersProfesor.post("/createcourse", ProfesorController.createCourse)
routersProfesor.post("/signupstudent", ProfesorController.signUpStudent)
routersProfesor.get("/coursesprofesor/:id", ProfesorController.getCourses)

//routersProfesor.post("/classescourse", ProfesorController.createClass)








