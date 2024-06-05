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
import { Background } from "../landingPage/Background";
import { capitalizeFirstLetter } from "../../lib/utils.js";
import { domain } from "../../lib/utils.js";


export function FormClasses() {
  const navigate = useNavigate();
  const { id } = useParams();


  const classFormSchema = z.object({
    nameClass: z.string().min(6, "Mínimo 6 caracteres (nombreClase)"),
    imageClass: z.string().url("Debe ser una URL válida (imagen Clase)"),
    nameVideo: z.string().min(6, "Mínimo 6 caracteres (videoNombre)"),
    videoContent: z.string().url("Debe ser una URL válida (video Contenido)"),
    fileLink: z.string().url("Debe ser una URL válida (archivoLink)")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(classFormSchema) });

  const handleSubmitData = async (data) => {

    const {nameClass, imageClass, nameVideo, videoContent, fileLink}= data

   const nameClassRefactored = capitalizeFirstLetter(nameClass)

    try {
       await axios.post(`${domain}/profesor/clases`, {
        nombreClase: nameClassRefactored,
        imagenClase: imageClass,
        idCurso: parseInt(id),
        videoNombre: nameVideo,
        videoContenido: videoContent,
        recursoArchivoLink: fileLink
      });

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
                    htmlFor="nameClass"
                    className="text-tertiary text-primary"
                  >
                    Nombre de la Clase
                  </Label>
                  <Input
                    id="nameClass"
                    type="text"
                    placeholder="Nombre de la clase"
                    {...register("nameClass")}
                  />
                  <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.nameClass && (
                      <span className="text-red-500 text-sm">
                        {errors.nameClass.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="imageClass"
                    className="text-tertiary text-primary"
                  >
                    Imagen de la Clase
                  </Label>
                  <Input
                    id="imageClass"
                    type="text"
                    placeholder="URL de la imagen"
                    {...register("imageClass")}
                  />
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.imageClass && (
                      <span className="text-red-500 text-sm">
                        {errors.imageClass.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="nameVideo"
                    className="text-tertiary text-primary"
                  >
                    Nombre del Video
                  </Label>
                  <Input
                    id="nameVideo"
                    type="text"
                    placeholder="Nombre del video"
                    {...register("nameVideo")}
                  />
                 
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.nameVideo && (
                      <span className="text-red-500 text-sm">
                        {errors.nameVideo.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="videoContent"
                    className="text-tertiary text-primary"
                  >
                    Contenido del Video
                  </Label>
                  <Input
                    id="videoContent"
                    type="text"
                    placeholder="Contenido del video"
                    {...register("videoContent")}
                  />
                </div>
                <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.videoContent && (
                      <span className="text-red-500 text-sm">
                        {errors.videoContent.message}
                      </span>
                    )}
                  </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="fileLink"
                    className="text-tertiary text-primary"
                  >
                    Archivo del Recurso
                  </Label>
                  <Input
                    id="fileLink"
                    type="text"
                    placeholder="URL del archivo"
                    {...register("fileLink")}
                  />
                  <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.fileLink && (
                      <span className="text-red-500 text-sm">
                        {errors.fileLink.message}
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
