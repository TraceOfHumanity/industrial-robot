import { useIndustrialRobotContext } from "@/context/industrial-robot";

const EndEffectors = () => {
  const { nodes, materials } = useIndustrialRobotContext();
  console.log("nodes", nodes);
  console.log("materials", materials);
  return (
    <group name="end-effectors">
      {/* <mesh
        name="welding-torch"
        geometry={nodes["welding-torch"].geometry}
        material={materials["welding-torch"]}
      /> */}
    </group>
  );
};

export default EndEffectors;
