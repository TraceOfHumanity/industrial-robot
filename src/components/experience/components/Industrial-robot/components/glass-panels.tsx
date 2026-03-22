import { useAppSelector } from "@/store/hooks";
import { useIndustrialRobotContext } from "../context/industrial-robot";
import { useEffect, useMemo } from "react";
import { DoubleSide, MeshPhysicalMaterial } from "three";

const GlassPanels = () => {
  const { nodes } = useIndustrialRobotContext();
  const { robotAnimation } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const isShowGlass = robotAnimation === "move-glass-panel";

  const glassMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#ffffff",
        transmission: 1,
        thickness: 0.5,
        roughness: 0.05,
        ior: 1.45,
        metalness: 0.5,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        side: DoubleSide,
      }),
    [],
  );

  useEffect(() => {
    if (nodes.GLASS_1) nodes.GLASS_1.material = glassMaterial;
    if (nodes.GLASS_2) nodes.GLASS_2.material = glassMaterial;
    return () => {
      glassMaterial.dispose();
    };
  }, [nodes, glassMaterial]);

  return (
    <>
      {isShowGlass && nodes.GLASS_1 && <primitive object={nodes.GLASS_1} />}
      {isShowGlass && nodes.GLASS_2 && <primitive object={nodes.GLASS_2} />}
    </>
  );
};

export default GlassPanels;
