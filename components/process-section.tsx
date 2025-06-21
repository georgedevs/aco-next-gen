import { Card, CardContent } from "@/components/ui/card"
import {
  ClipboardDocumentCheckIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"

export function ProcessSection() {
  const steps = [
    {
      icon: ClipboardDocumentCheckIcon,
      step: "01",
      title: "Take Career Quiz",
      description: "Complete our comprehensive assessment to identify your strengths and ideal tech career path.",
    },
    {
      icon: LightBulbIcon,
      step: "02",
      title: "Personalized Learning",
      description: "Follow your customized curriculum with hands-on projects and expert-led training sessions.",
    },
    {
      icon: PresentationChartBarIcon,
      step: "03",
      title: "Build Your Portfolio",
      description: "Create impressive projects that showcase your skills to potential employers worldwide.",
    },
    {
      icon: BuildingOfficeIcon,
      step: "04",
      title: "Land Your Dream Job",
      description: "Leverage our job placement support and global network to secure your ideal tech position.",
    },
  ]

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-aco-navy to-aco-navy/95 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-aco-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up font-heading">
            How Aco NextGen Works
          </h2>
          <p
            className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Our proven 4-step process has helped thousands transform their careers and secure global opportunities
          </p>
        </div>

        {/* Process flow with connecting line */}
        <div className="max-w-6xl mx-auto relative">
          {/* Progress line connecting all steps */}
          {/* Horizontal line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 z-0 transform -translate-y-1/2">
            <div className="relative w-full h-1">
              <div className="absolute top-0 left-12 right-12 h-1 bg-aco-orange rounded-full"></div>
            </div>
          </div>

          {/* Vertical line for mobile */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 z-0 transform -translate-x-1/2">
            <div className="relative h-full w-1">
              <div className="absolute left-0 top-12 bottom-12 w-1 bg-aco-orange rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/95 backdrop-blur-sm animate-fade-in-up relative h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step number badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-aco-orange to-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg h-full flex flex-col">
                  <CardContent className="p-8 text-center pt-12 relative flex-1 flex flex-col">
                    {/* Icon section stays the same */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-aco-cyan to-aco-teal rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-aco-cyan to-aco-teal rounded-2xl mx-auto blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>

                    {/* Content section with flex-1 to fill available space */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-aco-navy mb-4 group-hover:text-aco-teal transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>

                  {/* Underline stays at the bottom */}
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-aco-orange to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-lg"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
