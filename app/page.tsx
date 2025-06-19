import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { AboutSection } from "@/components/about-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aco NextGen Scholarship - Free Tech Skills Training for Global Opportunities",
  description:
    "Join the Aco NextGen Scholarship program and gain the tech skills needed for the 4th industrial revolution. Free training, global job opportunities, and career transformation await.",
  keywords:
    "tech scholarship, free tech training, 4th industrial revolution, tech skills, global job opportunities, career development",
  openGraph: {
    title: "Aco NextGen Scholarship - Free Tech Skills Training",
    description: "Transform your career with free tech skills training designed for global opportunities",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Header />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
      <FloatingCta />
    </main>
  )
}
