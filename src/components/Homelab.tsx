"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "master-01", type: "Control Plane", status: "Running", ip: "10.0.0.10" },
  { id: "worker-01", type: "Worker Node", status: "Running", ip: "10.0.0.11" },
  { id: "worker-02", type: "Worker Node", status: "Running", ip: "10.0.0.12" },
  { id: "worker-03", type: "Worker Node", status: "Running", ip: "10.0.0.13" },
];

const services = [
  { name: "Traefik", type: "Ingress", status: "Healthy" },
  { name: "Prometheus", type: "Monitoring", status: "Healthy" },
  { name: "Grafana", type: "Visualization", status: "Healthy" },
  { name: "ArgoCD", type: "GitOps", status: "Healthy" },
  { name: "Pi-hole", type: "DNS", status: "Healthy" },
];

export const Homelab = () => {
  return (
    <section id="lab" className="bg-surface/30 py-32 px-6 lg:px-24 border-t border-border-subtle">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">05.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            The_Lab
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                What&apos;s running in my cluster right now
              </h3>
              <p className="text-text-muted text-lg font-sans leading-relaxed max-w-xl">
                My personal playground for exploring platform engineering. 
                A multi-node Kubernetes cluster built on Raspberry Pis and recycled hardware, 
                self-hosting DNS, CI/CD, and home automation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((svc, i) => (
                <div key={i} className="p-4 bg-background border border-border-subtle rounded-xl flex items-center justify-between group hover:border-accent-green/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-widest text-text-muted">{svc.type}</span>
                    <span className="font-display font-bold text-text-primary">{svc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[10px] font-mono uppercase text-accent-green">{svc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Animated Node Graph SVG */}
            <div className="p-8 bg-surface rounded-3xl border border-border-subtle glow relative overflow-hidden aspect-square flex items-center justify-center">
              <div className="absolute inset-0 dot-grid opacity-20" />
              
              <svg width="400" height="400" viewBox="0 0 400 400" className="relative z-10 w-full h-full">
                {/* Connection Lines */}
                <motion.path 
                  d="M200 100 L100 250 M200 100 L200 250 M200 100 L300 250"
                  stroke="rgba(108, 99, 255, 0.2)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                {/* Master Node */}
                <motion.g initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }}>
                  <circle cx="200" cy="100" r="40" className="fill-surface stroke-accent-blue stroke-2" />
                  <text x="200" y="105" textAnchor="middle" className="fill-accent-blue text-[10px] font-mono font-bold">MASTER-01</text>
                  <circle cx="200" cy="100" r="45" className="fill-none stroke-accent-blue opacity-20 stroke-1">
                    <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
                  </circle>
                </motion.g>

                {/* Worker Nodes */}
                {[100, 200, 300].map((x, i) => (
                  <motion.g key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.2 }}>
                    <circle cx={x} cy="250" r="30" className="fill-surface stroke-border-subtle stroke-2" />
                    <text x={x} y="255" textAnchor="middle" className="fill-text-muted text-[8px] font-mono">WORKER-0{i+1}</text>
                  </motion.g>
                ))}
              </svg>

              {/* Status Terminal Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-md border border-border-subtle rounded-xl font-mono text-[10px] space-y-1">
                <p className="text-accent-blue">$ kubectl get nodes</p>
                <div className="grid grid-cols-3 text-text-muted border-b border-border-subtle pb-1 mb-1 italic">
                  <span>NAME</span>
                  <span>STATUS</span>
                  <span>IP</span>
                </div>
                {nodes.map(node => (
                  <div key={node.id} className="grid grid-cols-3">
                    <span className="text-text-body">{node.id}</span>
                    <span className="text-accent-green">Ready</span>
                    <span className="text-text-muted tabular-nums">{node.ip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
