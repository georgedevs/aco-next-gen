import { Button } from "@/components/ui/button"
import { Home, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Aco NextGen Scholarship",
  description: "The page you're looking for doesn't exist. Return to Aco NextGen Scholarship homepage.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-aco-navy flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute bg-cyan-900 bg-blend-multiply inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("/herobg.png")',
        }}
        role="img"
        aria-label="Technology and education background design"
      ></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-aco-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-aco-orange rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-aco-cyan rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-aco-cyan bg-gradient-to-r from-aco-cyan to-aco-teal bg-clip-text text-transparent mb-4 animate-pulse">
              404
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-aco-cyan to-aco-teal rounded-full mx-auto"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-comfortaa">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, let's get you back on track to mastering those tech skills!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-aco-cyan to-aco-teal hover:from-aco-cyan/90 hover:to-aco-teal/90 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Homepage
              </Button>
            </Link>
            
            <Link href="/quiz">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-aco-cyan text-aco-cyan hover:bg-aco-cyan hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Take the Quiz
              </Button>
            </Link>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link 
              href="/#about" 
              className="group p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-aco-cyan text-sm font-medium group-hover:text-white transition-colors">
                About Program
              </div>
            </Link>
            
            <Link 
              href="/#benefits" 
              className="group p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-aco-cyan text-sm font-medium group-hover:text-white transition-colors">
                Benefits
              </div>
            </Link>
            
            <Link 
              href="/#process" 
              className="group p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-aco-cyan text-sm font-medium group-hover:text-white transition-colors">
                How It Works
              </div>
            </Link>
            
            <Link 
              href="/#faq" 
              className="group p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-aco-cyan text-sm font-medium group-hover:text-white transition-colors">
                FAQ
              </div>
            </Link>
          </div>

          {/* Fun Message */}
          <div className="mt-12 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 max-w-md mx-auto">
            <p className="text-gray-300 text-sm">
               <strong>Pro Tip:</strong> While you're here, why not check out our free tech training program? 
              It's designed to open global opportunities just like this error page opened... well, nothing! 
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}