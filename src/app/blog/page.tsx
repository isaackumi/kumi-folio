import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Isaac Kumi",
  description: "Writing on DevOps, SRE, cloud infrastructure, and software engineering.",
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  coverImage?: { asset?: { url: string }; alt?: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TAG_COLORS: Record<string, string> = {
  DevOps: "text-accent-blue border-accent-blue/30 bg-accent-blue/8",
  Cloud: "text-sky-500 border-sky-500/30 bg-sky-500/8",
  SRE: "text-accent-green border-accent-green/30 bg-accent-green/8",
  Kubernetes: "text-blue-400 border-blue-400/30 bg-blue-400/8",
  Python: "text-yellow-500 border-yellow-500/30 bg-yellow-500/8",
  TypeScript: "text-blue-500 border-blue-500/30 bg-blue-500/8",
  Linux: "text-orange-400 border-orange-400/30 bg-orange-400/8",
  Security: "text-red-400 border-red-400/30 bg-red-400/8",
  Tutorial: "text-purple-400 border-purple-400/30 bg-purple-400/8",
  Career: "text-pink-400 border-pink-400/30 bg-pink-400/8",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // Studio not configured yet — show empty state
  }

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background pt-20 pb-16 px-5 md:px-10 lg:px-24">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-16 space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-accent-blue font-bold tracking-widest uppercase text-sm">~/blog</span>
            <div className="h-px bg-border-subtle flex-1" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-none tracking-tighter text-text-primary">
            Writing
          </h1>
          <p className="text-text-muted text-lg max-w-xl font-sans leading-relaxed">
            DevOps war stories, cloud architecture breakdowns, open-source builds, and engineering career notes.
          </p>
        </div>

        {posts.length === 0 ? (
          /* Empty state — shown before any posts are published */
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-surface border border-border-subtle flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm uppercase tracking-widest text-text-muted">No posts yet</p>
              <p className="text-text-muted text-sm max-w-sm">
                Add posts via the Sanity Studio — run <code className="font-mono text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded text-xs">npx sanity dev</code> to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-16">

            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug.current}`} className="group block">
                <article className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface hover:border-accent-blue/40 transition-all duration-500 shadow-xl">
                  {featured.coverImage?.asset?.url && (
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.coverImage.asset.url}
                        alt={featured.coverImage.alt ?? featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                    </div>
                  )}
                  <div className="p-5 sm:p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent-blue text-white rounded-full text-[10px] font-mono uppercase tracking-widest">
                        Featured
                      </span>
                      {featured.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-mono border ${TAG_COLORS[tag] ?? "text-text-muted border-border-subtle"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors mb-3 leading-tight">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-text-body text-lg leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-text-muted">
                      {featured.publishedAt && <span>{formatDate(featured.publishedAt)}</span>}
                      {featured.readTime && <span>{featured.readTime} min read</span>}
                      <span className="text-accent-blue group-hover:underline ml-auto flex items-center gap-1">
                        Read Post
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Post grid */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block">
                    <article className="h-full flex flex-col rounded-3xl border border-border-subtle bg-surface hover:border-accent-blue/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                      {post.coverImage?.asset?.url ? (
                        <div className="h-44 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.coverImage.asset.url}
                            alt={post.coverImage.alt ?? post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-44 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-blue/40">
                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        </div>
                      )}

                      <div className="flex flex-col flex-1 p-6 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.slice(0, 2).map((tag) => (
                            <span key={tag} className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono border ${TAG_COLORS[tag] ?? "text-text-muted border-border-subtle"}`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors leading-snug flex-1">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                        )}

                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-text-muted pt-2 border-t border-border-subtle">
                          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                          {post.readTime && <span>{post.readTime} min</span>}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
