import connection from '../connection.js'

export class profesorModel {

    static async signUp({ input }) {
        const { nombre, apellido, correo, clave,celular } = input;

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
        const { nombre, apellido, correo, clave, fechaNac, sexo, celular, idCurso } = input
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
                [nombre, apellido, correo, clave, fechaNac, sexo, celular]
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
                'SELECT * FROM cursos WHERE id_profesor = ?',
                [id]
            );

            return courses;
        } catch (error) {
            throw error;
        }
    }

    static async createClassInCourse({ input }) {
        const { nombreClase, imagenClase, idCurso } = input
        try {
            const [existingClase] = await connection.query(
                'SELECT * FROM clases WHERE nombre_clase =?',
                [nombreClase]

            )

            if (existingClase.length > 0) {
                return `It seems that the class "${nombreClase}" already exists`;
            }
            else {
                const [classCreated] = await connection.query(
                    'INSERT INTO clases (nombre_clase, imagen_clase, cursos_idcursos) VALUES (?, ?, ?)',
                    [nombreClase, imagenClase, idCurso]
                );
                const [classInfo] = await connection.query(
                    'SELECT * FROM clases WHERE idclases  = ?',
                    [classCreated.insertId]
                );


                return classInfo;
            }

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

            return classes;
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
    static async insertVideo({ input }) {
        const { nombre, contenido, idClase } = input;

        try {
            const [result] = await connection.query(
                'INSERT INTO videos (nombre, contenido, id_clases) VALUES (?, ?, ?)',
                [nombre, contenido, idClase]
            );

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async insertRecurso({ input }) {
        const { archivoLink, idClase } = input;

        try {
            const [result] = await connection.query(
                'INSERT INTO recursos (archivo_link, id_clases) VALUES (?, ?)',
                [archivoLink, idClase]
            );

            return result;
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

    static async getVideosByClass(idClase) {
        try {
            const [videos] = await connection.query(
                'SELECT * FROM videos WHERE id_clases = ?',
                [idClase]
            );
            return videos;
        } catch (error) {
            throw error;
        }
    }
    static async getRecursosByClass(idClase) {
        try {
            const [recursos] = await connection.query(
                'SELECT * FROM recursos WHERE id_clases = ?',
                [idClase]
            );
            return recursos;
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




