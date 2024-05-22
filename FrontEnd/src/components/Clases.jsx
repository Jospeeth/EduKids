import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Background } from "./Background";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/Card";
import { Button } from "@ui/Button";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const Clases = () => {
    const { state } = useContext(AuthContext);
    const { user } = state;
  const [clases, setClases] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const clasesResponse = await axios.get(
          `http://localhost:1234/profesor/clases/curso/${id}`
        );
        setClases(clasesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClases();
  }, []);

  return (
    <>
      <Background />
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hola, {`${user.nombre} ${ user.apellido}`}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mis Clases</h1>

          <Button className="bg-primary" size="sm">
            <Link to={`/agregarclase/${id}`}>Agregar Clase</Link>
          </Button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases && clases.length > 0 ? (
            clases.map((clase) => (
              <li key={clase.idClase} className="flex cursor-pointer">
                <Card className="flex flex-col h-[220px] flex-grow">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      {clase.nombreClase}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-gray-500 flex-grow">
                      {clase.imagenClase}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-500">{clase.descripcion}</span>
                      <div className="flex gap-2">
                        <Button
                          className="bg-primary text-white hover:scale-105 transition-all duration-500  "
                          size="sm"
                        >
                          Agregar Recurso
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No hay clases</li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Clases;
