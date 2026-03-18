import type { RefObject } from "react";
import { AnimationAction, Group, Mesh, MeshStandardMaterial } from "three";
import type { EndEffector } from "./end-effector.types";

export type IndustrialRobotAnimationName =
    | "linear-seam"
    | "circular-path"
    | "spot-weld"
    | "spiral-coverage"
    | "stack-items-on-pallet"
    | "move-glass-panel"
    | "drill-plunge";

export type IndustrialRobot = {
    nodes: Record<string, Mesh>;
    materials: Record<string, MeshStandardMaterial>;
    actions: Record<string, AnimationAction>;
    groupRef: RefObject<Group>;
    setEndEffectorVisibility: (endEffector: EndEffector) => void;
};