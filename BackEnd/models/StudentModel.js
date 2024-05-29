import connection from '../connection.js'


export class StudentModel{

    static async login({ input }) {
        const { correo, clave } = input;


        try {
            const [student] = await connection.query(
                'SELECT * FROM estudiantes WHERE correo = ? AND clave = ?',
                [correo, clave]

            );
            console.log('student :>> ', student[0]);

            return student[0]


        } catch (error) {
            throw error;
        }
    }
}