import express, { json } from "express";
import { routersProfesor } from "./routes/routesProfesor.js";
import { routersStudent } from "./routes/routesStudent.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

app.use("/profesor", routersProfesor);
//app.use("/student", routersStudent);

const port = process.env.PORT ?? 1234;

app.listen(port, () => {
  console.log(`Server listening on port:  http://localhost:${port}`);
});
