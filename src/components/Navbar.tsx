"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "About",      href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Skills",     href: "#skills" },
  { name: "Blog",       href: "/blog" },
  { name: "Contact",    href: "#contact" },
];

const sectionIds = ["about", "experience", "projects", "skills", "contact"];

export const Navbar = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isHidden, setIsHidden]               = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]     = useState("");
  const lastScrollY = useRef(0);

  // Framer scroll progress for the thin top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Scroll progress bar — sits at the very top of the viewport */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-blue z-[60] origin-left"
      />

      <motion.nav
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-border-subtle py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-accent-blue flex items-center justify-center font-display font-bold text-base text-white group-hover:shadow-[0_0_16px_rgba(99,102,241,0.6)] transition-shadow">
              IK
            </div>
            <span className="hidden md:block font-display font-semibold text-base tracking-tight group-hover:text-accent-blue transition-colors text-text-primary">
              Isaac Kumi
            </span>
          </Link>

          {/* ── Desktop nav links — sliding pill ── */}
          <LayoutGroup id="nav-pill">
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[11px] font-mono uppercase tracking-widest transition-colors px-3 py-1.5 rounded-md ${
                      isActive ? "text-accent-blue" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-md bg-accent-blue/10 border border-accent-blue/25"
                        transition={{ type: "spring", stiffness: 380, damping: 36 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </LayoutGroup>

          {/* ── Right actions ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <a
              href="mailto:isaac.k.kumi29@gmail.com?subject=Hiring%20Inquiry"
              className="px-5 py-2 rounded-lg bg-accent-blue text-white text-[11px] font-mono hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-all uppercase tracking-widest"
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile actions ── */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              className="text-text-primary p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="absolute top-full left-0 right-0 glass border-b border-border-subtle px-6 pt-4 pb-6 lg:hidden"
            >
              <div className="flex flex-col gap-1 mb-6">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2.5 px-3 rounded-lg text-sm font-mono uppercase tracking-widest transition-colors ${
                          isActive
                            ? "text-accent-blue bg-accent-blue/8"
                            : "text-text-muted hover:text-text-primary hover:bg-surface"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
                <a
                  href="mailto:isaac.k.kumi29@gmail.com?subject=Hiring%20Inquiry"
                  className="w-full py-3 rounded-lg bg-accent-blue text-white text-sm font-mono text-center uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Hire Me
                </a>
                <a
                  href="mailto:isaac.k.kumi29@gmail.com?subject=Consulting%20Inquiry"
                  className="w-full py-3 rounded-lg border border-accent-blue/40 text-accent-blue text-sm font-mono text-center uppercase tracking-widest hover:bg-accent-blue/8 transition-colors"
                >
                  Work With Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
