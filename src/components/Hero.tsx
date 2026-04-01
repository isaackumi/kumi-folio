"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroPattern } from "./HeroPattern";
import { useHasMounted } from "@/hooks/useHasMounted";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/isaackumi",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/isaackumi",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@openingtag1090",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const roles = ["SRE", "DevOps Engineer", "Cloud Architect", "OSS Author", "Educator"];

export const Hero = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-24 overflow-hidden bg-background">
        <div className="container mx-auto grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col items-start space-y-10 opacity-0" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-24 overflow-hidden">
      <HeroPattern />

      {/* Aurora blobs */}
      <div className="aurora-blob absolute top-1/4 -left-24 w-[500px] h-[500px] bg-accent-blue/15 blur-[140px] rounded-full" />
      <div className="aurora-blob-alt absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-accent-green/10 blur-[140px] rounded-full" />

      <div className="container mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 lg:space-y-8">

          {/* Location + availability */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-text-muted border border-border-subtle rounded-full px-4 py-1.5 bg-surface/60 backdrop-blur-sm">
              <span>🇬🇭</span> Accra, Ghana
            </span>
            <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-accent-green border border-accent-green/30 rounded-full px-4 py-1.5 bg-accent-green/8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              Open to work
            </span>
          </motion.div>

          {/* Name */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-none tracking-tighter text-text-primary"
            >
              Isaac<br />
              <span className="gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">Kumi.</span>
            </motion.h1>

            {/* Scrolling role strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: "backOut" }}
                  className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-border-subtle text-text-muted bg-surface/50"
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-text-body max-w-lg font-sans leading-relaxed"
          >
            I build{" "}
            <span className="gradient-text font-semibold">reliable, autonomous systems</span>{" "}
            at scale — and teach the next generation of engineers how to do the same.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent-blue text-white rounded-2xl font-mono text-sm font-bold hover:bg-accent-blue/90 glow-pulse transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-xl shadow-accent-blue/25"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-surface border border-border-subtle text-text-primary rounded-2xl font-mono text-sm hover:border-accent-blue/50 hover:bg-surface-alt transition-all duration-300 hover:-translate-y-1"
            >
              Hire Me
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="flex items-center gap-2"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-subtle text-text-muted hover:text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/8 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
            <div className="w-px h-5 bg-border-subtle mx-1" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Find me online</span>
          </motion.div>
        </div>

        {/* ── Right Column: Photo ── */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end hidden md:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-[400px] lg:max-w-[460px] aspect-[3/4]"
          >
            {/* Offset shadow frame */}
            <div className="absolute inset-0 rounded-[2rem] border border-accent-blue/20 transform translate-x-5 translate-y-5 -z-10" />
            {/* Glow halo */}
            <div className="absolute -inset-6 -z-10 rounded-[3rem]" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.18) 0%, transparent 70%)" }} />
            {/* Rotating ring */}
            <div className="absolute -inset-0.5 rounded-[2rem] -z-10 image-ring" />

            {/* Main photo card */}
            <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-border-subtle group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] bg-surface">
              {/* Warm gradient background so photo edges blend cleanly */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-surface to-accent-green/10" />
              <Image
                src="/images/isaac_kumi_avatar.JPG"
                alt="Isaac Kumi"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 dark:grayscale dark:contrast-110 dark:group-hover:grayscale-0 dark:group-hover:contrast-100"
                priority
              />
              {/* Dark-mode tint */}
              <div className="absolute inset-0 bg-accent-blue/10 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 hidden dark:block" />
              {/* Bottom fade — blends photo into card */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

              {/* Name card overlay at bottom */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-text-primary text-sm">Isaac Kumi</p>
                  <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">SRE · DevOps · Cloud</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
                  </span>
                  <span className="text-[9px] font-mono text-accent-green uppercase tracking-widest">Available</span>
                </div>
              </div>
            </div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 lg:-right-10 px-4 py-3 bg-surface/90 backdrop-blur-xl rounded-2xl border border-border-subtle shadow-2xl"
            >
              <p className="text-xl font-display font-bold text-accent-blue leading-none">18K+</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">OSS Downloads</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-6 lg:-left-10 px-4 py-3 bg-surface/90 backdrop-blur-xl rounded-2xl border border-border-subtle shadow-2xl"
            >
              <p className="text-xl font-display font-bold text-accent-green leading-none">7+</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">Years building</p>
            </motion.div>

            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/3 -right-12 lg:-right-16 px-4 py-3 bg-surface/90 backdrop-blur-xl rounded-2xl border border-border-subtle shadow-xl hidden lg:block"
            >
              <p className="text-xl font-display font-bold text-text-primary leading-none">100+</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">Students taught</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-text-muted font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-accent-blue/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};
