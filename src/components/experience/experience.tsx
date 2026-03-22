import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IndustrialRobot } from "./Industrial-robot/Industrial-robot";
import IndustrialRobotProvider from "./Industrial-robot/industrial-robot-provider";
import { SmoothRobotGrid } from "./smooth-robot-grid";
import { useAppSelector } from "@/store/hooks";

const Experience = () => {
  const { robotColor } = useAppSelector((state) => state.industrialRobotSlice);
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
      <Environment preset="sunset" environmentIntensity={0.5} />
      <IndustrialRobotProvider>
        <IndustrialRobot />
      </IndustrialRobotProvider>
      <OrbitControls
        maxDistance={10}
        minDistance={2}
        maxPolarAngle={Math.PI / 2.1}
      />
      <SmoothRobotGrid robotColor={robotColor} />
    </Canvas>
  );
};

export default Experience;
