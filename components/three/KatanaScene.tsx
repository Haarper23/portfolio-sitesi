"use client";

import { Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import KatanaPlaceholder from "./KatanaPlaceholder";
import KatanaModel from "./KatanaModel";

/* ── Error boundary ──────────────────────────────────────────────── */
interface EBProps { children: ReactNode; fallback: ReactNode; }
interface EBState { hasError: boolean; }

class KatanaErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }
  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Public component ────────────────────────────────────────────── */
export interface KatanaSceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  /** Set to true only when public/models/katana.glb is present */
  useGltf?: boolean;
  /** Override the default model path */
  modelPath?: string;
}

export default function KatanaScene({
  mouseRef,
  useGltf = false,
  modelPath,
}: KatanaSceneProps) {
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

      {useGltf ? (
        <KatanaErrorBoundary fallback={<KatanaPlaceholder mouseRef={mouseRef} />}>
          <Suspense fallback={<KatanaPlaceholder mouseRef={mouseRef} />}>
            <KatanaModel mouseRef={mouseRef} modelPath={modelPath} />
          </Suspense>
        </KatanaErrorBoundary>
      ) : (
        <KatanaPlaceholder mouseRef={mouseRef} />
      )}
    </Canvas>
  );
}
