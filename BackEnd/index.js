import express from 'express';
import { json, urlencoded } from 'express';
import { routersProfesor } from './routes/routesProfesor.js';
import { routersStudent } from './routes/routesStudent.js';
import { corsMiddleware } from './middlewares/cors.js';
import path from 'path';

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());
app.use(urlencoded({ extended: true }));

app.use('/profesor', routersProfesor);
app.use('/estudiante', routersStudent);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT ?? 1234;

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
