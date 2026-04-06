"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

const projects = [
  {
    title: "Nsuo",
    description:
      "SaaS for fish farmers in Ghana — track feed, FCR, sampling, harvest, mortality, and day-to-day operations in one place. Built for real aquaculture workflows, not generic spreadsheets.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "MinIO", "Meilisearch"],
    tags: ["SaaS", "Agriculture"],
    stat: "Active build · Ghana",
    links: [{ label: "Get in touch", href: "#contact" }],
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    title: "uniPartner",
    description:
      "Past-question and practice platform for students across Ghanaian universities. Earn passive income by contributing solutions, plus a dedicated module for Mature Entrance exam prep.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    tags: ["EdTech", "Fullstack"],
    stat: "Student-focused · Ghana",
    links: [{ label: "Get in touch", href: "#contact" }],
    gradient: "from-indigo-500/20 to-transparent",
  },
  {
    title: "PyWebGuard",
    description:
      "Open-source Flask security middleware — a Web Application Firewall that protects against SQL injection, XSS, CSRF, and rate-limit attacks out of the box.",
    tech: ["Python", "Flask", "Redis", "Docker"],
    tags: ["Security", "Open Source"],
    stat: "18,000+ downloads",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/pywebguard/" },
      { label: "GitHub", href: "https://github.com/isaackumi/pywebguard" },
    ],
    gradient: "from-accent-blue/20 to-transparent",
  },
  {
    title: "Fly-Deno",
    description:
      "A lightweight cloud-native backend framework for Deno, designed for low-latency edge computing with built-in routing, middleware, and JWT auth.",
    tech: ["TypeScript", "Deno", "Rust", "gRPC"],
    tags: ["Cloud", "Platform"],
    stat: "Edge-native runtime",
    links: [
      { label: "GitHub", href: "https://github.com/isaackumi/fly-deno" },
      { label: "YouTube Demo", href: "https://youtu.be/b3y9oa52IwY" },
    ],
    gradient: "from-accent-green/20 to-transparent",
  },
  {
    title: "QuikNote",
    description:
      "Ghana's first edu-content platform for students — 1,300+ lecture notes and past papers uploaded, used by university students nationwide. Seed-funded at $5,000.",
    tech: ["Next.js", "Node.js", "MongoDB", "AWS"],
    tags: ["Fullstack", "EdTech"],
    stat: "1,300+ uploads · $5K funded",
    links: [{ label: "Live", href: "#" }],
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    title: "Pill Brook",
    description:
      "Full-stack website for a sustainable tilapia aquaculture farm in Gyakiti, Eastern Region, Ghana. Features online ordering, donation flow, and service showcase for premium farm-fresh fish.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    tags: ["Fullstack", "Agriculture"],
    stat: "Live · Frequently, Eastern Region",
    links: [{ label: "Live", href: "#" }],
    gradient: "from-teal-500/20 to-transparent",
  },
];

const CARD_WIDTH = 580; // px, matches w-[580px] below
const GAP = 48; // gap-12 = 48px
const SCROLL_HEIGHT = `${projects.length * 90 + 60}vh`;

// ─── Inner component — only mounts after hasMounted, so useScroll ref is safe ───
const ProjectsContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ [key: number]: { x: number; y: number } }>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Raw travel: (n-1) full cards + (n-1) gaps past the first visible card
  const totalTravel = (projects.length - 1) * (CARD_WIDTH + GAP) + CARD_WIDTH * 0.4;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -totalTravel]);

  // Spring smoothing — feels like momentum, not a conveyor belt
  const x = useSpring(rawX, { stiffness: 80, damping: 25, restDelta: 0.5 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt((prev) => ({ ...prev, [i]: { x: mx, y: my } }));
  };

  const handleMouseLeave = (i: number) =>
    setTilt((prev) => ({ ...prev, [i]: { x: 0, y: 0 } }));

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-surface/30 border-t border-border-subtle"
      style={{ height: SCROLL_HEIGHT }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 lg:px-24 pt-24 pb-10 shrink-0">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">03.</span>
              <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
                Featured_Projects
              </h2>
              <div className="h-px bg-border-subtle flex-1" />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-start overflow-visible pl-6 lg:pl-24">
          <motion.div style={{ x }} className="flex gap-12 items-start">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                style={{
                  transform: tilt[i]
                    ? `perspective(1000px) rotateX(${tilt[i].y}deg) rotateY(${tilt[i].x}deg)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  transition: "transform 0.2s ease-out",
                }}
                className="w-[85vw] md:w-[580px] shrink-0 group cursor-pointer"
              >
                {/* Card face — clicking (not on a link button) opens primary link */}
                <div
                  className={`aspect-video bg-surface overflow-hidden rounded-3xl border border-border-subtle group-hover:border-accent-blue/50 transition-all relative shadow-2xl lighting-edge bg-gradient-to-br ${project.gradient} cursor-pointer`}
                  onClick={() => {
                    const raw =
                      project.links[0].href !== "#"
                        ? project.links[0].href
                        : (project.links[1]?.href ?? null);
                    if (!raw) return;
                    if (raw.startsWith("#") && raw.length > 1) {
                      document.querySelector(raw)?.scrollIntoView({ behavior: "smooth" });
                      return;
                    }
                    window.open(raw, "_blank", "noopener,noreferrer");
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono uppercase tracking-widest text-text-muted border border-border-subtle px-2 py-0.5 rounded bg-background/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("#") ? undefined : "_blank"}
                            rel={link.href.startsWith("#") ? undefined : "noopener noreferrer"}
                            className="text-[9px] font-mono uppercase tracking-widest px-3 py-1 border border-accent-blue/40 rounded text-accent-blue hover:bg-accent-blue hover:text-white transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (link.href.startsWith("#") && link.href.length > 1) {
                                e.preventDefault();
                                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                          >
                            [{link.label}]
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-accent-green uppercase tracking-widest">
                        {project.stat}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-6 md:mt-8 space-y-4">
                  <p className="text-text-body text-base md:text-lg leading-relaxed font-sans">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-text-muted border border-border-subtle px-4 py-1.5 rounded-full group-hover:border-accent-blue/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All */}
            <div className="w-[260px] shrink-0 flex items-center justify-center self-center">
              <a
                href="https://github.com/isaackumi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-6 group"
              >
                <div className="w-24 h-24 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-accent-blue group-hover:glow transition-all duration-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
                <span className="font-mono text-sm uppercase tracking-widest text-text-muted group-hover:text-accent-blue transition-colors text-center">
                  View All on GitHub
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 px-6 lg:px-24 pb-8 pt-4">
          <div className="h-px bg-border-subtle w-full relative overflow-hidden">
            <motion.div className="absolute left-0 top-0 h-full bg-accent-blue" style={{ width: progressWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Public export — guards hydration, only renders ProjectsContent after mount ───
export const Projects = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <section id="projects" className="bg-surface/30 min-h-[600px]" />;
  return <ProjectsContent />;
};
