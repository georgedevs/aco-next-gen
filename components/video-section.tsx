"use client"

import Image from "next/image"

export function VideoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Tega's Profile Introduction - Establishes credibility first */}
          <div className="text-center mb-16">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <Image
                src="/student1.jpeg"
                alt="Tega - Developer & Mentor"
                fill
                className="rounded-full object-cover border-4 border-aco-orange shadow-xl"
              />
              {/* Professional badge overlay */}
              <div className="absolute -bottom-2 -right-2 bg-aco-orange text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                15+ Years
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-aco-navy mb-4">Meet Tega</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              A seasoned developer with <span className="font-bold text-aco-orange">15+ years of experience</span> in designing WordPress applications, 
              award-winning web designs and proficient in <span className="font-bold text-aco-teal">HTML, CSS and JavaScript</span>.
            </p>
            
            {/* Connecting bridge to video */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-aco-orange to-transparent flex-1 max-w-32"></div>
              <p className="text-lg font-medium text-aco-navy">Here's what Tega wants to share with you</p>
              <div className="h-px bg-gradient-to-r from-transparent via-aco-orange to-transparent flex-1 max-w-32"></div>
            </div>
          </div>

          {/* Video Content - Now users are primed and ready to invest time */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto max-w-3xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&showinfo=0&rel=0"
              title="Aco NextGen Scholarship Explainer Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p className="mt-8 text-center text-gray-500">
            Can't watch the video?{" "}
            <a href="#about" className="text-aco-teal hover:text-aco-orange transition-colors duration-300">
              Read more about our program below
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
