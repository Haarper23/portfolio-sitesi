"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Module-level data — generated once, outside render (satisfies react-hooks/purity)
function buildRingData(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = 2.8 + (Math.random() - 0.5) * 1.2;
    const y = (Math.random() - 0.5) * 0.5;
    pos[i * 3]     = Math.cos(angle) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(angle) * r;
  }
  return pos;
}

function buildDungeonVerts(): Float32Array {
  const v: number[] = [];
  const l = (x1: number, y1: number, x2: number, y2: number) => {
    v.push(x1, y1, -0.8, x2, y2, -0.8);
  };
  l(-2.5, 0, -0.9, 0); l(0.9, 0, 2.5, 0);
  l(0, -2.5, 0, -0.9); l(0, 0.9, 0, 2.5);
  const room = (cx: number, cy: number, w: number, h: number) => {
    const hw = w / 2, hh = h / 2;
    l(cx - hw, cy - hh, cx + hw, cy - hh);
    l(cx - hw, cy + hh, cx + hw, cy + hh);
    l(cx - hw, cy - hh, cx - hw, cy + hh);
    l(cx + hw, cy - hh, cx + hw, cy + hh);
  };
  room(-0.9 * 0 + 0, 0, 1.8, 1.8);
  room(-1.75, -1.6, 1.2, 0.85);
  room(1.75, -1.5, 1.1, 0.9);
  room(-1.65, 1.6, 1.0, 0.9);
  room(1.75, 1.6, 1.1, 0.85);
  return new Float32Array(v);
}

const RING_COUNT    = 800;
const RING_POSITIONS = buildRingData(RING_COUNT);
const DUNGEON_VERTS  = buildDungeonVerts();

// ── Japanese mon circle ─────────────────────────────────────────
function MonCircle() {
  const outerRef = useRef<THREE.Mesh>(null);
  const midRef   = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) outerRef.current.rotation.z =  t * 0.025;
    if (midRef.current)   midRef.current.rotation.z   = -t * 0.018;
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={outerRef}>
        <torusGeometry args={[2.85, 0.013, 6, 120]} />
        <meshBasicMaterial color="#c41e3a" transparent opacity={0.5} />
      </mesh>
      <mesh ref={midRef}>
        <torusGeometry args={[2.2, 0.009, 6, 96]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.62, 0.007, 6, 80]} />
        <meshBasicMaterial color="#c41e3a" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// ── Dungeon grid ────────────────────────────────────────────────
function DungeonGrid() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(DUNGEON_VERTS, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#4f46e5" transparent opacity={0.2} />
    </lineSegments>
  );
}

// ── Crystal core ────────────────────────────────────────────────
function CrystalCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12;
      outerRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.12;
      wireRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;
    }
  });

  return (
    <>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshPhysicalMaterial
          color="#6d0c1c"
          roughness={0.05}
          metalness={0.92}
          emissive="#3a0010"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.63, 1]} />
        <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.22} />
      </mesh>
    </>
  );
}

// ── Orbiting shape ──────────────────────────────────────────────
function OrbitingShape({
  radius, speed, offset, color, size,
}: {
  radius: number; speed: number; offset: number; color: string; size: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.y = Math.sin(t * 0.7) * (radius * 0.4);
      groupRef.current.position.z = Math.sin(t) * radius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ── Particle ring ───────────────────────────────────────────────
function ParticleRing() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(RING_POSITIONS, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#7c3aed" size={0.016} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

// ── Main scene ──────────────────────────────────────────────────
export default function ShowcaseScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[-3, 3, 2]}  color="#c41e3a" intensity={14} />
      <pointLight position={[3, -2, 1]}  color="#4f46e5" intensity={9}  />
      <pointLight position={[0, 0, 3]}   color="#ffffff" intensity={0.8} />

      <MonCircle />
      <DungeonGrid />
      <CrystalCore />
      <ParticleRing />
      <OrbitingShape radius={2.6} speed={0.35} offset={0}   color="#c41e3a" size={0.26} />
      <OrbitingShape radius={2.8} speed={0.28} offset={2.1} color="#4f46e5" size={0.22} />
      <OrbitingShape radius={2.4} speed={0.42} offset={4.2} color="#7c3aed" size={0.18} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </Canvas>
  );
}
