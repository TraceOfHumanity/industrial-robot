import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IndustrialRobot } from "./Industrial-robot/Industrial-robot";
import IndustrialRobotProvider from "./Industrial-robot/industrial-robot-provider";

const Experience = () => {
  return (
    <Canvas
      className="fixed h-screen w-screen"
      shadows
      eventSource={document.getElementById("root") as HTMLElement}
      eventPrefix="client"
      camera={{ position: [5, 2, 5], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={100} />
      <pointLight position={[-10, -10, -10]} intensity={100} />
      <IndustrialRobotProvider>
        <IndustrialRobot />
      </IndustrialRobotProvider>
      <OrbitControls />
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
};

export default Experience;
