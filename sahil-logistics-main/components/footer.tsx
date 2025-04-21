"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUp, Truck, Package, MapPin, Clock, BarChart3 } from "lucide-react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [stats, setStats] = useState({
    deliveries: 0,
    countries: 0,
    clients: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Animate stats counters
    const targetStats = {
      deliveries: 15000,
      countries: 45,
      clients: 2500,
      satisfaction: 98,
    }

    const duration = 2000 // 2 seconds
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)

    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames

      setStats({
        deliveries: Math.floor(progress * targetStats.deliveries),
        countries: Math.floor(progress * targetStats.countries),
        clients: Math.floor(progress * targetStats.clients),
        satisfaction: Math.floor(progress * targetStats.satisfaction),
      })

      if (frame === totalFrames) {
        clearInterval(timer)
      }
    }, frameDuration)

    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative bg-black/60 backdrop-blur-md border-t border-white/10">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-10 w-10 overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                <span className="relative z-10 flex h-full w-full items-center justify-center font-bold text-xl text-primary">
                  SL
                </span>
              </div>
              <span className="font-bold text-xl text-white">Sahil Logistics</span>
            </div>
            <p className="text-white/70 mb-6">
              Your trusted partner for global logistics solutions. Delivering excellence across borders with reliability
              and precision.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#tracking" className="text-white/70 hover:text-primary transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Full Truck Load (FTL)
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Part Truck Load (PTL)
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href="#routes" className="text-white/70 hover:text-primary transition-colors">
                  Direct Routes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/70">
                  123 Logistics Park, Transport Nagar,
                  <br />
                  Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex gap-3">
                <svg
                  className="h-5 w-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-white/70">
                  +91 98765 43210
                  <br />
                  +91 12345 67890
                </span>
              </li>
              <li className="flex gap-3">
                <svg
                  className="h-5 w-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white/70">
                  info@sahillogistics.com
                  <br />
                  support@sahillogistics.com
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/70">
                  Mon - Fri: 9:00 AM - 6:00 PM
                  <br />
                  Sat: 9:00 AM - 1:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.deliveries.toLocaleString()}+</div>
              <div className="text-white/70">Successful Deliveries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.countries}+</div>
              <div className="text-white/70">Countries Served</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.clients.toLocaleString()}+</div>
              <div className="text-white/70">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.satisfaction}%</div>
              <div className="text-white/70">Customer Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-6 bg-black/80">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sahil Logistics Solution. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-white/50 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </button>
      )}
    </footer>
  )
}

