"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionWrapper, SectionHeader } from "./section-wrapper"
import { Briefcase, ExternalLink } from "lucide-react"

interface Experience {
  period: string
  role: string
  company: string
  url?: string
  description: string
  tags: string[]
}

const experiences: Experience[] = [
  {
    period: "2024 -- Present",
    role: "Junior Software Developer",
    company: "Artuvic Solution",
    url: "https://rocketreach.co/artuvic-it-solutions-profile_b740626ac5382c09",
    description:
      "Contributed to the ongoing development of the company’s web and mobile applications by resolving critical bugs, enhancing performance, and implementing new user-facing features. Collaborating with other team members to modernize legacy code and improve overall system reliability",
    tags: ["Java", "JavaScript", "HTML"],
  },
  {
    period: "2023 -- 2024",
    role: "Lab Tech Assistant",
    company: "University Of The West Indies",
    url: "#",
    description:
      "Assisted students with their coding labs by answering questions and guiding them and evaluating the work they have done. Assisted the head lab tech with computer upgrades or repair.",
    tags: ["Python", "Java", "Teacher"],
  },
]

function TimelineCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-6 md:gap-10"
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)]"
        >
          <Briefcase size={16} className="text-[#00F0FF]" />
          {/* Scanning glow */}
          {isInView && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
              className="absolute inset-0 rounded-full border border-[#00F0FF]"
            />
          )}
        </motion.div>
        {/* Beam line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          className="w-[1px] flex-1 origin-top bg-gradient-to-b from-[rgba(0,240,255,0.4)] to-transparent"
        />
      </div>

      {/* Card */}
      <div className="glass-card mb-10 flex-1 p-6 transition-all duration-500 group-hover:border-[rgba(0,240,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
        <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {exp.period}
        </span>
        <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
          {exp.role}
          <span className="text-muted-foreground">{"·"}</span>
          <a
            href={exp.url}
            className="inline-flex items-center gap-1 text-[#00F0FF] transition-colors hover:text-foreground"
            data-magnetic
          >
            {exp.company}
            <ExternalLink size={12} />
          </a>
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#00F0FF]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader label="// Career Path" title="Experience" />
      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <TimelineCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
