import type { IndustrialRobot } from "@/types/industrial-robot";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AnimationAction, AnimationClip, Bone, Group, Mesh, MeshStandardMaterial } from "three";
import { SkeletonUtils, type GLTF } from "three-stdlib";

type ActionName =
    | "bore-enlarge"
    | "circular-path"
    | "contour-cut"
    | "drill-plunge"
    | "linear-seam"
    | "move-glass-panel"
    | "spot-weld"
    | "stack-items-on-pallet";

interface GLTFAction extends AnimationClip {
    name: ActionName;
}

type GLTFResult = GLTF & {
    nodes: {
        ['welding-torch_1']: Mesh
        Mesh_5: Mesh
        Mesh_6: Mesh
        drill: Mesh
        Cube005: Mesh
        Cube005_1: Mesh
        Cube008: Mesh
        Cube008_1: Mesh
        ['two-finger-gripper-2']: Mesh
        Mesh_2: Mesh
        Mesh_3: Mesh
        Mesh_4: Mesh
        Cylinder045: Mesh
        Cylinder045_1: Mesh
        ['drill-top']: Mesh
        Cylinder058: Mesh
        Cylinder058_1: Mesh
        Cylinder036: Mesh
        Cylinder036_1: Mesh
        Cylinder011: Mesh
        Cylinder011_1: Mesh
        Cylinder002: Mesh
        Cylinder002_1: Mesh
        Cylinder_1: Mesh
        Cylinder_2: Mesh
        Object_0: Mesh
        Object_0_1: Mesh
        Cube014: Mesh
        Cube014_1: Mesh
        Cube004: Mesh
        Cube004_1: Mesh
        Cube006: Mesh
        Cube006_1: Mesh
        Cube009: Mesh
        Cube009_1: Mesh
        ['glass-1']: Mesh
        ['glass-2']: Mesh
        Bone: Bone
    }
    materials: {
        metall: MeshStandardMaterial
        white: MeshStandardMaterial
        rubber: MeshStandardMaterial
        wood: MeshStandardMaterial
        incision: MeshStandardMaterial
        box: MeshStandardMaterial
        scotch: MeshStandardMaterial
    }
    animations: GLTFAction[]
}

const useIndustrialRobot = (): IndustrialRobot => {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF("/assets/industrial-robot.glb");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
    const { actions } = useAnimations(animations, group);

    return {
        nodes: nodes as unknown as Record<string, Mesh>,
        materials,
        actions: actions as Record<string, AnimationAction>,
    }
};

export default useIndustrialRobot;