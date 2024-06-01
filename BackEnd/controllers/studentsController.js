import { StudentModel } from "../models/StudentModel.js";
export class StudentsController {


    static async login(req, res) {
        const result = req.body


        try {
            const student = await StudentModel.login({ input: result })

            if (student) {
                return res.status(200).json({
                    status: "200",
                    message: "Login successful",
                    data: student
                });
            }

            return res.status(401).json({
                status: "401",
                message: "Invalid email or password"
            });
        } catch (error) {
            throw error
        }
    }

    static async getCourses(req, res) {
        const { id } = req.params;
        try {
            const studentCourses = await StudentModel.getCourses({ id })

            if (studentCourses.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Student Courses Successfully Obtained',
                    courses: studentCourses
                })

            }

            return res.status(404).json({
                status: 404,
                message: 'Student Courses Not Found'
            })

        } catch (error) {
            throw error
        }
    }

    static async getClassesByCourse(req, res){

        const { idCurso } = req.params;
        try{

            const classes = await StudentModel.getClassesByCourse({ idCurso })

            if(classes.length > 0){

                return res.status(200).json({
                    status: 200,
                    message: 'Classes obtained',
                    classes: classes
                })

            }

            return res.status(404).json({
                status: 404,
                message: 'Classes not found'
            })

        } catch(error){
            throw error

        }
    }
    static async getClass(req, res){

        const { idClase } = req.params;

        try {
            const classResponse= await StudentModel.getClass({idClase})

            if(classResponse){

                return res.status(200).json({
                    status: 200,
                    message: 'Class obtained',
                    class: classResponse
                })

            }

            return res.status(404).json({
                status: 404,
                message: 'Class not found'
            })
            
        } catch (error) {
            
        }
    }
}