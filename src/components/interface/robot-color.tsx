import { ROBOT_COLORS, type RobotColor } from "@/types/robot-color";
import Button from "../ui/button";
import { setRobotColor } from "@/store/features/industrial-robot";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const RobotColor = () => {
  const selectedRobotColor = useAppSelector(
    (state) => state.industrialRobotSlice.robotColor,
  );
  const dispatch = useAppDispatch();
  return (
    <>
      <h3 className="text-lg font-medium">Robot Color</h3>
      <div className="grid grid-cols-5 gap-1">
        {(Object.keys(ROBOT_COLORS) as RobotColor[]).map((color) => (
          <Button
            key={color}
            isActive={color === selectedRobotColor}
            onClick={() => dispatch(setRobotColor(color))}
            className="relative"
          >
            {color}
            <div
              className="absolute bottom-0 left-1/2 w-1/2 h-1 -translate-x-1/2"
              style={{
                backgroundColor: `#${ROBOT_COLORS[color].toString(16)}`,
              }}
            />
          </Button>
        ))}
      </div>
    </>
  );
};

export default RobotColor;
