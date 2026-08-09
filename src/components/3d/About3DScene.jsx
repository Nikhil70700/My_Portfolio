import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Fixed world-space geometry. We no longer branch these on a device
// guess — the camera distance below adapts to whatever container size
// actually exists, so the ring/labels always fit regardless of layout.
const ORBIT_RADIUS = 2.3;
const FOV_DEG = 48;
// Extra world-space padding to account for the node sphere, halo ring,
// and — critically — the width of the HTML label text, which isn't part
// of the 3D bounding sphere but still needs to stay inside the frustum.
const LABEL_BUFFER = 1.15;

// Professional Central Developer Core Structure
function DeveloperCore({ compact }) {
  const coreRef = useRef();
  const outerRingRef = useRef();
  const innerCubeRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2;
      outerRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * 0.4;
      innerCubeRef.current.rotation.x += delta * 0.2;
    }
  });

  const scale = compact ? 0.85 : 1.15;

  return (
    <group scale={scale}>
      {/* Outer Sleek Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.8, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Main Core Frame */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#1E293B"
          wireframe
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Solid Tech Crystal */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#0EA5E9"
          emissive="#0284C7"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// Single Tech Node Component
function TechOrbitNode({ position, color, label, iconText, angleOffset = 0, compact }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * 0.4 + angleOffset;
      groupRef.current.position.x = Math.cos(t) * ORBIT_RADIUS;
      groupRef.current.position.z = Math.sin(t) * ORBIT_RADIUS;
      groupRef.current.position.y = Math.sin(t * 2) * 0.35 + position[1];
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Node Sphere */}
      <mesh>
        <sphereGeometry args={[compact ? 0.22 : 0.28, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Subdued Halo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[compact ? 0.26 : 0.33, compact ? 0.29 : 0.36, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML Badge Label */}
      <Html position={[0, compact ? 0.45 : 0.55, 0]} center distanceFactor={10}>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-[11px] font-mono whitespace-nowrap backdrop-blur-md shadow-md pointer-events-none select-none">
          <span className="font-bold text-xs" style={{ color }}>
            {iconText}
          </span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

// Master Scene Manager
function ProfessionalEcosystemScene({ compact }) {
  const sceneRef = useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      const { x, y } = state.pointer;
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        x * 0.25,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        -y * 0.15,
        0.05
      );
    }
  });

  const nodes = [
    { label: 'React', color: '#38BDF8', iconText: '⚛', angleOffset: 0, y: 0.2 },
    { label: 'Node.js', color: '#10B981', iconText: '⬢', angleOffset: (Math.PI * 2) / 7, y: -0.3 },
    { label: 'MongoDB', color: '#059669', iconText: '🍃', angleOffset: (Math.PI * 4) / 7, y: 0.4 },
    { label: 'MySQL', color: '#0284C7', iconText: '🐬', angleOffset: (Math.PI * 6) / 7, y: -0.2 },
    { label: 'REST APIs', color: '#A855F7', iconText: '⚡', angleOffset: (Math.PI * 8) / 7, y: 0.3 },
    { label: 'WordPress', color: '#38BDF8', iconText: '🌐', angleOffset: (Math.PI * 10) / 7, y: -0.4 },
    { label: 'AI', color: '#EC4899', iconText: '✨', angleOffset: (Math.PI * 12) / 7, y: 0.1 }
  ];

  return (
    <group ref={sceneRef}>
      <DeveloperCore compact={compact} />
      {nodes.map((node, index) => (
        <TechOrbitNode
          key={index}
          position={[0, node.y, 0]}
          color={node.color}
          label={node.label}
          iconText={node.iconText}
          angleOffset={node.angleOffset}
          compact={compact}
        />
      ))}
    </group>
  );
}

// Computes the camera distance needed so a sphere of `radius` (in world
// units) fits fully inside the view frustum for the GIVEN container
// aspect ratio — not the window's aspect ratio. This is the key fix:
// previously the zoom level was picked from `window.innerWidth`, which
// has nothing to do with how wide the actual canvas box is once it's
// sitting in a narrower grid column, so content spilled past the edges.
function fitCameraDistance(width, height, radius, fovDeg) {
  if (!width || !height) return 8; // sane fallback before first measurement
  const aspect = width / height;
  const vFov = THREE.MathUtils.degToRad(fovDeg);
  const distForHeight = radius / Math.tan(vFov / 2);
  const distForWidth = radius / (aspect * Math.tan(vFov / 2));
  // Whichever dimension is more constrained (narrower) wins, then add a
  // small safety margin so nothing touches the very edge of the box.
  return Math.max(distForHeight, distForWidth) * 1.08;
}

export const About3DScene = () => {
  const wrapperRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height } = containerSize;
  // "compact" only controls visual sizing of geometry/labels (smaller
  // icons/text on small boxes) — it no longer drives the camera zoom.
  const compact = width > 0 && width < 420;
  const cameraZ = fitCameraDistance(width, height, ORBIT_RADIUS + LABEL_BUFFER, FOV_DEG);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full min-h-[320px] sm:min-h-[420px] relative flex items-center justify-center pointer-events-auto overflow-hidden"
    >
      {/* Only mount the Canvas once we have a real measurement, so the
          very first frame isn't rendered with the fallback distance and
          then visibly "snaps" into place. */}
      {width > 0 && height > 0 && (
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: FOV_DEG }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#38BDF8" />
          <pointLight position={[-10, -10, -10]} intensity={1.0} color="#8B5CF6" />
          <directionalLight position={[0, 5, 5]} intensity={0.8} />

          <ProfessionalEcosystemScene compact={compact} />
        </Canvas>
      )}
    </div>
  );
};

export default About3DScene;