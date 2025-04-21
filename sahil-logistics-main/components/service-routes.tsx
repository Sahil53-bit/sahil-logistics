"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuoteModal from "./quote-modal"

const routes = [
  {
    id: "bangalore",
    from: "Bhiwandi",
    to: "Bangalore",
    distance: "~980 km",
    time: "2-3 days",
    description: "Regular FTL and PTL services with dedicated fleet",
  },
  {
    id: "chennai",
    from: "Bhiwandi",
    to: "Chennai",
    distance: "~1,350 km",
    time: "3-4 days",
    description: "Express and standard delivery options available",
  },
  {
    id: "delhi",
    from: "Bhiwandi",
    to: "Delhi",
    distance: "~1,400 km",
    time: "3-4 days",
    description: "Direct route with minimal transit points",
  },
  {
    id: "ncr",
    from: "Bhiwandi",
    to: "NCR",
    distance: "~1,450 km",
    time: "3-4 days",
    description: "Covering all major locations in the National Capital Region",
  },
  {
    id: "patna",
    from: "Bhiwandi",
    to: "Patna",
    distance: "~1,850 km",
    time: "4-5 days",
    description: "Regular scheduled departures with tracking",
  },
  {
    id: "gujarat",
    from: "Bhiwandi",
    to: "Gujarat",
    distance: "~550 km",
    time: "1-2 days",
    description: "Covering Ahmedabad, Surat, Vadodara and other major cities",
  },
  {
    id: "kolkata",
    from: "Bhiwandi",
    to: "Kolkata",
    distance: "~2,000 km",
    time: "5-6 days",
    description: "Long-haul route with experienced drivers",
  },
  {
    id: "hyderabad",
    from: "Bhiwandi",
    to: "Hyderabad",
    distance: "~700 km",
    time: "2 days",
    description: "Fast transit with multiple departures per week",
  },
]

export default function ServiceRoutes() {
  const [activeRoute, setActiveRoute] = useState("bangalore")
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState("")

  // Auto-rotate through routes
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      const currentIndex = routes.findIndex((route) => route.id === activeRoute)
      const nextIndex = (currentIndex + 1) % routes.length
      setActiveRoute(routes[nextIndex].id)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeRoute, autoRotate])

  // Disable auto-rotate when user interacts
  const handleRouteChange = (value: string) => {
    setAutoRotate(false)
    setActiveRoute(value)
  }

  const openQuoteModal = (route: string) => {
    setSelectedRoute(route)
    setIsQuoteModalOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="routes" className="py-20 relative scroll-mt-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our Direct Service Routes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/70"
          >
            Dedicated FTL and PTL services connecting major business hubs across India
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl border border-white/20 relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-gradient"></div>

              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=600&width=500"
                    alt="India Map"
                    width={500}
                    height={600}
                    className="object-contain opacity-90"
                  />

                  {/* Map pins for each location */}
                  <div className="absolute left-[40%] top-[25%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "delhi" || activeRoute === "ncr" ? [1, 1.3, 1] : 1,
                        backgroundColor:
                          activeRoute === "delhi" || activeRoute === "ncr" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "delhi" || activeRoute === "ncr" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Delhi/NCR
                    </div>
                  </div>

                  <div className="absolute left-[30%] top-[35%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "gujarat" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "gujarat" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "gujarat" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Gujarat
                    </div>
                  </div>

                  <div className="absolute left-[42%] top-[20%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "patna" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "patna" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "patna" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Patna
                    </div>
                  </div>

                  <div className="absolute left-[60%] top-[40%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "kolkata" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "kolkata" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "kolkata" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Kolkata
                    </div>
                  </div>

                  <div className="absolute left-[35%] top-[45%]">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.7)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className="h-5 w-5 rounded-full bg-primary"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white mt-1 bg-black/70 px-2 py-0.5 rounded">
                      Bhiwandi
                    </div>
                  </div>

                  <div className="absolute left-[35%] top-[65%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "bangalore" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "bangalore" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "bangalore" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Bangalore
                    </div>
                  </div>

                  <div className="absolute left-[45%] top-[55%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "hyderabad" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "hyderabad" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "hyderabad" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Hyderabad
                    </div>
                  </div>

                  <div className="absolute left-[45%] top-[75%]">
                    <motion.div
                      animate={{
                        scale: activeRoute === "chennai" ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoute === "chennai" ? "#3b82f6" : "rgba(255, 255, 255, 0.8)",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeRoute === "chennai" ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                      className="h-4 w-4 rounded-full"
                    ></motion.div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white mt-1 bg-black/50 px-1 rounded">
                      Chennai
                    </div>
                  </div>

                  {/* Active route line */}
                  {activeRoute && (
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>

                        {/* Animated dash pattern */}
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      <motion.path
                        d={getRoutePath(activeRoute)}
                        stroke="url(#routeGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 1,
                          strokeDashoffset: [0, -20],
                        }}
                        transition={{
                          pathLength: { duration: 1.5, ease: "easeInOut" },
                          opacity: { duration: 0.5 },
                          strokeDashoffset: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                            ease: "linear",
                          },
                        }}
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="bangalore" value={activeRoute} onValueChange={handleRouteChange} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-black/50">
                {["bangalore", "chennai", "delhi", "ncr"].map((route) => (
                  <TabsTrigger
                    key={route}
                    value={route}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10">{route.charAt(0).toUpperCase() + route.slice(1)}</span>
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-4 mb-6 bg-black/50">
                {["patna", "gujarat", "kolkata", "hyderabad"].map((route) => (
                  <TabsTrigger
                    key={route}
                    value={route}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10">{route.charAt(0).toUpperCase() + route.slice(1)}</span>
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                {routes.map(
                  (route) =>
                    route.id === activeRoute && (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TabsContent value={route.id} className="mt-0">
                          <Card className="bg-black/70 backdrop-blur-md border-white/20 overflow-hidden">
                            {/* Animated gradient border */}
                            <div className="absolute inset-0 rounded-lg p-[1px] overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 animate-shimmer-slow"></div>
                            </div>

                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span className="text-white/90">Route:</span>
                              </div>
                              <CardTitle className="text-white text-2xl flex items-center gap-2">
                                {route.from}
                                <motion.svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-primary"
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                >
                                  <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </motion.svg>
                                {route.to}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                  className="bg-white/10 p-3 rounded-lg"
                                  whileHover={{ scale: 1.03 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <div className="text-white/90 text-sm mb-1">Distance</div>
                                  <div className="text-white font-medium">{route.distance}</div>
                                </motion.div>
                                <motion.div
                                  className="bg-white/10 p-3 rounded-lg"
                                  whileHover={{ scale: 1.03 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <div className="text-white/90 text-sm mb-1">Transit Time</div>
                                  <div className="text-white font-medium">{route.time}</div>
                                </motion.div>
                              </div>

                              <motion.div
                                className="bg-white/10 p-4 rounded-lg"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="text-white/90 text-sm mb-2">Service Details</div>
                                <div className="text-white">{route.description}</div>

                                <div className="mt-4 flex flex-col gap-2">
                                  <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <div className="h-5 w-5 rounded-full bg-green-500/30 flex items-center justify-center">
                                      <motion.div
                                        className="h-2 w-2 rounded-full bg-green-500"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{
                                          duration: 2,
                                          repeat: Number.POSITIVE_INFINITY,
                                          repeatType: "reverse",
                                        }}
                                      ></motion.div>
                                    </div>
                                    <span className="text-white text-sm">Full Truck Load (FTL) Available</span>
                                  </motion.div>
                                  <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <div className="h-5 w-5 rounded-full bg-green-500/30 flex items-center justify-center">
                                      <motion.div
                                        className="h-2 w-2 rounded-full bg-green-500"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{
                                          duration: 2,
                                          repeat: Number.POSITIVE_INFINITY,
                                          repeatType: "reverse",
                                          delay: 0.3,
                                        }}
                                      ></motion.div>
                                    </div>
                                    <span className="text-white text-sm">Part Truck Load (PTL) Available</span>
                                  </motion.div>
                                  <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <div className="h-5 w-5 rounded-full bg-green-500/30 flex items-center justify-center">
                                      <motion.div
                                        className="h-2 w-2 rounded-full bg-green-500"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{
                                          duration: 2,
                                          repeat: Number.POSITIVE_INFINITY,
                                          repeatType: "reverse",
                                          delay: 0.6,
                                        }}
                                      ></motion.div>
                                    </div>
                                    <span className="text-white text-sm">Real-time Tracking</span>
                                  </motion.div>
                                </div>
                              </motion.div>

                              <motion.button
                                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openQuoteModal(route.to)}
                              >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer -translate-x-full group-hover:translate-x-full transition-transform"></span>
                                <span className="relative z-10">Get Quote for This Route</span>
                              </motion.button>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur animate-pulse-slow"></div>
            <div className="relative bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Need a Custom Route Solution?</h3>
              <p className="text-white/70 mb-4">We offer tailored logistics solutions for routes not listed above</p>
              <motion.button
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openQuoteModal("Custom Route")}
              >
                Request Custom Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} route={selectedRoute} />
    </section>
  )
}

// Helper function to get the SVG path for the active route
function getRoutePath(routeId: string): string {
  // Bhiwandi coordinates (center point)
  const bhiwandi = { x: 35, y: 45 }

  // Destination coordinates
  const destinations: Record<string, { x: number; y: number }> = {
    bangalore: { x: 35, y: 65 },
    chennai: { x: 45, y: 75 },
    delhi: { x: 40, y: 25 },
    ncr: { x: 40, y: 25 },
    patna: { x: 42, y: 20 },
    gujarat: { x: 30, y: 35 },
    kolkata: { x: 60, y: 40 },
    hyderabad: { x: 45, y: 55 },
  }

  const dest = destinations[routeId]

  // Create a curved path from Bhiwandi to the destination
  // Using quadratic bezier curve for a nice arc
  const controlX = (bhiwandi.x + dest.x) / 2
  const controlY = (bhiwandi.y + dest.y) / 2 - 10 // Offset to create a curve

  return `M${bhiwandi.x}% ${bhiwandi.y}% Q${controlX}% ${controlY}%, ${dest.x}% ${dest.y}%`
}

