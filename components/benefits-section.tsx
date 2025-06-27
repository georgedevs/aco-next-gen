import { Card, CardContent } from "@/components/ui/card"
import { 
  AcademicCapIcon,
  GlobeAltIcon, 
  UsersIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline'

export function BenefitsSection() {
  const benefits = [
    {
      icon: AcademicCapIcon,
      title: "Comprehensive Curriculum",
      description: "Master in-demand skills across multiple tech domains with our expertly crafted learning paths.",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Job Opportunities",
      description: "Access exclusive job openings from our extensive network of partner companies worldwide.",
    },
    {
      icon: UsersIcon,
      title: "Expert Mentorship",
      description: "Get personalized guidance from industry professionals with years of real-world experience.",
    },
    {
      icon: CheckBadgeIcon,
      title: "Industry Certifications",
      description: "Earn recognized certifications that validate your skills to employers.",
    },
    {
      icon: BriefcaseIcon,
      title: "Career Support",
      description: "Receive ongoing career coaching, interview preparation, and job placement assistance.",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Lifetime Community Access",
      description: "Join our exclusive alumni network for continuous learning and professional connections.",
    },
  ]

  return (
    <section
      id="benefits"
      className="py-20 bg-gradient-to-br from-white via-gray-50/30 to-aco-cyan/5 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-aco-teal rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-aco-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-aco-navy mb-6 animate-fade-in-up font-heading">
            What You'll Gain From Aco NextGen
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Our scholarship program is designed to provide you with everything needed to succeed in the global tech
            industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/95 backdrop-blur-sm group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Subtle background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-aco-cyan/5 to-aco-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="p-8 text-center relative z-10">
                {/* Clean, consistent icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-aco-cyan to-aco-teal rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-aco-navy mb-4 group-hover:text-aco-teal transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Hover effect indicator */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
