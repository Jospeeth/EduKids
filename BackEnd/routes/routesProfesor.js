import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController.js";

export const routersProfesor = Router();


routersProfesor.post("/signup", ProfesorController.signUp)
routersProfesor.post("/login", ProfesorController.login)



