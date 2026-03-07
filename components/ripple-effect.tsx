"use client"

import { useEffect } from "react"

export function RippleEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,240,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        animation: rippleExpand 0.6s ease-out forwards;
      `
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return (
    <style jsx global>{`
      @keyframes rippleExpand {
        0% {
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          width: 150px;
          height: 150px;
          opacity: 0;
        }
      }
    `}</style>
  )
}
