"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  route?: string
  service?: string
}

export default function QuoteModal({ isOpen, onClose, route, service }: QuoteModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: service || "",
    fromLocation: route ? "Bhiwandi" : "",
    toLocation: route || "",
    weight: "",
    dimensions: "",
    message: "",
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false)
        setStep(1)
        setFormState({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "",
          fromLocation: "",
          toLocation: "",
          weight: "",
          dimensions: "",
          message: "",
        })
        onClose()
      }, 3000)
    }, 1500)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-black/90 border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-black/90 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {route ? `Quote for ${route} Route` : service ? `${service} Quote` : "Request a Quote"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 flex flex-col items-center justify-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 200,
                        delay: 0.2,
                      }}
                    >
                      <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Quote Request Submitted!</h4>
                  <p className="text-white/70 text-center mb-4">
                    Thank you for your interest. Our team will get back to you shortly with a customized quote.
                  </p>
                </motion.div>
              ) : (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              step >= i ? "bg-primary text-white" : "bg-white/10 text-white/50"
                            }`}
                          >
                            {i}
                          </div>
                          {i < 3 && <div className={`h-1 w-16 ${step > i ? "bg-primary" : "bg-white/10"}`}></div>}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-white/70">
                      <span>Contact Info</span>
                      <span>Shipment Details</span>
                      <span>Additional Info</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name" className="text-white/70">
                                Full Name
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="text-white/70">
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="phone" className="text-white/70">
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                required
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="company" className="text-white/70">
                                Company Name
                              </Label>
                              <Input
                                id="company"
                                name="company"
                                value={formState.company}
                                onChange={handleChange}
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div className="pt-4 flex justify-end">
                            <Button type="button" onClick={nextStep} className="relative overflow-hidden group">
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer -translate-x-full group-hover:translate-x-full"></span>
                              <span className="relative z-10">Next Step</span>
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="serviceType" className="text-white/70">
                              Service Type
                            </Label>
                            <Select
                              value={formState.serviceType}
                              onValueChange={(value) => handleSelectChange("serviceType", value)}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ftl">Full Truck Load (FTL)</SelectItem>
                                <SelectItem value="ptl">Part Truck Load (PTL)</SelectItem>
                                <SelectItem value="air">Air Freight</SelectItem>
                                <SelectItem value="warehousing">Warehousing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="fromLocation" className="text-white/70">
                                From Location
                              </Label>
                              <Input
                                id="fromLocation"
                                name="fromLocation"
                                value={formState.fromLocation}
                                onChange={handleChange}
                                required
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="toLocation" className="text-white/70">
                                To Location
                              </Label>
                              <Input
                                id="toLocation"
                                name="toLocation"
                                value={formState.toLocation}
                                onChange={handleChange}
                                required
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="weight" className="text-white/70">
                                Approximate Weight (kg)
                              </Label>
                              <Input
                                id="weight"
                                name="weight"
                                type="text"
                                value={formState.weight}
                                onChange={handleChange}
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="dimensions" className="text-white/70">
                                Dimensions (L×W×H)
                              </Label>
                              <Input
                                id="dimensions"
                                name="dimensions"
                                value={formState.dimensions}
                                onChange={handleChange}
                                className="bg-white/10 border-white/20 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div className="pt-4 flex justify-between">
                            <Button type="button" variant="outline" onClick={prevStep}>
                              Previous Step
                            </Button>
                            <Button type="button" onClick={nextStep} className="relative overflow-hidden group">
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer -translate-x-full group-hover:translate-x-full"></span>
                              <span className="relative z-10">Next Step</span>
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="message" className="text-white/70">
                              Additional Requirements
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              rows={5}
                              value={formState.message}
                              onChange={handleChange}
                              className="bg-white/10 border-white/20 text-white mt-1"
                              placeholder="Please provide any specific requirements or questions you have..."
                            />
                          </div>

                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                              <Truck className="h-4 w-4 text-primary" />
                              Quote Summary
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div className="text-white/70">Service Type:</div>
                              <div className="text-white">
                                {formState.serviceType === "ftl"
                                  ? "Full Truck Load (FTL)"
                                  : formState.serviceType === "ptl"
                                    ? "Part Truck Load (PTL)"
                                    : formState.serviceType === "air"
                                      ? "Air Freight"
                                      : formState.serviceType === "warehousing"
                                        ? "Warehousing"
                                        : "-"}
                              </div>

                              <div className="text-white/70">From:</div>
                              <div className="text-white">{formState.fromLocation || "-"}</div>

                              <div className="text-white/70">To:</div>
                              <div className="text-white">{formState.toLocation || "-"}</div>

                              <div className="text-white/70">Weight:</div>
                              <div className="text-white">{formState.weight ? `${formState.weight} kg` : "-"}</div>
                            </div>
                          </div>

                          <div className="pt-4 flex justify-between">
                            <Button type="button" variant="outline" onClick={prevStep}>
                              Previous Step
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="relative overflow-hidden group">
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <motion.div
                                    className="h-4 w-4 border-2 border-t-transparent border-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  ></motion.div>
                                  Submitting...
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Send className="h-4 w-4" />
                                  Submit Quote Request
                                </div>
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

