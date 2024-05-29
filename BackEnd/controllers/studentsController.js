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

            return res.status(500).json({
                status: "500",
                message: "Internal server error"
            });
        }
    }
}