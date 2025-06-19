"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling 100vh
      if (scrollPosition > windowHeight && !isHidden) {
        setIsVisible(true)
      } else if (scrollPosition <= windowHeight) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHidden])

  const handleClose = () => {
    setIsHidden(true)
    setIsVisible(false)
  }

  if (!isVisible || isHidden) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-aco-orange text-white rounded-lg shadow-2xl p-4 max-w-sm relative">
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-aco-navy/80 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-aco-navy transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3">
          <h3 className="font-semibold text-sm">Ready to start your tech journey?</h3>
          <p className="text-xs opacity-90">Take our free career quiz now!</p>
        </div>

        <Button className="w-full bg-white text-aco-orange hover:bg-gray-50 text-sm py-2">Take Free Career Quiz</Button>
      </div>
    </div>
  )
}
