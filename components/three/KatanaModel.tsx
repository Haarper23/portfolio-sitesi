"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface KatanaModelProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  /** Path to the .glb file (defaults to /models/katana.glb) */
  modelPath?: string;
}

export default function KatanaModel({
  mouseRef,
  modelPath = "/models/katana.glb",
}: KatanaModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef  = useRef<THREE.Group>(null);
  const elapsed   = useRef(0);

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
