import { Button } from "@ui/Button";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";
import image2 from "../../assets/image2.png";

import StudentsCard from "./StudentsCard";
import { Footer } from "./Footer";
import { Services } from "./Services";
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
        <section className="flex flex-row px-10 justify-around items-center  sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-8 sm:m-auto">
          <div className="p-6 max-w-lg">
            <h1 className="font-bold text-primary text-3xl sm:text-6xl ">
              EduKids
            </h1>
   
            <p className="mt-4 text-sm sm:text-xl text-gray-700 py-4 sm:w-76 sm:pr-8">
              EduKids es una plataforma educativa digital para escuelas, que
              permita a estudiantes y profesores acceder a recursos y
              herramientas para aprender y enseñar sobre el consumo responsable
              de energía.
            </p>
            <Button className="border-2 hover:scale-110 transition-all duration-300 ">
              <Link to="/signup">Registarse</Link>
            </Button>
          </div>

          <div className="w-full max-w-lg mt-10 sm:mt-0">
            <img
              src={image}
              alt="EduKids"
              className="rounded-xl h-[512px] w-full object-contain"
            />
          </div>
        </section>
        <div className="flex flex-row sm:flex-row-reverse  justify-around items-center px-10 sm:w-9/12  gap-3 sm:space-x-3 m-auto ">
          <div className="p-6 max-w-lg">
            <h2
              className="font-bold text-primary text-3xl sm:text-4xl">
             Ofrecemos
            </h2>
            
            <p className="mt-4 text-sm sm:text-lg text-gray-700 py-4 sm:w-76 sm:pr-8">
              Una  plataforma educativa digital para fortalecer la educación en
              consumo responsable de energía entre los estudiantes de escuelas
              públicas y privadas. Con recursos y herramientas interactivas, la
              plataforma facilitará el aprendizaje y la interacción entre
              estudiantes y docentes, promoviendo una cultura de eficiencia
              energética y concienciación ambiental.
            </p>
          </div>

          <div className="w-full max-w-lg mt-10 sm:mt-0">
            <img
              src={image2}
              alt="EduKids"
              className="rounded-xl h-[512px] w-full object-contain"
            />
          </div>
        </div>
   
        <br id="services" />
        <section className="flex flex-row px-10 justify-center items-center  sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-8 sm:m-auto">
          <Services />
        </section>
        <br id="clients" />

        <section className="sm:pt-10 pb-10 mx-5 flex flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-5xl font-bold px-2 text-center mt-6 text-primary mb-8">
            Opiniones de nuestros Usuarios
          </h2>
          <div className="justify-evenly  space-x-4 flex-wrap sm:flex sm:mt-5 sm:gap-x-24">
            <StudentsCard className="border-0 space-y-3" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
