import { useGLTF } from "@react-three/drei";
import { useIndustrialRobotContext } from "@/context/industrial-robot";
import Manipulator from "./industrial-robot-manipulator";
import { useAppSelector } from "@/store/hooks";

export function IndustrialRobot() {
  const { groupRef, nodes } = useIndustrialRobotContext();
  const { robotAnimation } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const isShowPalletAndBoxes = robotAnimation === "stack-items-on-pallet";
  const isShowGlass = robotAnimation === "move-glass-panel";
  const isShowManhole = robotAnimation === "circular-path";
  const isShowSteelBeam =
    robotAnimation === "linear-seam" || robotAnimation === "spot-weld";

  return (
    <group ref={groupRef} dispose={null}>
      <Manipulator />
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
  );
}

useGLTF.preload("/assets/industrial-robot.glb");
