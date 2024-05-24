import { ArrowLeft } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Label } from "@ui/Label";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Background } from "./Background.jsx";

export function FormClasses() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)


  const classFormSchema = z.object({
    nombreClase: z.string().min(6, "Mínimo 6 caracteres (nombreClase)"),
    imagenClase: z.string().url("Debe ser una URL válida (imagen Clase)"),
    videoNombre: z.string().min(6, "Mínimo 6 caracteres (videoNombre)"),
    videoContenido: z.string().url("Debe ser una URL válida (video Contenido)"),
        archivoLink: z.string().url("Debe ser una URL válida (archivoLink)")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(classFormSchema) });

  const handleSubmitData = async (data) => {

    const {nombreClase, imagenClase, videoNombre, videoContenido, archivoLink}= data
    try {
      const claseResponse = await axios.post("http://localhost:1234/profesor/clases", {
        nombreClase: nombreClase,
        imagenClase: imagenClase,
        idCurso: parseInt(id),
        videoNombre: videoNombre,
        videoContenido: videoContenido,
        recursoArchivoLink: archivoLink
      });

      console.log(claseResponse);
      alert("Clase, video y recurso creados exitosamente.");
      navigate(`/clases/${id}`);
    } catch (error) {
      console.error(error);
      alert("Error al crear la clase, video o recurso. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Clase</title>
      </Helmet>
      <Background />

      <div className="min-h-screen flex items-center justify-center overflow-y-hidden">
        <main className="flex flex-col place-items-center">
          <div className="shadow-2xl p-6 rounded-lg bg-background w-11/12 sm:w-[450px]">
            <div className="icon flex items-center justify-center">
              <img
                className="h-20, w-20 select-none"
                src="/edukids-logo.svg"
                alt="Edu kids logo"
              />
              <h1 className="font-semibold text-primary">EduKids</h1>
            </div>

            <div className="flex items-center justify-between w-full">
              <h2 className="font-bold my-7 text-base sm:text-lg text-primary">
                Crear Clase
              </h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer">
                <Link className="text-primary" to="/home">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div>
                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="nombreClase"
                    className="text-tertiary text-primary"
                  >
                    Nombre de la Clase
                  </Label>
                  <Input
                    id="nombreClase"
                    type="text"
                    placeholder="Nombre de la clase"
                    {...register("nombreClase")}
                  />
                  <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.nombreClase && (
                      <span className="text-red-500 text-sm">
                        {errors.nombreClase.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="imagenClase"
                    className="text-tertiary text-primary"
                  >
                    Imagen de la Clase
                  </Label>
                  <Input
                    id="imagenClase"
                    type="text"
                    placeholder="URL de la imagen"
                    {...register("imagenClase")}
                  />
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.imagenClase && (
                      <span className="text-red-500 text-sm">
                        {errors.imagenClase.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="videoNombre"
                    className="text-tertiary text-primary"
                  >
                    Nombre del Video
                  </Label>
                  <Input
                    id="videoNombre"
                    type="text"
                    placeholder="Nombre del video"
                    {...register("videoNombre")}
                  />
                 
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.videoNombre && (
                      <span className="text-red-500 text-sm">
                        {errors.videoNombre.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="videoContenido"
                    className="text-tertiary text-primary"
                  >
                    Contenido del Video
                  </Label>
                  <Input
                    id="videoContenido"
                    type="text"
                    placeholder="Contenido del video"
                    {...register("videoContenido")}
                  />
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.videoContenido && (
                      <span className="text-red-500 text-sm">
                        {errors.videoContenido.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="archivoLink"
                    className="text-tertiary text-primary"
                  >
                    Archivo del Recurso
                  </Label>
                  <Input
                    id="archivoLink"
                    type="text"
                    placeholder="URL del archivo"
                    {...register("archivoLink")}
                  />
                  <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.archivoLink && (
                      <span className="text-red-500 text-sm">
                        {errors.archivoLink.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                className="my-4 py-3 px-6 w-full"
              >
                Crear
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
