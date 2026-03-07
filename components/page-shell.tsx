"use client"

import { ReactNode } from "react"
import { MouseGradient } from "./mouse-gradient"
import { SvgGrid } from "./svg-grid"
import { MagneticCursor } from "./magnetic-cursor"
import { ScrollProgress } from "./scroll-progress"
import { RippleEffect } from "./ripple-effect"
import { Navigation } from "./navigation"
import { ScrollIndicator } from "./scroll-indicator"

export function PageShell({
  children,
  isHome = false,
}: {
  children: ReactNode
  isHome?: boolean
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SvgGrid />
      <MouseGradient />
      <MagneticCursor />
      <ScrollProgress />
      <RippleEffect />
      <Navigation isHome={isHome} />
      <ScrollIndicator />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
