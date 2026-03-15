import { useIndustrialRobotContext } from "@/context/industrial-robot";

const Manipulator = () => {
  const { nodes, materials } = useIndustrialRobotContext();
  console.log("nodes", nodes);
  console.log("materials", materials);
  return (
    <group name="manipulator">
      <primitive object={nodes["root-level"]} />  
    </group>
  );
};

export default Manipulator;
