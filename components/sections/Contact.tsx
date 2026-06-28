"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import VisualAssetSlot from "@/components/background/VisualAssetSlot";
import { contactBackground } from "@/lib/config/assets";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "emrebkrdvc@gmail.com";

// lucide-react 1.21 does not include brand icons — inline SVG used instead
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_PILLS = [
  { label: "GitHub", href: "https://github.com/Haarper23", icon: Code2 },
  { label: "Email",  href: `mailto:${EMAIL}`,                icon: Mail },
] as const;

const SOCIAL_ICONS = [
  {
    label: "Instagram",
    href:  "https://www.instagram.com/haarper23/",
    Icon:  InstagramIcon,
    hoverColor: "rgba(212,32,64,0.18)",
    hoverBorder: "rgba(212,32,64,0.55)",
  },
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/in/berke-emre-deveci-18575a299/",
    Icon:  LinkedInIcon,
    hoverColor: "rgba(88,84,240,0.18)",
    hoverBorder: "rgba(88,84,240,0.55)",
  },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".email-mask", {
        opacity: 0,
        y: 28,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: ".email-wrapper", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — silent */
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grain-overlay relative py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "#141420" }}
    >
      <VisualAssetSlot config={contactBackground} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20" style={{ position: "relative" }}>
        <div className="max-w-4xl">

          {/* Label */}
          <div className="contact-reveal flex items-center gap-4 mb-8">
            <p className="label-mono text-crimson">
              008 / Contact
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                color: "rgba(96,165,250,0.8)",
                borderColor: "rgba(96,165,250,0.2)",
                backgroundColor: "rgba(96,165,250,0.05)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#60a5fa", animation: "pulse 2s infinite" }}
              />
              Available now
            </span>
          </div>

          {/* Heading */}
          <h2
            className="contact-reveal font-display text-parchment mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            Let&apos;s build something
            <br />
            <span style={{ color: "rgba(245,240,232,0.3)" }}>worth remembering.</span>
          </h2>

          {/* Sub-headline */}
          <p
            className="contact-reveal text-base md:text-lg leading-relaxed max-w-lg mb-12"
            style={{ color: "rgba(245,240,232,0.48)" }}
          >
            Open to full-time roles, remote contracts, and international
            opportunities — across Europe, North America, and beyond.
          </p>

          {/* Email */}
          <div className="email-wrapper mb-4">
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Send email to ${EMAIL}`}
              className="email-mask block font-display text-parchment hover:text-crimson transition-colors duration-300"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {EMAIL}
            </a>
          </div>

          {/* Copy button */}
          <div className="contact-reveal mb-8">
            <button
              onClick={handleCopy}
              aria-label={copied ? "Email address copied to clipboard" : "Copy email address"}
              aria-live="polite"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson/50"
              style={{
                color: copied ? "rgba(96,165,250,0.9)" : "rgba(245,240,232,0.42)",
                border: `1px solid ${copied ? "rgba(96,165,250,0.35)" : "rgba(245,240,232,0.1)"}`,
                backgroundColor: copied ? "rgba(96,165,250,0.06)" : "rgba(245,240,232,0.02)",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied to clipboard" : "Copy email"}
            </button>
          </div>

          {/* Social icon buttons — Instagram & LinkedIn */}
          <div className="contact-reveal flex items-center gap-3 mb-12">
            {SOCIAL_ICONS.map(({ label, href, Icon, hoverColor, hoverBorder }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson/50"
                style={{
                  color: hovered === label ? "rgba(245,240,232,0.95)" : "rgba(245,240,232,0.70)",
                  border: `1px solid ${hovered === label ? hoverBorder : "rgba(245,240,232,0.18)"}`,
                  backgroundColor: hovered === label ? hoverColor : "rgba(245,240,232,0.05)",
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            className="contact-reveal w-full h-px mb-12"
            style={{ backgroundColor: "rgba(245,240,232,0.08)" }}
          />

          {/* GitHub + Email pill buttons */}
          <div className="flex flex-wrap gap-3">
            {SOCIAL_PILLS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="contact-reveal inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson/50"
                style={{
                  color: "rgba(245,240,232,0.6)",
                  border: "1px solid rgba(245,240,232,0.1)",
                  backgroundColor: "rgba(245,240,232,0.03)",
                }}
              >
                <Icon size={14} />
                {label}
                {!href.startsWith("mailto") && (
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                )}
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
