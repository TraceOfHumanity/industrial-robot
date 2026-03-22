import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IndustrialRobot } from "./components/Industrial-robot/Industrial-robot";
import IndustrialRobotProvider from "./components/Industrial-robot/industrial-robot-provider";
import Light from "./components/light";

const Experience = () => {
  return (
    <Canvas
      className="fixed h-screen w-screen"
      shadows
      eventSource={document.getElementById("root") as HTMLElement}
      eventPrefix="client"
      camera={{ position: [5, 2, 5], fov: 50 }}
    >
      <Light />
      <Environment preset="city" environmentIntensity={0.5} />
      <IndustrialRobotProvider>
        <IndustrialRobot />
      </IndustrialRobotProvider>
      <OrbitControls
        maxDistance={10}
        minDistance={2}
        maxPolarAngle={Math.PI / 2.1}
      />
      <gridHelper args={[10, 10, 0xffffff]} />
    </Canvas>
  );
};

export default Experience;
