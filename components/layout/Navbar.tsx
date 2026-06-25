"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Work",     href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-lg"
            : "bg-transparent"
        )}
        style={scrolled ? {
          backgroundColor: "rgba(12,12,18,0.88)",
          borderBottom: "1px solid rgba(245,240,232,0.07)",
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20 h-16 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-parchment text-xl tracking-tight hover:opacity-75 transition-opacity"
          >
            BED
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(245,240,232,0.52)" }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "rgba(245,240,232,0.9)"; }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "rgba(245,240,232,0.52)"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="mailto:emrebkrdvc@gmail.com"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              color: "#f5f0e8",
              border: "1px solid rgba(196,30,58,0.4)",
              backgroundColor: "rgba(196,30,58,0.1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(196,30,58,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(196,30,58,0.1)"; }}
          >
            Contact
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden transition-colors"
            style={{ color: "rgba(245,240,232,0.65)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 md:hidden"
            style={{
              backgroundColor: "rgba(12,12,18,0.95)",
              borderBottom: "1px solid rgba(245,240,232,0.07)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium py-1 transition-colors"
                style={{ color: "rgba(245,240,232,0.65)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:emrebkrdvc@gmail.com"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium"
              style={{
                color: "#f5f0e8",
                border: "1px solid rgba(196,30,58,0.4)",
                backgroundColor: "rgba(196,30,58,0.12)",
              }}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
