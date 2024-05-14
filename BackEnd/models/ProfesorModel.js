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
    
            let gradoID;
            if (existingGrado.length > 0) {
                gradoID = existingGrado[0].idgrado;
            } else {
                // Si no existe, insertar el grado y obtener su ID
                const [insertGradoResult] = await connection.query(
                    'INSERT INTO grado (grado) VALUES (?)',
                    [grado]
                );
                gradoID = insertGradoResult.insertId;
                console.log('Grado ID:', gradoID);
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
    
    
    
    

}
