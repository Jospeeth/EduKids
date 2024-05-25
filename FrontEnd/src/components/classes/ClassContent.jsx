import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Background } from "../landingPage/Background";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ClassContent = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [clases, setClases] = useState([]);
  const [video, setVideo] = useState(null);
  const [recurso, setRecurso] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1234/profesor/clases/curso/${id}`
        );
        const data = response.data.classes;
        setClases(data.clase);

        const videoData = data.video[0]; 
        setVideo(videoData);    
        const recursoData = data.recurso[0];
        setRecurso(recursoData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClases();
  }, [id]);

  return (
    <>
      <Background />
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Hola, {`${user.nombre} ${user.apellido}`}
          </h1>
          <div>
            <Link
              className="text-primary-foreground gap-x-4 p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer"
              to="/home/"
            >
              Volver a cursos
              <ArrowLeft className="h-5 w-5 text-primary-foreground" />
            </Link>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center m-auto">
        {video && (
          <div className="container mx-auto mt-8 space-y-10 flex flex-col items-center">
            <h2 className="text-primary text-4xl font-semibold">Video: {video.nombre}</h2>

            <div className="w-full aspect-w-16 aspect-h-9">
              <iframe
                title="Video"
                width="900"
                height="500"
                src={`https://www.youtube.com/embed/${video.contenido.split("/").pop()}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mx-auto"
              ></iframe>
            </div>
          </div>
        )}

        {recurso && (
          <div className="container mx-auto mt-4 flex flex-col items-center">
            <h2>Aquí tienes material adicional para este tema</h2>
            <a
              href={recurso.archivo_link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Ver recurso
            </a>
          </div>
        )}
      </section>
    </>
  );
};

export default ClassContent;
