import { Router } from "express";
import { StudentsController } from "../controllers/studentsController.js";

export const routersStudent = Router();

routersStudent.post("/iniciarsesion", StudentsController.login);



