"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Truck, Plane, Package, Warehouse } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import QuoteModal from "./quote-modal"

const services = [
  {
    icon: Truck,
    title: "Full Truck Load (FTL)",
    description: "Dedicated trucks for your shipments with faster transit times and direct delivery.",
  },
  {
    icon: Package,
    title: "Part Truck Load (PTL)",
    description: "Cost-effective solution for shipments that don't require a full truck with optimized routes.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Strategic storage solutions with inventory management and distribution.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Express air cargo services for time-sensitive shipments across India.",
  },
]

export default function ServicesSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const openQuoteModal = (service: string) => {
    setSelectedService(service)
    setIsQuoteModalOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" className="py-20 relative scroll-mt-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our Comprehensive Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/70"
          >
            From first mile to last mile, we provide end-to-end logistics solutions tailored to your business needs
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-300 h-full overflow-hidden group">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-lg p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 animate-shimmer-slow"></div>
                </div>

                <CardHeader>
                  <motion.div
                    className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 5 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 0 8px rgba(59, 130, 246, 0.1)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      },
                    }}
                  >
                    <service.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">{service.description}</CardDescription>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-primary/20 hover:bg-primary/30 text-white py-2 rounded-md transition-colors"
                    onClick={() => openQuoteModal(service.title)}
                  >
                    Get {service.title} Quote
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            ></motion.div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Need a Custom Logistics Solution?</h3>
              <p className="text-white/70 mb-4">
                Our team of experts will design a tailored solution for your specific requirements
              </p>
              <motion.button
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openQuoteModal("Custom")}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer -translate-x-full"></span>
                <span className="relative z-10">Request Custom Quote</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} service={selectedService} />
    </section>
  )
}

