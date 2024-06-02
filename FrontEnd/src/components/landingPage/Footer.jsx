export const Footer = () => {
  return (
    <footer id="about" className="bg-primary">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-background flex flex-row items-center">
              <img className="h-20 w-20" src="/edukids-logo.svg" alt="logo" />
              <span className="text-5xl font-bold">EduKids</span>
            </div>

            <p className="mt-4 max-w-xs text-background">
              Este es un proyecto final del curso Tecnologias web
            </p>

           
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-background">La Empresa</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Acerca de Nosotros
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Conoce nuestro equipo
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Sede Central
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-background">Enlaces externos</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Contacto
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Preguntas frecuentes
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Chat interactivo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-background">Marco Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Accesibilidad
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Términos y Condiciones
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-background transition opacity-80 hover:opacity-100"
                  >
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-background">
          &copy; 2024 - EduKids | Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};
