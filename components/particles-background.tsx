"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 50
    const colors = ["#4FD1C5", "#63B3ED", "#B794F4", "#F687B3"]

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const speedX = Math.random() * 1 - 0.5
      const speedY = Math.random() * 1 - 0.5
      const color = colors[Math.floor(Math.random() * colors.length)]

      particlesArray.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
      })
    }

    // Draw and update particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.3
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY
        }

        // Connect particles
        connectParticles(particle, particlesArray)
      }

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = (particle: Particle, particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        const otherParticle = particles[i]
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
        )

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = 0.1 - distance / 1000
          ctx.lineWidth = 1
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-50" />
}
