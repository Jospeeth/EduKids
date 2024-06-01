import { ArrowLeft } from "lucide-react";
import { Input } from "@ui/Input";
import { ButtonShowPassword } from "@ui/ButtonShowPassword";
import { Button } from "@ui/Button";
import { Label } from "@ui/Label";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Background } from "./landingPage/Background.jsx";
import { useContext, useState } from "react";

const SignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //const isStudent = location.state?.isStudent || false;

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

  const handleSignIn = async (url, data, userType) => {

    const isStudent = userType === "estudiante";
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        alert(`Entrando como ${userType}`);
        dispatch({
          type: "SIGNIN",
          payload:
            userType === "profesor"
              ? response.data.data
              : { ...response.data.data, isStudent: true },
        });
        isStudent ? localStorage.setItem("user", JSON.stringify({ ...response.data.data, isStudent }))
       : localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/home");
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const handleSubmitData = async (data) => {
    const { email, password } = data;
    const credentials = { correo: email, clave: password };

    const isTeacher = await handleSignIn(
      "http://localhost:1234/profesor/iniciarsesion",
      credentials,
      "profesor"
    );

    if (!isTeacher) {
      const isStudent = await handleSignIn(
        "http://localhost:1234/estudiante/iniciarsesion",
        credentials,
        "estudiante"
      );
      if (!isStudent) {
        alert("Credenciales incorrectas");
      }
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
              <span className="font-bold ml-1 select-none text-primary">
                EduKids
              </span>
            </div>

            <div className="flex items-center justify-between w-full">
              <h2 className="font-bold my-7  text-base sm:text-lg text-primary">
                Iniciar Sesión en EduKids
              </h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent cursor-pointer">
                <Link className="text-primary" to="/">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div className="grid w-full max-w items-center gap-1.5 mt-2 ">
                <Label htmlFor="email" className="text-tertiary text-primary">
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
                <Label
                  htmlFor="password"
                  className="text-tertiary text-primary"
                >
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
              </div>
              <div className=" sm:h-[20px] sm:mt-[0.4rem]">
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="default"
                className="my-4 py-3 px-6 w-full"
              >
                Iniciar Sesión
              </Button>
              <span className="text-tertiary text-xs sm:text-base text-primary">
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
