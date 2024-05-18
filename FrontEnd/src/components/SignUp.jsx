import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Label } from "@ui/Label";
import { Checkbox } from "@ui/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";

const SignUp = () => {
  const [password, setPassword] = useState(false);
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

    const setFristLetterToCapital=(str)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);

   }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const handleSubmitData = async (data) => {
      
    const { firstName, lastName, email, phone, password } = data;
    const nombre = setFristLetterToCapital(firstName)
    const apellido = setFristLetterToCapital(lastName)
    const correo = email
    const clave = password
    const celular = phone
    
   
    try{
      await axios.post("http://localhost:1234/profesor/registrarse",
      {
        nombre: nombre, 
        apellido: apellido, 
        correo: correo, 
        clave: clave,  
        celular:celular
      }
      )
      navigate("/signin")
    }catch(e){
      console.log(e)
    }

  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="min-h-screen flex items-center justify-center  overflow-y-hidden">
        <main className=" shadow-2xl flex flex-col place-items-center p-6 bg-background rounded-xl">
          <div className="icon flex items-center justify-center">
            <img
              className="h-16, w-16 select-none"
              src="/edukids-logo.svg"
              alt="Edu kids logo"
            />
            <span className="font-bold ml-1 select-none">EduKids</span>
          </div>

          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold my-7  text-base sm:text-lg">
              Crear Cuenta en EduKids
            </h2>
            <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer">
              <Link className="text-primary" to="/">
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
                <Label htmlFor="firstName" className="text-tertiary">
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
                  <span className="text-red-500 text-xs" >
                    {errors.firstName.message}
                  </span>
                )}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName" className="text-tertiary">
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
                  <span className="text-red-500 text-xs" >
                    {errors.lastName.message}
                  </span>
                )}
                </div>
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="email" className="text-tertiary">
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
                  <span className="text-red-500 text-xs" >
                    {errors.email.message}
                  </span>
                )}
                </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="phone" className="text-tertiary">
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
                  <span className="text-red-500 text-xs" >
                    {errors.phone.message}
                  </span>
                )}
                </div>
               </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="password" className="text-tertiary">
                Contraseña
              </Label>
              <div className="flex flex-row space-x-2">
                <Input
                  type={password ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  {...register("password")}
                />
               
                <Button
                  size="icon"
                  variant="icon"
                  type="button"
                  className="transition duration-300 hover:shadow-md focus:shadow-md border-2 border-input"
                  onClick={() => setPassword(!password)}
                >
                  {password ? (
                    <EyeOff className="h-5 w-5 text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary" />
                  )}
                </Button>
                
              </div>
              <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                {errors.password && (
                  <span className="text-red-500 text-xs" >
                    {errors.password.message}
                  </span>
                )}
                </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2 mb-4">
              <Label htmlFor="repeatPassword" className="text-tertiary">
                Confirmar Contraseña
              </Label>
              <Input
                type={password ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Confirmar Contraseña"
                {...register("repeatPassword")}
              />
               <div className=" sm:h-[10px] sm:mt-[0.4rem]">
                {errors.repeatPassword && (
                  <span className="text-red-500 text-xs" >
                    {errors.repeatPassword.message}
                  </span>
                )}
                </div>
            </div>
            <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-tertiary text-xs sm:text-base"
              >
                Aceptar terminos y condiciones
              </Label>
            </div>

            <Button type="submit" variant="default">
              Registrarse
            </Button>
            <span className="text-tertiary text-xs sm:text-base">
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
