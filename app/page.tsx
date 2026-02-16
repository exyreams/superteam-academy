import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { LearningPaths } from "@/components/landing/LearningPaths";
import { Partners } from "@/components/landing/Partners";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base text-ink-primary font-mono selection:bg-ink-primary selection:text-bg-base">
      <Navbar />
      <Hero />
      <StatsStrip />
      <LearningPaths />
      <Partners />
      <Features />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
