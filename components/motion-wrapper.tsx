"use client"

import { type HTMLMotionProps, motion as framerMotion } from "framer-motion"

// Re-export everything
export const motion = framerMotion

// Export specific components with their props
export type MotionDivProps = HTMLMotionProps<"div">
export type MotionButtonProps = HTMLMotionProps<"button">
