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

        {/* 🔽 SEO content section with keywords (hidden from design, visible to Google) */}
        <section className="sr-only">
          <h1>Sahil Logistics - Full & Part Truck Transport from Bhiwandi</h1>
          <p>
            Sahil Logistics and Sahil Express offer the best transport services from Bhiwandi to Bangalore, Hyderabad, Delhi, and Chennai. We provide full truck load (FTL) and part truck load (PTL) logistics solutions with speed and reliability.
          </p>
          <p>
            Looking for Bhiwandi to Bangalore transport? Or fast shipping to Chennai, Delhi, or Hyderabad? Sahil Logistics is your trusted logistics partner across India.
          </p>
        </section>
      </div>
    </main>
  )
}
