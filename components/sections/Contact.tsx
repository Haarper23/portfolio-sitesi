"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, BriefcaseBusiness, Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "emrebkrdvc@gmail.com";
const SOCIAL = [
  { label: "GitHub",   href: "https://github.com/berkeedeveci",   icon: Code2 },
  { label: "LinkedIn", href: "https://linkedin.com/in/berkeedeveci", icon: BriefcaseBusiness },
  { label: "Email",    href: `mailto:${EMAIL}`,                   icon: Mail },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

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
        y: "105%",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".email-wrapper", start: "top 82%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grain-overlay py-32 md:py-44"
      style={{ backgroundColor: "#141420" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-4xl">

          {/* Label */}
          <div className="contact-reveal flex items-center gap-4 mb-8">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-crimson">
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

          {/* Sub-headline */}
          <p
            className="contact-reveal text-lg md:text-xl leading-relaxed max-w-lg mb-12"
            style={{ color: "rgba(245,240,232,0.48)" }}
          >
            Open to full-time roles, remote contracts, and interesting collaborations — internationally.
          </p>

          {/* Large email — masked reveal */}
          <div className="email-wrapper overflow-hidden mb-12">
            <a
              href={`mailto:${EMAIL}`}
              className="email-mask block font-display text-parchment tracking-tight leading-none hover:text-crimson transition-colors duration-300"
              style={{
                fontSize: "clamp(1.6rem, 4.5vw, 4.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {EMAIL}
            </a>
          </div>

          {/* Divider */}
          <div
            className="contact-reveal w-full h-px mb-12"
            style={{ backgroundColor: "rgba(245,240,232,0.08)" }}
          />

          {/* Socials */}
          <div className="flex flex-wrap gap-3">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="contact-reveal inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 group"
                style={{
                  color: "rgba(245,240,232,0.6)",
                  border: "1px solid rgba(245,240,232,0.1)",
                  backgroundColor: "rgba(245,240,232,0.03)",
                }}
              >
                <Icon size={14} />
                {label}
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
