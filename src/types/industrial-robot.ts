import type { RefObject } from "react";
import { AnimationAction, Group, Mesh, MeshStandardMaterial } from "three";

export type IndustrialRobotAnimationName =
    | "bore-enlarge"
    | "circular-path"
    | "contour-cut"
    | "drill-plunge"
    | "linear-seam"
    | "move-glass-panel"
    | "spot-weld"
    | "stack-items-on-pallet";

export type IndustrialRobot = {
    nodes: Record<string, Mesh>;
    materials: Record<string, MeshStandardMaterial>;
    actions: Record<string, AnimationAction>;
    groupRef: RefObject<Group>;
    activeAnimation: IndustrialRobotAnimationName | null;
    setActiveAnimation: (name: IndustrialRobotAnimationName | null) => void;
};