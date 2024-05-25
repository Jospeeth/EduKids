import { ArrowLeft } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Textarea } from "@ui/Textarea";
import { Label } from "@ui/Label";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Background } from "../landingPage/Background.jsx";
import { useContext, useState } from "react";
import { capitalizeFirstLetter } from "../../lib/utils.js";

export function FormCourses() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;


  const courseFormSchema = z.object({
    title: z.string().min(6, "Minimo 6 caracteres (titulo)"),
    grade: z.preprocess(
      (val) => parseInt(val, 10),
      z.number({ invalid_type_error: "Debe ser un número (grado)." }).positive({
        message: "Debe ser un número positivo.",
      })
    ),
    description: z
      .string()
      .min(20, "La descripcion debe tener minimo 20 caracteres")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(courseFormSchema) });

  const handleSubmitData = async (data) => {
    const { title, grade, description } = data;

   const titleFomated = capitalizeFirstLetter(title)
   const descriptionFomated = capitalizeFirstLetter(description)

    try {
        const response = await axios.post("http://localhost:1234/profesor/crear/curso", {
            titulo: titleFomated,
            idProfesor: user.idprofesos, 
            grado: grade,
            description: descriptionFomated,
          });
      
          alert("Curso creado exitosamente.");
          navigate("/home");
        } catch (error) {
          if (error.response && error.response.status === 409) {
            
              alert("El curso ya existe. Por favor, elige un título diferente.");
            }
             else {
              alert(`Error del servidor: ${error.response.data.message}`);
            }
          }
          
        }
      

  return (
    <>
      <Helmet>
        <title>Crear Curso</title>
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
                Crear Curso
              </h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer">
                <Link className="text-primary" to="/home">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div>
                <div className="flex flex-row justify-between space-x-3">
                  <div className="grid w-full max-w items-center gap-1.5 mt-2">
                    <Label
                      htmlFor="title"
                      className="text-tertiary text-primary"
                    >
                      Titulo
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Nombre del curso"
                      {...register("title")}
                    />
                    <div className="sm:h-[20px] sm:mt-[0.4rem]">
                      {errors.title && (
                        <span className="text-red-500 text-sm">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid w-full max-w items-center gap-1.5 mt-2">
                    <Label
                      htmlFor="grade"
                      className="text-tertiary text-primary"
                    >
                      Grado
                    </Label>
                    <Input
                      type="text"
                      id="grade"
                      placeholder="Grado"
                      {...register("grade")}
                    />
                    <div className="sm:h-[20px] sm:mt-[0.4rem]">
                      {errors.grade && (
                        <span className="text-red-500 text-sm">
                          {errors.grade.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label
                    htmlFor="description"
                    className="text-tertiary text-primary"
                  >
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    type="text"
                    placeholder="Descripción del curso"
                    {...register("description")}
                  />
                  <div className="sm:h-[20px] sm:mt-[0.4rem]">
                    {errors.description && (
                      <span className="text-red-500 text-sm">
                        {errors.description.message}
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
