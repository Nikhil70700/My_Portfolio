import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 2500 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00F0FF');
    const blue = new THREE.Color('#3B82F6');
    const violet = new THREE.Color('#8B5CF6');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const mixedColor = Math.random() > 0.6 ? cyan : (Math.random() > 0.3 ? blue : violet);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.02;
      pointsRef.current.rotation.y -= delta * 0.03;
      
      // Cursor mouse drift parallax
      const { x, y } = state.pointer;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, x * 1.5, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, y * 1.5, 0.05);
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingCoreMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[4, 1, -2]}>
        <icosahedronGeometry args={[2.2, 2]} />
        <MeshDistortMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.35}
          distort={0.3}
          speed={3}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[-4, -2, -3]}>
        <torusGeometry args={[1.8, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

export const DynamicBackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8B5CF6" />
        
        <ParticleField />
        <FloatingCoreMesh />
      </Canvas>
    </div>
  );
};
