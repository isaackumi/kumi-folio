"use client";

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 lg:px-24 border-t border-border-subtle bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
            © 2026 Isaac Kumi · Accra, Ghana
          </div>
          <div className="text-[10px] font-mono text-text-muted/40">·</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted/50">
            Built with Next.js · Framer Motion · GSAP · Lenis
          </div>
        </div>

        <div className="flex items-center gap-8">
          {[
            { label: "GitHub", href: "https://github.com/isaackumi" },
            { label: "LinkedIn", href: "https://linkedin.com/in/isaackumi" },
            { label: "YouTube", href: "https://www.youtube.com/@openingtag1090" },
            { label: "Medium", href: "https://medium.com/@isaackumi" },
            { label: "Dev.to", href: "https://dev.to/isaackumi" },
            { label: "Email", href: "mailto:isaac.k.kumi29@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-accent-blue transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={handleBackToTop}
          className="text-[10px] font-mono uppercase tracking-widest text-accent-blue hover:underline flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-y-1 transition-transform inline-block">↑</span>
          Back to Top
        </button>
      </div>
    </footer>
  );
};
