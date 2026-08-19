import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Floating education card component
function EduCard({ position, rotation, title, institution, duration, color = '#00F0FF' }) {
  const ref = useRef();
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + floatOffset;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.12;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.4) * 0.02;
    ref.current.rotation.y = rotation[1] + Math.cos(t * 0.35) * 0.02;
  });

  const panelGeo = useMemo(() => new THREE.BoxGeometry(2.2, 1.2, 0.04), []);
  const panelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0F172A',
    roughness: 0.15,
    metalness: 0.8,
    transparent: true,
    opacity: 0.92,
  }), []);
  // Border geometry based on panel edges
  const borderGeo = useMemo(() => new THREE.EdgesGeometry(panelGeo), [panelGeo]);
  const borderMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#00F0FF', linewidth: 1 }), []);



  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh geometry={panelGeo} material={panelMat} />
      <lineSegments geometry={borderGeo} material={borderMat} />
      <Html position={[0, 0, 0.05]} center distanceFactor={10}>
        <div className="pointer-events-none select-none text-center" style={{ color: '#fff' }}>
          <div className="font-heading font-bold text-sm" style={{ color }}>{title}</div>
          <div className="text-xs" style={{ opacity: 0.8 }}>{institution}</div>
          <div className="text-xs opacity-70">{duration}</div>
        </div>
      </Html>
    </group>
  );
}

function Education3DShowcase() {
  const cards = [
    {
      title: 'MASTER OF COMPUTER APPLICATIONS',
      institution: 'JIS College of Engineering, Kalyani, West Bengal, India',
      duration: '08/2022 – 08/2024',
      position: [2.2, 1.0, 0.3],
      rotation: [0.05, -0.12, 0.03],
      color: '#00F0FF',
    },
    {
      title: 'BACHELOR OF SCIENCE — INFORMATION TECHNOLOGY',
      institution: 'Marwari College, Bhagalpur, Bihar, India',
      duration: '08/2018 – 02/2022',
      position: [-2.2, 0.8, -0.3],
      rotation: [0.03, 0.10, -0.02],
      color: '#38BDF8',
    },
    {
      title: 'HIGHER SECONDARY EDUCATION — INFORMATION TECHNOLOGY',
      institution: 'Jawahar Navodaya Vidyalaya, Katihar, Bihar, India',
      duration: '08/2016 – 08/2018',
      position: [0.2, 1.8, -0.8],
      rotation: [0.08, -0.05, 0.02],
      color: '#F59E0B',
    },
  ];

  return (
    <div className="w-full h-[380px] sm:h-[480px] lg:h-[560px]">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#00F0FF" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#8B5CF6" />
        {cards.map((c, i) => (
          <EduCard
            key={i}
            position={c.position}
            rotation={c.rotation}
            title={c.title}
            institution={c.institution}
            duration={c.duration}
            color={c.color}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default Education3DShowcase;
