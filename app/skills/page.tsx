"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { SkillsSection } from "@/components/skills-section"

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHeader
        label="# Tech Stack"
        title="Skills"
        description="A comprehensive toolkit spanning languages, frameworks, design tools, and cloud infrastructure -- constantly evolving."
      />
      <SkillsSection />
    </PageShell>
  )
}
