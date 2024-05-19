import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Label } from "@ui/Label";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Background } from "./Background.jsx";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const SignUpSchema = z.object({
    email: z.string().email({ message: "Correo electronico invalido" }),

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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const handleSubmitData = async (data) => {
    const { email, password } = data;
    try {
      let response = await axios.post(
        "http://localhost:1234/profesor/iniciarsesion",
        {
          correo: email,
          clave: password,
        }
      );

      if (response.status === 200) {
        alert("Entrando como profesor");
        navigate("/home");
      } else if (response.status === 401) {
        response = await axios.post(
          "http://localhost:1234/estudiante/iniciarsesion",
          {
            correo: email,
            clave: password,
          }
        );

        if (response.status === 200) {
          alert("Entrando como estudiante");
          navigate("/home");
        } else {
          alert("Credenciales incorrectas");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>
      <Background />
      <div className="min-h-screen flex items-center justify-center overflow-y-hidden">
        <main className="flex flex-col place-items-center">
          <div className="shadow-2xl p-6 rounded-lg bg-background w-11/12 sm:w-[450px]">
            <div className="icon flex items-center justify-center ">
              <img
                className="h-20, w-20 select-none"
                src="/edukids-logo.svg"
                alt="Edu kids logo"
              />
              <span className="font-bold ml-1 select-none">EduKids</span>
            </div>

            <div className="flex items-center justify-between w-full">
              <h2 className="font-bold my-7  text-base sm:text-lg">
                Iniciar Sesión en EduKids
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
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="password" className="text-tertiary">
                  Contraseña
                </Label>
                <div className="flex flex-row space-x-2">
                  <Input
                    type={showPassword ? "password" : "text"}
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button type="submit" variant="default">
                Registrarse
              </Button>
              <span className="text-tertiary text-xs sm:text-base">
                ¿Todavia no tienes cuenta?
                <Link
                  className="text-primary ml-1 hover:underline text-xs sm:text-base"
                  to="/signup"
                >
                  Registarse
                </Link>
              </span>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignUp;
