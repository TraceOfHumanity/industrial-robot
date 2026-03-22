import { useIndustrialRobotContext } from "@/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import paintFragment from "@/shaders/paint/fragment.glsl";
import paintVertex from "@/shaders/paint/vertex.glsl";
import { SPRAY_GUN_ANIMATIONS } from "@/types/robot-animation";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { BoxGeometry, DoubleSide, Mesh, ShaderMaterial } from "three";

const sprayAnimationSet = new Set<string>(SPRAY_GUN_ANIMATIONS);

export function SprayGunPaintVolume() {
  const { nodes } = useIndustrialRobotContext();
  const { endEffector, robotAnimation } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );

  const active =
    endEffector === "SPRAY_GUN" &&
    sprayAnimationSet.has(robotAnimation);

  const paintMesh = useMemo(() => {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new ShaderMaterial({
      vertexShader: paintVertex,
      fragmentShader: paintFragment,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.35, 0, 0);
    mesh.visible = false;
    return mesh;
  }, []);

  useLayoutEffect(() => {
    const gun = nodes.SPRAY_GUN;
    if (!gun) {
      return;
    }
    gun.add(paintMesh);
    return () => {
      gun.remove(paintMesh);
    };
  }, [nodes.SPRAY_GUN, paintMesh]);

  useLayoutEffect(() => {
    paintMesh.visible = active;
  }, [active, paintMesh]);

  useEffect(() => {
    return () => {
      paintMesh.geometry.dispose();
      (paintMesh.material as ShaderMaterial).dispose();
    };
  }, [paintMesh]);

  return null;
}
