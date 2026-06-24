"use client";

import { useRef, Suspense, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ── Error boundary ──────────────────────────────────────────────── */
interface EBProps { children: ReactNode; fallback: ReactNode; }
interface EBState { hasError: boolean; }

class KatanaErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): EBState {
    return { hasError: true };
  }
  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Shared prop type ────────────────────────────────────────────── */
interface KatanaProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

/* ── Procedural katana — always available, no assets needed ─────── */
function ProceduralKatana({ mouseRef }: KatanaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    groupRef.current.position.y = Math.sin(elapsed.current * 0.38) * 0.08;
    groupRef.current.rotation.z = Math.sin(elapsed.current * 0.17) * 0.03;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.2,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.08,
      0.04
    );
  });

  return (
    <group ref={groupRef} rotation={[0.12, 0.35, Math.PI / 7]}>
      {/* Blade */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.007, 0.024, 3.7, 6]} />
        <meshPhysicalMaterial
          color="#cce0f0"
          metalness={0.98}
          roughness={0.02}
          reflectivity={1}
        />
      </mesh>
      {/* Edge highlight */}
      <mesh position={[0.011, 1.85, 0]}>
        <cylinderGeometry args={[0.0018, 0.004, 3.7, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
      {/* Tsuba (guard disc) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.028, 20]} />
        <meshStandardMaterial color="#7a6232" metalness={0.78} roughness={0.22} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.033, 0.028, 1.35, 8]} />
        <meshStandardMaterial color="#281808" roughness={0.88} />
      </mesh>
      {/* Handle wraps */}
      {[-0.55, -0.35, -0.12, 0.12, 0.35, 0.55].map((y, i) => (
        <mesh key={i} position={[0, y - 0.75, 0]}>
          <torusGeometry args={[0.036, 0.007, 5, 14]} />
          <meshStandardMaterial color="#4a3520" roughness={0.72} />
        </mesh>
      ))}
      {/* Pommel */}
      <mesh position={[0, -1.46, 0]}>
        <sphereGeometry args={[0.046, 10, 8]} />
        <meshStandardMaterial color="#7a6232" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── GLTF loader — suspends while loading, errors to boundary ───── */
function GLTFKatana({ mouseRef }: KatanaProps) {
  const { scene } = useGLTF("/models/katana.glb");
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    groupRef.current.position.y = Math.sin(elapsed.current * 0.38) * 0.08;
    groupRef.current.rotation.z = Math.sin(elapsed.current * 0.17) * 0.03;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.2,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.08,
      0.04
    );
  });

  return (
    <group ref={groupRef} rotation={[0.12, 0.35, Math.PI / 7]}>
      <primitive object={scene} />
    </group>
  );
}

/* ── Public component ────────────────────────────────────────────── */
export interface KatanaSceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export default function KatanaScene({ mouseRef }: KatanaSceneProps) {
  return (
    <Canvas
      style={{ background: "transparent", width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 5, 4]}   intensity={1.8} color="#d42040" />
      <pointLight position={[-4, -2, 3]} intensity={1.2} color="#8b44ed" />
      <pointLight position={[0,  1, 6]}  intensity={0.8} color="#6cb4fc" />

      <KatanaErrorBoundary fallback={<ProceduralKatana mouseRef={mouseRef} />}>
        <Suspense fallback={<ProceduralKatana mouseRef={mouseRef} />}>
          <GLTFKatana mouseRef={mouseRef} />
        </Suspense>
      </KatanaErrorBoundary>
    </Canvas>
  );
}
