import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

// ─── Central Futuristic Developer Core ─────────────────────────────────────────

function CentralCore() {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();

  useFrame((_, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.08;
      outerMeshRef.current.rotation.y += delta * 0.12;
    }
    if (innerMeshRef.current) {
      innerRef.current.rotation.y -= delta * 0.15;
    }
  });

  // Sleek geometric core structure
  const innerRef = useRef();

  return (
    <group scale={1.15}>
      {/* Outer sleek cage */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#0284C7"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Inner solid energy core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#00F0FF"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// ─── Tech Satellite Node ───────────────────────────────────────────────────────

function TechNode({ position, color, label, iconText, orbitOffset = 0, radius = 3 }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const phaseRef = useRef(orbitOffset);

  // Slow orbital movement
  useFrame((state, delta) => {
    if (groupRef.current) {
      phaseRef.current += delta * 0.15; // Slow cinematic orbit
      const x = Math.cos(phaseRef.current) * radius;
      const z = Math.sin(phaseRef.current) * radius;
      // Slight vertical bobbing based on position and time
      const y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + orbitOffset) * 0.3;
      groupRef.current.position.set(x, y, z);
    }
  });

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.3, 16, 16), []);
  const haloGeo = useMemo(() => new THREE.RingGeometry(0.38, 0.42, 24), []);
  const sphereMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: hovered ? 1.5 : 0.8,
    roughness: 0.2,
    metalness: 0.8,
  }), [color, hovered]);
  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: hovered ? 0.8 : 0.4,
    side: THREE.DoubleSide
  }), [color, hovered]);

  return (
    <group ref={groupRef}>
      <mesh
        geometry={sphereGeo}
        material={sphereMat}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <mesh geometry={haloGeo} material={haloMat} rotation={[Math.PI / 2, 0, 0]} />

      <Html position={[0, 0.6, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono whitespace-nowrap transition-all duration-300 pointer-events-none select-none ${hovered
              ? 'bg-obsidian-900/95 border-cyanGlow text-cyanGlow shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110'
              : 'bg-obsidian-950/80 border-gray-700/60 text-gray-200 backdrop-blur-md'
            }`}
        >
          <span className="font-bold text-xs" style={{ color }}>{iconText}</span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}



function InteractiveScene() {
  const sceneGroupRef = useRef();
  const { viewport } = useThree();


  const isDesktop = viewport.width > viewport.height;

  const targetX = isDesktop ? viewport.width * 0.22 : 0;

  const scale = isDesktop ? 1 : 0.75;


  useFrame((state, delta) => {
    if (sceneGroupRef.current) {
      const { x, y } = state.pointer;
      // Lerp position to targetX + parallax
      const targetPosX = targetX + x * 0.5;
      const targetPosY = isDesktop ? -y * 0.5 : 1.0 - y * 0.3; // Push up slightly on mobile so it doesn't overlap text

      sceneGroupRef.current.position.x = THREE.MathUtils.lerp(sceneGroupRef.current.position.x, targetPosX, 0.05);
      sceneGroupRef.current.position.y = THREE.MathUtils.lerp(sceneGroupRef.current.position.y, targetPosY, 0.05);

      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        x * 0.15,
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef} scale={scale} position={[targetX, 0, 0]}>
      <CentralCore />

      {/* 6 Curated Tech Nodes with clean orbital distribution */}
      <TechNode position={[0, 1.2, 0]} radius={2.8} orbitOffset={0} color="#00F0FF" label="React" iconText="⚛" />
      <TechNode position={[0, -1.0, 0]} radius={3.2} orbitOffset={Math.PI / 3} color="#10B981" label="Node.js" iconText="⬢" />
      <TechNode position={[0, 0.8, 0]} radius={3.0} orbitOffset={(Math.PI * 2) / 3} color="#059669" label="MongoDB" iconText="🍃" />
      <TechNode position={[0, -1.5, 0]} radius={3.4} orbitOffset={Math.PI} color="#A855F7" label="APIs" iconText="⚡" />
      <TechNode position={[0, 1.5, 0]} radius={2.7} orbitOffset={(Math.PI * 4) / 3} color="#F97316" label="Git" iconText="⎇" />
      <TechNode position={[0, -0.5, 0]} radius={3.5} orbitOffset={(Math.PI * 5) / 3} color="#EC4899" label="AI" iconText="✨" />
    </group>
  );
}

export const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* We allow pointer-events on the Canvas to capture interactions but keep the container passthrough if needed.
          Actually we need pointer-events-auto on the canvas wrapper so it receives mouse. */}
      <div className="w-full h-full pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8B5CF6" />
          <directionalLight position={[0, 5, 5]} intensity={1.0} color="#3B82F6" />

          <Suspense fallback={null}>
            <InteractiveScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Hero3DScene;