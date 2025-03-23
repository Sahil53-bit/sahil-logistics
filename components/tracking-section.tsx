"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Truck, Ship, Plane, MapPin, Calendar, CheckCircle2 } from "lucide-react"

interface TrackingResult {
  id: string
  status: string
  location: string
  date: string
  estimatedDelivery: string
  history: {
    date: string
    location: string
    status: string
    completed: boolean
  }[]
}

export default function TrackingSection() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [error, setError] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (trackingNumber.toLowerCase() === "demo") {
        setResult({
          id: "SL" + Math.floor(Math.random() * 1000000),
          status: "In Transit",
          location: "Mumbai, India",
          date: new Date().toLocaleDateString(),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          history: [
            {
              date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              location: "Delhi, India",
              status: "Package Received",
              completed: true,
            },
            {
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              location: "Delhi, India",
              status: "Departed Facility",
              completed: true,
            },
            {
              date: new Date().toLocaleDateString(),
              location: "Mumbai, India",
              status: "In Transit",
              completed: true,
            },
            {
              date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              location: "Bangalore, India",
              status: "Out for Delivery",
              completed: false,
            },
            {
              date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              location: "Bangalore, India",
              status: "Delivered",
              completed: false,
            },
          ],
        })
      } else {
        setError("No tracking information found. Try using 'demo' for a sample.")
        setResult(null)
      }
      setIsLoading(false)
    }, 1500)
  }

  // Auto-fill demo after 3 seconds if no input
  useEffect(() => {
    if (!trackingNumber && !isInputFocused) {
      const timer = setTimeout(() => {
        setTrackingNumber("demo")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [trackingNumber, isInputFocused])

  return (
    <section id="tracking" className="py-20 relative scroll-mt-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-gradient"></div>

          <div className="text-center mb-8 relative">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-2"
            >
              Track Your Shipment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/70"
            >
              Enter your tracking number to get real-time updates
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter tracking number (try 'demo')"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
              />
              {trackingNumber === "" && (
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Type "demo"
                </motion.div>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer -translate-x-full group-hover:translate-x-full transition-transform"></span>
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      className="h-4 w-4 border-2 border-t-transparent border-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    ></motion.div>
                    Tracking...
                  </>
                ) : (
                  <>Track</>
                )}
              </span>
            </Button>
          </motion.form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white mb-4"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-4">Shipment Information</h3>
                    <div className="space-y-3">
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Package className="text-primary h-5 w-5" />
                        <span className="text-white/70">Tracking ID:</span>
                        <motion.span
                          className="text-white font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {result.id}
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <MapPin className="text-primary h-5 w-5" />
                        <span className="text-white/70">Current Location:</span>
                        <span className="text-white font-medium">{result.location}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Calendar className="text-primary h-5 w-5" />
                        <span className="text-white/70">Estimated Delivery:</span>
                        <span className="text-white font-medium">{result.estimatedDelivery}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-4">Shipment Status</h3>
                    <motion.div
                      className="flex items-center gap-3 p-3 bg-primary/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div
                        className="h-12 w-12 rounded-full bg-primary/30 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.5)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      >
                        <Truck className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <div className="text-white font-medium">{result.status}</div>
                        <div className="text-white/70 text-sm">{result.date}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <h3 className="text-lg font-medium text-white mb-4">Tracking History</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20"></div>
                  <div className="space-y-6">
                    {result.history.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="relative pl-10"
                      >
                        <motion.div
                          className={`absolute left-0 top-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            item.completed ? "bg-primary/20" : "bg-white/10"
                          }`}
                          animate={
                            item.completed
                              ? {
                                  scale: [1, 1.1, 1],
                                  boxShadow: [
                                    "0 0 0 0 rgba(59, 130, 246, 0.5)",
                                    "0 0 0 10px rgba(59, 130, 246, 0)",
                                    "0 0 0 0 rgba(59, 130, 246, 0)",
                                  ],
                                }
                              : {}
                          }
                          transition={
                            item.completed
                              ? {
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: index * 0.5,
                                }
                              : {}
                          }
                        >
                          {item.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <motion.div
                              className="h-3 w-3 rounded-full bg-white/50"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            ></motion.div>
                          )}
                        </motion.div>
                        <motion.div
                          className={`p-4 rounded-lg ${
                            item.completed ? "bg-white/10" : "bg-white/5 border border-dashed border-white/10"
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="flex flex-wrap justify-between gap-2">
                            <span className="font-medium text-white">{item.status}</span>
                            <span className="text-white/70 text-sm">{item.date}</span>
                          </div>
                          <div className="text-white/70 mt-1">{item.location}</div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex justify-center gap-8 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.3)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Truck className="h-8 w-8 text-primary" />
              </motion.div>
              <div className="text-white font-medium">Road</div>
            </motion.div>
            <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.3)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.7,
                }}
              >
                <Ship className="h-8 w-8 text-primary" />
              </motion.div>
              <div className="text-white font-medium">Sea</div>
            </motion.div>
            <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.3)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 1.4,
                }}
              >
                <Plane className="h-8 w-8 text-primary" />
              </motion.div>
              <div className="text-white font-medium">Air</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

