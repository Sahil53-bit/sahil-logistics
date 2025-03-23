"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import QuoteModal from "./quote-modal"

export default function Hero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const scrollToTracking = () => {
    document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-screen">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-primary inline-block animate-pulse-slow">Direct</span> FTL & PTL{" "}
            <span className="text-primary inline-block animate-pulse-slow">Services</span> Across India
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-white/80 mb-8">
            Connecting major business hubs with reliable and efficient logistics solutions
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg group relative overflow-hidden"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-shimmer -translate-x-full"></span>
              <span className="relative z-10">Get Started</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg group relative overflow-hidden"
              onClick={scrollToTracking}
            >
              <span className="absolute inset-0 w-0 bg-primary/20 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10">Track Shipment</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-center justify-center">
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-1 h-3 bg-white rounded-full"
          ></motion.div>
        </div>
      </motion.div>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </section>
  )
}

