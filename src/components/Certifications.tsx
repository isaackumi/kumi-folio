"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const groups = [
  {
    key: "aws",
    label: "Amazon Web Services",
    shortLabel: "AWS",
    color: "#FF9900",
    bgClass: "from-orange-400/15 to-yellow-400/5",
    borderClass: "border-orange-400/20 hover:border-orange-400/50",
    badgeClass: "bg-orange-400/10 text-orange-400 border-orange-400/20",
    verifyLabel: "Verify on Credly",
    verifyTextClass: "text-orange-600",
    backClass: "from-orange-500 to-yellow-500",
    certs: [
      {
        name: "AWS Certified DevOps Engineer – Professional",
        date: "Dec 2021",
        id: "DOP-C01",
        link: "https://www.credly.com/badges/005c6e6f-f794-4472-ae44-a6b403aff0bb",
        skills: ["DevOps", "AWS", "CI/CD"],
      },
      {
        name: "AWS Certified Developer – Associate",
        date: "Oct 2021",
        id: "DVA-C01",
        link: "https://www.credly.com/badges/6e72aeb1-629a-4ca0-ab75-2118090fb13f",
        skills: ["AWS", "Serverless", "Cloud"],
      },
    ],
  },
  {
    key: "linkedin",
    label: "LinkedIn Learning",
    shortLabel: "LinkedIn",
    color: "#0A66C2",
    bgClass: "from-blue-500/15 to-cyan-400/5",
    borderClass: "border-blue-500/20 hover:border-blue-500/50",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    verifyLabel: "Show Certificate",
    verifyTextClass: "text-blue-600",
    backClass: "from-blue-600 to-cyan-500",
    certs: [
      {
        name: "Running Kubernetes on AWS (EKS)",
        date: "Jul 2023",
        id: "LI-EKS",
        link: "https://www.linkedin.com/learning/certificates/0543f9bd3f9c353c0afc6f778f200dba392d7801d21558dbef1a2df9f7ef068a",
        skills: ["Kubernetes", "Amazon EKS"],
      },
      {
        name: "Azure Kubernetes Service (AKS): Deploying Microservices",
        date: "Jul 2023",
        id: "LI-AKS",
        link: "https://www.linkedin.com/learning/certificates/fe9bcd1d96e73d8c0fe98ad7590d54f7bb1b31d70c4f00cba9b1a14eaab3b853",
        skills: ["Azure Kubernetes Service", "Microservices"],
      },
      {
        name: "Cloud Native Dev with Node.js, Docker & Kubernetes",
        date: "Jul 2023",
        id: "LI-CN",
        link: "https://www.linkedin.com/learning/certificates/3a629edb3ba4ac8bd16952aa8af8e5a2b193a297bd87a7035f8fceed047e65b6",
        skills: ["Docker", "Kubernetes", "Node.js"],
      },
    ],
  },
  {
    key: "acg",
    label: "A Cloud Guru",
    shortLabel: "A Cloud Guru",
    color: "#00BFA5",
    bgClass: "from-teal-400/15 to-green-400/5",
    borderClass: "border-teal-400/20 hover:border-teal-400/50",
    badgeClass: "bg-teal-400/10 text-teal-400 border-teal-400/20",
    verifyLabel: "Verify Certificate",
    verifyTextClass: "text-teal-700",
    backClass: "from-teal-600 to-green-500",
    certs: [
      {
        name: "Introduction to Ansible",
        date: "2023",
        id: "ACG-ANSIBLE",
        link: "https://verify.acloud.guru/1F41CF159838",
        skills: ["Ansible", "Automation", "IaC"],
      },
      {
        name: "Kubernetes Essentials",
        date: "2023",
        id: "ACG-K8S",
        link: "https://verify.acloud.guru/9682E0186568",
        skills: ["Kubernetes", "Container Orchestration"],
      },
      {
        name: "Introduction to Containers and Docker",
        date: "2023",
        id: "ACG-DOCKER",
        link: "https://verify.acloud.guru/E8012DB2DACC",
        skills: ["Docker", "Containers", "DevOps"],
      },
      {
        name: "YAML Essentials",
        date: "2023",
        id: "ACG-YAML",
        link: "https://verify.acloud.guru/B69B00F165CA",
        skills: ["YAML", "Configuration", "DevOps"],
      },
      {
        name: "HashiCorp Certified: Terraform Associate",
        date: "2023",
        id: "ACG-TF",
        link: "https://verify.acloud.guru/261DBCD11F38",
        skills: ["Terraform", "IaC", "HashiCorp"],
      },
      {
        name: "Linux Operating System",
        date: "2023",
        id: "ACG-LINUX",
        link: "https://verify.acloud.guru/6894878BBD82",
        skills: ["Linux", "Bash", "Systems"],
      },
      {
        name: "AZ-104: Microsoft Azure Administrator",
        date: "2023",
        id: "ACG-AZ104",
        link: "https://verify.acloud.guru/62834D69FEA5",
        skills: ["Azure", "Cloud Admin", "Microsoft"],
      },
      {
        name: "AZ-900: Azure Fundamentals",
        date: "2023",
        id: "ACG-AZ900",
        link: "https://verify.acloud.guru/5DFD33F30FBA",
        skills: ["Azure", "Cloud", "Microsoft"],
      },
      {
        name: "AZ-203: Developing Solutions for Microsoft Azure",
        date: "2023",
        id: "ACG-AZ203",
        link: "https://verify.acloud.guru/14C823BC5A04",
        skills: ["Azure", "App Development", "Microsoft"],
      },
      {
        name: "AZ-204: Developing Solutions for Microsoft Azure",
        date: "2023",
        id: "ACG-AZ204",
        link: "https://verify.acloud.guru/B854F3344239",
        skills: ["Azure", "App Development", "Microsoft"],
      },
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const AWSIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272a2.295 2.295 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.578.578 0 0 1 .224-.168c.28-.144.616-.264 1.008-.36A4.84 4.84 0 0 1 3.8 7.988c.952 0 1.648.216 2.096.648.44.432.664 1.088.664 1.968v2.592zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.66 6.66 0 0 0-.736-.136 6.02 6.02 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.48 5.833 1.376-5.833c.04-.16.088-.264.152-.312a.549.549 0 0 1 .32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.392 5.904 1.528-5.904c.048-.16.104-.264.16-.312a.52.52 0 0 1 .312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.2l-2.128 6.186c-.048.16-.104.264-.168.312a.52.52 0 0 1-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32L12.58 7.129l-1.36 5.604c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm11.168.272c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.232v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264a.86.86 0 0 0 .42-.756.778.778 0 0 0-.212-.548c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.284-.816a1.915 1.915 0 0 1-.408-1.176c0-.34.072-.64.216-.896.144-.256.336-.48.576-.664.24-.192.52-.336.832-.432.312-.096.64-.144.984-.144.168 0 .344.008.512.032.176.024.336.056.488.088.144.04.28.08.408.128.128.048.224.096.288.144a.59.59 0 0 1 .208.192.432.432 0 0 1 .064.24v.376c0 .168-.064.256-.184.256a.83.83 0 0 1-.3-.096 3.817 3.817 0 0 0-1.6-.312c-.472 0-.84.08-1.096.24-.256.16-.384.408-.384.752 0 .216.08.4.24.552.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .348-.072.664-.208.936-.144.272-.336.512-.592.704-.256.2-.56.344-.912.44-.368.104-.752.16-1.168.16z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ACGIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const Certifications = () => {
  const [openGroup, setOpenGroup] = useState<string | null>("aws");

  return (
    <section id="certs" className="bg-surface/10 py-32 px-6 lg:px-24 border-t border-border-subtle">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">07.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Certifications
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
          <span className="text-xs font-mono text-text-muted border border-border-subtle px-3 py-1 rounded uppercase tracking-widest">
            15 total
          </span>
        </motion.div>

        {/* Issuer groups */}
        <div className="space-y-4">
          {groups.map((group, gi) => {
            const Icon = group.key === "aws" ? AWSIcon : group.key === "linkedin" ? LinkedInIcon : ACGIcon;
            const isOpen = openGroup === group.key;

            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: gi * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                {/* Group header / toggle */}
                <button
                  onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  className={`w-full text-left bg-gradient-to-r ${group.bgClass} bg-surface border ${group.borderClass} rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 group`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${group.badgeClass}`}>
                    <Icon />
                  </div>

                  {/* Label + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                        {group.label}
                      </h3>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${group.badgeClass}`}>
                        {group.certs.length} cert{group.certs.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    {/* Skill pills preview (hidden when open) */}
                    {!isOpen && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {Array.from(new Set(group.certs.flatMap((c) => c.skills))).slice(0, 6).map((s) => (
                          <span key={s} className="text-[9px] font-mono px-2 py-0.5 border border-border-subtle rounded-full text-text-muted">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chevron */}
                  <span className="text-text-muted shrink-0">
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                {/* Expanded cert list */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.certs.map((cert, ci) => (
                          <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ci * 0.05, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className={`group relative bg-surface border ${group.borderClass} rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg`}
                          >
                            {/* Name + date */}
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-display font-semibold text-text-primary leading-snug flex-1">
                                {cert.name}
                              </h4>
                              <span className="text-[9px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                                {cert.date}
                              </span>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.map((s) => (
                                <span key={s} className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${group.badgeClass}`}>
                                  {s}
                                </span>
                              ))}
                            </div>

                            {/* Verify link */}
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`mt-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest ${group.verifyTextClass} opacity-60 hover:opacity-100 transition-opacity`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ShieldIcon />
                              {group.verifyLabel}
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
