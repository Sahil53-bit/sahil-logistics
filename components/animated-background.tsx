"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5

      // Ensure video plays properly
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Video play failed:", error)
          })
        }
      }

      playVideo()

      // Try to play video again if it stops
      videoRef.current.addEventListener("pause", playVideo)

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("pause", playVideo)
        }
      }
    }

    // Add a subtle animation to the overlay
    if (overlayRef.current) {
      const animate = () => {
        const opacity = 0.6 + Math.sin(Date.now() / 5000) * 0.1
        if (overlayRef.current) {
          overlayRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
        }
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <div ref={overlayRef} className="absolute inset-0 bg-black/60 z-10 transition-colors duration-1000"></div>
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
        <source src="/logistics-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-5 opacity-30">
        <div
          className="absolute h-2 w-2 rounded-full bg-primary/50 animate-float1"
          style={{ top: "10%", left: "20%" }}
        ></div>
        <div
          className="absolute h-3 w-3 rounded-full bg-primary/40 animate-float2"
          style={{ top: "30%", left: "80%" }}
        ></div>
        <div
          className="absolute h-2 w-2 rounded-full bg-primary/60 animate-float3"
          style={{ top: "70%", left: "15%" }}
        ></div>
        <div
          className="absolute h-4 w-4 rounded-full bg-primary/30 animate-float4"
          style={{ top: "40%", left: "60%" }}
        ></div>
        <div
          className="absolute h-2 w-2 rounded-full bg-primary/50 animate-float2"
          style={{ top: "80%", left: "75%" }}
        ></div>
        <div
          className="absolute h-3 w-3 rounded-full bg-primary/40 animate-float1"
          style={{ top: "20%", left: "40%" }}
        ></div>
        <div
          className="absolute h-2 w-2 rounded-full bg-primary/60 animate-float4"
          style={{ top: "60%", left: "30%" }}
        ></div>
        <div
          className="absolute h-3 w-3 rounded-full bg-primary/30 animate-float3"
          style={{ top: "50%", left: "90%" }}
        ></div>
      </div>
    </div>
  )
}

