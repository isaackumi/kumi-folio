"use client";

import { motion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

const skills = [
  { category: "CLOUD", items: ["AWS", "Azure"] },
  { category: "DEVOPS", items: ["Docker", "Kubernetes", "ArgoCD", "Kustomize", "Jenkins", "GitHub Actions", "SonarQube"] },
  { category: "LANGUAGES", items: ["Python", "JavaScript", "TypeScript", "Bash", "PHP"] },
  { category: "FRAMEWORKS", items: ["FastAPI", "Flask", "Django", "Next.js", "Node.js", "Laravel"] },
  { category: "DATABASES", items: ["MySQL", "MongoDB", "DynamoDB", "PostgreSQL"] },
  { category: "MONITORING", items: ["New Relic", "Graylog", "Prometheus", "Grafana", "Nginx"] },
  { category: "VERSIONING", items: ["Git", "Azure DevOps"] },
];

export const Skills = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return <section id="skills" className="bg-background min-h-[400px]" />;

  return (
    <section id="skills" className="bg-background py-32 px-6 lg:px-24">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">04.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Skills_&_Stack
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 bg-[#0c0c0c] text-[#f0f0f0] rounded-2xl border border-white/10 glow font-mono text-sm md:text-base relative overflow-hidden shadow-2xl"
        >
          {/* Scanline Overlay */}
          <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Terminal prompt header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent-blue mb-1">
                <span className="text-accent-green">➜</span>
                <span className="text-white/60">~/skills</span>
                <span className="text-accent-blue font-bold">$ ls -la --group-directories-first</span>
              </div>
              <div className="text-white/30 text-xs pl-6 pb-2 border-b border-white/5">
                total {skills.reduce((acc, s) => acc + s.items.length, 0)} tools across {skills.length} categories
              </div>
            </div>

            <div className="grid gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 group"
                >
                  <span className="text-accent-blue font-bold group-hover:text-accent-green transition-colors uppercase tracking-widest shrink-0">
                    [{skill.category}]
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {skill.items.map((item, j) => (
                      <motion.span
                        key={j}
                        initial={{ scale: 0.7, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: i * 0.08 + j * 0.04,
                          type: "spring",
                          stiffness: 350,
                          damping: 15,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ y: -3, color: "#00FF88" }}
                        className="px-3 py-1 border border-white/10 rounded-md text-white/50 hover:text-accent-green hover:border-accent-green/30 transition-colors cursor-default text-xs"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Blinking cursor at bottom */}
            <div className="pt-4 flex items-center gap-2">
              <span className="text-accent-green">➜</span>
              <span className="text-white/60">~/skills</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2.5 h-5 bg-accent-blue ml-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
