"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Homelab } from "@/components/Homelab";
import { Teaching } from "@/components/Teaching";
import { Certifications } from "@/components/Certifications";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Homelab />
      <Teaching />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
