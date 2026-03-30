"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Lab", href: "#lab" },
  { name: "Teaching", href: "#teaching" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = ["about", "experience", "projects", "skills", "lab", "teaching", "blog", "contact"];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  // Hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border-subtle py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-accent-blue flex items-center justify-center font-display font-bold text-xl text-white group-hover:glow transition-all">
            IK
          </div>
          <span className="hidden md:block font-display font-medium text-lg tracking-tight group-hover:text-accent-blue transition-colors text-text-primary">
            Isaac Kumi
          </span>
        </Link>

        {/* Desktop Links — sliding pill */}
        <LayoutGroup id="nav-pill">
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-mono uppercase tracking-widest transition-colors px-3 py-1.5 rounded-md ${
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

        {/* CTAs & Theme */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="mailto:isaac.k.kumi29@gmail.com?subject=Hiring%20Inquiry"
            className="px-5 py-2 rounded-md bg-accent-blue text-white text-xs font-mono hover:glow transition-all uppercase tracking-widest"
          >
            Hire Me
          </a>
          <a
            href="mailto:isaac.k.kumi29@gmail.com?subject=Consulting%20Inquiry"
            className="px-5 py-2 rounded-md border border-accent-blue/50 text-accent-blue text-xs font-mono hover:bg-accent-blue/10 transition-all uppercase tracking-widest"
          >
            Work With Me
          </a>
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            className="text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-border-subtle p-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-mono uppercase tracking-widest transition-colors ${
                        isActive ? "text-accent-blue" : "text-text-muted hover:text-accent-blue"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
                <a
                  href="mailto:isaac.k.kumi29@gmail.com?subject=Hiring%20Inquiry"
                  className="w-full py-3 rounded-md bg-accent-blue text-white text-sm font-mono text-center uppercase tracking-widest"
                >
                  Hire Me
                </a>
                <a
                  href="mailto:isaac.k.kumi29@gmail.com?subject=Consulting%20Inquiry"
                  className="w-full py-3 rounded-md border border-accent-blue/50 text-accent-blue text-sm font-mono text-center uppercase tracking-widest"
                >
                  Work With Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
