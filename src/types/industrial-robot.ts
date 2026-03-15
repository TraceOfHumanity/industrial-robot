import { AnimationAction, Mesh, MeshStandardMaterial } from "three";

export type IndustrialRobot = {
    nodes: Record<string, Mesh>;
    materials: Record<string, MeshStandardMaterial>;
    actions: Record<string, AnimationAction>;
}