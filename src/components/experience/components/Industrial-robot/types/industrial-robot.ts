import type { RefObject } from "react";
import { AnimationAction, Group, Mesh, MeshStandardMaterial } from "three";
import type { EndEffector } from "./end-effector";

export type IndustrialRobot = {
    nodes: Record<string, Mesh>;
    materials: Record<string, MeshStandardMaterial>;
    actions: Record<string, AnimationAction>;
    groupRef: RefObject<Group>;
    setEndEffectorVisibility: (endEffector: EndEffector) => void;
};
