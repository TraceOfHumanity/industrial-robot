import { useIndustrialRobotContext } from "@/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import type { EndEffector } from "@/types/end-effector.types";
import type { JSX } from "react";
import type { Object3D } from "three";
import * as THREE from "three";

const BASE_MANIPULATOR_NODE_NAMES = new Set([
  "ROOT_BONE",
  "ROOT_LEVEL",
  "BONE_LEVEL_1",
  "BONE_LEVEL_2",
  "BONE_LEVEL_3",
  "LEVEL_1",
  "LEVEL_2",
  "LEVEL_3",
  "LEVEL_4",
  "LEVEL_5",
  "END_EFFECTOR_BONE",
  "IK_BONE",
  "Bone007",
  "Bone008",
  "Bone009",
  "Bone010",
  "Cylinder",
  "Cylinder_1",
  "Cylinder002",
  "Cylinder002_1",
  "Cylinder011",
  "Cylinder011_1",
  "Cylinder036",
  "Cylinder036_1",
  "Cylinder045",
  "Cylinder045_1",
  "Cylinder058",
  "Cylinder058_1",
  "Mesh_1",
  "Mesh_2",
  "Mesh_3",
  "Mesh_4",
  "Mesh_5",
]);

const END_EFFECTOR_NODE_NAMES: Record<EndEffector, string[]> = {
  SPINDLE: ["DRILL_ROTOR_BONE", "DRILL", "DRILL_TOP"],
  WELDING_TORCH: ["WELDING_TORCH_ROTOR_BONE", "WELDING_TORCH"],
  TWO_FINGER_GRIPPER: [
    "TWO_FINGER_GRIPPER_ROTOR",
    "TWO_FINGER_GRIPPER",
    "GRIPPER_BONEL",
    "GRIPPER_BONER",
    "GRIPPERL",
    "GRIPPERR",
  ],
  VACUUM_GRIPPER: ["VACUUM_GRIPPER_ROTOR_BONE", "VACUUM_GRIPPER"],
  SPRAY_GUN: [
    "SPRAY_GUN_FOLLOW_BONE",
    "SPRAY_GUN_ROTOR_BONE",
    "SPRAY_GUN",
  ],
};

const GROUPS_WITH_UNNAMED_MESHES = new Set([
  "GRIPPERL",
  "GRIPPERR",
  "VACUUM_GRIPPER",
  "SPRAY_GUN",
]);

const isMesh = (obj: Object3D): obj is THREE.Mesh =>
  obj.type === "Mesh" && "geometry" in obj && "material" in obj;

const ManipulatorNode = ({
  node,
  allowedNames,
}: {
  node: Object3D;
  allowedNames: Set<string>;
}) => {
  if (isMesh(node)) {
    return (
      <mesh
        name={node.name}
        geometry={node.geometry}
        material={node.material}
        position={node.position.clone()}
        rotation={node.rotation.clone()}
        scale={node.scale.clone()}
      />
    );
  }
  const includeAllMeshes =
    node.type === "Group" && GROUPS_WITH_UNNAMED_MESHES.has(node.name);
  const allowedChildren = node.children.filter(
    (c) => allowedNames.has(c.name) || (includeAllMeshes && isMesh(c)),
  );
  return (
    <group
      name={node.name}
      position={node.position.clone()}
      rotation={node.rotation.clone()}
      scale={node.scale.clone()}
    >
      {allowedChildren.map((child) => (
        <ManipulatorNode
          key={child.uuid}
          node={child}
          allowedNames={allowedNames}
        />
      ))}
    </group>
  );
};

const Manipulator = (): JSX.Element | null => {
  const { nodes } = useIndustrialRobotContext();
  const { endEffector } = useAppSelector((state) => state.industrialRobotSlice);
  const allowedNames = new Set([
    ...BASE_MANIPULATOR_NODE_NAMES,
    ...(END_EFFECTOR_NODE_NAMES[endEffector] ?? []),
  ]);
  const root = nodes["ROOT_BONE"];
  if (!root || !("children" in root)) return null;
  const allowedChildren = root.children.filter((c) => allowedNames.has(c.name));
  return (
    <group name="manipulator">
      {allowedChildren.map((child) => (
        <ManipulatorNode
          key={child.uuid}
          node={child}
          allowedNames={allowedNames}
        />
      ))}
    </group>
  );
};

export default Manipulator;
