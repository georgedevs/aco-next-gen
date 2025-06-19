import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { 
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'

export function FinalCtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-aco-navy to-aco-navy/95 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-heading">
            Your Tech Career Transformation Starts Today
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful graduates who took the first step with our free career quiz. Discover your
            ideal tech path and unlock global opportunities.
          </p>

          <div className="mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Take Your Free Career Quiz Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 text-center">
              <ClockIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">Quick Start</div>
                <div className="text-sm text-gray-300">Begin in 5 minutes</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-center">
              <UserGroupIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">Expert Support</div>
                <div className="text-sm text-gray-300">Mentorship included</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-center">
              <ShieldCheckIcon className="w-6 h-6 text-aco-cyan flex-shrink-0" />
              <div>
                <div className="font-semibold text-white">Guaranteed Results</div>
                <div className="text-sm text-gray-300">85% job placement</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300">
            ✓ No credit card required • ✓ Instant results • ✓ Completely confidential
          </p>
        </div>
      </div>
    </section>
  )
}
