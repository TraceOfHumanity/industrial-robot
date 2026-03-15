import type {
    IndustrialRobot,
    IndustrialRobotAnimationName,
} from "@/types/industrial-robot";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AnimationAction, AnimationClip, Bone, Group, Mesh, MeshStandardMaterial } from "three";
import { SkeletonUtils, type GLTF } from "three-stdlib";

interface GLTFAction extends AnimationClip {
    name: IndustrialRobotAnimationName;
}
type GLTFResult = GLTF & {
    nodes: {
        WELDING_TORCH: Mesh
        Mesh_5: Mesh
        Mesh_6: Mesh
        DRILL: Mesh
        Cube005: Mesh
        Cube005_1: Mesh
        Cube008: Mesh
        Cube008_1: Mesh
        TWO_FINGER_GRIPPER_2: Mesh
        Mesh_2: Mesh
        Mesh_3: Mesh
        Mesh_4: Mesh
        DRILL_TOP: Mesh
        Cylinder045: Mesh
        Cylinder045_1: Mesh
        Cylinder058: Mesh
        Cylinder058_1: Mesh
        Cylinder036: Mesh
        Cylinder036_1: Mesh
        Cylinder011: Mesh
        Cylinder011_1: Mesh
        Cylinder002: Mesh
        Cylinder002_1: Mesh
        Cylinder: Mesh
        Cylinder_1: Mesh
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
        GLASS_1: Mesh
        GLASS_2: Mesh
        ROOT_BONE: Bone
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
    const groupRef = useRef<Group | null>(null);
    const [activeAnimation, setActiveAnimation] =
        useState<IndustrialRobotAnimationName | null>(null);
    const { scene, animations } = useGLTF("/assets/industrial-robot.glb");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
    const { actions } = useAnimations(animations, groupRef);

    useEffect(() => {
        console.log("nodes", nodes);
    }, [])

    return {
        nodes: nodes as unknown as Record<string, Mesh>,
        materials,
        actions: actions as Record<string, AnimationAction>,
        groupRef: groupRef as RefObject<Group>,
        activeAnimation,
        setActiveAnimation,
    };
};

export default useIndustrialRobot;