"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Kissaki geometry factory ─────────────────────────────────── */
function createKissakiGeometry(bladeW: number, bladeD: number, height: number) {
  const hw = bladeW / 2;
  const hd = bladeD / 2;
  // prettier-ignore
  const verts = new Float32Array([
    -hw, 0,  hd,   hw, 0,  hd,   0, height, 0,
     hw, 0, -hd,  -hw, 0, -hd,   0, height, 0,
     hw, 0,  hd,   hw, 0, -hd,   0, height, 0,
    -hw, 0, -hd,  -hw, 0,  hd,   0, height, 0,
    -hw, 0,  hd,   hw, 0, -hd,   hw, 0,  hd,
    -hw, 0,  hd,  -hw, 0, -hd,   hw, 0, -hd,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  return geo;
}

/* ═══════════════════════════════════════════════════════════════
   MODULE-LEVEL OBJECTS
   All mutable Three.js state lives here — matches the pattern in
   ShowcaseScene (RING_POSITIONS, DUNGEON_VERTS at module level).
   Safe because KatanaInteractiveScene is always loaded ssr:false.
   ═══════════════════════════════════════════════════════════════ */

const IS_MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

const SPARK_COUNT = IS_MOBILE ? 10 : 20;

/* Spark positions — mutated every frame, updated via needsUpdate */
const SPARK_POS: Float32Array = (() => {
  const p = new Float32Array(SPARK_COUNT * 3);
  for (let i = 0; i < SPARK_COUNT; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.35;
    p[i * 3]     = Math.cos(a) * r;
    p[i * 3 + 1] = -0.165 - Math.random() * 0.8;
    p[i * 3 + 2] = Math.sin(a) * r;
  }
  return p;
})();

const SPARK_SPEEDS: Float32Array = (() => {
  const s = new Float32Array(SPARK_COUNT);
  for (let i = 0; i < SPARK_COUNT; i++) s[i] = 0.003 + Math.random() * 0.007;
  return s;
})();

const SPARK_GEO: THREE.BufferGeometry = (() => {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(SPARK_POS, 3));
  return g;
})();

/* Energy ShaderMaterial — uniforms mutated in useFrame */
const ENERGY_MAT = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
  uniforms: {
    uTime:        { value: 0.0 },
    uDrag:        { value: 0.0 },
    uMobileScale: { value: IS_MOBILE ? 0.7 : 1.0 },
  },
  /* vWorldY: world-space Y so one material spans blade + kissaki seamlessly */
  vertexShader: /* glsl */`
    varying float vWorldY;
    void main() {
      vec4 wp  = modelMatrix * vec4(position, 1.0);
      vWorldY  = wp.y;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float uTime;
    uniform float uDrag;
    uniform float uMobileScale;
    varying float vWorldY;

    vec3 energyColor(float t) {
      vec3 gold    = vec3(1.00, 0.72, 0.14);
      vec3 orange  = vec3(1.00, 0.42, 0.04);
      vec3 red     = vec3(0.92, 0.14, 0.08);
      vec3 crimson = vec3(0.72, 0.05, 0.15);
      if (t < 0.4)      return mix(gold,   orange,  t / 0.4);
      else if (t < 0.7) return mix(orange, red,     (t - 0.4) / 0.3);
      else              return mix(red,    crimson,  (t - 0.7) / 0.3);
    }

    void main() {
      /* Blade world Y: ~-0.055 (base) to ~2.775 (kissaki tip) */
      float t       = clamp((vWorldY + 0.055) / 2.83, 0.0, 1.0);
      vec3  col     = energyColor(t);
      /* Pulse travels downward (toward guard) as time advances */
      float pulse   = pow(sin(vWorldY * 2.2 + uTime * 1.8) * 0.5 + 0.5, 3.0) * 0.42;
      float breathe = 0.84 + sin(uTime * 0.55) * 0.16;
      float alpha   = (0.30 + pulse) * breathe * uMobileScale + uDrag * 0.24;
      gl_FragColor  = vec4(col * (alpha + 0.04), alpha);
    }
  `,
});

/* Ha edge material — emissiveIntensity lerped in useFrame */
const EDGE_MAT = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xff8866,
  emissiveIntensity: 1.6,
  transparent: true,
  opacity: 0.88,
});

/* ═══════════════════════════════════════════════════════════════ */

interface ProceduralKatanaProps {
  reducedMotion?: boolean;
  dragRef?: { current: number };
}

export default function ProceduralKatana({
  reducedMotion = false,
  dragRef,
}: ProceduralKatanaProps) {
  const groupRef      = useRef<THREE.Group>(null);
  const dragIntensity = useRef(0);

  /* kissakiGeo is read-only after creation — useMemo is appropriate */
  const kissakiGeo = useMemo(() => createKissakiGeometry(0.115, 0.030, 0.28), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    /* 1. Float + micro-sway */
    if (!reducedMotion) {
      groupRef.current.position.y = Math.sin(t * 0.42) * 0.07;
      groupRef.current.rotation.z = Math.sin(t * 0.19) * 0.018;
    }

    /* 2. Smooth drag signal */
    dragIntensity.current = THREE.MathUtils.lerp(
      dragIntensity.current,
      dragRef?.current ?? 0,
      0.07
    );
    const drag = dragIntensity.current;

    /* 3. Shader uniforms (module-level object — mutation allowed) */
    ENERGY_MAT.uniforms.uDrag.value = drag;
    if (!reducedMotion) {
      ENERGY_MAT.uniforms.uTime.value = t;
    }

    /* 4. Ha edge brightens on drag */
    EDGE_MAT.emissiveIntensity = THREE.MathUtils.lerp(
      EDGE_MAT.emissiveIntensity,
      1.6 + drag * 0.9,
      0.10
    );

    /* 5. Spark drift */
    if (!reducedMotion) {
      for (let i = 0; i < SPARK_COUNT; i++) {
        SPARK_POS[i * 3 + 1] -= SPARK_SPEEDS[i];
        if (SPARK_POS[i * 3 + 1] < -1.6) SPARK_POS[i * 3 + 1] = -0.165;
      }
      SPARK_GEO.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.06, 0.20, 0.05]}>

      {/* ── Blade body (ji / shinogi-ji) ─────────────────────── */}
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[0.115, 2.55, 0.030]} />
        <meshPhysicalMaterial color="#bcd8f0" metalness={0.97} roughness={0.03} />
      </mesh>

      {/* Energy gradient overlay — additive, world-Y gradient */}
      <mesh position={[0, 1.22, 0.001]} material={ENERGY_MAT}>
        <boxGeometry args={[0.120, 2.57, 0.034]} />
      </mesh>

      {/* Ha-bevel — warm emissive on cutting-edge side */}
      <mesh position={[0.047, 1.22, 0]}>
        <boxGeometry args={[0.024, 2.55, 0.020]} />
        <meshPhysicalMaterial
          color="#ffe8d4"
          metalness={0.98}
          roughness={0.02}
          emissive="#cc4422"
          emissiveIntensity={0.20}
        />
      </mesh>

      {/* Ha — reactive emissive edge */}
      <mesh position={[0.060, 1.22, 0]} material={EDGE_MAT}>
        <boxGeometry args={[0.006, 2.55, 0.010]} />
      </mesh>

      {/* Fuller (hi) — decorative groove */}
      <mesh position={[-0.010, 1.22, 0.016]}>
        <boxGeometry args={[0.014, 2.05, 0.002]} />
        <meshBasicMaterial color="#223344" transparent opacity={0.28} />
      </mesh>

      {/* ── Kissaki (blade tip) ─────────────────────────────── */}
      <mesh geometry={kissakiGeo} position={[0, 2.495, 0]}>
        <meshPhysicalMaterial color="#cce8f8" metalness={0.97} roughness={0.03} />
      </mesh>
      {/* Kissaki energy overlay — same material, world-Y gradient continues */}
      <mesh position={[0, 2.495, 0.001]} material={ENERGY_MAT}>
        <boxGeometry args={[0.120, 0.30, 0.034]} />
      </mesh>

      {/* ── Habaki (blade collar) ───────────────────────────── */}
      <mesh position={[0, -0.035, 0]}>
        <boxGeometry args={[0.128, 0.115, 0.040]} />
        <meshStandardMaterial color="#c8a840" metalness={0.88} roughness={0.12} />
      </mesh>

      {/* ── Tsuba (guard) ────────────────────────────────────── */}
      <mesh position={[0, -0.165, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.038, 24]} />
        <meshStandardMaterial
          color="#7a6232"
          metalness={0.84}
          roughness={0.16}
          emissive="#1a0c04"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh position={[0, -0.165, 0]}>
        <torusGeometry args={[0.22, 0.016, 8, 32]} />
        <meshStandardMaterial color="#c8a840" metalness={0.92} roughness={0.08} />
      </mesh>
      <mesh position={[0, -0.165, 0]}>
        <torusGeometry args={[0.32, 0.012, 8, 32]} />
        <meshStandardMaterial color="#b09030" metalness={0.90} roughness={0.10} />
      </mesh>

      {/* Guard energy glow halos */}
      <mesh position={[0, -0.145, 0]}>
        <torusGeometry args={[0.42, 0.007, 8, 48]} />
        <meshBasicMaterial color="#ff7700" transparent opacity={0.50} />
      </mesh>
      <mesh position={[0, -0.145, 0]}>
        <torusGeometry args={[0.52, 0.005, 8, 48]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.22} />
      </mesh>

      {/* ── Tsuka (handle) ───────────────────────────────────── */}
      <mesh position={[0, -0.775, 0]}>
        <cylinderGeometry args={[0.052, 0.042, 1.22, 8]} />
        <meshStandardMaterial color="#160a02" roughness={0.88} />
      </mesh>
      {[-0.46, -0.28, -0.10, 0.08, 0.26, 0.44].map((y, i) => (
        <mesh key={i} position={[0, y - 0.775, 0]}>
          <torusGeometry args={[0.058, 0.012, 5, 16]} />
          <meshStandardMaterial color="#3a2010" roughness={0.78} />
        </mesh>
      ))}

      {/* ── Kashira (pommel) ─────────────────────────────────── */}
      <mesh position={[0, -1.42, 0]}>
        <sphereGeometry args={[0.062, 12, 10]} />
        <meshStandardMaterial color="#7a6232" metalness={0.74} roughness={0.26} />
      </mesh>

      {/* ── Spark trail below guard ───────────────────────────── */}
      <points geometry={SPARK_GEO}>
        <pointsMaterial
          color="#ffaa44"
          size={0.018}
          transparent
          opacity={IS_MOBILE ? 0.55 : 0.75}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
