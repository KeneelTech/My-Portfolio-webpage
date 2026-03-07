"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00F0FF, #3B82F6, #00F0FF)",
        boxShadow: "0 0 10px rgba(0,240,255,0.5), 0 0 30px rgba(0,240,255,0.2)",
      }}
    />
  )
}
