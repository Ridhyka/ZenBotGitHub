"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

interface ConfettiProps {
  duration?: number
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Set dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Hide confetti after duration
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, duration)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [duration])

  if (!showConfetti) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.15}
      colors={["#4FD1C5", "#63B3ED", "#B794F4", "#F687B3", "#68D391"]}
    />
  )
}
