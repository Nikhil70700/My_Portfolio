import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// 6 Modern Dev Workflow Stages with ample spacing and alternating heights
const steps = [
  {
    stepNum: '01',
    label: 'Developer',
    position: [-4.6, 0.4, 0],
    color: '#00F0FF',
    labelOffset: [0, 0.55, 0],
    description: 'Human developer orchestrating the software development workflow.',
  },
  {
    stepNum: '02',
    label: 'Prompt Engineering',
    position: [-2.8, -0.4, 0],
    color: '#8B5CF6',
    labelOffset: [0, -0.55, 0],
    description: 'Crafting structured, precise instructions for AI-assisted development.',
  },
  {
    stepNum: '03',
    label: 'Generative AI',
    position: [-0.9, 0.4, 0],
    color: '#A855F7',
    labelOffset: [0, 0.55, 0],
    description: 'Leveraging generative AI capabilities to accelerate development cycles.',
  },
  {
    stepNum: '04',
    label: 'Agentic AI',
    position: [0.9, -0.4, 0],
    color: '#8B5CF6',
    labelOffset: [0, -0.55, 0],
    description: 'Utilizing agentic AI workflows to assist with complex tasks and iterations.',
  },
  {
    stepNum: '05',
    label: 'Code / Development',
    position: [2.8, 0.4, 0],
    color: '#00F0FF',
    labelOffset: [0, 0.55, 0],
    description: 'Engineering clean, scalable, production-ready code.',
  },
  {
    stepNum: '06',
    label: 'Application',
    position: [4.6, -0.4, 0],
    color: '#38BDF8',
    labelOffset: [0, -0.55, 0],
    description: 'Delivering responsive, high-performance web applications.',
  },
];

// Connecting curved tube / cylinder
function PipelineTube({ start, end, highlight }) {
  const midPoint = new THREE.Vector3().addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end)).multiplyScalar(0.5);
  const dir = new THREE.Vector3().subVectors(new THREE.Vector3(...end), new THREE.Vector3(...start));
  const length = dir.length();
  const axis = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir.clone().normalize());

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.03, 0.03, length, 8]} />
      <meshStandardMaterial
        color={highlight ? '#00F0FF' : '#334155'}
        emissive={highlight ? '#00F0FF' : '#0EA5E9'}
        emissiveIntensity={highlight ? 0.8 : 0.2}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Animated energy pulse traveling along the pipeline
function EnergyPulse({ pathPoints }) {
  const ref = useRef();
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(pathPoints.map((p) => new THREE.Vector3(...p))),
    [pathPoints]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.getElapsedTime() * 0.15) % 1;
    const pos = curve.getPointAt(t);
    ref.current.position.set(pos.x, pos.y, pos.z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
    </mesh>
  );
}

export default function ModernDevPipeline() {
  const [hovered, setHovered] = useState(null);
  const pathPoints = useMemo(() => steps.map((s) => s.position), []);

  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[420px] relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[8, 8, 8]} intensity={1.8} color="#00F0FF" />
        <pointLight position={[-8, -8, -8]} intensity={1.2} color="#8B5CF6" />
        <directionalLight position={[0, 6, 4]} intensity={0.9} color="#38BDF8" />

        {/* Nodes */}
        {steps.map((step, i) => (
          <group
            key={i}
            position={step.position}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
          >
            {/* Sphere marker */}
            <mesh scale={hovered === i ? 1.3 : 1}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial
                color={step.color}
                emissive={step.color}
                emissiveIntensity={hovered === i ? 1.8 : 0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Orbit ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.22, 0.26, 24]} />
              <meshBasicMaterial color={step.color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Staggered Clean Label */}
            <Html
              position={step.labelOffset}
              center
              distanceFactor={8}
              zIndexRange={[10, 0]}
            >
              <div
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl transition-all duration-200 pointer-events-none select-none ${
                  hovered === i
                    ? 'bg-slate-900 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-slate-950/90 border border-slate-700/80 shadow-md'
                }`}
              >
                <span className="text-[9px] font-mono text-cyan-400 font-bold">{step.stepNum}</span>
                <span className="text-[11px] font-heading font-bold whitespace-nowrap text-white">
                  {step.label}
                </span>
              </div>
            </Html>
          </group>
        ))}

        {/* Connections */}
        {steps.slice(0, -1).map((_, i) => (
          <PipelineTube
            key={i}
            start={steps[i].position}
            end={steps[i + 1].position}
            highlight={hovered === i || hovered === i + 1}
          />
        ))}

        {/* Traveling energy pulse */}
        <EnergyPulse pathPoints={pathPoints} />
      </Canvas>
    </div>
  );
}
