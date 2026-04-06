"use client";

import { motion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

const impactStats = [
  { value: "100+",  label: "Students taught",       color: "text-accent-blue"  },
  { value: "50",    label: "Individual mentorships", color: "text-accent-green" },
  { value: "20%",   label: "Grade improvement",      color: "text-accent-blue"  },
  { value: "6+",    label: "Roles & programmes",     color: "text-accent-green" },
];

const roles = [
  {
    org: "Ashesi University",
    role: "BSc. Management Information Systems",
    period: "Sept 2017 – June 2021",
    description:
      "Degree bridging business, systems, and software delivery. Capstone: Fly-Deno — a Deno-based backend framework from JSON routing through a cohesive, developer-facing API. GRE 324 (Verbal 161, Quantitative 163).",
    tags: ["MIS", "Capstone", "Systems", "Fly-Deno"],
    color: "#0ea5e9",
    icon: "📜",
  },
  {
    org: "Ashesi University",
    role: "Teaching & Research Assistant",
    period: "May 2021 – Dec 2021",
    description:
      "Taught weekly Data Structures & Algorithms tutorials to 100+ undergrads. Co-developed new programming exercises adopted into the official curriculum.",
    tags: ["C++", "Python", "Algorithms", "Academia"],
    color: "#6366f1",
    icon: "🎓",
  },
  {
    org: "Ashesi CS Department",
    role: "Programming Tutor",
    period: "Feb 2019 – Jan 2021",
    description:
      "One-on-one and group tutoring for first and second-year students. Built custom exercises to make recursion and pointers finally click.",
    tags: ["Python", "C++", "OOP", "Peer Learning"],
    color: "#8b5cf6",
    icon: "📚",
  },
  {
    org: "Teens In AI",
    role: "AI Mentor",
    period: "2022",
    description:
      "Mentored high school students through AI fundamentals and building their first ML projects. Part of the continental Teens In AI programme.",
    tags: ["AI", "ML", "Youth", "Mentorship"],
    color: "#f472b6",
    icon: "🤖",
  },
  {
    org: "Google Developer Student Club",
    role: "GDSC Lead — Ashesi",
    period: "2020",
    description:
      "Led the GDSC chapter at Ashesi University, running workshops on web, cloud, and mobile development. Grew the community from scratch.",
    tags: ["Google", "Community", "Web", "Cloud"],
    color: "#10b981",
    icon: "🌍",
  },
  {
    org: "AIX Robotics",
    role: "FRC Robotics Coach",
    period: "2021",
    description:
      "Coached high school students competing in the FIRST Robotics Competition — programming, mechanical thinking, and real-time problem solving under pressure.",
    tags: ["Robotics", "FIRST", "Coaching", "Engineering"],
    color: "#f59e0b",
    icon: "🦾",
  },
  {
    org: "CyberGeeks Ghana",
    role: "Co-founder",
    period: "2019 – 2021",
    description:
      "Co-founded a student-led tech community focused on cybersecurity and open-source software. Organised workshops, CTFs, and peer talks.",
    tags: ["Security", "Open Source", "Community", "CTF"],
    color: "#ef4444",
    icon: "🔐",
  },
];

export const Teaching = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted)
    return <section id="teaching" className="bg-background min-h-[600px]" />;

  return (
    <section id="teaching" className="bg-background py-16 md:py-24 lg:py-32 px-6 lg:px-24">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10 md:mb-14 lg:mb-20"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">06.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Education_&_Impact
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </motion.div>

        {/* Hero copy + stats */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-10 md:mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-text-primary">
              From classrooms to Kubernetes clusters —<br />
              <span className="text-accent-blue">I&apos;ve always taught.</span>
            </h3>
            <p className="text-text-muted text-lg font-sans leading-relaxed max-w-lg">
              The best way to deeply understand a complex system is to explain it to someone else.
              My teaching spans university lecture halls, community bootcamps, and online channels across Ghana and beyond.
            </p>
          </motion.div>

          {/* Impact stats bento */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.03 }}
                className="p-6 bg-surface border border-border-subtle rounded-3xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:border-accent-blue/30 transition-all lighting-edge"
              >
                <span className={`text-2xl sm:text-3xl md:text-4xl font-display font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted mt-2 font-mono">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Role cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ y: -5 }}
              className="group relative bg-surface border border-border-subtle rounded-3xl p-6 shadow-md hover:shadow-2xl hover:border-accent-blue/30 transition-all duration-300 overflow-hidden"
            >
              {/* Color left bar */}
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
                style={{ backgroundColor: role.color }}
              />

              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${role.color}12 0%, transparent 65%)` }}
              />

              <div className="relative z-10 space-y-4">
                {/* Icon + period */}
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{role.icon}</span>
                  <span
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                    style={{ color: role.color, borderColor: `${role.color}40`, background: `${role.color}10` }}
                  >
                    {role.period}
                  </span>
                </div>

                {/* Org + role */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">{role.org}</p>
                  <h4 className="text-lg font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors leading-snug">
                    {role.role}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-sm text-text-muted leading-relaxed">{role.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-border-subtle text-text-muted group-hover:border-accent-blue/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
