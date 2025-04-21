"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <span className="relative z-10 flex h-full w-full items-center justify-center font-bold text-xl text-primary">
              SL
            </span>
          </div>
          <span className="font-bold text-xl text-white">Sahil Logistics Solution</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-white/90 hover:text-white transition-colors"
            onClick={() => {
              setMobileMenuOpen(false)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Home
          </Link>
          <Link
            href="#tracking"
            className="text-white/90 hover:text-white transition-colors"
            onClick={() => {
              setMobileMenuOpen(false)
              document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Track
          </Link>
          <Link
            href="#services"
            className="text-white/90 hover:text-white transition-colors"
            onClick={() => {
              setMobileMenuOpen(false)
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="text-white/90 hover:text-white transition-colors"
            onClick={() => {
              setMobileMenuOpen(false)
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contact
          </Link>
          <Button variant="outline" className="ml-4">
            Get Quote
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md p-4 flex flex-col gap-4 md:hidden">
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors py-2"
              onClick={() => {
                setMobileMenuOpen(false)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              Home
            </Link>
            <Link
              href="#tracking"
              className="text-white/90 hover:text-white transition-colors py-2"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Track
            </Link>
            <Link
              href="#services"
              className="text-white/90 hover:text-white transition-colors py-2"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-white/90 hover:text-white transition-colors py-2"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </Link>
            <Button variant="outline" className="w-full">
              Get Quote
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

