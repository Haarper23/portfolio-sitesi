"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ProceduralKatana from "./ProceduralKatana";

/* ── Module-level particle data ────────────────────────────────────
   Generated once per module load. Safe because this file is always
   loaded with ssr: false — no server/client hydration mismatch. */
function buildParticles(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r     = 1.4 + Math.random() * 1.6;
    /* stretch vertically to follow the blade axis */
    const y     = (Math.random() - 0.32) * 5.2;
    pos[i * 3]     = Math.cos(angle) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(angle) * r;
  }
  return pos;
}

const PARTICLE_COUNT     = 600;
const PARTICLE_POSITIONS = buildParticles(PARTICLE_COUNT);

/* ── Japanese mon circles ──────────────────────────────────────── */
function MonCircles() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) r1.current.rotation.z =  t * 0.022;
    if (r2.current) r2.current.rotation.z = -t * 0.015;
  });

  /* Centred at the katana's midpoint (y ≈ 0.67), pushed back slightly */
  return (
    <group position={[0, 0.65, -0.5]}>
      <mesh ref={r1}>
        <torusGeometry args={[2.90, 0.013, 6, 120]} />
        <meshBasicMaterial color="#c41e3a" transparent opacity={0.45} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[2.25, 0.009, 6, 96]} />
        <meshBasicMaterial color="#5854f0" transparent opacity={0.32} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.65, 0.007, 6, 80]} />
        <meshBasicMaterial color="#8b44ed" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/* ── Particle cloud ────────────────────────────────────────────── */
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(PARTICLE_POSITIONS, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#7c3aed"
        size={0.018}
        transparent
        opacity={0.40}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Scene contents (needs Canvas context) ─────────────────────── */
interface SceneContentsProps {
  autoRotate: boolean;
  dragRef: { current: number };
}

function SceneContents({ autoRotate, dragRef }: SceneContentsProps) {
  return (
    <>
      <ambientLight intensity={0.08} />
      {/* Crimson rim from upper-left — catches the ha face */}
      <pointLight position={[-3.5,  4.0, 2.5]} color="#d42040" intensity={20} />
      {/* Orange near guard height — warms the lower blade */}
      <pointLight position={[ 2.0, -0.2, 3.0]} color="#ff6600" intensity={12} />
      {/* Warm yellow below guard — fills energy trail region */}
      <pointLight position={[ 0.0, -1.5, 2.5]} color="#ffcc44" intensity={7}  />
      {/* Violet fill from right — preserves 3D form */}
      <pointLight position={[ 3.5,  1.5, 1.5]} color="#5854f0" intensity={7}  />

      <MonCircles />
      <ParticleCloud />
      <ProceduralKatana reducedMotion={!autoRotate} dragRef={dragRef} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.45}
        maxPolarAngle={Math.PI * 0.68}
        minPolarAngle={Math.PI * 0.32}
      />
    </>
  );
}

/* ── Main export ───────────────────────────────────────────────── */
export default function KatanaInteractiveScene() {
  /* Lazy initializer is safe here — this module is always ssr:false */
  const [autoRotate, setAutoRotate] = useState(
    () => typeof window !== "undefined"
      ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true
  );

  /* Drag intensity signal — ref mutation never triggers re-renders */
  const dragRef = useRef<number>(0);

  /* Only subscribe for future changes — no synchronous setState in body */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setAutoRotate(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.65, 5.5], fov: 50 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      onPointerDown={() => { dragRef.current = 1; }}
      onPointerUp={()   => { dragRef.current = 0; }}
      onPointerLeave={() => { dragRef.current = 0; }}
    >
      <SceneContents autoRotate={autoRotate} dragRef={dragRef} />
    </Canvas>
  );
}
