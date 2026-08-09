import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central Futuristic Developer Core Object
function CentralCore({ isMobile }) {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.25;
      outerMeshRef.current.rotation.y += delta * 0.35;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x += delta * 0.2;
    }
  });

  const coreScale = isMobile ? 0.9 : 1.3;

  return (
    <group scale={coreScale}>
      {/* Outer Polyhedral Mesh */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.4}
          distort={0.25}
          speed={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Glowing Energy Core */}
      <mesh ref={innerMeshRef}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#00F0FF"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Single Tech Satellite Node Component
function TechNode({ position, color, label, iconText, delay = 0, isMobile }) {
  const nodeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (nodeRef.current) {
      const t = state.clock.getElapsedTime() + delay;
      nodeRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
      nodeRef.current.rotation.y += 0.01;
    }
  });

  const adjustedPos = isMobile
    ? [position[0] * 0.65, position[1] * 0.65, position[2] * 0.65]
    : position;

  return (
    <group ref={nodeRef} position={adjustedPos}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isMobile ? 0.28 : 0.35, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Outer Halo Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isMobile ? 0.35 : 0.45, isMobile ? 0.38 : 0.48, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Crisp 3D HTML Label */}
      <Html
        position={[0, isMobile ? 0.5 : 0.6, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono whitespace-nowrap transition-all duration-300 pointer-events-none select-none ${
            hovered
              ? 'bg-obsidian-900/90 border-cyanGlow text-cyanGlow shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110'
              : 'bg-obsidian-950/80 border-gray-700/60 text-gray-200 backdrop-blur-md'
          }`}
        >
          <span className="font-bold text-xs" style={{ color }}>
            {iconText}
          </span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

// React 3D Icon Element
function ReactAtomicNode({ position, isMobile }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
      groupRef.current.rotation.z += delta * 0.4;
    }
  });

  const pos = isMobile ? [position[0] * 0.65, position[1] * 0.65, position[2] * 0.65] : position;
  const radius = isMobile ? 0.45 : 0.6;

  return (
    <group position={pos}>
      <group ref={groupRef}>
        {/* Core Nucleus */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1} />
        </mesh>
        {/* 3 Atomic Electron Orbits */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 50]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 50]} />
          <meshBasicMaterial color="#61DAFB" transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[radius, 0.02, 16, 50]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
        </mesh>
      </group>

      <Html position={[0, isMobile ? 0.6 : 0.8, 0]} center distanceFactor={10}>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-950/80 border border-cyanGlow/50 text-cyanGlow text-[11px] font-mono whitespace-nowrap backdrop-blur-md select-none pointer-events-none">
          <span className="font-bold text-xs">⚛</span>
          <span>React</span>
        </div>
      </Html>
    </group>
  );
}

// Main Interactive Scene Manager
function InteractiveScene({ isMobile }) {
  const sceneGroupRef = useRef();

  // Subtle Mouse Parallax Reaction
  useFrame((state) => {
    if (sceneGroupRef.current) {
      const { x, y } = state.pointer;
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        x * (isMobile ? 0.15 : 0.35),
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -y * (isMobile ? 0.1 : 0.25),
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef}>
      {/* Central 3D Developer Core */}
      <CentralCore isMobile={isMobile} />

      {/* React 3D Node */}
      <ReactAtomicNode position={[-2.8, 1.6, 0.5]} isMobile={isMobile} />

      {/* Code Node */}
      <TechNode
        position={[2.8, 1.8, -0.2]}
        color="#38BDF8"
        label="Code"
        iconText="</>"
        delay={0.5}
        isMobile={isMobile}
      />

      {/* Node.js Node */}
      <TechNode
        position={[3.2, -1.2, 0.3]}
        color="#10B981"
        label="Node.js"
        iconText="⬢"
        delay={1.0}
        isMobile={isMobile}
      />

      {/* Database Node */}
      <TechNode
        position={[-3.0, -1.4, -0.4]}
        color="#F59E0B"
        label="Database"
        iconText="🗄️"
        delay={1.5}
        isMobile={isMobile}
      />

      {/* APIs Node */}
      <TechNode
        position={[0, 2.5, -1.0]}
        color="#A855F7"
        label="APIs"
        iconText="⚡"
        delay={2.0}
        isMobile={isMobile}
      />

      {/* Git Node */}
      <TechNode
        position={[-1.8, -2.4, 0.8]}
        color="#F97316"
        label="Git"
        iconText="⎇"
        delay={2.5}
        isMobile={isMobile}
      />

      {/* AI Node */}
      <TechNode
        position={[1.9, -2.5, 0.6]}
        color="#EC4899"
        label="AI"
        iconText="✨"
        delay={3.0}
        isMobile={isMobile}
      />
    </group>
  );
}

export const Hero3DScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative min-h-[350px] sm:min-h-[480px] lg:min-h-[580px] flex items-center justify-center pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8.5 : 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8B5CF6" />
        <directionalLight position={[0, 5, 5]} intensity={1.0} color="#3B82F6" />

        <InteractiveScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
