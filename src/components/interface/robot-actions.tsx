import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  WELDING_TORCH_ANIMATIONS,
  SPRAY_GUN_ANIMATIONS,
  MECHANICAL_GRIPPER_ANIMATIONS,
  VACUUM_GRIPPER_ANIMATIONS,
  SPINDLE_ANIMATIONS,
} from "@/types/robot-animation.types";
import Button from "../ui/button";
import { cn } from "@/utils/cn";
import { setAnimation } from "@/store/features/industrial-robot";

const RobotActions = () => {
  const dispatch = useAppDispatch();
  const { selectedAnimation, endEffector } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const animations = {
    "welding-torch": WELDING_TORCH_ANIMATIONS,
    "spray-gun": SPRAY_GUN_ANIMATIONS,
    "two-finger-gripper": MECHANICAL_GRIPPER_ANIMATIONS,
    "vacuum-gripper": VACUUM_GRIPPER_ANIMATIONS,
    spindle: SPINDLE_ANIMATIONS,
  };
  return (
    <div className="grow flex flex-col overflow-hidden">
      <h3 className="text-lg font-medium">Robot Actions</h3>
      <div className="flex flex-col gap-1 grow overflow-y-auto">
        {animations[endEffector].map((animation) => (
          <Button
            key={animation}
            variant="ghost"
            className={cn(selectedAnimation === animation ? "bg-white/20" : "")}
            onClick={() => dispatch(setAnimation(animation))}
          >
            {animation}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RobotActions;
