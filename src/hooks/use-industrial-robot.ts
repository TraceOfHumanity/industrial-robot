import { useAppSelector } from "@/store/hooks";
import type { EndEffector } from "@/types/end-effector";
import type {
    IndustrialRobot,
    IndustrialRobotAnimationName,
} from "@/types/industrial-robot";
import type { RobotColor } from "@/types/robot-color";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { AnimationAction, AnimationClip, Bone, Group, Mesh, MeshStandardMaterial, Object3D } from "three";
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
        TWO_FINGER_GRIPPER: Mesh
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
        PALLET: Mesh
    }
    materials: {
        metall: MeshStandardMaterial
        'robot-color': MeshStandardMaterial
        rubber: MeshStandardMaterial
        wood: MeshStandardMaterial
        incision: MeshStandardMaterial
        box: MeshStandardMaterial
        scotch: MeshStandardMaterial
    }
    animations: GLTFAction[]
}

const ROBOT_COLOR_HEX: Record<RobotColor, number> = {
    white: 0xffffff,
    orange: 0xffa500,
    blue: 0x4C8CE4,
    yellow: 0xFFDE42,
    red: 0xEB4C4C,
};

const useIndustrialRobot = (): IndustrialRobot => {
    const groupRef = useRef<Group | null>(null);
    const { scene, animations } = useGLTF("/assets/industrial-robot.glb");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
    const { actions } = useAnimations(animations, groupRef);
    const { robotColor, robotAnimation } = useAppSelector(
        (state) => state.industrialRobotSlice,
    );
    const setEndEffectorVisibility = (endEffector: EndEffector) => {
        const all = [
            "DRILL",
            "DRILL_TOP",
            "WELDING_TORCH",
            "TWO_FINGER_GRIPPER",
            "GRIPPERL",
            "GRIPPERR",
            "VACUUM_GRIPPER",
            "SPRAY_GUN",
        ] as const;

        const nodesRecord = nodes as unknown as Record<string, Object3D>;

        all.forEach((name) => {
            const node = nodesRecord[name];
            if (node) {
                node.visible = false;
            }
        });

        if (endEffector === "SPINDLE") {
            if (nodesRecord.DRILL) {
                nodesRecord.DRILL.visible = true;
            }
            if (nodesRecord.DRILL_TOP) {
                nodesRecord.DRILL_TOP.visible = true;
            }
        }

        if (endEffector === "WELDING_TORCH") {
            if (nodesRecord.WELDING_TORCH) {
                nodesRecord.WELDING_TORCH.visible = true;
            }
        }

        if (endEffector === "TWO_FINGER_GRIPPER") {
            if (nodesRecord.TWO_FINGER_GRIPPER) {
                nodesRecord.TWO_FINGER_GRIPPER.visible = true;
            }
            if (nodesRecord.GRIPPERL) {
                nodesRecord.GRIPPERL.visible = true;
            }
            if (nodesRecord.GRIPPERR) {
                nodesRecord.GRIPPERR.visible = true;
            }
        }

        if (endEffector === "VACUUM_GRIPPER") {
            if (nodesRecord.VACUUM_GRIPPER) {
                nodesRecord.VACUUM_GRIPPER.visible = true;
            }
        }

        if (endEffector === "SPRAY_GUN") {
            if (nodesRecord.SPRAY_GUN) {
                nodesRecord.SPRAY_GUN.visible = true;
            }
        }
    };

    useEffect(() => {
        const hex = ROBOT_COLOR_HEX[robotColor];
        if (materials['robot-color']) {
            materials['robot-color'].color.setHex(hex);
        }
    }, [robotColor, materials]);

    useLayoutEffect(() => {
        Object.values(actions).forEach((action) => {
            if (action) {
                action.stop();
            }
        });
        const next = actions[robotAnimation];
        if (next) {
            next.reset().play();
        }
    }, [robotAnimation, actions]);

    return {
        nodes: nodes as unknown as Record<string, Mesh>,
        materials,
        actions: actions as Record<string, AnimationAction>,
        groupRef: groupRef as RefObject<Group>,
        setEndEffectorVisibility,
    };
};

export default useIndustrialRobot;