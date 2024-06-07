import express, { json } from 'express';
import path from 'path';
import { routersProfesor } from './routes/routesProfesor.js';
import { routersStudent } from './routes/routesStudent.js';
import { corsMiddleware } from './middlewares/cors.js';


const app = express();
const frontend = path.resolve(__dirname, '../../FrontEnd/dist');

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());
app.use(express.urlencoded({ extended: true }));

app.use('/profesor', routersProfesor);
app.use('/estudiante', routersStudent);

app.use(express.static(frontend));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontend, 'index.html'));
});

const port = process.env.PORT ?? 1234;

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
