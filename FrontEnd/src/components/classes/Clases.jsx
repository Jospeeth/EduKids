import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Background } from "../landingPage/Background";
import { Card, CardContent, CardTitle, CardFooter } from "@ui/Card";
import { Button } from "@ui/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Clases = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const navigate = useNavigate()
  const [clases, setClases] = useState([]);

  const { id } = useParams(); 

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const clasesResponse = await axios.get(
          `http://localhost:1234/profesor/clases/curso/${id}`
        );
        setClases(clasesResponse.data.classes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClases();
  }, [id])

  const getClassContent= (id) => {
    navigate(`/contenidoclase/${id}`);
  };

  return (
    <>
      <Background />
      <header className="bg-primary text-white p-4 flex justify-around">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Hola, {`${user.nombre} ${user.apellido}`}
          </h1>
          <div>
          <Link
            className="text-primary-foreground   gap-x-4 p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer"
            to="/home"
          >
            Volver a cursos
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </Link>
        </div>
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
              <li
                key={clase.idclases}
                className="flex cursor-pointer"
                onClick={() => getClassContent(clase.idclases)}
              >
                <Card className="flex flex-col h-[220px] flex-grow">
                  <CardContent className="flex place">
                    <div className="mt-2 flex justify-center">
                      <img
                        src={clase.imagen_clase}
                        alt=""
                        className="w-96 object-contain "
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CardTitle className="text-primary">
                      {clase.nombre_clase}
                    </CardTitle>
                  </CardFooter>
                </Card>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No hay Clases</li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Clases;
