"use client";

import { motion } from "framer-motion";

export const HeroPattern = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* ── Base grid ──────────────────────────────────────────── */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.07] text-accent-blue"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hero-grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M 72 0 L 0 0 0 72" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
        {/* Edge fade vignette */}
        <radialGradient id="grid-mask" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="vignette">
          <rect width="100%" height="100%" fill="url(#grid-mask)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#vignette)" />
    </svg>

    {/* ── Horizontal scan sweep line ──────────────────────────── */}
    <motion.div
      animate={{ y: ["-2%", "102%"] }}
      transition={{
        duration: 6,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 5,
      }}
      className="absolute inset-x-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 20%, rgba(52,211,153,0.6) 50%, rgba(99,102,241,0.5) 80%, transparent 100%)",
        filter: "blur(1px)",
      }}
    />

    {/* ── Corner HUD brackets ─────────────────────────────────── */}
    {/* Top-left */}
    <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent-blue/30 opacity-60 dark:opacity-80" />
    {/* Top-right */}
    <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent-blue/30 opacity-60 dark:opacity-80" />
    {/* Bottom-left */}
    <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent-green/25 opacity-50 dark:opacity-70" />
    {/* Bottom-right */}
    <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent-green/25 opacity-50 dark:opacity-70" />

    {/* ── Pulsing accent nodes ─────────────────────────────────── */}
    <motion.div
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[22%] right-[18%] w-1.5 h-1.5 rounded-full bg-accent-blue"
    />
    <motion.div
      animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      className="absolute top-[60%] left-[12%] w-1 h-1 rounded-full bg-accent-green"
    />
    <motion.div
      animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.5, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      className="absolute top-[38%] right-[8%] w-1 h-1 rounded-full bg-accent-blue"
    />

    {/* ── Data readout — top right ─────────────────────────────── */}
    <div className="absolute top-24 right-12 hidden xl:flex flex-col gap-1 opacity-[0.18] dark:opacity-[0.28]">
      {["SYS::ONLINE", "NET::STABLE", "CPU::0.4%", "MEM::OK"].map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 + i * 0.2, duration: 0.4 }}
          className="font-mono text-[9px] text-accent-green uppercase tracking-[0.2em]"
        >
          {line}
        </motion.div>
      ))}
    </div>

    {/* ── Horizontal axis markers ──────────────────────────────── */}
    <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-[0.15] dark:opacity-[0.22]">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-3 h-px bg-accent-blue" />
          <span className="font-mono text-[8px] text-accent-blue">{String(i * 25).padStart(3, "0")}</span>
        </div>
      ))}
    </div>
  </div>
);
