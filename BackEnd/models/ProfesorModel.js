import connection from '../connection.js'

export class profesorModel {

    static async signUp({ input }) {
        const { nombre, apellido, correo, clave, sexo, fecha_nac, celular } = input;

        try {
            const [profesor] = await connection.query(
                'SELECT * FROM profesores WHERE correo = ?',
                [correo]
            );
            if (profesor.length === 0) {
                await connection.query(
                    'INSERT INTO profesores (nombre, apellido, correo, clave, sexo, fecha_nac, celular) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [nombre, apellido, correo, clave, sexo, fecha_nac, celular]
                );
            } else {
                return profesor[0];
            }
        } catch (error) {
            throw error;
        }
    }



    static async login({ correo, clave }) {

        try {
            const [profesor] = await connection.query(
                'SELECT * FROM profesores WHERE correo = ? AND clave = ?',
                [correo, clave]

            );
            return profesor[0]

        } catch (error) {
            throw error;
        }
    }
    static async createCourse({ titulo, id_profesor, grado }) {
        const fechaActual = new Date(Date.now()).toISOString();

        try {
            // Verificar si el grado ya existe
            const [existingGrado] = await connection.query(
                'SELECT idgrado FROM grado WHERE grado=?',
                [grado]
            );
            const [existingCurso] = await connection.query(
                'SELECT idcursos FROM cursos WHERE titulo=?',
                [titulo]
            )

            let gradoID;
            if (existingCurso.length > 0) {
                return `It seems that the course "${titulo}" already exists`;
            }
            if (existingGrado.length > 0) {
                gradoID = existingGrado[0].idgrado;
            } else {
                // Si no existe, insertar el grado y obtener su ID
                const [insertGradoResult] = await connection.query(
                    'INSERT INTO grado (grado) VALUES (?)',
                    [grado]
                );
                gradoID = insertGradoResult.insertId;
            }

            // Insertar el curso
            const [cursoResult] = await connection.query(
                'INSERT INTO cursos (titulo, fecha_publicacion, id_profesor, id_grado) VALUES (?, ?, ?, ?)',
                [titulo, fechaActual, id_profesor, gradoID]
            );

            return cursoResult;
        } catch (error) {
            throw error;
        }
    }
    static async signUpStudent({ nombre, apellido, correo, clave, fecha_nac, sexo, celular, idCurso }) {
        try {
            const [existingStudent] = await connection.query(
                'SELECT correo FROM estudiantes WHERE correo=?',
                [correo]
            );
            if (existingStudent.length > 0) {
                return `It seems that a student use this email: ${existingStudent[0].correo}.`;
            }


            const [student] = await connection.query(
                'INSERT INTO estudiantes (nombre, apellido, correo, clave, fecha_nac, sexo, celular) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nombre, apellido, correo, clave, fecha_nac, sexo, celular]
            );

            const [studentId] = await connection.query(
                'SELECT idestudiantes FROM estudiantes WHERE correo=?',
                [correo]
            );

            if (!studentId || !studentId.length) {
                throw new Error('No se pudo obtener el ID del estudiante recién registrado.');
            }

            await connection.query(
                'INSERT INTO estudiantes_x_cursos(id_estudiantes, id_cursos ) VALUES (?,?)',
                [studentId[0].idestudiantes, idCurso]
            );

            const [studentInfo] = await connection.query(
                'SELECT * FROM estudiantes WHERE idestudiantes = ?',
                [student.insertId]
            );

            return studentInfo;
        } catch (error) {
            throw error;
        }
    }

    static async getCourses({ id }) {
        try {
            const [courses] = await connection.query(
                'SELECT titulo, fecha_publicacion,id_grado FROM cursos WHERE id_profesor = ?',
                [id]
            );
    
            return courses;
        } catch (error) {
            throw error;
        }
    }
    


}
