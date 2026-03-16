"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionWrapper, SectionHeader } from "./section-wrapper"
import { Send, Github, Linkedin, Twitter, Mail } from "lucide-react"
import emailjs from "@emailjs/browser"


function EncryptedInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  textarea = false,
  delay = 0,
}: {
  label: string
  id: string
  name: string
  type?: string
  placeholder: string
  textarea?: boolean
  delay?: number
}) {
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const Component = textarea ? "textarea" : "input"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        {/* Gradient border fill effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{
            opacity: focused ? 1 : 0,
            background:
              "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(59,130,246,0.15), rgba(0,240,255,0.15))",
            padding: "1px",
            borderRadius: "0.5rem",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-lg transition-all duration-700"
          style={{
            opacity: focused ? 1 : 0,
            boxShadow: "0 0 15px rgba(0,240,255,0.1), 0 0 30px rgba(0,240,255,0.05)",
          }}
        />
        <Component
          id={id}
          name={name}   // ← add this line
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full rounded-lg border border-[rgba(0,240,255,0.1)] bg-[rgba(15,23,42,0.5)] px-4 py-3 font-mono text-sm text-foreground placeholder-[rgba(148,163,184,0.5)] outline-none transition-all duration-500 focus:border-[rgba(0,240,255,0.4)] focus:bg-[rgba(15,23,42,0.7)] ${
            textarea ? "min-h-[140px] resize-none" : ""
          }`}
          rows={textarea ? 5 : undefined}
        />
      </div>
    </motion.div>
  )
}

const socials = [
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/KeneelTech" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:tkeneel@gmail.com" },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await emailjs.sendForm(
          "service_j0oho2b",     // from EmailJS dashboard
          "template_mgq8mpw",    // from EmailJS dashboard
          formRef.current!,
          "CqSpYuo9s2NMf7gWb"      // from EmailJS dashboard
      )

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formRef.current?.name.valueOf,
          email: formRef.current?.email.value,
          message: formRef.current?.message.value,
        })
      })

      setStatus("success")
      formRef.current?.reset()
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      console.error("Failed to send:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }
  return (
    <SectionWrapper id="contact">
      <SectionHeader label="<!-- Get in Touch -->" title="Contact" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">

          {/* Status Banner */}
          {status !== "idle" && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 rounded-lg border px-4 py-3 font-mono text-sm ${
                      status === "success"
                          ? "border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)] text-[#00F0FF]"
                          : "border-[rgba(255,59,59,0.3)] bg-[rgba(255,59,59,0.05)] text-[#FF3B3B]"
                  }`}
              >
                {status === "success"
                    ? "✓ Message sent! I'll get back to you soon."
                    : "✗ Failed to send. Please try again or email me directly."}
              </motion.div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <EncryptedInput
                label="Name"
                id="name"
                name="name"
                placeholder="Your name"
                delay={0.1}
              />
              <EncryptedInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                delay={0.2}
              />
            </div>
            <EncryptedInput
              label="Subject"
              id="subject"
              name="title"
              placeholder="Project inquiry"
              delay={0.3}
            />
            <EncryptedInput
              label="Message"
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              textarea
              delay={0.4}
            />

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "success"}                   // ← changed
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)] px-8 py-4 font-mono text-sm uppercase tracking-widest text-[#00F0FF] transition-all duration-500 hover:border-[rgba(0,240,255,0.5)] hover:bg-[rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] disabled:opacity-50 sm:w-auto"
                data-magnetic
            >
              {status === "success" ? (                         // ← changed
                  <>
                    <span className="relative z-10">Message Sent</span>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 h-4 w-4 rounded-full border-2 border-[#00F0FF]"
                    />
                  </>
              ) : status === "error" ? (                        // ← new error state
                  <>
                    <span className="relative z-10">Failed — Try Again</span>
                    <Send size={14} className="relative z-10 text-[#FF3B3B]" />
                  </>
              ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send size={14} className="relative z-10" />
                  </>
              )}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.08)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#FF3B3B]">
              Availability
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Currently not accepting new projects or freelance work.
              Feel free to reach out for future collaborations.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3B3B]" />
              </span>
              <span className="font-mono text-xs text-[#FF3B3B]">
                Not accepting new projects
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-muted-foreground transition-all duration-300 hover:border-[rgba(0,240,255,0.15)] hover:bg-[rgba(0,240,255,0.03)] hover:text-foreground"
                  data-magnetic
                >
                  <span className="text-[#00F0FF] opacity-60 transition-opacity group-hover:opacity-100">
                    {social.icon}
                  </span>
                  <span className="font-mono text-sm">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-24 flex flex-col items-center gap-2 border-t border-[rgba(0,240,255,0.08)] pt-8 text-center"
      >
        <span className="font-mono text-xs text-muted-foreground">
          Designed & Built with precision
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(148,163,184,0.4)]">
          &copy; {new Date().getFullYear()} All rights reserved
        </span>
      </motion.div>
    </SectionWrapper>
  )
}
