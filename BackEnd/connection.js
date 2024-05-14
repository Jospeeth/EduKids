import mysql from 'mysql2/promise';
import dotenv  from "dotenv"

dotenv.config()

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

export const connection = mysql.createConnection(config)


connection.then((pool) => {
    console.log("Conectado a la base de datos");
}).catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
});
