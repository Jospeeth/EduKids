import { Button } from "@ui/Button";
import { Eye, EyeOff } from "lucide-react";

export function ButtonShowPassword({showPassword, setShowPassword }) {
  return (
    <Button
      size="icon"
      variant="icon"
      type="button"
      className="transition duration-300 hover:shadow-md focus:shadow-md border-2 border-input text-primary"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5 " />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </Button>
  );
}
