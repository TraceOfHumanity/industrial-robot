import type { RefObject } from "react";
import { AnimationAction, Group, Mesh, MeshStandardMaterial } from "three";

export type IndustrialRobot = {
    nodes: Record<string, Mesh>;
    materials: Record<string, MeshStandardMaterial>;
    actions: Record<string, AnimationAction>;
    groupRef: RefObject<Group>;
}