interface AtmosphericOverlayProps {
  primaryColor?:   string;
  secondaryColor?: string;
  tertiaryColor?:  string;
}

export default function AtmosphericOverlay({
  primaryColor   = "rgba(212,32,64,0.18)",
  secondaryColor = "rgba(88,84,240,0.15)",
  tertiaryColor  = "rgba(139,68,237,0.07)",
}: AtmosphericOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="mist-layer absolute"
        style={{
          top: "-10%", left: "-5%",
          width: "60vw", height: "75vh",
          background: `radial-gradient(ellipse at 30% 30%, ${primaryColor} 0%, transparent 65%)`,
          animation: "mist-drift-a 14s ease-in-out infinite",
        }}
      />
      <div
        className="mist-layer absolute"
        style={{
          bottom: "-15%", right: "-5%",
          width: "55vw", height: "70vh",
          background: `radial-gradient(ellipse at 70% 70%, ${secondaryColor} 0%, transparent 65%)`,
          animation: "mist-drift-b 18s ease-in-out infinite",
        }}
      />
      <div
        className="mist-layer absolute"
        style={{
          top: "20%", left: "35%",
          width: "40vw", height: "60vh",
          background: `radial-gradient(ellipse at 50% 50%, ${tertiaryColor} 0%, transparent 60%)`,
          animation: "mist-drift-a 22s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
