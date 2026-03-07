"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorVariant = "default" | "hover" | "text-glow" | "click"

export function MagneticCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [variant, setVariant] = useState<CursorVariant>("default")
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    },
    [cursorX, cursorY, visible]
  )

  const handleOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[data-magnetic]") ||
      target.closest("[role='button']")
    ) {
      setVariant("hover")
      return
    }
    const tagName = target.tagName.toLowerCase()
    if (
      tagName === "h1" ||
      tagName === "h2" ||
      tagName === "h3" ||
      tagName === "h4" ||
      tagName === "h5" ||
      tagName === "h6" ||
      tagName === "input" ||
      tagName === "textarea" ||
      target.closest("[contenteditable]")
    ) {
      setVariant("text-glow")
      return
    }
  }, [])

  const handleOut = useCallback(() => {
    setVariant("default")
  }, [])

  const handleDown = useCallback(() => {
    setVariant("click")
    setTimeout(() => setVariant((v) => (v === "click" ? "default" : v)), 150)
  }, [])

  const handleLeave = useCallback(() => setVisible(false), [])
  const handleEnter = useCallback(() => setVisible(true), [])

  useEffect(() => {
    if (isMobile) return

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseover", handleOver)
    window.addEventListener("mouseout", handleOut)
    window.addEventListener("mousedown", handleDown)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseover", handleOver)
      window.removeEventListener("mouseout", handleOut)
      window.removeEventListener("mousedown", handleDown)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [isMobile, handleMove, handleOver, handleOut, handleDown, handleLeave, handleEnter])

  if (isMobile) return null

  const isHover = variant === "hover"
  const isTextGlow = variant === "text-glow"
  const isClick = variant === "click"
  const showRing = isHover || isTextGlow

  return (
    <motion.div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHover ? 48 : isTextGlow ? 40 : isClick ? 14 : 0,
        height: isHover ? 48 : isTextGlow ? 40 : isClick ? 14 : 0,
        opacity: visible && showRing ? 1 : visible && isClick ? 0.8 : 0,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div
        className="h-full w-full rounded-full transition-all duration-200"
        style={{
          border: showRing ? "2px solid" : "none",
          borderColor: isHover
            ? "rgba(0,240,255,0.7)"
            : isTextGlow
              ? "rgba(0,240,255,0.4)"
              : "transparent",
          background: isHover
            ? "rgba(0,240,255,0.08)"
            : isTextGlow
              ? "rgba(0,240,255,0.05)"
              : "transparent",
          boxShadow: isTextGlow
            ? "0 0 20px rgba(0,240,255,0.25), 0 0 40px rgba(0,240,255,0.1)"
            : isHover
              ? "0 0 15px rgba(0,240,255,0.15)"
              : "none",
        }}
      />
    </motion.div>
  )
}
