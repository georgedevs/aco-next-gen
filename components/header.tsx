"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const router = useRouter()

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Benefits", href: "#benefits" },
    { name: "How It Works", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ]

const quizClick = () => {
    // Option 1: Navigate to internal route
    router.push('/quiz')
    
    // Close mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Check which section is currently in view while scrolling
      const sections = navItems.map(item => item.href.substring(1)) // Remove # from href
      const scrollY = window.scrollY
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementHeight = rect.height
          
          // Check if section is in viewport (with offset for header)
          if (scrollY >= elementTop - 150 && scrollY < elementTop + elementHeight - 150) {
            setActiveSection(sectionId)
            // Update URL hash without triggering scroll
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, null, `#${sectionId}`)
            }
            break
          }
        }
      }
      
      // Default to empty if we're at the very top (hero section)
      if (scrollY < 200) {
        setActiveSection("")
        if (window.location.hash) {
          window.history.replaceState(null, null, window.location.pathname)
        }
      }
    }
    
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove # from hash
      setActiveSection(hash)
    }
    

    const handleClick = (e) => {
      const target = e.target.closest('a')
      if (target && target.href.includes('#')) {
        const hash = target.href.split('#')[1]
        setActiveSection(hash)
      }
    }
    
    // Set initial active section based on current hash
    handleHashChange()
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)
    document.addEventListener("click", handleClick)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }
  }

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full overflow-x-hidden ${
        isScrolled ? "pt-4" : "bg-white/95 backdrop-blur-md py-0"
      }`}
    >
      {/* Smooth border transition */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-aco-cyan transition-opacity duration-500 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      {/* Floating compact header - only shows when scrolled */}
      {isScrolled && (
        <div className="w-full flex justify-center px-4 overflow-x-hidden">
          <div
            className="w-full max-w-4xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-full px-6 py-3 transform transition-all duration-500 animate-in slide-in-from-top-2"
            style={{
              boxShadow: "0 20px 40px -10px rgba(22, 211, 193, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex justify-between items-center">
              {/* Compact Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  src="/logo-white.png"
                  alt="Aco NextGen"
                  width={120}
                  height={32}
                  className="h-8 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Navigation - Compact */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-aco-teal transition-all duration-300 rounded-full hover:bg-aco-cyan/10"
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-aco-orange rounded-full transform -translate-x-1/2 translate-y-2"></div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Right Side Actions - Compact */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="hidden sm:flex bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-aco-orange/30 transition-all duration-300 hover:scale-105"
                  onClick={quizClick}
                >
                  Take Free Career Quiz
                </Button>

                {/* Mobile Menu Button - Compact */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 rounded-full bg-aco-cyan/10 hover:bg-aco-cyan/20 text-aco-teal transition-all duration-300"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <div className="relative w-4 h-4">
                    <Menu
                      size={16}
                      className={`absolute inset-0 transition-all duration-300 ${
                        isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    />
                    <X
                      size={16}
                      className={`absolute inset-0 transition-all duration-300 ${
                        isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Normal full header - only shows when not scrolled */}
      {!isScrolled && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-14 flex items-center justify-between transition-all duration-500 w-full max-w-full overflow-x-hidden">
          {/* Full Logo */}
          <div className="flex-shrink-0 group">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.png"
                alt="Aco NextGen"
                width={160}
                height={40}
                className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Full */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-aco-teal font-medium transition-all duration-300 group rounded-lg hover:bg-aco-cyan/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-aco-cyan/10 to-aco-teal/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-aco-orange rounded-full transform -translate-x-1/2"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions - Full */}
          <div className="flex items-center space-x-3">
            <Button
             onClick={quizClick}
             className="hidden md:flex group bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-aco-orange/30 transition-all duration-300 hover:scale-105 border-2 border-white/20">
              <span className="group-hover:scale-105 transition-transform duration-300">Take Free Career Quiz</span>
            </Button>

            {/* Mobile Menu Button - Full */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-2 text-gray-700 hover:text-aco-teal transition-colors duration-300 rounded-lg hover:bg-aco-cyan/10"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </header>

    {/* Enhanced Mobile Navigation Menu - Outside header container */}
    {isMenuOpen && (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[9999] overflow-hidden w-full transition-all duration-500">
        <div className="w-full h-full flex flex-col px-4 pt-20">
          {/* Close button at the top */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-full bg-aco-cyan/10 hover:bg-aco-cyan/20 text-aco-teal transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center items-center space-y-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <div
                  key={item.href}
                  className="w-full max-w-xs animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`relative block text-center py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 group ${
                      isActive 
                        ? "text-aco-teal bg-aco-cyan/20 font-bold" 
                        : "text-gray-700 hover:text-aco-teal hover:bg-aco-cyan/10"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <div className={`w-2 h-2 bg-aco-cyan rounded-full transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}></div>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </div>
              )
            })}

            {/* Mobile Action Button */}
            <div
              className="w-full max-w-xs mt-8 animate-fade-in-up"
              style={{ animationDelay: `${navItems.length * 100}ms` }}
            >
              <Button
                onClick={quizClick}
                className="w-full bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-aco-orange/30 transition-all duration-300 hover:scale-105"
              >
                Take Free Career Quiz
              </Button>
            </div>
          </nav>

          {/* Footer */}
          <div className="py-6 text-center text-sm text-gray-500 border-t border-gray-200">
            <div className="flex justify-center items-center mb-2">
              <Image
                src="/logo-white.png"
                alt="Aco NextGen"
                width={100}
                height={28}
                className="h-7 w-auto"
              />
            </div>
            <p>© {new Date().getFullYear()} Aco NextGen Scholarship. All rights reserved.</p>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-aco-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-aco-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    )}
    </>
  )
}
