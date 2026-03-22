import { Environment } from "@react-three/drei";

const Light = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={100} />
      <pointLight position={[-10, -10, -10]} intensity={100} />
      <Environment preset="city" environmentIntensity={0.5} />
    </>
  );
};

export default Light;
