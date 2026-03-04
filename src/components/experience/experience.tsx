import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Model } from "./Industrial-robot"

const Experience = () => {
    return (
        <Canvas
            className="fixed h-screen w-screen"
            shadows
            eventSource={document.getElementById("root") as HTMLElement}
            eventPrefix="client"
            // camera={{ position: [12, 6, 15], fov: 50 }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {/* <mesh
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={[1, 1, 1]}
            >
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh> */}
            <Model />
            <OrbitControls />
            <gridHelper args={[10, 10]} />
        </Canvas>
    )
}

export default Experience