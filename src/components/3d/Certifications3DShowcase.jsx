import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { certifications } from '../../data/portfolioData';

// Single certification card with hover tilt and subtle icon motion
function CertCard({ data, index }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const basePos = useMemo(() => [index * 2.5 - 2.5, 0, 0], [index]);

  // Animate floating and tilt
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + floatOffset;
    // gentle up‑down bobbing
    ref.current.position.y = Math.sin(t * 0.6) * 0.12 + basePos[1];
    // tilt on hover
    const targetRotX = hovered ? 0.2 : 0;
    const targetRotY = hovered ? Math.sin(t) * 0.2 : 0;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.08);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.08);
    // minor rotation for visual interest when not hovered
    if (!hovered) {
      ref.current.rotation.y += Math.cos(t * 0.3) * 0.005;
    }
  });

  const panelGeo = useMemo(() => new THREE.BoxGeometry(2.4, 1.4, 0.04), []);
  const panelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0F172A',
        roughness: 0.15,
        metalness: 0.8,
        transparent: true,
        opacity: 0.94,
      }),
    []
  );

  const borderGeo = useMemo(() => new THREE.EdgesGeometry(panelGeo), [panelGeo]);
  const borderMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#38BDF8',
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  return (
    <group
      ref={ref}
      position={basePos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh geometry={panelGeo} material={panelMat} />
      <lineSegments geometry={borderGeo} material={borderMat} />
      {/* Icon – moves slightly on hover via CSS transition */}
      <Html position={[0, 0.4, 0.06]} center distanceFactor={10}>
        <div
          className="pointer-events-none select-none"
          style={{
            transition: 'transform 0.3s ease',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-3-3v6"
            />
          </svg>
        </div>
      </Html>
      {/* Details – fade in on hover */}
      <Html position={[0, -0.2, 0.06]} center distanceFactor={10}>
        <div
          className="text-center text-white text-sm transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div className="font-semibold" style={{ color: '#38BDF8' }}>{data.title}</div>
          <div className="text-xs opacity-80">{data.issuer}</div>
        </div>
      </Html>
    </group>
  );
}

export default function Certifications3DShowcase() {
  return (
    <div className="w-full h-[380px] sm:h-[480px] lg:h-[560px]">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#00F0FF" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#8B5CF6" />
        {certifications.map((cert, idx) => (
          <CertCard key={idx} data={cert} index={idx} />
        ))}
      </Canvas>
    </div>
  );
}
