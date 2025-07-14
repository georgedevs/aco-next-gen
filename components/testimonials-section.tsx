"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Muyiwa",
      role: "Product Designer",
      location: "Lagos, NG",
      image: "/Muyiwa.jpg",
      content:
        "Getting accepted into the Aco NextGen Tech Scholarship was the turning point I needed. Through comprehensive hands-on training, dedicated mentorship, and challenging real-world design projects, I gained the skills and confidence to transition into tech as a Product Designer.",
      rating: 5,
    },
    {
      name: "Toke",
      role: "Product Designer",
      location: "London, UK",
      image: "/toke.jpg",
      content:
        "The Aco NextGen Tech Scholarship completely changed the trajectory of my life. Through the scholarship, I gained access to professional-grade training, experienced mentorship, and real industry projects that helped me develop into a confident, skilled Product Designer.",
      rating: 5,
    },
    {
      name: "Samuel",
      role: "Graphic Designer",
      location: "Madrid, Spain",
      image: "/Samuel.jpg",
      content:
        "Everything changed when I received the Aco NextGen Tech Scholarship. That opportunity opened a completely new world for me. Today, I'm a working Graphic Designer, creating powerful visual content for brands and telling stories through design.",
      rating: 5,
    },
    {
      name: "Princess ",
      role: "Product Designer",
      location: "Toronto, Canada",
      image: "/Princess.jpg",
      content:
        "The program gave me more than just access to learning. It gave me clear direction, experienced mentorship, and a supportive community that believed in my potential. Today, while still in school, I work remotely as a paid Product Designer, doing the work I love and growing every day in a field I never imagined I could be part of so soon.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-aco-cyan/5 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-aco-teal rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-aco-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-aco-navy mb-6 animate-fade-in-up font-heading">
            Success Stories From Our Graduates
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Hear from real people who transformed their careers through Aco NextGen Scholarship
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/95 backdrop-blur-sm overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-aco-cyan/5"></div>

            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile section with enhanced styling */}
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-aco-cyan to-aco-teal rounded-full blur-lg opacity-20 scale-110"></div>
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-aco-orange to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  {/* Star rating with animation */}
                  <div className="flex justify-center md:justify-start mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-aco-orange text-aco-orange animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Enhanced quote */}
                  <blockquote className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed font-medium relative">
                    <span className="text-6xl text-aco-cyan/20 absolute -top-4 -left-2 font-serif">"</span>
                    {testimonials[currentIndex].content}
                    <span className="text-6xl text-aco-cyan/20 absolute -bottom-8 -right-2 font-serif">"</span>
                  </blockquote>

                  {/* Enhanced profile info */}
                  <div className="space-y-2">
                    <div className="font-bold text-gray-900 text-xl">{testimonials[currentIndex].name}</div>
                    <div className="text-aco-teal font-semibold text-lg bg-aco-teal/10 inline-block px-3 py-1 rounded-full">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-gray-500 flex items-center justify-center md:justify-start">
                      <div className="w-2 h-2 bg-aco-orange rounded-full mr-2"></div>
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced navigation */}
          <div className="flex justify-center items-center mt-10 gap-6">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 text-aco-teal border-2 border-aco-teal hover:bg-aco-teal hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-aco-orange to-orange-500 scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 text-aco-teal border-2 border-aco-teal hover:bg-aco-teal hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
