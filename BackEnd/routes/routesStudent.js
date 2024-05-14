import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController.js";

export const foodsRouter = Router();

foodsRouter.get("/", ProfesorController.getAll);

