import React, { useRef, useMemo, useCallback, useState, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Performance utilities ────────────────────────────────────────────────────

/** Get adaptive pixel ratio capped at 2 for high-density screens */
function getAdaptivePixelRatio() {
  const dpr = window.devicePixelRatio || 1;
  // Cap at 2 — higher DPR gives diminishing returns but costs GPU
  return Math.min(dpr, 2);
}

const FOV_DEG = 52;
// Widest orbit ring (see `rings` in TechUniverseScene) plus padding for
// node halo + HTML label width, so the fitted camera keeps everything —
// including the outermost ring's labels — inside the frustum.
const MAX_ORBIT_RADIUS = 4.2;
const SCENE_BUFFER = 1.6;

/**
 * Distance the camera needs to sit at (along local z) so a sphere of the
 * given radius fits fully inside the frustum for the CONTAINER's actual
 * aspect ratio — not the window's. This is what actually prevents
 * clipping regardless of what column width this ends up dropped into.
 */
function fitCameraDistance(width, height, radius, fovDeg) {
  if (!width || !height) return 9; // fallback before first measurement
  const aspect = width / height;
  const vFov = THREE.MathUtils.degToRad(fovDeg);
  const distForHeight = radius / Math.tan(vFov / 2);
  const distForWidth = radius / (aspect * Math.tan(vFov / 2));
  return Math.max(distForHeight, distForWidth) * 1.08;
}

// ─── Forces the camera to re-sync on every resize ─────────────────────────────
// Passing camera={{ position, fov }} to <Canvas> mostly configures the camera
// at creation time; if the FIRST size measurement comes in small (e.g. mid
// layout, before the container has settled), the camera can get "stuck"
// fitted to that tiny box and never properly re-fit once the real size comes
// through — which looks exactly like everything shrinking into a corner.
// This component uses useThree to grab the real camera object and forces an
// imperative update + updateProjectionMatrix() every time targetZ/fov change,
// so it's guaranteed to re-sync rather than depending on Canvas prop diffing.
function CameraRig({ targetZ, fov }) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.fov = fov;
    camera.position.set(0, 1.2, targetZ);
    camera.updateProjectionMatrix();
  }, [camera, targetZ, fov]);

  return null;
}

// ─── Camera reactive to mouse — no state update ───────────────────────────────

function CameraReactor({ baseDistance }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, baseDistance));

  useFrame((state) => {
    const pointer = state.pointer;
    // Subtle camera tilt toward cursor, offset from the FITTED distance
    // (not a hardcoded one) so the responsive zoom from the container
    // measurement is respected every frame instead of being overridden.
    targetRef.current.set(pointer.x * 0.4, pointer.y * 0.25 + 1.2, baseDistance);
    camera.position.lerp(targetRef.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Central Core Object ──────────────────────────────────────────────────────

function CentralCore() {
  const outerRef = useRef();
  const innerRef = useRef();

  // Create geometry/material once — never recreated
  const outerGeo = useMemo(() => new THREE.OctahedronGeometry(1.1, 0), []);
  const innerGeo = useMemo(() => new THREE.OctahedronGeometry(0.65, 0), []);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.6, 0.018, 12, 72), []);

  const outerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0EA5E9',
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#38BDF8',
    emissive: '#0284C7',
    emissiveIntensity: 0.9,
    roughness: 0.25,
    metalness: 0.75,
  }), []);

  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#8B5CF6',
    transparent: true,
    opacity: 0.55,
  }), []);

  // Dispose GPU resources on unmount — these are only created once, but
  // still shouldn't be left dangling if the scene ever unmounts.
  useEffect(() => {
    return () => {
      outerGeo.dispose(); innerGeo.dispose(); ringGeo.dispose();
      outerMat.dispose(); innerMat.dispose(); ringMat.dispose();
    };
  }, [outerGeo, innerGeo, ringGeo, outerMat, innerMat, ringMat]);

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.25;
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.35;
      innerRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={outerRef} geometry={outerGeo} material={outerMat} />
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 3.5, 0, 0]} />

      {/* Label — rendered once */}
      <Html position={[0, -1.9, 0]} center distanceFactor={12}>
        <div className="text-center pointer-events-none select-none">
          <div className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
            Nikhil's
          </div>
          <div className="text-[12px] font-heading font-bold tracking-widest text-sky-300 uppercase mt-0.5">
            Tech Stack
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─── Single Orbiting Node ─────────────────────────────────────────────────────

function TechNode({
  skill,
  categoryColor,
  basePosition,
  isActive,       // category is selected or "All"
  isHovered,      // this specific node is hovered
  onHover,        // callback(skillName | null) — never causes re-render in RAF
  orbitAngle,     // radians — phase offset
  orbitRadius,
  orbitSpeed,
}) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const haloRef = useRef();
  const clockRef = useRef(orbitAngle);

  // FIX: geometry is now created ONCE at a fixed base size and never
  // recreated on hover. The old version keyed useMemo off `isHovered`,
  // so every hover/unhover allocated a brand-new GPU geometry and left
  // the previous one undisposed — a steady memory leak the longer
  // someone moves their mouse around the scene. The hover "grow" effect
  // is now done cheaply via `mesh.scale` in useFrame instead.
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.25, 20, 20), []);
  const ringGeo = useMemo(() => new THREE.RingGeometry(0.3, 0.34, 28), []);

  // FIX: material is created once per node (keyed only on categoryColor,
  // which never actually changes post-mount) instead of being recreated
  // on every hover/active change. Visual changes (glow, opacity) are
  // now applied by mutating the existing material's properties.
  const sphereMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: categoryColor,
    emissive: categoryColor,
    roughness: 0.3,
    metalness: 0.6,
    transparent: true,
  }), [categoryColor]);

  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: categoryColor,
    transparent: true,
    side: THREE.DoubleSide,
  }), [categoryColor]);

  // Dispose on unmount (e.g. if the skill list ever changes/filters).
  useEffect(() => {
    return () => {
      sphereGeo.dispose();
      ringGeo.dispose();
      sphereMat.dispose();
      haloMat.dispose();
    };
  }, [sphereGeo, ringGeo, sphereMat, haloMat]);

  // Apply hover/active visual state imperatively — no new GPU objects.
  useEffect(() => {
    sphereMat.emissiveIntensity = isHovered ? 1.6 : (isActive ? 0.65 : 0.15);
    sphereMat.opacity = isActive ? 1 : 0.25;
  }, [sphereMat, isHovered, isActive]);

  useEffect(() => {
    haloMat.opacity = isHovered ? 0.7 : (isActive ? 0.3 : 0.05);
  }, [haloMat, isHovered, isActive]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Orbit animation — mutate angle ref, no state update
    clockRef.current += delta * orbitSpeed * (isActive ? 1 : 0.3);
    const x = Math.cos(clockRef.current) * orbitRadius;
    const z = Math.sin(clockRef.current) * orbitRadius;
    const y = Math.sin(clockRef.current * 1.3) * 0.25 + basePosition[1];

    groupRef.current.position.set(x, y, z);

    // Halo faces camera
    if (haloRef.current) {
      haloRef.current.rotation.y += delta * 0.5;
    }

    // Hover "grow" effect via scale instead of geometry swap
    if (sphereRef.current) {
      const targetScale = isHovered ? 1.2 : 1;
      const s = THREE.MathUtils.lerp(sphereRef.current.scale.x, targetScale, 0.15);
      sphereRef.current.scale.setScalar(s);
    }
  });

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer';
    onHover(skill.name);
  }, [onHover, skill.name]);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = '';
    onHover(null);
  }, [onHover]);

  return (
    <group ref={groupRef} position={basePosition}>
      {/* Main sphere */}
      <mesh
        ref={sphereRef}
        geometry={sphereGeo}
        material={sphereMat}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />

      {/* Halo ring */}
      <mesh ref={haloRef} geometry={ringGeo} material={haloMat} rotation={[Math.PI / 2, 0, 0]} />

      {/* Label — only render on hover. Previously this rendered for every
          node considered "active" (which, under the default 'All' filter,
          is literally every node) — with ~17 nodes drifting independently
          this produced a permanent pile of overlapping text. Hover-only
          keeps it readable and matches how the sidebar list already
          triggers the same hover state. */}
      {isHovered && (
        <Html position={[0, 0.5, 0]} center distanceFactor={10} zIndexRange={[10, 0]}>
          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap pointer-events-none select-none transition-all ${isHovered
                ? 'bg-slate-900/95 border border-sky-400/80 text-sky-300 shadow-md'
                : 'bg-slate-900/70 border border-slate-700/60 text-slate-300'
              }`}
          >
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── All nodes in one scene group ────────────────────────────────────────────

function TechUniverseScene({ allSkills, activeCategory, hoveredSkill, onHover }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow global rotation — no state change
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <CentralCore />

      {allSkills.map((item, idx) => {
        const totalInCategory = allSkills.filter(s => s.category === item.category).length;
        const categoryIdx = allSkills.filter(s => s.category === item.category).indexOf(item);
        const rings = [2.6, 3.5, 4.2]; // MAX_ORBIT_RADIUS constant above must match rings[2]
        const ringIdx = Math.floor(idx / 6) % rings.length;
        const radius = rings[ringIdx];
        const phase = (categoryIdx / totalInCategory) * Math.PI * 2;
        const baseY = (Math.sin(phase * 2) * 0.5) + ((idx % 3 - 1) * 0.4);
        const isActive = activeCategory === 'All' || activeCategory === item.category;
        const isHovered = hoveredSkill === item.name;

        return (
          <TechNode
            key={item.name}
            skill={item}
            categoryColor={item.color}
            basePosition={[0, baseY, 0]}
            isActive={isActive}
            isHovered={isHovered}
            onHover={onHover}
            orbitAngle={phase + idx * 0.3}
            orbitRadius={radius}
            orbitSpeed={0.18 + (idx % 4) * 0.04}
          />
        );
      })}
    </group>
  );
}

// ─── Public Canvas Component ──────────────────────────────────────────────────

export const TechUniverse3D = ({ allSkills, activeCategory, hoveredSkill, onHover }) => {
  const pixelRatio = getAdaptivePixelRatio();
  const wrapperRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // FIX: measure the ACTUAL container box instead of assuming a fixed
  // camera distance of 7 world units works for every layout this gets
  // dropped into. On a narrower column, radius-4.2 orbit rings (plus
  // their labels) were spilling past the visible edge.
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
  // Fallback distance used only for the very first frame before the
  // ResizeObserver has reported a real size — CameraRig immediately
  // corrects this once containerSize updates, so there's no need to gate
  // mounting the Canvas on having a measurement first.
  const cameraZ = fitCameraDistance(width, height, MAX_ORBIT_RADIUS + SCENE_BUFFER, FOV_DEG);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full min-h-[420px] sm:min-h-[520px] relative overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 1.2, cameraZ], fov: FOV_DEG }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, pixelRatio]}
      >
        {/* Minimal lights — fewer draw calls */}
        <ambientLight intensity={0.7} />
        <pointLight position={[8, 8, 8]} intensity={1.4} color="#38BDF8" />
        <pointLight position={[-8, -6, -6]} intensity={0.9} color="#8B5CF6" />

        <CameraRig targetZ={cameraZ} fov={FOV_DEG} />
        <CameraReactor baseDistance={cameraZ} />

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