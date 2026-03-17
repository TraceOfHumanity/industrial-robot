import { useIndustrialRobotContext } from "@/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import type { JSX } from "react";
import { useLayoutEffect } from "react";

const Manipulator = (
  props: JSX.IntrinsicElements["group"],
): JSX.Element | null => {
  const { nodes } = useIndustrialRobotContext();
  const { endEffector } = useAppSelector((state) => state.industrialRobotSlice);

  
  useLayoutEffect(() => {
    const all = [
      "DRILL",
      "DRILL_TOP",
      "WELDING_TORCH",
      "TWO_FINGER_GRIPPER",
      "GRIPPERL",
      "GRIPPERR",
      "VACUUM_GRIPPER",
      "SPRAY_GUN",
    ] as const;
    
    if (!nodes.ROOT_BONE) {
      return null;
    }
    all.forEach((name) => {
      if (nodes[name]) {
        nodes[name]!.visible = false;
      }
    });

    if (endEffector === "SPINDLE") {
      if (nodes.DRILL) nodes.DRILL.visible = true;
      if (nodes.DRILL_TOP) nodes.DRILL_TOP.visible = true;
    }

    if (endEffector === "WELDING_TORCH") {
      if (nodes.WELDING_TORCH) nodes.WELDING_TORCH.visible = true;
    }

    if (endEffector === "TWO_FINGER_GRIPPER") {
      if (nodes.TWO_FINGER_GRIPPER) nodes.TWO_FINGER_GRIPPER.visible = true;
      if (nodes.GRIPPERL) nodes.GRIPPERL.visible = true;
      if (nodes.GRIPPERR) nodes.GRIPPERR.visible = true;
    }

    if (endEffector === "VACUUM_GRIPPER") {
      if (nodes.VACUUM_GRIPPER) nodes.VACUUM_GRIPPER.visible = true;
    }

    if (endEffector === "SPRAY_GUN") {
      if (nodes.SPRAY_GUN) nodes.SPRAY_GUN.visible = true;
    }
  }, [endEffector, nodes]);

  return <primitive object={nodes.ROOT_BONE} {...props} />;
};

export default Manipulator;
