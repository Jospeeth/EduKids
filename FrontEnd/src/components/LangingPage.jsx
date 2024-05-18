import { Button } from "@ui/Button";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      <header className="bg-primary w-full p-4 fixed">
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
              <li className="text-background">
                <a href="#" className="nav-link nav-link-ltr">
                  Inicio
                </a>
              </li>
              <li className="text-background">
                <a href="#services" className="nav-link nav-link-ltr">
                  Servicios
                </a>
              </li>
              <li className="text-background">
                <a href="#clients" className="nav-link nav-link-ltr">
                  Clientes
                </a>
              </li>
              <li className="text-background">
                <a href="#about" className="nav-link nav-link-ltr">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>
          <div className=" flex gap-4">
            <Button className="border ">
              <Link to="/signup">Registarse</Link>
            </Button>
            <Button className="border ">
              <Link to="/signin">Iniciar Sesión</Link>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LandingPage;
