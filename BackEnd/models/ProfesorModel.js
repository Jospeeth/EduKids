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
            console.error('Error al registrar profesor:', error);
            throw error;
        }
    }



    static async login({input}) {
        const { correo, clave } = input;
        try {
            const [profesor] = await connection.query(
                'SELECT * FROM profesores WHERE correo = ? AND clave = ?',
                [correo, clave]
            );
            return profesor;
        } catch (error) {
            console.error('Error al iniciar sesión en el modelo:', error);
            throw error;
        }
    }
}
