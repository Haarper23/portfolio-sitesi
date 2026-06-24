"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface KatanaPlaceholderProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export default function KatanaPlaceholder({ mouseRef }: KatanaPlaceholderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed  = useRef(0);

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
        <meshPhysicalMaterial color="#cce0f0" metalness={0.98} roughness={0.02} reflectivity={1} />
      </mesh>
      {/* Edge highlight */}
      <mesh position={[0.011, 1.85, 0]}>
        <cylinderGeometry args={[0.0018, 0.004, 3.7, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
      {/* Tsuba */}
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
