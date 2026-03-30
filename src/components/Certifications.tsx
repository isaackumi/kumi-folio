"use client";

import { motion } from "framer-motion";

const certs = [
  {
    name: "AWS Certified DevOps Engineer – Professional",
    issuer: "Amazon Web Services",
    date: "Dec 2021",
    id: "DOP-C01",
    link: "https://www.credly.com/badges/005c6e6f-f794-4472-ae44-a6b403aff0bb",
    type: "aws" as const,
    skills: ["DevOps", "AWS", "CI/CD"],
  },
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "Oct 2021",
    id: "DVA-C01",
    link: "https://www.credly.com/badges/6e72aeb1-629a-4ca0-ab75-2118090fb13f",
    type: "aws" as const,
    skills: ["AWS", "Serverless", "Cloud"],
  },
  {
    name: "Running Kubernetes on AWS (EKS)",
    issuer: "LinkedIn Learning",
    date: "Jul 2023",
    id: "LI-EKS",
    link: "https://www.linkedin.com/learning/certificates/0543f9bd3f9c353c0afc6f778f200dba392d7801d21558dbef1a2df9f7ef068a",
    type: "linkedin" as const,
    skills: ["Kubernetes", "Amazon EKS"],
  },
  {
    name: "Azure Kubernetes Service (AKS): Deploying Microservices",
    issuer: "LinkedIn Learning",
    date: "Jul 2023",
    id: "LI-AKS",
    link: "https://www.linkedin.com/learning/certificates/fe9bcd1d96e73d8c0fe98ad7590d54f7bb1b31d70c4f00cba9b1a14eaab3b853",
    type: "linkedin" as const,
    skills: ["Azure Kubernetes Service", "Microservices"],
  },
  {
    name: "Cloud Native Dev with Node.js, Docker & Kubernetes",
    issuer: "LinkedIn Learning",
    date: "Jul 2023",
    id: "LI-CN",
    link: "https://www.linkedin.com/learning/certificates/3a629edb3ba4ac8bd16952aa8af8e5a2b193a297bd87a7035f8fceed047e65b6",
    type: "linkedin" as const,
    skills: ["Docker", "Kubernetes", "Node.js"],
  },
];

const AWSIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272a2.295 2.295 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.578.578 0 0 1 .224-.168c.28-.144.616-.264 1.008-.36A4.84 4.84 0 0 1 3.8 7.988c.952 0 1.648.216 2.096.648.44.432.664 1.088.664 1.968v2.592zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.66 6.66 0 0 0-.736-.136 6.02 6.02 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.48 5.833 1.376-5.833c.04-.16.088-.264.152-.312a.549.549 0 0 1 .32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.392 5.904 1.528-5.904c.048-.16.104-.264.16-.312a.52.52 0 0 1 .312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.2l-2.128 6.186c-.048.16-.104.264-.168.312a.52.52 0 0 1-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32L12.58 7.129l-1.36 5.604c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm11.168.272c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.232v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264a.86.86 0 0 0 .42-.756.778.778 0 0 0-.212-.548c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.284-.816a1.915 1.915 0 0 1-.408-1.176c0-.34.072-.64.216-.896.144-.256.336-.48.576-.664.24-.192.52-.336.832-.432.312-.096.64-.144.984-.144.168 0 .344.008.512.032.176.024.336.056.488.088.144.04.28.08.408.128.128.048.224.096.288.144a.59.59 0 0 1 .208.192.432.432 0 0 1 .064.24v.376c0 .168-.064.256-.184.256a.83.83 0 0 1-.3-.096 3.817 3.817 0 0 0-1.6-.312c-.472 0-.84.08-1.096.24-.256.16-.384.408-.384.752 0 .216.08.4.24.552.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .348-.072.664-.208.936-.144.272-.336.512-.592.704-.256.2-.56.344-.912.44-.368.104-.752.16-1.168.16z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const cardStyles = {
  aws: {
    iconBg: "bg-orange-400/10 border-orange-400/20 text-orange-400",
    frontGradient: "from-orange-400/20 to-yellow-400/10",
    frontHover: "group-hover:border-orange-400/40",
    backGradient: "from-orange-500 to-yellow-500",
    verifyLabel: "Verify on Credly",
    verifyColor: "text-orange-600",
  },
  linkedin: {
    iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    frontGradient: "from-blue-500/20 to-cyan-400/10",
    frontHover: "group-hover:border-blue-500/40",
    backGradient: "from-blue-600 to-cyan-500",
    verifyLabel: "Show Certificate",
    verifyColor: "text-blue-600",
  },
};

export const Certifications = () => {
  return (
    <section id="certs" className="bg-surface/10 py-32 px-6 lg:px-24 border-t border-border-subtle">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">07.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Certifications
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, i) => {
            const s = cardStyles[cert.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="group h-72 [perspective:1000px]"
              >
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.frontGradient} bg-surface border border-border-subtle rounded-3xl p-8 flex flex-col justify-between [backface-visibility:hidden] ${s.frontHover} transition-colors`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${s.iconBg}`}>
                        {cert.type === "aws" ? <AWSIcon /> : <LinkedInIcon />}
                      </div>
                      <span className="text-[9px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded uppercase tracking-widest">{cert.date}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-display font-bold text-text-primary leading-tight">{cert.name}</h4>
                      <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{cert.issuer}</div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="text-[8px] font-mono px-2 py-0.5 border border-border-subtle rounded-full text-text-muted">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest opacity-50">
                      Hover to verify →
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`absolute inset-0 h-full w-full bg-gradient-to-br ${s.backGradient} rounded-3xl p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between`}>
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">Issued by</div>
                      <div className="text-xl font-display font-bold leading-tight">{cert.issuer}</div>
                      <div className="text-sm opacity-80 pt-1">{cert.date}</div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs opacity-80 font-sans leading-relaxed line-clamp-2">
                        {cert.name}
                      </p>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full py-3 bg-white ${s.verifyColor} rounded-xl font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all font-bold`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {s.verifyLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
