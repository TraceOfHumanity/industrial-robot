import {
  ROBOT_COLORS,
  type RobotColor as RobotColorType,
} from "@/components/experience/components/Industrial-robot/types/robot-color";
import Button from "../ui/button";
import { setRobotColor } from "@/store/features/industrial-robot";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const RobotColor = () => {
  const selectedRobotColor = useAppSelector(
    (state) => state.industrialRobotSlice.robotColor,
  );
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-1 px-2">
      <h3 className="text-lg font-medium">Color</h3>
      <div className="grid grid-cols-5 gap-1">
        {(Object.keys(ROBOT_COLORS) as RobotColorType[]).map((color) => (
          <Button
            key={color}
            isActive={color === selectedRobotColor}
            onClick={() => dispatch(setRobotColor(color))}
            className="rounded-full p-1 aspect-square relative"
          >
            <div
              className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: `#${ROBOT_COLORS[color].toString(16)}`,
              }}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RobotColor;
