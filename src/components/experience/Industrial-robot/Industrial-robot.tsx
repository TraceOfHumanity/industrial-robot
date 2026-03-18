import { useEffect, type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { useIndustrialRobotContext } from "@/context/industrial-robot";
import type { RobotColor } from "@/types/robot-color.types";
import EndEffectors from "./industrial-robot-end-effectors";
import Manipulator from "./industrial-robot-manipulator";
import { useAppSelector } from "@/store/hooks";

const ROBOT_COLOR_HEX: Record<RobotColor, number> = {
  white: 0xffffff,
  orange: 0xffa500,
  blue: 0x4C8CE4,
  yellow: 0xFFDE42,
  red: 0xEB4C4C,
};

export function IndustrialRobot(props: JSX.IntrinsicElements["group"]) {
  const { groupRef, nodes, actions, materials } = useIndustrialRobotContext();
  const { robotAnimation, robotColor } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const isShowPalletAndBoxes = robotAnimation === "stack-items-on-pallet";
  const isShowGlass = robotAnimation === "move-glass-panel";
  const isShowManhole = robotAnimation === "circular-path";
  const isShowSteelBeam =
    robotAnimation === "linear-seam" || robotAnimation === "spot-weld";

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.stop();
    });
    const next = actions[robotAnimation];
    if (next) {
      next.reset().play();
    }
  }, [robotAnimation, actions]);

  useEffect(() => {
    const hex = ROBOT_COLOR_HEX[robotColor];
    if (materials['robot-color']) {
      materials['robot-color'].color.setHex(hex);
    }
  }, [robotColor, materials]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <Manipulator />
          <EndEffectors />
        </group>
        {isShowPalletAndBoxes && nodes.PALLET && (
          <primitive object={nodes.PALLET} />
        )}
        {isShowPalletAndBoxes && nodes.BOX_1 && (
          <primitive object={nodes.BOX_1} />
        )}
        {isShowPalletAndBoxes && nodes.BOX_2 && (
          <primitive object={nodes.BOX_2} />
        )}
        {isShowPalletAndBoxes && nodes.BOX_3 && (
          <primitive object={nodes.BOX_3} />
        )}
        {isShowPalletAndBoxes && nodes.BOX_4 && (
          <primitive object={nodes.BOX_4} />
        )}
        {isShowSteelBeam && nodes.STEEL_BEAM && (
          <primitive object={nodes.STEEL_BEAM} />
        )}
        {isShowGlass && nodes.GLASS_1 && <primitive object={nodes.GLASS_1} />}
        {isShowGlass && nodes.GLASS_2 && <primitive object={nodes.GLASS_2} />}
        {isShowManhole && nodes.MANHOLE && <primitive object={nodes.MANHOLE} />}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/industrial-robot.glb");
