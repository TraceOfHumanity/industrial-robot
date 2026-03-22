import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  WELDING_TORCH_ANIMATIONS,
  SPRAY_GUN_ANIMATIONS,
  MECHANICAL_GRIPPER_ANIMATIONS,
  VACUUM_GRIPPER_ANIMATIONS,
  SPINDLE_ANIMATIONS,
} from "@/components/experience/components/Industrial-robot/types/robot-animation";
import Button from "../../ui/button";
import { setRobotAnimation } from "@/store/features/industrial-robot";
import { useEffect } from "react";

const RobotActions = () => {
  const dispatch = useAppDispatch();
  const { robotAnimation, endEffector } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const animations = {
    WELDING_TORCH: WELDING_TORCH_ANIMATIONS,
    SPRAY_GUN: SPRAY_GUN_ANIMATIONS,
    TWO_FINGER_GRIPPER: MECHANICAL_GRIPPER_ANIMATIONS,
    VACUUM_GRIPPER: VACUUM_GRIPPER_ANIMATIONS,
    SPINDLE: SPINDLE_ANIMATIONS,
  };

  useEffect(() => {
    console.log("robotAnimation", robotAnimation);
  }, [robotAnimation]);

  return (
    <div className="grow flex flex-col overflow-hidden px-2">
      <h3 className="font-medium">Actions</h3>
      <div className="flex flex-col gap-1 grow overflow-y-auto">
        {animations[endEffector].map((animation) => (
          <Button
            key={animation}
            isActive={robotAnimation === animation}
            onClick={() => dispatch(setRobotAnimation(animation))}
          >
            {animation}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RobotActions;
