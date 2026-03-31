"use client";

import { motion, useInView, animate } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRef, useEffect } from "react";

const stats = [
  { label: "Years Experience", numeric: 7,   suffix: "+",  color: "#6366f1" },
  { label: "Countries Worked",  numeric: 3,   suffix: "",   color: "#10b981" },
  { label: "Students Taught",   numeric: 100, suffix: "+",  color: "#6366f1" },
  { label: "OSS Downloads",     numeric: 18,  suffix: "K+", color: "#10b981" },
];

const highlights = [
  { icon: "⚙", text: "Production SRE across fintech, retail & edtech" },
  { icon: "☁", text: "Multi-cloud infra on AWS & Azure at scale" },
  { icon: "🔓", text: "18K+ downloads on PyWebGuard open-source security lib" },
  { icon: "🎓", text: "Taught 100+ students at Ashesi University" },
  { icon: "📡", text: "Kubernetes homelab running 24/7 for fun" },
  { icon: "📺", text: "1.4K subscribers on OpeningTag YouTube channel" },
];

function CountUp({ to, suffix, color }: { to: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { el.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref} style={{ color }} className="text-4xl md:text-5xl font-display font-bold leading-none">
      0{suffix}
    </span>
  );
}

export const About = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted)
    return <section id="about" className="py-32 px-6 lg:px-24 bg-surface/30 min-h-[600px]" />;

  return (
    <section id="about" className="py-32 px-6 lg:px-24 bg-surface/30 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="container mx-auto relative z-10 space-y-16">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase text-sm">01.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            About_Me
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Pull quote */}
            <h3 className="text-3xl md:text-4xl font-display font-bold leading-snug text-text-primary">
              I build systems that{" "}
              <span className="gradient-text">don&apos;t sleep</span>{" "}
              — and teach people to build them too.
            </h3>

            {/* Bio paragraphs */}
            <div className="space-y-5 text-text-body text-lg font-sans leading-relaxed">
              <p>
                I&apos;m a Ghanaian technologist working at the intersection of{" "}
                <strong className="text-text-primary font-semibold">SRE, DevOps, cloud infrastructure</strong>, and
                fullstack engineering. From fintech platforms in Accra to retail automation pipelines
                in Santa Clara — I&apos;ve kept production systems alive, scaling, and shipping.
              </p>
              <p>
                I wrote open-source Python security tooling downloaded <strong className="text-text-primary font-semibold">18,000+ times</strong>,
                shipped a funded edtech platform, and spent years teaching hundreds of students to
                write their first lines of code. I run a Kubernetes homelab for fun. The rare person
                who can debug a failing pod <em>and</em> explain recursion to a freshman.
              </p>
            </div>

            {/* Highlight list */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border-subtle hover:border-accent-blue/25 transition-colors group"
                >
                  <span className="text-base shrink-0 mt-0.5">{h.icon}</span>
                  <span className="text-sm text-text-muted group-hover:text-text-body transition-colors leading-snug">
                    {h.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + CV */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="p-6 bg-surface border border-border-subtle rounded-3xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:border-accent-blue/25 transition-all lighting-edge"
                >
                  <CountUp to={stat.numeric} suffix={stat.suffix} color={stat.color} />
                  <span className="text-[9px] uppercase tracking-widest text-text-muted mt-2 font-mono leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CV download */}
            <motion.a
              whileHover={{ y: -3 }}
              href="/cv/Isaac Kumi_CV.pdf"
              download
              className="group flex items-center justify-between p-5 bg-surface border border-border-subtle rounded-3xl hover:border-accent-blue/40 hover:bg-surface-alt transition-all shadow-md"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Download</p>
                <p className="font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                  Isaac_Kumi_CV.pdf
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </motion.a>

            {/* Location + timezone card */}
            <div className="p-5 bg-surface border border-border-subtle rounded-3xl flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-surface-alt flex items-center justify-center text-xl shrink-0">
                🇬🇭
              </div>
              <div>
                <p className="font-display font-semibold text-text-primary text-sm">Accra, Ghana</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">GMT · West Africa Time</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Remote-first</p>
                <p className="text-[9px] font-mono text-accent-green uppercase tracking-widest">Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
