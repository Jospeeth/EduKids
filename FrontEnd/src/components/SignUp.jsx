import { useState } from "react";
import { UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Helmet } from "react-helmet";

const SignUp = () => {




  return (
   <main>
    <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-row items-center mb-4">
           
              <ArrowLeft className="w-5 h-5 text-gray-500 hover:text-gray-700 mr-2" />
            
            <h1 className="text-xl font-semibold">Crear Cuenta</h1>
          </div>
          <form>
            <div className="flex flex-row gap-3.5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="firstName" className="text-tertiary">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nombre"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="lastName" className="text-tertiary">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <label htmlFor="email" className="text-tertiary">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electronico"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <label htmlFor="password" className="text-tertiary">
                Contraseña
              </label>
              <input
                type={"password"}
                id="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-2">
              <label htmlFor="repeatPassword" className="text-tertiary">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Confirmar Contraseña"
              />
            </div>
            <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
              <input type="checkbox" name="terms" />
              <label htmlFor="terms" className="text-tertiary text-xs sm:text-base">
                Aceptar terminos y condiciones
              </label>
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
   </main>
  );
};

export default SignUp;  