"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface CinematicBackgroundProps {
  /* ── Video mode ──────────────────────────────────────── */
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;

  /* ── Image mode (Next.js optimised) ─────────────────── */
  imageSrc?: string;
  objectPosition?: string;
  /** Slow scale/drift animation (disabled by prefers-reduced-motion) */
  slowMotion?: boolean;
  /** Pass true for above-the-fold images (LCP priority) */
  priority?: boolean;

  /* ── Common ──────────────────────────────────────────── */
  fallbackGradient?: string;
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
  imageSrc,
  objectPosition = "center center",
  slowMotion = false,
  priority = false,
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
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    const id = setTimeout(check, 0);
    return () => clearTimeout(id);
  }, []);

  const hasVideoSrc = Boolean(videoWebm || videoMp4);
  const showVideo   = hasVideoSrc && !videoFailed && !reducedMotion;
  /* poster is a CSS-bg fallback only when no imageSrc and video is unavailable */
  const showCssPoster = Boolean(poster) && !imageSrc && !showVideo;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {/* Layer 1 — base gradient, always renders */}
      <div className="absolute inset-0" style={{ background: fallbackGradient }} />

      {/* Layer 2 — Next.js optimised image (image mode) */}
      {imageSrc && (
        <div
          className={`absolute inset-0${slowMotion && !reducedMotion ? " bg-drift" : ""}`}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            priority={priority}
            quality={80}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      )}

      {/* Layer 3 — CSS background poster (legacy / video fallback) */}
      {showCssPoster && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster})`, opacity: 0.5 }}
        />
      )}

      {/* Layer 4 — video */}
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

      {/* Layer 5 — dark readability overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(6,6,16,${overlayOpacity})` }}
      />

      {/* Layer 6 — radial vignette */}
      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(6,6,16,0.82) 100%)",
          }}
        />
      )}

      {/* Layer 7 — film grain */}
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
