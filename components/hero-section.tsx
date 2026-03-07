"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const subtitles = [
  "Backend Specialist",
  "Hello World Tactician",
  "Chill Coder"
]

function TerminalSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = subtitles[currentIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % subtitles.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.substring(0, displayText.length - 1)
              : current.substring(0, displayText.length + 1)
          )
        },
        isDeleting ? 30 : 70
      )
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex])

  return (
    <span className="font-mono text-lg text-[#00F0FF] md:text-xl">
      {">"} {displayText}
      <span className="inline-block w-[2px] animate-pulse bg-[#00F0FF] text-transparent">
        |
      </span>
    </span>
  )
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.3, y: y * 0.3 })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)] px-8 py-4 font-mono text-sm uppercase tracking-widest text-[#00F0FF] transition-all duration-500 hover:border-[rgba(0,240,255,0.6)] hover:bg-[rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
      data-magnetic
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.a>
  )
}

export function HeroSection() {
  const titleChars = "Keneel Thomas".split("")

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card flex items-center gap-2 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F0FF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F0FF]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Available for opportunities
          </span>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[rgba(0,240,255,0.3)] md:h-36 md:w-36">
            <Image
              src="/images/profile.jpg"
              alt="Keneel Thomas profile photo"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.15)]" />
          {/* Animated orbit ring */}
          <svg
            className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] animate-spin"
            style={{ animationDuration: "8s" }}
            viewBox="0 0 140 140"
          >
            <circle
              cx="70"
              cy="70"
              r="68"
              fill="none"
              stroke="rgba(0,240,255,0.2)"
              strokeWidth="1"
              strokeDasharray="20 60 40 80"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Kinetic Title */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-5xl font-bold tracking-tighter text-foreground md:text-7xl lg:text-8xl"
              style={{
                textShadow:
                  char !== " "
                    ? "0 0 40px rgba(0,240,255,0.15)"
                    : "none",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Terminal Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TerminalSubtitle />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >

        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects">View Work</MagneticButton>
          <Link
            href="#contact"
            className="font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-foreground"
            data-magnetic
          >
            Get in touch
          </Link>
        </motion.div>
      </div>


    </section>
  )
}
