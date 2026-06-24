import { Code2, BriefcaseBusiness, Mail } from "lucide-react";

const year = 2026;

const links = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#projects" },
  { label: "Skills",  href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const social = [
  { label: "GitHub",   href: "https://github.com/berkeedeveci",      icon: Code2 },
  { label: "LinkedIn", href: "https://linkedin.com/in/berkeedeveci", icon: BriefcaseBusiness },
  { label: "Email",    href: "mailto:emrebkrdvc@gmail.com",          icon: Mail },
];

export default function Footer() {
  return (
    <footer
      className="py-12 md:py-16"
      style={{
        backgroundColor: "#050508",
        borderTop: "1px solid rgba(245,240,232,0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <a
              href="#"
              className="font-display font-bold text-parchment/90 text-2xl tracking-tight hover:text-parchment/60 transition-opacity block mb-2"
            >
              BED
            </a>
            <p className="text-parchment/25 text-xs font-mono">
              Berke Emre Deveci · Computer Engineer · {year}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-parchment/30 hover:text-parchment/65 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {social.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-parchment/28 hover:text-parchment/65 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-8 text-center text-parchment/18 text-xs font-mono"
          style={{ borderTop: "1px solid rgba(245,240,232,0.05)" }}
        >
          Built with Next.js · Tailwind CSS · GSAP · Three.js
        </div>
      </div>
    </footer>
  );
}
