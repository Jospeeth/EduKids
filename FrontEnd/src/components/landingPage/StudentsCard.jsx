import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/Cards";

const StudentsCard = ({ className, ...props }) => {
  const students = [
    {
      image: "https://unavatar.io/twitter/elonmusk",
      opinion:
        "Esta plataforma es fantástica para los niños. Disfrutan aprendiendo y veo que mejoran cada día.",
      stars: "⭐⭐⭐⭐⭐",
      name: "Elon Musk",
    },
    {
      image: "https://unavatar.io/twitter/AdamSandler",
      opinion:
        "Edukids tiene una gran variedad de contenido educativo que mantiene a mis hijos interesados.",
      stars: "⭐⭐⭐⭐⭐",
      name: "Adam Sandler",
    },

    {
      image: "https://unavatar.io/twitter/Samurai_Trump",
      opinion:
        "Las actividades interactivas son muy útiles y divertidas. ¡A mi hijo le encantan!",
      stars: "⭐⭐⭐⭐⭐",
      name: "Donal Trump",
    },
  ];
  return students.map((student) => (
<Card key={student.name} className={cn("w-[250px]", className)} {...props}>
  <CardHeader className="flex flex-col items-center">
    <img src={student.image} alt={student.name} className="h-25 w-25 rounded-full  "  />
    <CardTitle className="font-semibold text-primary">{student.name}</CardTitle>
  </CardHeader>
  <CardContent className="text-center">{student.stars}</CardContent>
  <CardFooter>
    <CardDescription className="text-gray-600 text-lg text-center">{student.opinion}</CardDescription>
  </CardFooter>
</Card>

  ));
};

export default StudentsCard;
