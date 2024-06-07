import express, { json } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { routersProfesor } from './routes/routesProfesor.js';
import { routersStudent } from './routes/routesStudent.js';
import { corsMiddleware } from './middlewares/cors.js';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const frontend = path.resolve(__dirname, '../../FrontEnd/dist'); // Ruta al directorio 'dist'

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());

app.use('/profesor', routersProfesor);
app.use('/estudiante', routersStudent);

app.use(express.static(frontend));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontend, 'index.html')); // Asegúrate de que el archivo index.html esté en 'dist'
});

const port = process.env.PORT ?? 1234;

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
