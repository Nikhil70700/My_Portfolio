import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const ORBIT_RADIUS = 2.1;


function DeveloperCore() {
  const coreRef = useRef();
  const outerRingRef = useRef();
  const innerCubeRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.25;
      outerRingRef.current.rotation.z += delta * 0.2;
    }
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group scale={1.1}>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.7, 0.025, 16, 80]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>


      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color="#0EA5E9"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={innerCubeRef}>
        <boxGeometry args={[0.65, 0.65, 0.65]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#00F0FF"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}


function TechOrbitNode({ position, color, label, iconText, angleOffset = 0 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * 0.35 + angleOffset;
      groupRef.current.position.x = Math.cos(t) * ORBIT_RADIUS;
      groupRef.current.position.z = Math.sin(t) * ORBIT_RADIUS;
      groupRef.current.position.y = Math.sin(t * 2) * 0.3 + position[1];
    }
  });

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.24, 16, 16), []);
  const sphereMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.8,
  }), [color]);

  return (
    <group ref={groupRef} position={position}>

      <mesh geometry={sphereGeo} material={sphereMat} />


      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.34, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[0, 0.48, 0]} center distanceFactor={8}>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-slate-700/80 text-slate-100 text-[10px] font-mono whitespace-nowrap shadow-lg select-none pointer-events-none">
          <span className="font-bold text-xs" style={{ color }}>{iconText}</span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}


function EcosystemSceneRoot() {
  const sceneRef = useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      const { x, y } = state.pointer;
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, x * 0.3, 0.05);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -y * 0.2, 0.05);
    }
  });

  const nodes = [
    { label: 'React', color: '#00F0FF', iconText: '⚛', angleOffset: 0, y: 0.2 },
    { label: 'Node.js', color: '#10B981', iconText: '⬢', angleOffset: (Math.PI * 2) / 7, y: -0.3 },
    { label: 'MongoDB', color: '#059669', iconText: '🍃', angleOffset: (Math.PI * 4) / 7, y: 0.4 },
    { label: 'MySQL', color: '#38BDF8', iconText: '🐬', angleOffset: (Math.PI * 6) / 7, y: -0.2 },
    { label: 'REST APIs', color: '#A855F7', iconText: '⚡', angleOffset: (Math.PI * 8) / 7, y: 0.3 },
    { label: 'WordPress', color: '#38BDF8', iconText: '🌐', angleOffset: (Math.PI * 10) / 7, y: -0.4 },
    { label: 'AI', color: '#EC4899', iconText: '✨', angleOffset: (Math.PI * 12) / 7, y: 0.1 }
  ];

  return (
    <group ref={sceneRef}>
      <DeveloperCore />
      {nodes.map((node, index) => (
        <TechOrbitNode
          key={index}
          position={[0, node.y, 0]}
          color={node.color}
          label={node.label}
          iconText={node.iconText}
          angleOffset={node.angleOffset}
        />
      ))}
    </group>
  );
}

export const About3DScene = () => {
  return (
    <div className="w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[8, 8, 8]} intensity={1.8} color="#00F0FF" />
        <pointLight position={[-8, -8, -8]} intensity={1.2} color="#8B5CF6" />
        <directionalLight position={[0, 6, 4]} intensity={1.0} color="#38BDF8" />

        <EcosystemSceneRoot />
      </Canvas>
    </div>
  );
};

export default About3DScene;