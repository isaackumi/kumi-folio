"use client";

import { motion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

const categories = [
  {
    key: "Cloud & Infra",
    color: "#6366f1",
    icon: "☁",
    items: [
      { name: "AWS",       level: 90 },
      { name: "Azure",     level: 85 },
      { name: "Terraform", level: 85 },
      { name: "Kubernetes",level: 88 },
      { name: "ArgoCD",    level: 80 },
      { name: "Ansible",   level: 78 },
    ],
  },
  {
    key: "DevOps & CI/CD",
    color: "#10b981",
    icon: "⚙",
    items: [
      { name: "Docker",          level: 92 },
      { name: "GitHub Actions",  level: 90 },
      { name: "Jenkins",         level: 82 },
      { name: "SonarQube",       level: 78 },
      { name: "Kustomize",       level: 75 },
      { name: "Prometheus",      level: 80 },
    ],
  },
  {
    key: "Languages",
    color: "#f59e0b",
    icon: "</>",
    items: [
      { name: "Python",     level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 88 },
      { name: "Bash",       level: 85 },
      { name: "Rust",       level: 40 },
      { name: "PHP",        level: 80 },
    ],
  },
  {
    key: "Frameworks",
    color: "#8b5cf6",
    icon: "▲",
    items: [
      { name: "Next.js",  level: 90 },
      { name: "FastAPI",  level: 88 },
      { name: "Flask",    level: 85 },
      { name: "Node.js",  level: 82 },
      { name: "Django",   level: 78 },
      { name: "Laravel",  level: 72 },
    ],
  },
  {
    key: "Databases",
    color: "#06b6d4",
    icon: "⬡",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL",      level: 85 },
      { name: "MongoDB",    level: 80 },
      { name: "DynamoDB",   level: 75 },
      { name: "Redis",      level: 70 },
    ],
  },
  {
    key: "Observability",
    color: "#f472b6",
    icon: "◉",
    items: [
      { name: "Grafana",   level: 85 },
      { name: "Prometheus",level: 82 },
      { name: "New Relic", level: 80 },
      { name: "Graylog",   level: 75 },
      { name: "Nginx",     level: 80 },
    ],
  },
];

const currentlyExploring = ["eBPF", "Rust", "Platform Engineering", "HomeLab / k3s", "SLO Design"];

export const Skills = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted)
    return <section id="skills" className="bg-background min-h-[400px]" />;

  return (
    <section id="skills" className="bg-background py-32 px-6 lg:px-24">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">04.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Skills_&_Stack
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </motion.div>

        {/* Category cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.07, ease: [0.33, 1, 0.68, 1] }}
              className="group relative bg-surface border border-border-subtle rounded-3xl p-6 hover:border-accent-blue/30 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
            >
              {/* Subtle color wash on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${cat.color}0d 0%, transparent 70%)` }}
              />

              {/* Card header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold font-mono"
                    style={{ background: `${cat.color}18`, color: cat.color }}
                  >
                    {cat.icon}
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: cat.color }}>
                    {cat.key}
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded">
                  {cat.items.length} tools
                </span>
              </div>

              {/* Skill rows with micro progress bars */}
              <div className="space-y-3 relative z-10">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.07 + ii * 0.04, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm font-sans text-text-body w-28 shrink-0">{item.name}</span>
                    <div className="flex-1 h-1 bg-border-subtle rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.07 + ii * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted w-8 text-right shrink-0">
                      {item.level}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently exploring strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 p-6 bg-surface border border-border-subtle rounded-2xl"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted shrink-0">
            Currently exploring →
          </span>
          {currentlyExploring.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ y: -3 }}
              className="px-4 py-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-xs font-mono text-accent-blue hover:bg-accent-blue/20 transition-colors cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
