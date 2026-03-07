"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"

export function ScrollIndicator() {
  const [direction, setDirection] = useState<"down" | "up">("down")
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight

          // Hide when at very bottom
          if (currentScrollY >= maxScroll - 50) {
            setVisible(false)
          } else {
            setVisible(true)
          }

          if (currentScrollY > lastScrollY && currentScrollY > 10) {
            setDirection("down")
          } else if (currentScrollY < lastScrollY) {
            setDirection("up")
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-1.5 rounded-full border border-[rgba(0,240,255,0.15)] bg-[rgba(2,6,23,0.8)] px-4 py-3 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {direction === "up" && (
            <motion.div
              key="arrow-up"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <ArrowUp size={14} className="text-[#00F0FF] opacity-70" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>

        <AnimatePresence mode="wait">
          {direction === "down" && (
            <motion.div
              key="arrow-down"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-[#00F0FF] opacity-70" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
