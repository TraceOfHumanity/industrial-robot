import { useIndustrialRobotContext } from "@/components/experience/components/Industrial-robot/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import type { JSX } from "react";
import { useLayoutEffect } from "react";

const Manipulator = (
  props: JSX.IntrinsicElements["group"],
): JSX.Element | null => {
  const { nodes, setEndEffectorVisibility } = useIndustrialRobotContext();
  const { endEffector } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );

  useLayoutEffect(() => {
    if (!nodes.ROOT_BONE) return;
    setEndEffectorVisibility(endEffector);
  }, [endEffector, nodes, setEndEffectorVisibility]);

  if (!nodes.ROOT_BONE) {
    return null;
  }

  return <primitive object={nodes.ROOT_BONE} {...props} />;
};

export default Manipulator;