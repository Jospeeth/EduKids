import { profesorModel } from "../models/ProfesorModel.js";

export class ProfesorController {
    static async signUp(req, res) {
        const result = req.body;
        const profesorExist = await profesorModel.signUp({ input: result });

        if (profesorExist) {
            return res.status(409).json({
                message: "profesor is already signed up",
           
            }) 
        } else {
            return res.status(201).json({
                error: "201",
                message: "profesor created",
            });
        }
    }

    static async login(req, res) {
        const { correo, clave } = req.body;
    
        try {
            const profesor = await profesorModel.login({ correo, clave });
    
            if (profesor) {
                return res.status(200).json({ profesor });
            } else {
                return res.status(404).json({
                    error: "profesor doesn't exist",
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }
    
}
