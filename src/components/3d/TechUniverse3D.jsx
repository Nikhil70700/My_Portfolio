import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Central Core Object ──────────────────────────────────────────────────────

function CentralCore() {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.3;
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4;
      innerRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.25;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Polyhedral Frame */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#00F0FF"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 72]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.7} />
      </mesh>

      {/* Centerpiece Text Badge */}
      <Html position={[0, 0, 0]} center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.35)]">
          <div className="text-[9px] font-mono tracking-[0.25em] text-cyan-300 uppercase font-semibold">
            NIKHIL'S
          </div>
          <div className="text-[12px] font-heading font-black tracking-widest text-white uppercase mt-0.5">
            TECH STACK
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─── Orbiting Tech Node ───────────────────────────────────────────────────────

function TechNode({
  skill,
  isActive,
  isHovered,
  onHover,
  orbitAngle,
  orbitRadius,
  orbitSpeed,
  baseY,
}) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const clockRef = useRef(orbitAngle);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.22, 16, 16), []);
  const ringGeo = useMemo(() => new THREE.RingGeometry(0.28, 0.32, 24), []);

  const sphereMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: skill.color,
    emissive: skill.color,
    roughness: 0.25,
    metalness: 0.7,
    transparent: true,
  }), [skill.color]);

  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: skill.color,
    transparent: true,
    side: THREE.DoubleSide,
  }), [skill.color]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    clockRef.current += delta * orbitSpeed * (isActive ? 0.8 : 0.25);
    const x = Math.cos(clockRef.current) * orbitRadius;
    const z = Math.sin(clockRef.current) * orbitRadius;
    const y = Math.sin(clockRef.current * 1.5) * 0.25 + baseY;

    groupRef.current.position.set(x, y, z);

    // Dynamic visual intensity & scale
    sphereMat.emissiveIntensity = isHovered ? 2.0 : (isActive ? 0.9 : 0.2);
    sphereMat.opacity = isActive ? 1 : 0.25;
    haloMat.opacity = isHovered ? 0.8 : (isActive ? 0.4 : 0.1);

    if (sphereRef.current) {
      const targetScale = isHovered ? 1.35 : 1;
      sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onHover(skill.name);
  }, [onHover, skill.name]);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = '';
    onHover(null);
  }, [onHover]);

  return (
    <group ref={groupRef}>
      {/* Node Sphere */}
      <mesh
        ref={sphereRef}
        geometry={sphereGeo}
        material={sphereMat}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />

      {/* Orbit Halo */}
      <mesh geometry={ringGeo} material={haloMat} rotation={[Math.PI / 2, 0, 0]} />

      {/* Tech Label Badge */}
      <Html position={[0, 0.42, 0]} center distanceFactor={8} zIndexRange={[10, 0]}>
        <div
          onClick={() => onHover(skill.name)}
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
            isHovered
              ? 'bg-slate-900 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-110'
              : isActive
              ? 'bg-slate-950/85 border border-slate-700/80 text-slate-200 backdrop-blur-sm'
              : 'bg-slate-950/50 border border-slate-800/40 text-slate-500 opacity-40'
          }`}
        >
          <span className="font-semibold">{skill.name}</span>
        </div>
      </Html>
    </group>
  );
}

// ─── Scene Container ──────────────────────────────────────────────────────────

function TechUniverseScene({ allSkills, activeCategory, hoveredSkill, onHover }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const { y } = state.pointer;
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.15, 0.04);
    }
  });

  const rings = [2.2, 3.0, 3.8];

  return (
    <group ref={groupRef}>
      <CentralCore />

      {allSkills.map((item, idx) => {
        const ringIdx = idx % rings.length;
        const radius = rings[ringIdx];
        const totalInRing = Math.ceil(allSkills.length / rings.length);
        const phase = ((idx % totalInRing) / totalInRing) * Math.PI * 2 + ringIdx * 0.6;
        const baseY = ((idx % 4) - 1.5) * 0.45;
        const isActive = activeCategory === 'All' || activeCategory === item.category;
        const isHovered = hoveredSkill === item.name;

        return (
          <TechNode
            key={item.name}
            skill={item}
            isActive={isActive}
            isHovered={isHovered}
            onHover={onHover}
            orbitAngle={phase}
            orbitRadius={radius}
            orbitSpeed={0.16 + (idx % 3) * 0.03}
            baseY={baseY}
          />
        );
      })}
    </group>
  );
}

// ─── Public Canvas Component ──────────────────────────────────────────────────

export const TechUniverse3D = ({ allSkills, activeCategory, hoveredSkill, onHover }) => {
  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[500px] relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.8, 7.6], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
      >
        <ambientLight intensity={0.75} />
        <pointLight position={[10, 10, 8]} intensity={1.8} color="#00F0FF" />
        <pointLight position={[-10, -8, -6]} intensity={1.2} color="#8B5CF6" />
        <directionalLight position={[0, 8, 4]} intensity={0.8} color="#38BDF8" />

        <TechUniverseScene
          allSkills={allSkills}
          activeCategory={activeCategory}
          hoveredSkill={hoveredSkill}
          onHover={onHover}
        />
      </Canvas>
    </div>
  );
};

export default TechUniverse3D;