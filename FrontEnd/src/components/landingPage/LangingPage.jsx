import { Button } from "@ui/Button";
import { Link } from "react-router-dom";
import { BackgroundLanding } from "./Background";
import StudentsCard from "./StudentsCard";
const LandingPage = () => {
  return (
    <>
      <header className="bg-primary w-full p-5 fixed">
        <nav className="flex flex-row items-center justify-between h-12 my-2">
          <a
            className="flex flex-row items-center text-background cursor-pointer"
            href="#"
          >
            <img
              src="/edukids-logo.svg"
              alt="Edu kids logo"
              className="h-20 w-20"
            />

            <div>
              <h1 className="font-semibold text-primary-foreground text-xl">
                EduKids
              </h1>

              <span className="font-medium text-primary-foreground">
                Clases digitales
              </span>
            </div>
          </a>
          <div>
            <ul className="flex-row gap-6 hidden lg:flex uppercase tracking-wide">
              <li className="text-background hover:scale-110 transition-all duration-300  ">
                <a href="#" className="nav-link nav-link-ltr">
                  Inicio
                </a>
              </li>
              <li className="text-background hover:scale-110 transition-all duration-300  ">
                <a href="#services" className="nav-link nav-link-ltr">
                  Servicios
                </a>
              </li>
              <li className="text-background hover:scale-110 transition-all duration-300  ">
                <a href="#clients" className="nav-link nav-link-ltr">
                  Estudiantes
                </a>
              </li>
              <li className="text-background hover:scale-110 transition-all duration-300 ">
                <a href="#about" className="nav-link nav-link-ltr ">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>
          <div className=" flex gap-4">
            <Button className="border-2 hover:scale-110 transition-all duration-300 ">
              <Link to="/signup">Registarse</Link>
            </Button>
            <Button className="border-2 hover:scale-110 transition-all duration-300">
              <Link to="/signin">Iniciar Sesión</Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="overflow-x-hidden pt-10 sm:pt-20 space-y-10 sm:space-y-5">
        <BackgroundLanding />
        <section className="flex flex-row px-10 justify-center sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-8 sm:m-auto">

       
            <img src="../../assets/images/shot.png" alt=""  className="h-20 w-20"/>
    
        </section>

        <section className="sm:pt-10 pb-10 mx-5 flex flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-5xl font-bold px-2 text-center mt-6 text-primary mb-8">
            Opiniones de nuestros Usuarios
          </h2>
          <div className="justify-evenly flex-wrap sm:flex sm:mt-5 sm:gap-x-24">
            <StudentsCard className="flex flex-col  items-cente  border-2 bg-slate-50 shadow-gray-50 shadow-inner " />
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
