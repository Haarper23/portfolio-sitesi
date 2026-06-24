import type { Ref } from "react";

interface ParallaxLayerProps {
  layerRef?: Ref<HTMLDivElement>;
}

export default function ParallaxLayer({ layerRef }: ParallaxLayerProps) {
  return (
    <div
      ref={layerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 4 }}
    >
      {/* Japanese mon circles */}
      <svg
        viewBox="0 0 500 500"
        className="absolute pointer-events-none"
        style={{
          right: "-6vw", top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(300px, 40vw, 520px)",
          height: "auto",
          opacity: 0.07,
        }}
      >
        <circle cx="250" cy="250" r="238" fill="none" stroke="#f0ead8" strokeWidth="1" />
        <circle cx="250" cy="250" r="210" fill="none" stroke="#f0ead8" strokeWidth="0.6" />
        <circle cx="250" cy="250" r="180" fill="none" stroke="#d42040" strokeWidth="0.8" />
        <circle cx="250" cy="250" r="145" fill="none" stroke="#f0ead8" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="108" fill="none" stroke="#f0ead8" strokeWidth="0.4" />
        <circle cx="250" cy="250" r="68"  fill="none" stroke="#d42040" strokeWidth="0.6" />
        <circle cx="250" cy="250" r="30"  fill="none" stroke="#f0ead8" strokeWidth="0.5" />
        <line x1="12"  y1="250" x2="488" y2="250" stroke="#f0ead8" strokeWidth="0.4" />
        <line x1="250" y1="12"  x2="250" y2="488" stroke="#f0ead8" strokeWidth="0.4" />
        <line x1="82"  y1="82"  x2="418" y2="418" stroke="#f0ead8" strokeWidth="0.25" />
        <line x1="418" y1="82"  x2="82"  y2="418" stroke="#f0ead8" strokeWidth="0.25" />
      </svg>

      {/* Diagonal katana hairlines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: 0.08 }}
      >
        <line x1="0"  y1="100%" x2="38%" y2="0" stroke="#f0ead8" strokeWidth="0.5" />
        <line x1="2%" y1="100%" x2="40%" y2="0" stroke="#f0ead8" strokeWidth="0.25" />
      </svg>
    </div>
  );
}
