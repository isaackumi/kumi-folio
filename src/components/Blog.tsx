"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  url: string;
  cover_image: string | null;
  social_image: string;
}

// Fallback posts if API fails
const fallbackPosts: Omit<BlogPost, "id">[] = [
  {
    title: "Building a Resilient K8s Homelab on Raspberry Pi",
    description: "How I turned recycled hardware and Pis into a production-grade multi-node cluster with GitOps, monitoring, and self-hosted DNS.",
    published_at: "2026-03-15T00:00:00Z",
    reading_time_minutes: 8,
    tag_list: ["Kubernetes", "SRE", "HomeLab"],
    url: "https://dev.to/isaackumi",
    cover_image: null,
    social_image: "",
  },
  {
    title: "PyWebGuard: How I Built a Flask WAF from Scratch",
    description: "A deep dive into building open-source middleware that protects Flask apps from SQL injection, XSS, and rate-limit abuse.",
    published_at: "2026-02-20T00:00:00Z",
    reading_time_minutes: 6,
    tag_list: ["Python", "Security", "OpenSource"],
    url: "https://dev.to/isaackumi",
    cover_image: null,
    social_image: "",
  },
  {
    title: "From Monolith to Microservices: An AKS Migration Story",
    description: "The real story behind migrating Hubtel's payment core to Kubernetes — the wins, the war stories, and the runbooks that saved us.",
    published_at: "2026-01-10T00:00:00Z",
    reading_time_minutes: 10,
    tag_list: ["Azure", "Kubernetes", "DevOps"],
    url: "https://dev.to/isaackumi",
    cover_image: null,
    social_image: "",
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const GradientPlaceholder = ({ index }: { index: number }) => {
  const gradients = [
    "from-accent-blue/30 via-purple-500/10 to-transparent",
    "from-accent-green/30 via-teal-500/10 to-transparent",
    "from-pink-500/30 via-purple-500/10 to-transparent",
  ];
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 3]}`}>
      <div className="absolute inset-0 dot-grid opacity-20" />
    </div>
  );
};

export const Blog = () => {
  const [posts, setPosts] = useState<(BlogPost | Omit<BlogPost, "id">)[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://dev.to/api/articles?username=isaackumi&per_page=3",
          { next: { revalidate: 3600 } } as RequestInit
        );
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPosts(data.slice(0, 3));
          }
        }
      } catch {
        // Keep fallback posts
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="bg-background py-32 px-6 lg:px-24">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <span className="font-mono text-accent-blue font-bold tracking-widest uppercase">08.</span>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-text-primary">
            Notes_&_Thoughts
          </h2>
          <div className="h-px bg-border-subtle flex-1" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer block"
            >
              <div className="aspect-video bg-surface border border-border-subtle rounded-2xl mb-6 overflow-hidden relative group-hover:border-accent-blue/40 transition-colors lighting-edge">
                {post.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <GradientPlaceholder index={i} />
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-blue">
                    Read Article →
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-text-muted">
                  <span>{loading ? "Loading..." : formatDate(post.published_at)}</span>
                  <span>·</span>
                  <span>{post.reading_time_minutes} min read</span>
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tag_list.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://dev.to/isaackumi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border-subtle rounded-xl font-mono text-xs uppercase tracking-widest text-text-muted hover:border-accent-blue hover:text-accent-blue transition-all group"
          >
            View All on Dev.to
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
