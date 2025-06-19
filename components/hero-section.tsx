import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export function HeroSection() {
  return (
    <section className="relative mt-16 md:mt-0 pt-4 md:pt-0 pb-12 md:pb-0 bg-aco-navy min-h-[90vh] md:h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-aco-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-aco-orange rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-aco-cyan rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-aco-navy via-aco-navy/95 to-aco-navy/90"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust indicator with enhanced styling */}
          <div className="flex justify-center items-center space-x-1 mb-8 animate-fade-in-up">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="flex space-x-1 mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              <span className="text-white font-medium">Trusted by 5,000+ students nationwide</span>
              <CheckBadgeIcon className="w-5 h-5 text-aco-cyan ml-2" />
            </div>
          </div>

          {/* Enhanced heading with better typography */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up font-heading"
            style={{ lineHeight: "calc(1.15em + 4px)", animationDelay: "200ms" }}
          >
            Master Tech Skills That Open
            <span className="relative inline-block ml-3">
              <span className="text-aco-cyan bg-gradient-to-r from-aco-cyan to-aco-teal bg-clip-text text-transparent">
                Global Doors
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-aco-cyan to-aco-teal rounded-full animate-shimmer"></div>
            </span>
          </h1>

          {/* Enhanced description  */}
          <p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-comfortaa"
            style={{ 
              animationDelay: "400ms",
              fontWeight: "400",
              textShadow: "0 0 1px currentColor, 0 0 1px currentColor, 0 0 1px currentColor",
              WebkitTextStroke: "0.5px currentColor",
              letterSpacing: "0.025em"
            }}
          >
            The Aco NextGen Scholarship is your free pathway to mastering in-demand tech skills. Join thousands who've
            transformed their careers and secured opportunities in the digital economy.
          </p>

          {/* Enhanced CTA section */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-aco-orange/50 transition-all duration-300 hover:scale-105 border-2 border-white/20"
            >
              Take Your Free Career Quiz
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <div className="flex items-center space-x-4 text-white bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="flex space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">✓ 100% Free</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-sm font-medium">✓ No Hidden Costs</span>
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-sm font-medium">✓ Global Opportunities</span>
            </div>
          </div>

          {/* Enhanced stats section */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            {[
              { number: "5,000+", label: "Students Trained", delay: "0ms" },
              { number: "85%", label: "Job Placement Rate", delay: "200ms" },
              { number: "26+", label: "States Covered", delay: "400ms" },
            ].map((stat, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: stat.delay }}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl md:text-5xl font-bold text-aco-cyan mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}