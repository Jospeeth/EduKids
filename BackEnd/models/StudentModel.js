import connection from '../connection.js'


export class StudentModel {

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

    static async getCourses({ id }) {
        try {
            const [courses] = await connection.query(
                `SELECT c.idcursos, c.titulo, c.id_grado
                FROM cursos c
                JOIN (
                    SELECT id_cursos
                    FROM estudiantes_x_cursos
                    WHERE id_estudiantes = ?
                ) ec ON c.idcursos = ec.id_cursos;                
                `,
                [id]
            );

            return courses;
        } catch (error) {
            throw error;
        }
    }


    static async getClassesByCourse({ idCurso }) {
        try {
            const [classes] = await connection.query(
                'SELECT * FROM clases WHERE cursos_idcursos = ?',
                [idCurso]
            );


            return classes
        } catch (error) {
            throw error;
        }
    }

    static async getClass({ idClase }) {
        try {
            const [classResponse] = await connection.query(
                `SELECT 
                c.nombre_clase, 
                c.imagen_clase, 
                c.idclases, 
                v.nombre AS video_nombre, 
                v.contenido AS video_contenido,
                r.archivo_link AS recurso_link
            FROM 
                clases c
            LEFT JOIN recursos r ON r.id_clases = c.idclases
            LEFT JOIN videos v ON v.id_clases = c.idclases
            WHERE 
                c.idclases = ?;
            `,
                [idClase]
            );
    
            return classResponse;
        } catch (error) {
            throw error;
        }
    }

}