"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ExperienceSection } from "@/components/experience-section"

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader
        label="// Career Path"
        title="Experience"
        description="A timeline of roles where engineering precision met creative execution. From early-stage startups to established product teams."
      />
      <ExperienceSection />
    </PageShell>
  )
}
