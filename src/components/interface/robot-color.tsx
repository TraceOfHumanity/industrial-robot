import { ROBOT_COLORS } from "@/types/robot-color.types";
import Button from "../ui/button";
import { cn } from "@/utils/cn";

const RobotColor = () => {
  const colorMap = {
    white: "bg-white",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };
  return (
    <>
      <h3 className="text-lg font-medium">Robot Color</h3>
      <div className="grid grid-cols-5 gap-1">
        {ROBOT_COLORS.map((color) => (
          <Button
            key={color}
            variant="ghost"
            className={cn("rounded-md aspect-square", colorMap[color])}
          >
            {color}
          </Button>
        ))}
      </div>
    </>
  );
};

export default RobotColor;
