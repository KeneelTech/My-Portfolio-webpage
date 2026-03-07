"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionWrapper, SectionHeader } from "./section-wrapper"

interface Skill {
  name: string
  category: "language" | "framework" | "tool" | "design"
}

const skills: Skill[] = [
  { name: "AngularJs", category: "language" },
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Kotlin", category: "language" },
  { name: "Play", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "Git", category: "tool" },
  { name: "MySQL", category: "tool" },
  { name: "PostgreSQL", category: "tool" },

]

const categoryColors: Record<string, string> = {
  language: "rgba(0,240,255,0.15)",
  framework: "rgba(59,130,246,0.15)",
  tool: "rgba(6,182,212,0.15)",
  design: "rgba(14,165,233,0.15)",
}

const categoryBorderColors: Record<string, string> = {
  language: "rgba(0,240,255,0.3)",
  framework: "rgba(59,130,246,0.3)",
  tool: "rgba(6,182,212,0.3)",
  design: "rgba(14,165,233,0.3)",
}

const categoryTextColors: Record<string, string> = {
  language: "#00F0FF",
  framework: "#3B82F6",
  tool: "#06B6D4",
  design: "#0EA5E9",
}

function FloatingBadge({
  skill,
  index,
  total,
}: {
  skill: Skill
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Random floating animation offsets
    setOffset({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
    })
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.15, y: -5 }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, offset.y, 0],
          x: [0, offset.x, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className="group rounded-xl border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 hover:shadow-lg"
        style={{
          background: categoryColors[skill.category],
          borderColor: categoryBorderColors[skill.category],
          color: categoryTextColors[skill.category],
        }}
        data-magnetic
      >
        {skill.name}
        {/* Hover glow */}
        <div
          className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: categoryColors[skill.category],
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function SkillsSection() {
  const categories = [
    { key: "language", label: "Languages" },
    { key: "framework", label: "Frameworks" },
    { key: "tool", label: "Tools" },
    { key: "design", label: "Design" },
  ]

  return (
    <SectionWrapper id="skills">
      <SectionHeader label="# Tech Stack" title="Skills" />

      {/* Category Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-wrap gap-6"
      >
        {categories.map((cat) => (
          <div key={cat.key} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: categoryTextColors[cat.key] }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {cat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Floating Cloud */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {skills.map((skill, i) => (
          <FloatingBadge
            key={skill.name}
            skill={skill}
            index={i}
            total={skills.length}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
