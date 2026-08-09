import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Individual floating dashboard card ───────────────────────────────────────

function DashboardCard({ position, rotation, label, icon, color, delay = 0, scale = 1 }) {
  const ref = useRef();
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + floatOffset;
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + delay) * 0.12;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.4 + delay) * 0.02;
    ref.current.rotation.y = rotation[1] + Math.cos(t * 0.35 + delay) * 0.02;
  });

  const panelGeo = useMemo(() => new THREE.BoxGeometry(1.4 * scale, 0.9 * scale, 0.04), [scale]);
  const panelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0F172A',
    roughness: 0.15,
    metalness: 0.8,
    transparent: true,
    opacity: 0.92,
  }), []);

  const borderGeo = useMemo(() => new THREE.EdgesGeometry(panelGeo), [panelGeo]);
  const borderMat = useMemo(() => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.7,
  }), [color]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh geometry={panelGeo} material={panelMat} />
      <lineSegments geometry={borderGeo} material={borderMat} />
      <Html
        position={[0, 0, 0.03]}
        center
        distanceFactor={8}
        zIndexRange={[10, 0]}
      >
        <div
          className="flex flex-col items-center justify-center gap-1 pointer-events-none select-none"
          style={{ width: `${100 * scale}px`, textAlign: 'center' }}
        >
          <span className="text-lg">{icon}</span>
          <span className="text-[10px] font-mono font-semibold" style={{ color }}>{label}</span>
        </div>
      </Html>
    </group>
  );
}

// ─── Central glowing platform ─────────────────────────────────────────────────

function CentralPlatform() {
  const ringRef = useRef();
  const coreRef = useRef();

  const ringGeo  = useMemo(() => new THREE.TorusGeometry(1.8, 0.02, 12, 80), []);
  const ring2Geo = useMemo(() => new THREE.TorusGeometry(2.5, 0.01, 12, 80), []);
  const coreGeo  = useMemo(() => new THREE.OctahedronGeometry(0.45, 0), []);

  const ringMat  = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.5 }), []);
  const ring2Mat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#38BDF8', transparent: true, opacity: 0.25 }), []);
  const coreMat  = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0EA5E9',
    emissive: '#00F0FF',
    emissiveIntensity: 1.2,
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  useFrame((_, delta) => {
    if (ringRef.current)  ringRef.current.rotation.z += delta * 0.3;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={ringGeo}  material={ringMat}  ref={ringRef} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={ring2Geo} material={ring2Mat} rotation={[Math.PI / 2, 0.3, 0]} />
      <mesh geometry={coreGeo}  material={coreMat}  ref={coreRef} />
      <Html position={[0, -0.7, 0]} center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none">
          <div className="text-[9px] font-mono tracking-[0.25em] text-sky-400/70 uppercase">GymSaathi</div>
          <div className="text-[11px] font-heading font-bold tracking-wider text-sky-300 uppercase">SaaS Platform</div>
        </div>
      </Html>
    </group>
  );
}

// ─── Particle connectors between modules ──────────────────────────────────────

function ConnectionLines() {
  const points = useMemo(() => {
    const positions = new Float32Array([
      0, 0, 0,   2.2,  1.0,  0.3,
      0, 0, 0,  -2.2,  0.8, -0.3,
      0, 0, 0,   1.8, -1.2,  0.5,
      0, 0, 0,  -1.6, -1.0, -0.5,
      0, 0, 0,   0.2,  1.8, -0.8,
      0, 0, 0,  -0.4, -1.9,  0.4,
      0, 0, 0,   2.8, -0.2,  0.0,
      0, 0, 0,  -2.6,  0.0,  0.2,
    ]);
    return positions;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#38BDF8',
    transparent: true,
    opacity: 0.18,
  }), []);

  return (
    <lineSegments geometry={geo} material={mat} />
  );
}

// ─── Mouse-reactive scene wrapper ─────────────────────────────────────────────

function SceneRoot() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.25, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.12, 0.04);
  });

  const modules = [
    { label: 'Admin Dashboard', icon: '🖥️', color: '#00F0FF', position: [ 2.2,  1.0,  0.3], rotation: [0.05, -0.12, 0.03], delay: 0.0, scale: 1.0 },
    { label: 'Member Management', icon: '👥', color: '#38BDF8', position: [-2.2,  0.8, -0.3], rotation: [0.03,  0.10, -0.02], delay: 0.5, scale: 0.95 },
    { label: 'Workout Planner', icon: '💪', color: '#8B5CF6', position: [ 1.8, -1.2,  0.5], rotation: [-0.05, -0.08, 0.04], delay: 1.0, scale: 0.9 },
    { label: 'Subscriptions', icon: '🔄', color: '#10B981', position: [-1.6, -1.0, -0.5], rotation: [-0.04,  0.12, -0.03], delay: 1.5, scale: 0.9 },
    { label: 'QR Payments', icon: '📲', color: '#F59E0B', position: [ 0.2,  1.8, -0.8], rotation: [ 0.08, -0.05, 0.02], delay: 2.0, scale: 0.85 },
    { label: 'Billing & Invoices', icon: '🧾', color: '#EC4899', position: [-0.4, -1.9,  0.4], rotation: [-0.06,  0.07, -0.04], delay: 2.5, scale: 0.85 },
    { label: 'WhatsApp Alerts', icon: '💬', color: '#22C55E', position: [ 2.8, -0.2,  0.0], rotation: [ 0.02, -0.15,  0.01], delay: 3.0, scale: 0.82 },
    { label: 'Payment Tracking', icon: '💳', color: '#F97316', position: [-2.6,  0.0,  0.2], rotation: [ 0.01,  0.14, -0.02], delay: 3.5, scale: 0.82 },
  ];

  return (
    <group ref={groupRef}>
      <CentralPlatform />
      <ConnectionLines />
      {modules.map((m, i) => (
        <DashboardCard key={i} {...m} />
      ))}
    </group>
  );
}

// ─── Public canvas export ─────────────────────────────────────────────────────

export const GymSaathi3DShowcase = () => (
  <div className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px]">
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[8, 8, 6]}  intensity={1.6} color="#00F0FF" />
      <pointLight position={[-6, -6, -5]} intensity={1.0} color="#8B5CF6" />
      <directionalLight position={[0, 6, 4]} intensity={0.6} />
      <SceneRoot />
    </Canvas>
  </div>
);

export default GymSaathi3DShowcase;
