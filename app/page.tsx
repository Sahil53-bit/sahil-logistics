import Hero from "@/components/hero"
import TrackingSection from "@/components/tracking-section"
import ServicesSection from "@/components/services-section"
import ServiceRoutes from "@/components/service-routes"
import ContactSection from "@/components/contact-section"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <TrackingSection />
        <ServicesSection />
        <ServiceRoutes />
        <ContactSection />
      </div>
    </main>
  )
}

