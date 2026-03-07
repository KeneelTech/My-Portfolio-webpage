"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "/", sectionId: "hero" },
  { label: "Experience", href: "/experience", sectionId: "experience" },
  { label: "Projects", href: "/projects", sectionId: "projects" },
  { label: "Skills", href: "/skills", sectionId: "skills" },
  { label: "Contact", href: "/contact", sectionId: "contact" },
]

function ActiveBorder() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-md"
      layoutId="nav-active-border"
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="6"
          ry="6"
          fill="none"
          stroke="url(#trace-gradient)"
          strokeWidth="1.5"
          strokeDasharray="200"
          strokeDashoffset="0"
          className="animate-trace"
        />
        <defs>
          <linearGradient id="trace-gradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="1">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.6">
              <animate
                attributeName="offset"
                values="0.3;1;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0">
              <animate
                attributeName="offset"
                values="1;1.5;1"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background: "rgba(0,240,255,0.04)",
        }}
      />
    </motion.div>
  )
}

function NavItem({
  item,
  isActive,
  isHome,
  pathname,
  onSectionClick,
}: {
  item: (typeof navItems)[0]
  isActive: boolean
  isHome: boolean
  pathname: string
  onSectionClick: (sectionId: string) => void
}) {
  const content = (
    <>
      <span className="relative z-10">{item.label}</span>
      {isActive && <ActiveBorder />}
    </>
  )

  const className = `relative rounded-md px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
    isActive
      ? "text-[#00F0FF]"
      : "text-muted-foreground hover:text-foreground"
  }`

  if (isHome && pathname === "/") {
    return (
      <button
        onClick={() => onSectionClick(item.sectionId)}
        className={className}
        data-magnetic
      >
        {content}
      </button>
    )
  }

  return (
    <Link href={item.href} className={className} data-magnetic>
      {content}
    </Link>
  )
}

export function Navigation({ isHome = false }: { isHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isHome || pathname !== "/") return

    const sectionIds = navItems.map((item) => item.sectionId)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          )
          setActiveSection(topMost.target.id)
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome, pathname])

  const handleSectionClick = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMobileOpen(false)
    }
  }

  const getIsActive = (item: (typeof navItems)[0]) => {
    if (isHome && pathname === "/") {
      return activeSection === item.sectionId
    }
    return pathname === item.href
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-x-0 border-t-0 rounded-none"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
          data-magnetic
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)] transition-all duration-300 group-hover:border-[rgba(0,240,255,0.6)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="font-mono text-sm font-bold text-[#00F0FF]">
              {"</>"}
            </span>
          </div>
          <span className="font-mono text-sm tracking-wider text-foreground">
            PORTFOLIO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={getIsActive(item)}
              isHome={isHome}
              pathname={pathname}
              onSectionClick={handleSectionClick}
            />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          data-magnetic
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-6 rounded-none border-0 md:hidden"
            style={{ background: "rgba(2,6,23,0.95)" }}
          >
            {navItems.map((item, i) => {
              const isActive = getIsActive(item)
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {isHome && pathname === "/" ? (
                    <button
                      onClick={() => handleSectionClick(item.sectionId)}
                      className={`relative font-mono text-lg uppercase tracking-[0.3em] transition-colors duration-300 ${
                        isActive
                          ? "text-[#00F0FF]"
                          : "text-foreground hover:text-[#00F0FF]"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-active"
                          className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#00F0FF]"
                          style={{
                            boxShadow: "0 0 8px rgba(0,240,255,0.5)",
                          }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`relative font-mono text-lg uppercase tracking-[0.3em] transition-colors duration-300 ${
                        isActive
                          ? "text-[#00F0FF]"
                          : "text-foreground hover:text-[#00F0FF]"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-active"
                          className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#00F0FF]"
                          style={{
                            boxShadow: "0 0 8px rgba(0,240,255,0.5)",
                          }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
