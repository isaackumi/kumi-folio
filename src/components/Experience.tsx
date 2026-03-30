"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    company: "Hubtel",
    role: "Site Reliability & Fullstack Engineer",
    period: "Mar 2024 – Present",
    location: "Accra, Ghana",
    status: "current",
    color: "#6C63FF",
    description:
      "Leading reliability initiatives for Ghana's largest payment gateway. Architecting Kubernetes-native microservices, automating CI/CD pipelines, and maintaining 99.9% uptime across critical fintech systems.",
    technologies: ["Kubernetes", "Azure", "Terraform", "Next.js", "SonarQube", "ArgoCD"],
    bullets: [
      "Reduced MTTR by 40% through proactive alerting and runbook automation",
      "Architected a multi-tenant deployment platform serving 50+ microservices",
      "Led migration of legacy monolith to cloud-native microservices on AKS",
    ],
  },
  {
    company: "AiFi Inc.",
    role: "Deployment Engineer",
    period: "Mar 2023 – Mar 2024",
    location: "Santa Clara, CA",
    status: "past",
    color: "#00FF88",
    description:
      "Managed edge computing infrastructure for autonomous retail stores powered by computer vision. Deployed and maintained ML inference pipelines across 50+ store locations in the US.",
    technologies: ["Linux", "Docker", "Python", "Bash", "Ansible", "NVIDIA Jetson"],
    bullets: [
      "Deployed autonomous checkout systems across 50+ US retail locations",
      "Optimized CV inference pipeline, reducing latency by 30%",
      "Built Ansible playbooks reducing store deployment time from 4h to 45min",
    ],
  },
  {
    company: "AFRO Technologies",
    role: "Cloud Consultant",
    period: "Apr 2023 – Present",
    location: "Accra, Ghana",
    status: "current",
    color: "#FFBD33",
    description:
      "Consulting on cloud architecture and DevOps transformation for Ghanaian startups. Helping teams adopt infrastructure-as-code, containerization, and modern CI/CD practices.",
    technologies: ["AWS", "Terraform", "Docker", "GitHub Actions", "Node.js"],
    bullets: [
      "Designed AWS landing zone for 3 early-stage fintech startups",
      "Reduced cloud spend by 35% through right-sizing and reserved instances",
      "Implemented GitOps workflows cutting deployment errors by 60%",
    ],
  },
  {
    company: "ScaleCapacity",
    role: "DevOps Engineer",
    period: "2022 – 2023",
    location: "California, USA (Remote)",
    status: "past",
    color: "#60a5fa",
    description:
      "Built and maintained CI/CD infrastructure for SaaS products. Drove infrastructure-as-code adoption and improved developer experience through platform engineering initiatives.",
    technologies: ["Jenkins", "Kubernetes", "AWS", "Terraform", "Prometheus"],
    bullets: [
      "Built self-service developer platform reducing ticket volume by 50%",
      "Managed Kubernetes clusters serving 500K+ daily active users",
      "Implemented Prometheus/Grafana observability stack from scratch",
    ],
  },
  {
    company: "Ashesi University",
    role: "Teaching & Research Assistant",
    period: "May 2021 – Dec 2021",
    location: "Berekuso, Ghana",
    status: "past",
    color: "#a78bfa",
    description:
      "Assisted in teaching Data Structures & Algorithms to 100+ undergraduate students. Supported faculty research on computational problem-solving and algorithm design.",
    technologies: ["C++", "Python", "Algorithm Design", "Pedagogy"],
    bullets: [
      "Taught weekly tutorial sessions for Data Structures & Algorithms",
      "Mentored 50 individual students, improving average grades by 20%",
      "Co-developed new programming exercises adopted into the curriculum",
    ],
  },
  {
    company: "Ashesi CS Dept.",
    role: "Programming Tutor",
    period: "Feb 2019 – Jan 2021",
    location: "Berekuso, Ghana",
    status: "past",
    color: "#f472b6",
    description:
      "Provided one-on-one and group tutoring for first and second-year CS students. Focused on foundational programming concepts in Python and C++.",
    technologies: ["Python", "C++", "Object-Oriented Design"],
    bullets: [
      "Tutored 100+ students across 2 academic years",
      "Ran weekly peer-learning sessions and hackathon prep workshops",
      "Developed custom exercises to make recursion and pointers click",
    ],
  },
];

const NAVBAR = 80;
const STACK_INDENT = 18; // each subsequent sticky top is 18px lower

export const Experience = () => {
  const hasMounted = useHasMounted();
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState<{ [key: number]: { x: number; y: number } }>({});

  // ── GSAP ScrollTrigger for scroll-driven scale ────────────────────────────
  useEffect(() => {
    if (!hasMounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".exp-wrapper");

      wrappers.forEach((wrapper, i) => {
        if (i === wrappers.length - 1) return; // last card never scales

        const card = wrapper.querySelector<HTMLElement>(".exp-card-inner");
        if (!card) return;

        gsap.fromTo(
          card,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.87,
            filter: "brightness(0.65)",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasMounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt((prev) => ({ ...prev, [i]: { x, y } }));
  };

  const handleMouseLeave = (i: number) =>
    setTilt((prev) => ({ ...prev, [i]: { x: 0, y: 0 } }));

  if (!hasMounted)
    return <section id="experience" className="bg-background min-h-[600px]" />;

  return (
    <section id="experience" ref={sectionRef} className="bg-background px-6 lg:px-24 pt-32">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">02.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Experience
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </motion.div>

        <div>
          {experiences.map((exp, i) => {
            const isLast = i === experiences.length - 1;
            const stickyTop = NAVBAR + i * STACK_INDENT;

            return (
              /* exp-wrapper: scroll target for GSAP + provides scroll time via paddingBottom */
              <div
                key={i}
                className="exp-wrapper"
                style={{ paddingBottom: isLast ? "6rem" : "32vh" }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: `${stickyTop}px`,
                    zIndex: i + 1,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {/* exp-card-inner: GSAP animates scale + brightness on this */}
                    <div
                      className="exp-card-inner"
                      style={{
                        transformOrigin: "top center",
                        willChange: "transform, filter",
                      }}
                      onMouseMove={(e) => handleMouseMove(e, i)}
                      onMouseLeave={() => handleMouseLeave(i)}
                    >
                      {/* 3-D tilt — separate inner div so it doesn't conflict with GSAP */}
                      <div
                        style={{
                          transform: tilt[i]
                            ? `perspective(1200px) rotateX(${tilt[i].y}deg) rotateY(${tilt[i].x}deg)`
                            : "none",
                          transition: "transform 0.2s ease-out",
                        }}
                        className="bg-surface border border-border-subtle rounded-3xl overflow-hidden shadow-2xl group hover:border-accent-blue/30 transition-colors duration-500 lighting-edge"
                      >
                        {/* Left colour accent bar */}
                        <div
                          className="absolute top-0 left-0 w-1.5 h-full opacity-80"
                          style={{ backgroundColor: exp.color }}
                        />

                        <div className="p-8 md:p-12">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                {exp.status === "current" && (
                                  <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
                                  </span>
                                )}
                                <span className="text-xs font-mono uppercase tracking-widest text-accent-blue font-bold">
                                  {exp.period}
                                </span>
                              </div>
                              <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                                {exp.company}
                              </h3>
                              <h4 className="text-lg md:text-xl font-display font-medium text-text-body underline decoration-accent-blue/30 decoration-2 underline-offset-4">
                                {exp.role}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono text-text-muted border border-border-subtle px-3 py-1 rounded uppercase tracking-widest self-start shrink-0">
                              {exp.location}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-text-body text-lg max-w-3xl leading-relaxed mb-8">
                            {exp.description}
                          </p>

                          {/* Bullets */}
                          <ul className="space-y-2 mb-8">
                            {exp.bullets.map((b, j) => (
                              <li key={j} className="flex items-start gap-3 text-text-muted text-sm">
                                <span className="text-accent-green font-mono shrink-0 mt-0.5">▸</span>
                                {b}
                              </li>
                            ))}
                          </ul>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-3">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-4 py-1.5 bg-background/50 border border-border-subtle rounded-full text-[10px] font-mono text-text-muted hover:border-accent-blue hover:text-accent-blue transition-all cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
