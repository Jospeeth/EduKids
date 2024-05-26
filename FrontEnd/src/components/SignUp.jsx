import { ArrowLeft } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { ButtonShowPassword } from "@ui/ButtonShowPassword";
import { Label } from "@ui/Label";
import { Checkbox } from "@ui/Checkbox";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Background } from "./landingPage/Background.jsx";
import { capitalizeFirstLetter } from "../lib/utils.js";

import { z } from "zod";
import { useState } from "react";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const isStudent = location.state?.isStudent || false;
  const courseId = location.state?.courseId || undefined;




  const navigate = useNavigate();

  const SignUpSchema = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres (Nombre)" })
        .max(20, { message: "Maximo 20 caracteres (Nombre)" })
        .refine(
          (value) =>
            /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
              value
            ),
          {
            message: "Solo letras en el Nombre",
          }
        ),
      lastName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres (Apellido)" })
        .max(20, { message: "Maximo 20 caracteres (Apellido)" })
        .refine(
          (value) =>
            /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
              value
            ),
          {
            message: "Solo letras en el Apellido",
          }
        ),
      email: z.string().email({ message: "Correo electronico invalido" }),
      phone: z.string().min(10, { message: "Mínimo 10 caracteres (Celular)" }),
      password: z
        .string()
        .min(8, "Contraseña debe tener minimo 8 caracteres")
        .refine(
          (password) => {
            return /[A-Z]/.test(password);
          },
          {
            message: "Contraseña debe contener al menos una letra mayúscula",
          }
        )
        .refine(
          (password) => {
            return /\d/.test(password);
          },
          {
            message: "Contraseña debe contener al menos un número",
          }
        )
        .refine(
          (password) => {
            return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
          },
          {
            message: "Contraseña debe incluir al menos un carácter especial",
          }
        ),
      repeatPassword: z
        .string()
        .min(8, { message: "Las contraseñas no coinciden" })
        .max(20),
    })
    .refine((data) => data.password === data.repeatPassword, {
      path: ["repeatPassword"],
      message: "Las contraseñas no coinciden",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });



        const handleSubmitData = async (data) => {
          const { firstName, lastName, email, phone, password } = data;
          const nombre = capitalizeFirstLetter(firstName);
          const apellido = capitalizeFirstLetter(lastName);
          const correo = email;
          const clave = password;
          const celular = phone;
      
          const url = isStudent 
              ? "http://localhost:1234/profesor/registrar/estudiante" 
              : "http://localhost:1234/profesor/registrarse";
      
          try {
              const response = await axios.post(url, {
                  nombre: nombre,
                  apellido: apellido,
                  correo: correo,
                  clave: clave,
                  celular: celular,
                  idCurso: courseId
              });
      
              if (response.status === 201) {
                  alert("Cuenta creada con éxito");
                  navigate('/signin', { state: { isStudent } });
              }
          } catch (error) {
              console.log(error);
              if (error.response) {
                  if (error.response.status === 409) {
                      alert("El correo ya se encuentra registrado");
                  } else if (error.response.status === 500) {
                      alert("Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.");
                  } else {
                      alert("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
                  }
              } else if (error.request) {
                  alert("No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.");
              } else {
                  alert("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
              }
          }
      };
      

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <Background />
      <div className="min-h-screen flex items-center justify-center  overflow-y-hidden">
        <main className=" shadow-2xl flex flex-col place-items-center p-6 bg-background rounded-xl">
          <div className="icon flex items-center justify-center">
            <img
              className="h-16, w-16 select-none"
              src="/edukids-logo.svg"
              alt="Edu kids logo"
            />
            <span className="font-bold ml-1 select-none text-primary">
              EduKids
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold my-7 text-primary text-base sm:text-lg">
              Crear Cuenta en EduKids
            </h2>
            <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer">
              <Link className="text-primary" to={
                isStudent ? "/home" : "/"
              }>
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>

          <form
            className=" flex justify-center flex-col"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <div className="flex flex-row gap-3.5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstName" className="text-primary">
                  Nombre
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nombre"
                  {...register("firstName")}
                />
                <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName" className="text-primary">
                  Apellido
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Apellido"
                  {...register("lastName")}
                />
                <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="email" className="text-primary">
                Correo electronico
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electronico"
                {...register("email")}
              />
              <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="phone" className="text-primary">
                Celular
              </Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="Celular"
                {...register("phone")}
              />
              <div>
                <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="password" className="text-primary">
                Contraseña
              </Label>
              <div className="flex flex-row space-x-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  {...register("password")}
                />

                <ButtonShowPassword
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                />
              </div>
              <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2 mb-4">
              <Label htmlFor="repeatPassword" className="text-primary">
                Confirmar Contraseña
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Confirmar Contraseña"
                {...register("repeatPassword")}
              />
              <div className=" sm:h-[10px] sm:mt-[0.4rem]">
                {errors.repeatPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.repeatPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-primary text-xs sm:text-base"
              >
                Aceptar terminos y condiciones
              </Label>
            </div>

            <Button type="submit" variant="default"
             className="my-4 py-3 px-6 w-full">
            
              Registrarse
            </Button>
            <span className="text-primary text-xs sm:text-base">
              ¿Ya eres profesor de Edukids?
              <Link
                className="text-primary ml-1 hover:underline text-xs sm:text-base"
                to="/signin"
              >
                Iniciar sesión
              </Link>
            </span>
          </form>
        </main>
      </div>
    </>
  );
};

export default SignUp;
