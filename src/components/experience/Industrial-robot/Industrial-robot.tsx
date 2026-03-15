import type { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { useIndustrialRobotContext } from "@/context/industrial-robot";
import EndEffectors from "./industrial-robot-end-effectors";
import Manipulator from "./industrial-robot-manipulator";

export function IndustrialRobot(props: JSX.IntrinsicElements["group"]) {
  const { groupRef, nodes, activeAnimation } = useIndustrialRobotContext();
  const showPalletAndBoxes = activeAnimation === "stack-items-on-pallet";
  const showGlass = activeAnimation === "move-glass-panel";

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <Manipulator />
          <EndEffectors />
        </group>
        {showPalletAndBoxes && nodes.PALLET && (
          <primitive object={nodes.PALLET} />
        )}
        {showPalletAndBoxes && nodes.BOX_1 && (
          <primitive object={nodes.BOX_1} />
        )}
        {showPalletAndBoxes && nodes.BOX_2 && (
          <primitive object={nodes.BOX_2} />
        )}
        {showPalletAndBoxes && nodes.BOX_3 && (
          <primitive object={nodes.BOX_3} />
        )}
        {showPalletAndBoxes && nodes.BOX_4 && (
          <primitive object={nodes.BOX_4} />
        )}
        {showGlass && nodes.GLASS_1 && (
          <primitive object={nodes.GLASS_1} />
        )}
        {showGlass && nodes.GLASS_2 && (
          <primitive object={nodes.GLASS_2} />
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/industrial-robot.glb");
