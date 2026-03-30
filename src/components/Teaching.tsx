"use client";

import { motion } from "framer-motion";

const teachingRoles = [
  { role: "Ashesi TA", period: "2021", impact: "Data Structures & Algorithms" },
  { role: "Programming Tutor", period: "2019-2021", impact: "C++ & Python basics" },
  { role: "Teens In AI", period: "2022", impact: "Mentoring high schoolers" },
  { role: "GDSC Lead", period: "2020", impact: "Google Developer Student Club" },
  { role: "AIX Robotics Coach", period: "2021", impact: "FIRST Robotics Competition" },
  { role: "CyberGeeks Co-founder", period: "2019", impact: "Tech community building" },
];

const metrics = [
  { label: "Students", value: "100+" },
  { label: "Workshops", value: "10" },
  { label: "Score Improvement", value: "20%" },
  { label: "Individual Mentorship", value: "50" },
];

export const Teaching = () => {
  return (
    <section id="teaching" className="bg-background py-32 px-6 lg:px-24">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">06.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Education_&_Impact
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              From classrooms to Kubernetes clusters — I&apos;ve always taught.
            </h3>
            <p className="text-text-muted text-lg font-sans leading-relaxed">
              I believe that the best way to master a complex system is to explain it to someone else. 
              My teaching experience spans from university lecture halls to community workshops across Ghana.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {metrics.map((m, i) => (
                <div key={i} className="space-y-1">
                   <div className="text-4xl font-display font-bold text-accent-blue">{m.value}</div>
                   <div className="text-[10px] uppercase tracking-widest text-text-muted font-mono">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {teachingRoles.map((role, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-surface border border-border-subtle rounded-2xl group hover:border-accent-blue/30 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                    {role.role}
                  </h4>
                  <span className="text-xs font-mono text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded">
                    {role.period}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{role.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
