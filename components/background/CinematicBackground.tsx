"use client";

import { useEffect, useRef, useState } from "react";

export interface CinematicBackgroundProps {
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;
  /** CSS gradient string used when no video/poster is available */
  fallbackGradient?: string;
  /** Opacity of the dark readability overlay (0–1) */
  overlayOpacity?: number;
  grain?: boolean;
  vignette?: boolean;
  className?: string;
}

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function CinematicBackground({
  videoWebm,
  videoMp4,
  poster,
  fallbackGradient = "linear-gradient(135deg, #060610 0%, #0f0f22 45%, #140924 100%)",
  overlayOpacity = 0.55,
  grain = true,
  vignette = true,
  className,
}: CinematicBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const check = () => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
    };
    const id = setTimeout(check, 0);
    return () => clearTimeout(id);
  }, []);

  const hasVideoSrc = Boolean(videoWebm || videoMp4);
  const showVideo   = hasVideoSrc && !videoFailed && !reducedMotion;
  const showPoster  = Boolean(poster) && !showVideo;

  return (
    <div
      className={`absolute inset-0 overflow-hidden${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {/* Base gradient — always renders */}
      <div className="absolute inset-0" style={{ background: fallbackGradient }} />

      {/* Poster image fallback */}
      {showPoster && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster})`, opacity: 0.5 }}
        />
      )}

      {/* Video — autoplay, muted, loop */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4  && <source src={videoMp4}  type="video/mp4"  />}
        </video>
      )}

      {/* Dark readability overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(6,6,16,${overlayOpacity})` }}
      />

      {/* Radial vignette */}
      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(6,6,16,0.82) 100%)",
          }}
        />
      )}

      {/* Film grain */}
      {grain && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: GRAIN_URI,
            backgroundSize: "256px 256px",
            opacity: 0.04,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
