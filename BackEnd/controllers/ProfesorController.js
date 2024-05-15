import { profesorModel } from "../models/ProfesorModel.js";

export class ProfesorController {
    static async signUp(req, res) {
        const result = req.body;
        try {
            const profesorExist = await profesorModel.signUp({ input: result });

            if (profesorExist) {
                return res.status(409).json({
                    status: "409",
                    message: "Profesor already exists",

                })
            }
            return res.status(201).json({
                status: "201",
                message: "Profesor created",
            });


        } catch (status) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
            });

        }
    }

    static async login(req, res) {
        const { correo, clave } = req.body;

        try {
            const profesor = await profesorModel.login({ correo, clave });

            if (profesor) {
                return res.status(200).json({
                    status: "200",
                    message: "Login successful",
                    data: profesor
                });
            }
            return res.status(401).json({
                status: "401",
                message: "Invalid email or password"
            });

        } catch (status) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
            });
        }
    }

    static async createCourse(req, res) {
        const { titulo, id_profesor, grado } = req.body

        const result = await profesorModel.createCourse({ titulo, id_profesor, grado })


        try {
            if (typeof result === 'object') {
                return res.status(201).json({
                    status: "201",
                    message: "Student created"
                });
            }
            return res.status(409).json({
                status: "409",
                message: result
            });

        } catch (status) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
            });
        }


    }

    static async signUpStudent(req, res) {
        const { nombre, apellido, correo, clave, fecha_nac, sexo, celular, idCurso} = req.body;
    
        try {
            const result = await profesorModel.signUpStudent({ nombre, apellido, correo, clave, fecha_nac, sexo, celular, idCurso });
            
            if (typeof result === 'object') {
                return res.status(201).json({
                    status: "201",
                    message: "Student created"
                });
            }
            res.status(409).json({
                status: 409,
                message: result,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al registrar estudiante',
                error: error.message
            });
        }
    }
    

}