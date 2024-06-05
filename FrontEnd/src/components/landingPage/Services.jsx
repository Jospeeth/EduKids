import { Card, CardHeader, CardContent, CardTitle } from "@ui/Cards";
const services = [
        {
          title: "Gestión de cursos",
          service:
            "Permite a los profesores crear, editar y publicar cursos en línea sobre consumo de energía.",
        },
        {
          title: "Gestión de usuarios",
          service:
            "Permite a los estudiantes y profesores registrarse, crear perfiles y acceder a la plataforma.",
        },
        {
          title: "Gestión de contenido",
          service:
            "Permite a los profesores subir vídeos, infografías, documentos y otros recursos multimedia.",
        },
      ];
      

export const Services = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-4xl sm:text-5xl font-bold px-2 text-center mt-6 text-primary mb-20">
          Servicios
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <li key={service.service}>
            <Card className="flex flex-col h-[220px] flex-grow">
                <CardHeader>
                  <CardTitle className="text-primary font-bold  text-3xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-gray-800 flex-grow text-lg">{service.service}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-500"></span>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
