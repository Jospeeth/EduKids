import { profesorModel } from "../models/ProfesorModel.js";

export class ProfesorController {
    static async signUp(req, res) {
        const result = req.body;
        try {
            const profesorExist = await profesorModel.signUp({ input: result });

            if (profesorExist) {
                return res.status(409).json({
                    status: "409",
                    message: "Profesor already exist",
                });
            }

            return res.status(201).json({
                status: "201",
                message: "Profesor Created",
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
            });
        }
    }


    static async login(req, res) {
        const result = req.body;

        try {
            const profesor = await profesorModel.login({ input: result });

            if (profesor) {
                return res.status(200).json({
                    status: "200",
                    message: "Login successful",
                    data: profesor
                });
            }
            // if(!profesor) {
            //     return res.status(404).json({
            //     status: "404",
            //     message: ""
            // })
            // }
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
        const result = req.body

        const course = await profesorModel.createCourse({ input: result })


        try {
            if (typeof course === 'object') {
                return res.status(201).json({
                    status: "201",
                    message: "course created"
                });
            }
            return res.status(409).json({
                status: "409",
                message: course
            });

        } catch (status) {
            return res.status(500).json({
                status: "500",
                message: "Internal Server Error",
            });
        }


    }

    static async signUpStudent(req, res) {
        const result = req.body;

        try {
            const student = await profesorModel.signUpStudent({ input: result });

            if (typeof student === 'object') {
                return res.status(201).json({
                    status: "201",
                    message: "Student created"
                });
            }
            res.status(409).json({
                status: "409",
                message: 'Already exists a students with this email',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error to sign up student',
            });
        }
    }

    static async getCourses(req, res) {
        const { id } = req.params;

        try {
            const courses = await profesorModel.getCourses({ id });

            if (courses.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Profesor Courses Successfully Obtained',
                    courses: courses,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'The Profesor has no related courses',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
            });
        }
    }

    static async createClassInCourse(req, res) {
        const result = req.body;

        try {
            const resultClass = await profesorModel.createClassInCourse({ input: result });

            if (resultClass.existingClase.length > 0) {
                return res.status(409).json({
                    status: 409,
                    message: `It seems that the class already exists in the course.`
                });
            } else {
                return res.status(201).json({
                    status: 201,
                    message: 'Class created',
                    class: resultClass
                });
            }
        } catch (error) {
            console.error('Error creating class:', error); 
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }

    static async getClassesByCourse(req, res) {
        const { idCurso } = req.params;

        try {
            const classes = await profesorModel.getClassesByCourse({ idCurso });

            return res.status(200).json({
                status: 200,
                message: 'Classes obtained',
                classes: classes
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }


    
    static async getClassByCourse(req, res) {
        const { idClase } = req.params;
    
        try {
            const classResponse = await profesorModel.getClassByCourse({ idClass: idClase });
    
            return res.status(200).json({
                status: 200,
                message: 'Class obtained',
                classes: classResponse
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
             
            });
        }
    }
    

    static async getStudentsByCourse(req, res) {
        const { idCurso } = req.params;

        try {
            const students = await profesorModel.getStudentsByCourse({ idCurso });

            return res.status(200).json({
                status: 200,
                message: 'Students obtained',
                students: students
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }

    static async insertActividad(req, res) {
        const result = req.body;

        try {
            const actividad = await profesorModel.insertActividad({ input: result });

            return res.status(201).json({
                status: 201,
                message: 'Actividad inserted',
                actividad: actividad
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }


    static async getActividadesByClass(req, res) {
        const { idClase } = req.params;
        try {
            const actividades = await profesorModel.getActividadesByClass(idClase);
            return res.status(200).json({
                status: 200,
                message: 'Actividades found',
                data: actividades
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }

}