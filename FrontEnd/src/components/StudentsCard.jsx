import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StudentsCard = ({ className, ...props }) => {
  const students = [
    {
      image: "https://unavatar.io/twitter/elonmusk",
      opinion:
        "This platform is fantastic for kids! They enjoy learning and I see their improvement every day.",
      stars: "⭐⭐⭐⭐⭐",
      name: "Elon Musk",
    },
    {
      image: "https://unavatar.io/twitter/AdamSandler",
      opinion:
        "Edukids has a great variety of educational content that keeps my children engaged.",
      stars: "⭐⭐⭐⭐⭐",
      name: "Adam Sandler",
    },

    {
      image: "https://unavatar.io/twitter/Samurai_Trump",
      opinion:
        "The interactive activities are very helpful and fun. My child loves them!",
      stars: "⭐⭐⭐⭐⭐",
      name: "Donal Trump",
    },
  ];
  return students.map((student) => (
<Card key={student.name} className={cn("w-[250px]", className)} {...props}>
  <CardHeader className="flex flex-col items-center">
    <img src={student.image} alt={student.name} className="h-20 w-20 rounded-full border-4 border- "  />
    <CardTitle className="font-semibold text-primary">{student.name}</CardTitle>
  </CardHeader>
  <CardContent className="text-center">{student.stars}</CardContent>
  <CardFooter>
    <CardDescription className="text-primary">{student.opinion}</CardDescription>
  </CardFooter>
</Card>

  ));
};

export default StudentsCard;
