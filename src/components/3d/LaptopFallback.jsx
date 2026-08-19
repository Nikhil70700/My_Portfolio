import React from 'react';
import { useThree } from '@react-three/fiber';

// Simple placeholder geometry shown while the actual laptop model is loading or fails.
export default function LaptopFallback() {
  const { size } = useThree();
  const scale = size.width < 768 ? 0.6 : 1.0;
  return (
    <group scale={scale} position={[0, -0.5, 0]}>
      {/* A simple box representing the laptop body */}
      <mesh>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#444" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* A thin box representing the laptop lid */}
      <mesh position={[0, 0.05, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.5, 0.02, 1]} />
        <meshStandardMaterial color="#555" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
}
