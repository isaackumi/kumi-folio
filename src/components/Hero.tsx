"use client";

import { motion } from "framer-motion";
import { Terminal } from "./Terminal";
import Image from "next/image";
import { HeroPattern } from "./HeroPattern";
import { useHasMounted } from "@/hooks/useHasMounted";

export const Hero = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-24 overflow-hidden bg-background">
        <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col items-start space-y-10 opacity-0" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-24 overflow-hidden">
      <HeroPattern />
      {/* Background Glow — animated aurora blobs */}
      <div className="aurora-blob absolute top-1/4 -left-24 w-[500px] h-[500px] bg-accent-blue/20 blur-[130px] rounded-full" />
      <div className="aurora-blob-alt absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-accent-green/12 blur-[130px] rounded-full" />
      <div className="aurora-blob absolute top-3/4 left-1/3 w-72 h-72 bg-accent-blue/10 blur-[100px] rounded-full" />

      <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Terminal & Content */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <Terminal />
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "backOut" }}
              className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter"
            >
              Isaac <span className="gradient-text drop-shadow-[0_0_20px_rgba(108,99,255,0.5)]">Kumi</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-text-body max-w-2xl font-sans leading-relaxed"
            >
              Building <span className="gradient-text font-bold drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">RELIABLE</span> autonomous systems and teaching the next generation of engineers.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <button className="btn-shimmer px-10 py-4 bg-accent-blue text-white rounded-xl font-mono text-sm hover:glow glow-pulse transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-xl">
              ./view-my-work.sh
            </button>
            <div className="flex items-center gap-3 px-6 py-3 bg-surface-alt/80 backdrop-blur-md border border-border-subtle rounded-xl group hover:border-accent-green/50 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green relative" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted group-hover:text-accent-green transition-colors">
                Open to work
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.1, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-[500px] aspect-[4/5]"
          >
            {/* Image Frame Decoration */}
            <div className="absolute -inset-5 rounded-3xl -z-10 glow-pulse opacity-40" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 border border-accent-blue/30 rounded-3xl transform translate-x-6 translate-y-6 -z-10" />

            {/* Rotating gradient ring */}
            <div className="absolute -inset-0.5 rounded-3xl -z-10 image-ring" />

            <div className="relative w-full h-full overflow-hidden rounded-3xl border border-border-subtle group shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] bg-surface transform transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/images/isaac_kumi_avatar.png"
                alt="Isaac Kumi"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.15] group-hover:grayscale-0"
                priority
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-green/5" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* Float Elements for depth */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-5 bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle shadow-2xl text-accent-blue"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119v2.13h-2.119zM10.73 11.078h2.13v2.13h-2.13zm-3.256 0h2.13v2.13h-2.13zm-3.235 0h2.13v2.13h-2.13zM10.73 7.843h2.13v2.13h-2.13zm-3.256 0h2.13v2.13h-2.13zm3.256-3.235h2.13v2.13h-2.13zm3.253 6.47h2.119v2.13h-2.119zm3.256 0h2.13v2.13h-2.13zM0 12.584c0 5.607 4.544 10.147 10.147 10.147 5.604 0 10.147-4.54 10.147-10.147 0-1.554-.343-3.033-.966-4.354l-.27-.584h-4.084V5.441h-2.13v2.13h-2.13v2.13h-2.119V7.843h-2.13v2.13h-2.13v2.13h-2.13v2.13h5.367c.725 0 1.341-.448 1.583-1.078h2.119c-.242.63-.858 1.078-1.583 1.078H5.441v2.13h8.542c.725 0 1.341-.448 1.583-1.078h2.13c-.242.63-.858 1.078-1.583 1.078h-2.13v2.13h2.13c.725 0 1.341-.448 1.583-1.078h.3c.091.319.141.656.141 1.006 0 2.119-1.72 3.839-3.836 3.839-1.127 0-2.134-.486-2.834-1.258l-.58-.636-.584.636c-.7.772-1.707 1.258-2.834 1.258-2.116 0-3.836-1.72-3.836-3.839 0-.35.05-.687.141-1.006h.3c.242.63.858 1.078 1.583 1.078h2.13v-2.13h-2.13c-.725 0-1.341.448-1.583 1.078H5.441c.242-.63.858-1.078 1.583-1.078h2.13v-2.13h-2.13c-.725 0-1.341.448-1.583 1.078h-3.23c-.623 1.321-.966 2.8-.966 4.354z"/></svg>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-12 p-4 bg-surface/80 backdrop-blur-xl rounded-xl border border-border-subtle shadow-2xl text-accent-green hidden md:block"
            >
              <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7.378l-4.5 2.598v5.196L12 17.77l4.5-2.598v-5.196L12 7.378zM24 12l-6 10.392H6L0 12l6-10.392h12L24 12zM12 2.309L6.402 12 12 21.691 17.598 12 12 2.309z"/></svg>
                <span className="w-1 h-4 bg-accent-green rounded-full" />
                SRE·Cloud·NextJS
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-1/2 -right-16 p-3 bg-surface/90 backdrop-blur-xl rounded-full border border-border-subtle shadow-xl text-accent-blue hidden lg:block"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M1.44 0v1.44h21.12V0H1.44zM0 2.88v18.24h1.44V2.88H0zm22.56 0v18.24H24V2.88h-1.44zM1.44 22.56h21.12V24H1.44v-1.44zM5.76 5.76v12.48h12.48V5.76H5.76zm1.44 1.44h9.6v9.6h-9.6v-9.6z"/></svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-accent-blue to-transparent"
        />
      </motion.div>
    </section>
  );
};
