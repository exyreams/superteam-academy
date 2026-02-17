import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { LearningPaths } from "@/components/landing/LearningPaths";
import { Partners } from "@/components/landing/Partners";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/layout/Footer";

// Landing Page Layout
// Composes the primary marketing sections in a single-column stack.
// Uses theme variables (bg-bg-base, text-ink-primary) for consistent styling.

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base text-ink-primary font-mono selection:bg-ink-primary selection:text-bg-base">
      {/* Navigation Bar - Sticky Global Header */}
      <Navbar />

      {/* Hero Section - Main Value Proposition */}
      <Hero />

      {/* Stats Strip - Social Proof / Key Metrics */}
      <StatsStrip />

      {/* Learning Paths - Course Categories */}
      <LearningPaths />

      {/* Institutional Partners */}
      <Partners />

      {/* Key Features / Benefits */}
      <Features />

      {/* Student Testimonials */}
      <Testimonials />

      {/* Newsletter Signup */}
      <Newsletter />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
