const Light = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={100} />
      <pointLight position={[-10, -10, -10]} intensity={100} />
    </>
  );
};

export default Light;
