import React from 'react'

const ParallaxTransition = () => {
  return (
    <div className='flex items-center h-[50vh] justify-center bg-fixed bg-parallax bg-cover relative'>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
        <h2 className='text-4xl md:text-6xl font-bold uppercase mb-6'>
          Ready to Transform Your Future?
        </h2>
        <p className="text-xl md:text-2xl opacity-90">
          Join thousands who've already started their tech career journey
        </p>
      </div>
    </div>
  )
}

export default ParallaxTransition