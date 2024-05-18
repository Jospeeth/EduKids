import { useState } from "react";
import { UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Label } from "@ui/Label";
import { Checkbox } from "@ui/Checkbox";

import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-primary overflow-y-hidden">
        <main className="flex flex-col place-items-center p-6 bg-slate-100 rounded-xl">
         
            <div className="icon flex items-center justify-center">
              <img
                className="h-12, w-12 select-none"
                src=""
                alt="logo"
              />
              <span className="font-bold ml-1 select-none">EduKids</span>
            </div>

            <div className="flex items-center justify-between w-full">
              <h2 className="font-bold my-7  text-base sm:text-lg">
                Crear Cuenta en EduKids
              </h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent">
                <a className="text-primary" to="/">
                  <ArrowLeft className="h-5 w-5 text-current" />
                </a>
              </div>
            </div>

          <form className=" flex justify-center flex-col" >
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
                />
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
                />
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
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="email" className="text-tertiary">
                Celular
              </Label>
              <Input
                type="number"
                id="celular"
                name="celular"
                placeholder="Celular"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <Label htmlFor="password" className="text-tertiary">
                Contraseña
              </Label>
              <Input
                type={"password"}
                id="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2 mb-4">
              <Label htmlFor="repeatPassword" className="text-tertiary">
                Confirmar Contraseña
              </Label>
              <Input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Confirmar Contraseña"
              />
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
        
            <Button type="submit" variant="default" type="submit">
              Registrarse
            </Button>
          </form>
        </main>
      </div>
    </>
  );
};



export default SignUp;
