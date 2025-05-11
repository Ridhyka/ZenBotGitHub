"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"
import { Confetti } from "@/components/confetti"

interface AchievementUnlockedProps {
  title: string
  description: string
  show: boolean
  onClose: () => void
}

export function AchievementUnlocked({ title, description, show, onClose }: AchievementUnlockedProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (show) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <>
      {showConfetti && <Confetti duration={3000} />}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-4 rounded-lg shadow-xl flex items-center gap-3 max-w-xs">
              <div className="bg-white/20 p-2 rounded-full">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
                <p className="text-xs font-medium">{title}</p>
                <p className="text-xs opacity-90">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
