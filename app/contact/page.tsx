"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        label="<!-- Get in Touch -->"
        title="Contact"
        description="Have a project in mind or want to collaborate? Reach out through the form below or connect on social platforms."
      />
      <ContactSection />
    </PageShell>
  )
}
