import connection from '../connection.js'

export class profesorModel {

    static async signUp({ input }) {
        const { nombre, apellido, correo, clave, celular } = input;

        try {
            const [profesor] = await connection.query(
                'SELECT * FROM profesores WHERE correo = ?',
                [correo]
            );
            if (profesor.length === 0) {
                await connection.query(
                    'INSERT INTO profesores (nombre, apellido, correo, clave, celular) VALUES (?, ?, ?, ?, ?)',
                    [nombre, apellido, correo, clave, celular]
                );
            } else {
                return profesor[0];
            }
        } catch (error) {
            throw error;
        }
    }



    static async login({ input }) {
        const { correo, clave } = input;


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
    static async createCourse({ input }) {
        const { titulo, idProfesor, grado, description } = input;
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
            );

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
                'INSERT INTO cursos (titulo, fecha_publicacion, id_profesor, id_grado, description) VALUES (?, ?, ?, ?, ?)',
                [titulo, fechaActual, idProfesor, gradoID, description]
            );

            return cursoResult;
        } catch (error) {
            throw error;
        }
    }

    static async signUpStudent({ input }) {
        const { nombre, apellido, correo, clave, celular, idCurso } = input
        try {
            const [existingStudent] = await connection.query(
                'SELECT correo FROM estudiantes WHERE correo=?',
                [correo]
            );
            if (existingStudent.length === 0) {

                const [student] = await connection.query(
                    'INSERT INTO estudiantes (nombre, apellido, correo, clave, celular) VALUES (?, ?, ?, ?, ?)',
                    [nombre, apellido, correo, clave, celular]
                );

                const [studentId] = await connection.query(
                    'SELECT idestudiantes FROM estudiantes WHERE correo=?',
                    [correo]
                );
                await connection.query(
                    'INSERT INTO estudiantes_x_cursos(id_estudiantes, id_cursos ) VALUES (?,?)',
                    [studentId[0].idestudiantes, idCurso]
                );

                const [studentInfo] = await connection.query(
                    'SELECT * FROM estudiantes WHERE idestudiantes = ?',
                    [student.insertId]

                );
                return studentInfo;
            }




        } catch (error) {
            throw error;
        }
    }

    static async getCourses({ id }) {
        try {
            const [courses] = await connection.query(
                'SELECT * FROM cursos WHERE id_profesor = ?',
                [id]
            );

            return courses;
        } catch (error) {
            throw error;
        }
    }

    static async createClassInCourse({ input }) {
        const { nombreClase, imagenClase, idCurso, videoNombre, videoContenido, recursoArchivoLink } = input;

        try {
            const [existingClase] = await connection.query(
                'SELECT * FROM clases WHERE nombre_clase = ? AND cursos_idcursos = ?',
                [nombreClase, idCurso]
            );

            if (existingClase.length > 0) {
                return { existingClase };
            } else {
                const [classCreated] = await connection.query(
                    'INSERT INTO clases (nombre_clase, imagen_clase, cursos_idcursos) VALUES (?, ?, ?)',
                    [nombreClase, imagenClase, idCurso]
                );

                const [classInfo] = await connection.query(
                    'SELECT * FROM clases WHERE idclases = ?',
                    [classCreated.insertId]
                );

                const [videoCreated] = await connection.query(
                    'INSERT INTO videos (nombre, contenido, id_clases) VALUES (?, ?, ?)',
                    [videoNombre, videoContenido, classCreated.insertId]
                );

                const [recursoCreated] = await connection.query(
                    'INSERT INTO recursos (archivo_link, id_clases) VALUES (?, ?)',
                    [recursoArchivoLink, classCreated.insertId]
                );

                return {
                    classInfo: classInfo[0],
                    videoInfo: {
                        id: videoCreated.insertId,
                        nombre: videoNombre,
                        contenido: videoContenido
                    },
                    recursoInfo: {
                        id: recursoCreated.insertId,
                        archivoLink: recursoArchivoLink
                    },
                    existingClase: []
                };
            }
        } catch (error) {
            console.error('Error in createClassInCourse model:', error); // Log the error for debugging
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


    static async getClassByCourse({ idClass }) {
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
           `, [idClass]

            )

            return classResponse
        } catch (error) {
            throw error;
        }
    }


    static async getStudentsByCourse({ idCurso }) {
        try {
            const [students] = await connection.query(
                'SELECT estudiantes.* FROM estudiantes JOIN estudiantes_x_cursos ON estudiantes.idestudiantes = estudiantes_x_cursos.id_estudiantes WHERE estudiantes_x_cursos.id_cursos = ?',
                [idCurso]
            );

            return students;
        } catch (error) {
            throw error;
        }
    }


    static async insertActividad({ input }) {
        const { mensaje, archivo, idClase } = input;

        try {
            const [result] = await connection.query(
                'INSERT INTO actividades (mensaje, archivo, id_clases) VALUES (?, ?, ?)',
                [mensaje, archivo, idClase]
            );

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getActividadesByClass(idClase) {
        try {
            const [actividades] = await connection.query(
                'SELECT * FROM actividades WHERE id_clases = ?',
                [idClase]
            );
            return actividades;
        } catch (error) {
            throw error;
        }
    }

}




