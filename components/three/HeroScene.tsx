"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generated once at module load — outside render, satisfies react-hooks/purity
function buildParticleData(count: number) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const blue = new THREE.Color("#3B82F6");
  const violet = new THREE.Color("#8B5CF6");
  const white = new THREE.Color("#ffffff");

  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

    const r = Math.random();
    const c = r < 0.2 ? blue : r < 0.35 ? violet : white;
    col[i * 3]     = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  return { pos, col };
}

const PARTICLE_COUNT = 1800;
const { pos: POSITIONS, col: COLORS } = buildParticleData(PARTICLE_COUNT);

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(POSITIONS, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(COLORS, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShape({
  position,
  color,
  shape,
  speed,
}: {
  position: [number, number, number];
  color: string;
  shape: "icosahedron" | "octahedron" | "tetrahedron";
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.004 * speed;
    meshRef.current.rotation.y += 0.006 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {shape === "icosahedron" && <icosahedronGeometry args={[0.7, 0]} />}
      {shape === "octahedron" && <octahedronGeometry args={[0.6]} />}
      {shape === "tetrahedron" && <tetrahedronGeometry args={[0.6]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[-4, 4, 2]} color="#3B82F6" intensity={3} />
      <pointLight position={[4, -2, 2]} color="#8B5CF6" intensity={2} />
      <ParticleField />
      <FloatingShape position={[-3.5, 0.5, -1]}  color="#3B82F6" shape="icosahedron" speed={0.9} />
      <FloatingShape position={[3.2, -0.8, -0.5]} color="#8B5CF6" shape="octahedron"  speed={1.1} />
      <FloatingShape position={[0.5, 2.2, -2]}   color="#3B82F6" shape="tetrahedron" speed={0.7} />
    </Canvas>
  );
}
