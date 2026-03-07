"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ProjectsSection } from "@/components/projects-section"

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        label="// Selected Work"
        title="Projects"
        description="A curated collection of projects spanning design systems, AI tools, real-time collaboration, and privacy-first analytics."
      />
      <ProjectsSection />
    </PageShell>
  )
}
