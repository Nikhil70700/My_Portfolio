import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

// Simple laptop placeholder: a box (base) and a thin box (lid) that rotates.
export default function LaptopModel({ openProgress = 1 }) {
  const lidRef = useRef();

  // Animate lid rotation based on progress (1 = open, 0 = closed)
  useFrame(() => {
    if (lidRef.current) {
      const maxAngle = Math.PI / 2; // 90° open
      lidRef.current.rotation.x = -maxAngle * (1 - openProgress);
    }
  });

  // Scale for responsiveness
  const scale = window.innerWidth < 768 ? 0.6 : 1.0;

  return (
    <group scale={scale} position={[0, -0.5, 0]}>
      {/* Base of the laptop */}
      <Box args={[1.5, 0.1, 1]}>
        <meshStandardMaterial color="#222" />
      </Box>
      {/* Lid – thin box that rotates */}
      <Box
        ref={lidRef}
        args={[1.5, 0.02, 1]}
        position={[0, 0.06, -0.5]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#111" />
      </Box>
    </group>
  );
}

// No GLTF preload needed for placeholder

