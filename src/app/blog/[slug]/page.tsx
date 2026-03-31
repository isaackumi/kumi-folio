import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsQuery } from "@/sanity/lib/queries";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface CodeBlockValue {
  _type: "codeBlock";
  language?: string;
  filename?: string;
  code?: string;
}

interface CalloutValue {
  _type: "callout";
  type?: "info" | "warning" | "tip" | "danger";
  body?: string;
}

interface ImageValue {
  _type: "image";
  asset?: { url: string };
  alt?: string;
  caption?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  coverImage?: { asset?: { url: string }; alt?: string };
  body?: import("@portabletext/react").PortableTextProps["value"];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const LANG_LABEL: Record<string, string> = {
  bash: "Bash",
  shell: "Shell",
  python: "Python",
  typescript: "TypeScript",
  javascript: "JavaScript",
  go: "Go",
  rust: "Rust",
  yaml: "YAML",
  json: "JSON",
  dockerfile: "Dockerfile",
  terraform: "Terraform",
  sql: "SQL",
  css: "CSS",
  html: "HTML",
};

const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string; label: string }> = {
  info:    { border: "border-accent-blue/40",   bg: "bg-accent-blue/8",   icon: "ℹ️",  label: "Info"    },
  warning: { border: "border-yellow-400/50",    bg: "bg-yellow-400/8",    icon: "⚠️",  label: "Warning" },
  tip:     { border: "border-accent-green/40",  bg: "bg-accent-green/8",  icon: "💡",  label: "Tip"     },
  danger:  { border: "border-red-400/50",       bg: "bg-red-400/8",       icon: "🚨",  label: "Danger"  },
};

const TAG_COLORS: Record<string, string> = {
  DevOps:     "text-accent-blue border-accent-blue/30 bg-accent-blue/8",
  Cloud:      "text-sky-500 border-sky-500/30 bg-sky-500/8",
  SRE:        "text-accent-green border-accent-green/30 bg-accent-green/8",
  Kubernetes: "text-blue-400 border-blue-400/30 bg-blue-400/8",
  Python:     "text-yellow-500 border-yellow-500/30 bg-yellow-500/8",
  TypeScript: "text-blue-500 border-blue-500/30 bg-blue-500/8",
  Linux:      "text-orange-400 border-orange-400/30 bg-orange-400/8",
  Security:   "text-red-400 border-red-400/30 bg-red-400/8",
  Tutorial:   "text-purple-400 border-purple-400/30 bg-purple-400/8",
  Career:     "text-pink-400 border-pink-400/30 bg-pink-400/8",
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-display font-bold text-text-primary mt-12 mb-4 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display font-bold text-text-primary mt-10 mb-3 leading-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-display font-semibold text-text-primary mt-8 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-body text-lg leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-blue pl-6 py-1 my-6 text-text-muted text-lg italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-accent-blue underline underline-offset-2 hover:text-accent-blue/70 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-none space-y-2 my-5 pl-2">{children}</ul>,
    number: ({ children }) => <ol className="list-none space-y-2 my-5 pl-2 counter-reset-[item]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-text-body text-lg leading-relaxed">
        <span className="text-accent-green font-mono mt-1 shrink-0">▸</span>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3 text-text-body text-lg leading-relaxed">
        <span className="text-accent-blue font-mono mt-1 shrink-0 min-w-[1.2rem]">→</span>
        {children}
      </li>
    ),
  },
  types: {
    codeBlock: ({ value }: { value: CodeBlockValue }) => {
      const lang = value.language ?? "bash";
      const label = LANG_LABEL[lang] ?? lang;
      return (
        <div className="my-8 rounded-2xl overflow-hidden border border-border-subtle shadow-xl">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-surface-alt border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <div className="flex items-center gap-3">
              {value.filename && (
                <span className="font-mono text-[11px] text-text-muted">{value.filename}</span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-blue border border-accent-blue/30 px-2 py-0.5 rounded">
                {label}
              </span>
            </div>
          </div>
          <pre className="overflow-x-auto p-6 bg-[#0d1117] text-[#c9d1d9] text-sm font-mono leading-relaxed">
            <code>{value.code}</code>
          </pre>
        </div>
      );
    },
    callout: ({ value }: { value: CalloutValue }) => {
      const style = CALLOUT_STYLES[value.type ?? "info"] ?? CALLOUT_STYLES.info;
      return (
        <div className={`my-6 flex gap-4 p-5 rounded-2xl border ${style.border} ${style.bg}`}>
          <span className="text-xl shrink-0 mt-0.5">{style.icon}</span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">{style.label}</p>
            <p className="text-text-body leading-relaxed">{value.body}</p>
          </div>
        </div>
      );
    },
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.asset.url}
            alt={value.alt ?? ""}
            className="w-full rounded-2xl border border-border-subtle shadow-lg"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm font-mono text-text-muted">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export async function generateStaticParams() {
  try {
    const posts: Post[] = await client.fetch(postsQuery);
    return posts.map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post: Post = await client.fetch(postBySlugQuery, { slug });
    if (!post) return {};
    return {
      title: `${post.title} — Isaac Kumi`,
      description: post.excerpt,
      openGraph: post.coverImage?.asset?.url
        ? { images: [{ url: post.coverImage.asset.url }] }
        : undefined,
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    // client not configured
  }
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background pt-28 pb-24 px-6 lg:px-24">
      <div className="container mx-auto max-w-3xl">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent-blue transition-colors mb-12 group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12 space-y-6">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-mono border ${TAG_COLORS[tag] ?? "text-text-muted border-border-subtle"}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tighter text-text-primary">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-text-muted leading-relaxed">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-text-muted pt-2 border-t border-border-subtle">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readTime && <span>{post.readTime} min read</span>}
            <span className="flex items-center gap-1.5 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-ping absolute" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green relative" />
              Isaac Kumi
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage?.asset?.url && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-border-subtle shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage.asset.url}
              alt={post.coverImage.alt ?? post.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <article className="prose-custom">
            <PortableText value={post.body} components={components} />
          </article>
        )}

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-accent-blue hover:underline group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            All Posts
          </Link>
          <a
            href="https://twitter.com/intent/tweet"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent-blue transition-colors"
          >
            Share ↗
          </a>
        </div>
      </div>
    </main>
  );
}
