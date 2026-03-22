import { useGLTF } from "@react-three/drei";
import { useIndustrialRobotContext } from "@/components/experience/components/Industrial-robot/context/industrial-robot";
import Manipulator from "./components/manipulator";
import { SprayGunPaintVolume } from "./components/spray-gun-paint-volume";
import { WeldingTorchSparks } from "./components/welding-torch-sparks";
import { useAppSelector } from "@/store/hooks";
import GlassPanels from "./components/glass-panels";

export function IndustrialRobot() {
  const { groupRef, nodes } = useIndustrialRobotContext();
  const { robotAnimation } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const isShowPalletAndBoxes = robotAnimation === "stack-items-on-pallet";
  const isShowManhole = robotAnimation === "circular-path";
  const isShowSteelBeam =
    robotAnimation === "linear-seam" || robotAnimation === "spot-weld";

  return (
    <group ref={groupRef} dispose={null}>
      <Manipulator />
      <SprayGunPaintVolume />
      <WeldingTorchSparks />
      <GlassPanels />
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
      {isShowManhole && nodes.MANHOLE && <primitive object={nodes.MANHOLE} />}
    </group>
  );
}

useGLTF.preload("/assets/industrial-robot.glb");
