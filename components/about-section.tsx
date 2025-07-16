"use client"

import { useState, useRef, useEffect } from "react"

export function AboutSection() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const paragraphs = [
    "The Aco NextGen Scholarship represents a revolutionary approach to tech education, designed specifically for ambitious individuals ready to thrive in the fourth industrial revolution. This comprehensive program bridges the gap between traditional education and the rapidly evolving demands of the global tech industry, providing participants with cutting-edge skills that employers actively seek.",
    "Our curriculum covers essential areas including software development, cybersecurity, UI/UX design, product management, digital marketing, graphic design, video editing, tech support and many more. What sets us apart is our focus on practical, hands-on learning combined with real-world project experience. Students don't just learn theory – they build portfolios that demonstrate their capabilities to potential employers worldwide.",
    "Since our launch, we've successfully placed over 600 graduates in tech roles, with many securing positions at leading organizations like MTN and other reputable companies and startups. Our commitment extends beyond training – we provide ongoing career support, mentorship, and access to our global network of tech professionals and hiring partners."
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementHeight = rect.height
          const viewportCenter = scrollY + windowHeight / 2
          
          if (viewportCenter >= elementTop && viewportCenter <= elementTop + elementHeight) {
            setActiveSection(index)
          }
        }
      })
    }

    // Initial call
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-aco-navy/5 to-aco-cyan/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-40 h-40 bg-aco-teal rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-aco-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-aco-navy mb-6 animate-fade-in-up font-heading">
              About Aco NextGen Scholarship
            </h2>
          </div>

          {/* Unique layout with side navigation and flowing content */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Progressive side indicator - responsive design */}
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 flex lg:flex-row gap-8 lg:w-64 flex-shrink-0 h-fit items-start lg:self-start">
              
              {/* Desktop version */}
              <div className="hidden lg:block w-px bg-gradient-to-b from-aco-cyan via-aco-teal to-aco-orange h-64 relative opacity-100">
                {/* Active indicator that moves based on scroll */}
                <div 
                  className="absolute w-4 h-4 bg-aco-orange rounded-full -left-1.5 transition-all duration-700 shadow-lg opacity-100"
                  style={{ 
                    top: `${16.67 + (activeSection * 33.33)}%`,
                    transform: 'translateY(-50%)'
                  }}
                ></div>
                
                {/* Static dots - positioned at 25%, 50%, 75% of the line */}
                {paragraphs.map((_, index) => (
                  <div 
                    key={index}
                    className={`absolute w-3 h-3 rounded-full -left-1.5 transition-all duration-500 opacity-100 ${
                      activeSection >= index ? 'bg-aco-orange scale-125 shadow-md' : 'bg-white border-2 border-gray-300'
                    }`}
                    style={{ 
                      top: `${16.67 + (index * 33.33)}%`,
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Desktop section labels */}
              <div className="relative h-64 hidden lg:block">
                <div 
                  className={`absolute text-sm font-medium transition-all duration-500 cursor-pointer opacity-100 whitespace-nowrap ${
                    activeSection === 0 ? 'text-aco-orange font-bold scale-105' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ 
                    top: `${16.67}%`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  Revolutionary Approach
                </div>
                <div 
                  className={`absolute text-sm font-medium transition-all duration-500 cursor-pointer opacity-100 whitespace-nowrap ${
                    activeSection === 1 ? 'text-aco-orange font-bold scale-105' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ 
                    top: `${50}%`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  Comprehensive Learning
                </div>
                <div 
                  className={`absolute text-sm font-medium transition-all duration-500 cursor-pointer opacity-100 whitespace-nowrap ${
                    activeSection === 2 ? 'text-aco-orange font-bold scale-105' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ 
                    top: `${83.33}%`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  Proven Success
                </div>
              </div>
              
              {/* Mobile version - compact vertical progress indicator */}
              <div className="lg:hidden flex items-start gap-3 w-full">
                <div className="flex flex-col items-center flex-shrink-0 pt-2">
                  {/* Mobile progress line */}
                  <div className="w-0.5 bg-gradient-to-b from-aco-cyan via-aco-teal to-aco-orange h-32 relative">
                    {/* Active indicator */}
                    <div 
                      className="absolute w-3 h-3 bg-aco-orange rounded-full -left-1 transition-all duration-700 shadow-md"
                      style={{ 
                        top: `${16.67 + (activeSection * 33.33)}%`,
                        transform: 'translateY(-50%)'
                      }}
                    ></div>
                    
                    {/* Static dots */}
                    {paragraphs.map((_, index) => (
                      <div 
                        key={index}
                        className={`absolute w-2 h-2 rounded-full -left-0.5 transition-all duration-500 ${
                          activeSection >= index ? 'bg-aco-orange scale-125' : 'bg-white border border-gray-300'
                        }`}
                        style={{ 
                          top: `${16.67 + (index * 33.33)}%`,
                          transform: 'translateY(-50%)'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile section labels */}
                <div className="flex flex-col space-y-8 pt-1">
                  <div className={`text-sm font-medium transition-all duration-500 ${
                    activeSection === 0 ? 'text-aco-orange font-bold' : 'text-gray-500'
                  }`}>
                    Revolutionary Approach
                  </div>
                  <div className={`text-sm font-medium transition-all duration-500 ${
                    activeSection === 1 ? 'text-aco-orange font-bold' : 'text-gray-500'
                  }`}>
                    Comprehensive Learning
                  </div>
                  <div className={`text-sm font-medium transition-all duration-500 ${
                    activeSection === 2 ? 'text-aco-orange font-bold' : 'text-gray-500'
                  }`}>
                    Proven Success
                  </div>
                </div>
              </div>
            </div>

            {/* Content area with unique flowing typography */}
            <div className="flex-1 space-y-12">
              {paragraphs.map((paragraph, index) => (
                <div 
                  key={index}
                  ref={(el) => sectionRefs.current[index] = el}
                  className={`relative min-h-[200px] transition-all duration-700 ${
                    activeSection === index 
                      ? 'opacity-100 transform translate-x-0 scale-105' 
                      : 'opacity-50 transform translate-x-2'
                  }`}
                >
                  {/* Floating paragraph number */}
                  <div className="absolute -left-12 top-4 hidden lg:block">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      activeSection >= index 
                        ? 'border-aco-orange text-aco-orange bg-aco-orange/10 scale-110' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Content with dynamic typography */}
                  <div className="relative">
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-aco-cyan/5 via-transparent to-aco-teal/5 rounded-xl transition-opacity duration-700 ${
                      activeSection === index ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    <p className={`relative text-lg leading-relaxed transition-all duration-700 p-6 ${
                      activeSection === index 
                        ? 'text-gray-800 font-medium' 
                        : 'text-gray-600 font-normal'
                    }`}>
                      {/* First few words highlighted */}
                      <span className={`transition-colors duration-700 ${
                        activeSection === index ? 'text-aco-navy font-bold text-xl' : 'text-gray-600'
                      }`}>
                        {paragraph.split(' ').slice(0, 4).join(' ')}
                      </span>{' '}
                      {paragraph.split(' ').slice(4).join(' ')}
                    </p>

                    {/* Side accent line */}
                    <div className={`absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-aco-cyan to-aco-teal rounded-full transition-all duration-700 ${
                      activeSection === index ? 'opacity-100 scale-y-100' : 'opacity-20 scale-y-50'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
