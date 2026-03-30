"use client";

import { motion, useInView, animate } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRef, useEffect, useState } from "react";

const stats = [
  { label: "Years Experience", numeric: 7, suffix: "+", color: "text-accent-blue" },
  { label: "Countries Worked", numeric: 3, suffix: "", color: "text-accent-green" },
  { label: "Students Taught", numeric: 100, suffix: "+", color: "text-accent-blue" },
  { label: "OSS Downloads", numeric: 8, suffix: "K+", color: "text-accent-green" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        el.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const exploring = [
  "Platform Engineering",
  "Kubernetes",
  "HomeLab",
  "SRE",
  "Rust",
  "eBPF",
];

export const About = () => {
  const hasMounted = useHasMounted();

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } as any,
    },
  };

  if (!hasMounted) return <section id="about" className="py-32 px-6 lg:px-24 bg-surface/30 min-h-[600px]" />;

  return (
    <section id="about" className="py-32 px-6 lg:px-24 bg-surface/30 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="grid lg:grid-cols-12 gap-8"
        >
          {/* Main Bio Card */}
          <motion.div
            variants={itemVars}
            className="lg:col-span-8 p-8 md:p-12 bg-surface border border-border-subtle rounded-3xl shadow-xl flex flex-col justify-center space-y-8 group hover:border-accent-blue/30 transition-all duration-500 lighting-edge"
          >
            <div className="space-y-4">
              <span className="font-mono text-accent-blue text-sm uppercase tracking-widest">01. Who_am_I</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-text-primary">
                I build systems that don&apos;t sleep — and teach people to build them too.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-lg text-text-body font-sans leading-relaxed">
              <p>
                I&apos;m Isaac Kumi, a Ghanaian technologist spanning SRE, DevOps, cloud infrastructure,
                fullstack engineering, and computer science education. From fintechs in Accra to retail
                automation in Santa Clara, I&apos;ve kept production systems alive and scaling.
              </p>
              <p>
                I built open-source Python security libraries with 8,000+ downloads, shipped a funded
                edtech platform, and spent years teaching hundreds of students to write their first lines
                of code. I run a Kubernetes homelab for fun. The rare person who can debug a failing pod
                <em> and</em> explain recursion to a freshman.
              </p>
            </div>

            {/* Currently exploring */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4">
                Currently exploring
              </p>
              <div className="flex flex-wrap gap-2">
                {exploring.map((chip) => (
                  <motion.span
                    key={chip}
                    whileHover={{ y: -3 }}
                    className="px-4 py-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-xs font-mono text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-default"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Bento Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVars}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-surface border border-border-subtle rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl hover:border-accent-blue/30 transition-all group lighting-edge"
              >
                <span className={`text-4xl font-display font-bold ${stat.color} group-hover:glow transition-all`}>
                  <CountUp to={stat.numeric} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted mt-2 font-mono">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* CV download Card */}
            <motion.a
              variants={itemVars}
              href="/Isaac_Kumi_CV.pdf"
              download
              className="col-span-2 p-6 bg-accent-blue/10 border border-accent-blue/20 rounded-3xl flex items-center justify-between group hover:bg-accent-blue/20 transition-all cursor-pointer"
            >
              <span className="font-mono text-sm text-accent-blue uppercase tracking-widest font-bold">
                Download CV.pdf
              </span>
              <div className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
