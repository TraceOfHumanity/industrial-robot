import { useIndustrialRobotContext } from "@/context/industrial-robot";
import type { Object3D } from "three";
import * as THREE from "three";

const isMesh = (obj: Object3D): obj is THREE.Mesh =>
  obj.type === "Mesh" && "geometry" in obj && "material" in obj;

const ManipulatorNode = ({ node }: { node: Object3D }) => {
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
  return (
    <group
      name={node.name}
      position={node.position.clone()}
      rotation={node.rotation.clone()}
      scale={node.scale.clone()}
    >
      {node.children.map((child) => (
        <ManipulatorNode key={child.uuid} node={child} />
      ))}
    </group>
  );
};

const Manipulator = () => {
  const { nodes } = useIndustrialRobotContext();
  const root = nodes["Bone"] ?? nodes["root-level"];
  if (!root || !("children" in root)) return null;
  return (
    <group name="manipulator">
      {root.children.map((child) => (
        <ManipulatorNode key={child.uuid} node={child} />
      ))}
    </group>
  );
};

export default Manipulator;