"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { SectionWrapper, SectionHeader } from "./section-wrapper"
import { ExternalLink, Github, X, Layers, Cpu, Globe } from "lucide-react"

interface Project {
  title: string
  description: string
  longDescription: string
  tags: string[]
  stack: string[]
  metrics: { label: string; value: string }[]
  link?: string
  github?: string
  icon: React.ReactNode
  span: string
}

const projects1: Project[] = []

const projects: Project[] = [
  {
    title: "Dollars And Sense Financial Group",
    description: "A website to help Jamaicans keep track of all their stocks,assets and investments and able to analyze different stocks and determine their risk level.",
    longDescription:
      "A website to help Jamaicans keep track of all their stocks,assets and investments and able to analyze different stocks and determine their risk level.",
    tags: ["Financial Management System", "Open Source"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    metrics: [
      { label: "Components", value: "200+" },
      { label: "Downloads", value: "50K/mo" },
      { label: "Stars", value: "2.1K" },
    ],
    link: "#",
    github: "https://github.com/tarequerobinson/dsfg-frontend",
    icon: <Layers size={20} />,
    span: "md:col-span-2 md:row-span-2",
  }/*,
  {
    title: "NeuralFlow",
    description: "AI-powered workflow automation with visual node-based programming.",
    longDescription:
      "A visual programming environment for building AI pipelines. Drag-and-drop node editor with real-time execution preview and collaborative editing capabilities.",
    tags: ["AI/ML", "SaaS"],
    stack: ["Next.js", "Python", "WebSocket", "PostgreSQL"],
    metrics: [
      { label: "Active Users", value: "8K+" },
      { label: "Pipelines Run", value: "1.2M" },
    ],
    link: "#",
    icon: <Cpu size={20} />,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Spectra",
    description: "Real-time collaborative canvas for distributed creative teams.",
    longDescription:
      "Infinite canvas application with real-time multiplayer cursors, vector editing tools, and plugin architecture. Built with CRDTs for conflict-free collaboration.",
    tags: ["Collaboration", "Creative Tool"],
    stack: ["React", "Yjs", "WebRTC", "Canvas API"],
    metrics: [
      { label: "Teams", value: "500+" },
      { label: "Latency", value: "<50ms" },
    ],
    link: "#",
    github: "#",
    icon: <Globe size={20} />,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Vortex Analytics",
    description: "Privacy-first analytics platform with edge computing architecture.",
    longDescription:
      "Lightweight, GDPR-compliant analytics that runs entirely on the edge. No cookies required, sub-millisecond tracking script, and a beautiful real-time dashboard.",
    tags: ["Analytics", "Privacy"],
    stack: ["Rust", "Cloudflare Workers", "ClickHouse", "React"],
    metrics: [
      { label: "Events/sec", value: "100K+" },
      { label: "Script Size", value: "<1KB" },
    ],
    link: "#",
    icon: <Cpu size={20} />,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Cipher Chat",
    description: "End-to-end encrypted messaging with zero-knowledge architecture.",
    longDescription:
      "A secure messaging platform built on the Signal protocol. Features disappearing messages, encrypted file sharing, and decentralized identity verification.",
    tags: ["Security", "Messaging"],
    stack: ["React Native", "Rust", "WebAssembly", "SQLite"],
    metrics: [
      { label: "Users", value: "25K+" },
      { label: "Messages/day", value: "500K+" },
    ],
    github: "#",
    icon: <Layers size={20} />,
    span: "md:col-span-1 md:row-span-1",
  },*/
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, rotateX: 5 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          rotateX: -2,
          rotateY: 3,
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        onClick={() => setExpanded(true)}
        className={`glass-card group relative flex cursor-pointer flex-col justify-between overflow-hidden p-6 transition-all duration-500 hover:border-[rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.08)] ${project.span}`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        data-magnetic
      >
        {/* Top glow line */}
        <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.3)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.05)] text-[#00F0FF]">
                {project.icon}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {project.github && (
                <Github
                  size={14}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                />
              )}
              {project.link && (
                <ExternalLink
                  size={14}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                />
              )}
            </div>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgba(0,240,255,0.1)] bg-[rgba(0,240,255,0.03)] px-2.5 py-0.5 font-mono text-[10px] text-[#00F0FF]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full border border-[rgba(0,240,255,0.1)] bg-[rgba(0,240,255,0.03)] px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </motion.div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            onClick={() => setExpanded(false)}
          >
            <div
              className="absolute inset-0 bg-[rgba(2,6,23,0.85)] backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass-card relative z-10 max-h-[80vh] w-full max-w-2xl overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 rounded-full border border-[rgba(0,240,255,0.2)] p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.05)] text-[#00F0FF]">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs uppercase tracking-wider text-[#00F0FF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                {project.longDescription}
              </p>

              {/* Metrics */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-[rgba(0,240,255,0.1)] bg-[rgba(0,240,255,0.03)] p-3 text-center"
                  >
                    <div className="font-mono text-lg font-bold text-[#00F0FF]">
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] px-3 py-1 font-mono text-xs text-[#00F0FF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3">

                {project.github && (
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 rounded-lg border border-[rgba(226,232,240,0.1)] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all hover:border-[rgba(226,232,240,0.2)] hover:text-foreground"
                  >
                    <Github size={14} /> Source
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <SectionHeader label="/*Selected Work*/" title="Projects" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
