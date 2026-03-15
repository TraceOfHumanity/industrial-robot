import { useIndustrialRobotContext } from "@/context/industrial-robot";
import type { Object3D } from "three";
import * as THREE from "three";

const MANIPULATOR_NODE_NAMES = new Set([
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
  const allowedChildren = node.children.filter((c) => allowedNames.has(c.name));
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

const Manipulator = () => {
  const { nodes } = useIndustrialRobotContext();
  const root = nodes["ROOT_BONE"];
  if (!root || !("children" in root)) return null;
  const allowedChildren = root.children.filter((c) =>
    MANIPULATOR_NODE_NAMES.has(c.name),
  );
  return (
    <group name="manipulator">
      {allowedChildren.map((child) => (
        <ManipulatorNode
          key={child.uuid}
          node={child}
          allowedNames={MANIPULATOR_NODE_NAMES}
        />
      ))}
    </group>
  );
};

export default Manipulator;
