import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 300 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00F0FF');
    const violet = new THREE.Color('#8B5CF6');

    for (let i = 0; i < count; i++) {
      // Wide spread to cover the background cleanly
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // Keep particles slightly back

      const mixedColor = Math.random() > 0.5 ? cyan : violet;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Extremely slow drift
      pointsRef.current.rotation.x -= delta * 0.008;
      pointsRef.current.rotation.y -= delta * 0.012;
      
      // Very subtle mouse parallax
      const { x, y } = state.pointer;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, x * 0.5, 0.02);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, y * 0.5, 0.02);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export const DynamicBackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]} // Limit DPR for background performance
      >
        <ambientLight intensity={0.2} />
        <ParticleField count={350} />
      </Canvas>
    </div>
  );
};

export default DynamicBackgroundCanvas;
