import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import { PerspectiveCamera } from "@react-three/drei";

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Box position={[0, 0, 0]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    </Canvas>
  );
}
