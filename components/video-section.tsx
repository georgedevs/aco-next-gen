"use client"

import Image from "next/image"

export function VideoSection() {

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* CEO Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-aco-navy mb-4">Meet the CEO</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              A seasoned developer with <span className="font-bold text-aco-orange">15+ years of experience</span> in designing WordPress applications, 
              award-winning web designs and proficient in <span className="font-bold text-aco-teal">HTML, CSS and JavaScript</span>.
            </p>
            
            {/* Connecting bridge to video */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-aco-orange to-transparent flex-1 max-w-32"></div>
              <p className="text-lg font-medium text-aco-navy">Here's what Collins wants to share with you</p>
              <div className="h-px bg-gradient-to-r from-transparent via-aco-orange to-transparent flex-1 max-w-32"></div>
            </div>
          </div>

          {/* Vimeo Embed with Custom Parameters */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto max-w-3xl">
            <iframe 
              src="https://player.vimeo.com/video/1101965823?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=0&color=16D7C1&title=0&byline=0&portrait=0&background=0&controls=1&playsinline=1&pip=0&keyboard=0&speed=0&transparent=0&responsive=1&dnt=1"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              title="Aco NextGen Scholarship Video"
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
