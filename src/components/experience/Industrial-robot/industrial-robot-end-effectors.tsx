import { useIndustrialRobotContext } from "@/context/industrial-robot";
import * as THREE from "three";

const DRILL_ANIMATIONS = ["drill-plunge", "bore-enlarge"];
const WELDING_ANIMATIONS = ["spot-weld"];
const GRIPPER_ANIMATIONS = ["stack-items-on-pallet"];
const VACUUM_ANIMATIONS = ["move-glass-panel"];
const SPRAY_ANIMATIONS = ["contour-cut", "circular-path", "linear-seam"];

const EndEffectors = () => {
  const { nodes, activeAnimation } = useIndustrialRobotContext();
  if (!activeAnimation) return null;

  const showDrill = DRILL_ANIMATIONS.includes(activeAnimation);
  const showWelding = WELDING_ANIMATIONS.includes(activeAnimation);
  const showGripper = GRIPPER_ANIMATIONS.includes(activeAnimation);
  const showVacuum = VACUUM_ANIMATIONS.includes(activeAnimation);
  const showSpray = SPRAY_ANIMATIONS.includes(activeAnimation);

  return (
    <group name="end-effectors">
      {showDrill && nodes.DRILL && (
        <primitive object={nodes.DRILL as unknown as THREE.Object3D} />
      )}
      {showDrill && nodes.DRILL_TOP && (
        <primitive object={nodes.DRILL_TOP as unknown as THREE.Object3D} />
      )}
      {showWelding && nodes.WELDING_TORCH && (
        <primitive object={nodes.WELDING_TORCH as unknown as THREE.Object3D} />
      )}
      {showGripper && nodes.TWO_FINGER_GRIPPER_2 && (
        <primitive
          object={nodes.TWO_FINGER_GRIPPER_2 as unknown as THREE.Object3D}
        />
      )}
      {showVacuum && nodes.VACUUM_GRIPPER && (
        <primitive
          object={nodes.VACUUM_GRIPPER as unknown as THREE.Object3D}
        />
      )}
      {showSpray && nodes.SPRAY_GUN && (
        <primitive object={nodes.SPRAY_GUN as unknown as THREE.Object3D} />
      )}
      {showGripper && nodes.GRIPPERL && (
        <primitive object={nodes.GRIPPERL as unknown as THREE.Object3D} />
      )}
      {showGripper && nodes.GRIPPERR && (
        <primitive object={nodes.GRIPPERR as unknown as THREE.Object3D} />
      )}
    </group>
  );
};

export default EndEffectors;
