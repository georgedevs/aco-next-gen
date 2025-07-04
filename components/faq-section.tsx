"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is the Aco NextGen Scholarship?",
      answer:
        "The Aco NextGen Scholarship is an initiative by Aco Multimedia to empower young Africans with 21st-century skills through access to world-class training, mentorship, and career opportunities at a highly subsidized cost.",
    },
    {
      question: "How do I apply?",
      answer:
        "Click the \"Take a free career quiz\" button and complete your career quiz. We'll follow up via email or Telegram with the next steps.",
    },
    {
      question: "Who can apply for this scholarship?",
      answer:
        "You must be 18–40 years old, have a smartphone or laptop with internet access, be ready to commit fully, and have an interest in tech, business, or digital skills.",
    },
    {
      question: "How much of the course fee is covered by the scholarship?",
      answer:
        "The scholarship covers 80% of the total cost. You'll only pay the remaining 20% as a commitment fee to unlock access to training, tools, and support. The 20% is broken down like this (Registration fee – ₦10,000 to access the Live classes and Exam fee of ₦10,000 when it is time for the exam.)",
    },
    {
      question: "Why Exam fee?",
      answer:
        "The Exam is a written assessment to be sure if you qualify to go to the Next level. No matter how small the fee is, if you pay for something, you will take it more seriously.",
    },
    {
      question: "How many Levels are there in each course?",
      answer:
        "We now with a module-based scheme that offers more flexibility and targeted learning experiences for our courses.",
        
    },
    {
      question: "What courses or skills will I learn?",
      answer:
        "Options include Product Design, Graphics Design, Digital Marketing, Front-end Development, Backend Development, Cyber Security, DevOps, Data Analysis, and more. Course info is shared after acceptance.",
    },
    {
      question: "Is this training online or in-person?",
      answer:
        "All training is 100% online, making it accessible from anywhere with internet access. It's both an online and self-paced platform.",
    },
    {
      question: "When does the program start?",
      answer:
        "Training and onboarding dates will be shared with selected applicants after review.",
    },
    {
      question: "Will I receive a certificate?",
      answer:
        "Yes, you'll receive a certificate at the end of the scholarship program. You can also put your certificate on your LinkedIn profile and any other Social Media Platform. So at the end of the scholarship program levels ( Beginners, Intermediate, and Advanced Level, you will get a certificate that says you have gone through these levels, and this will also show your percentage score and other information.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "No. The scholarship is beginner-friendly and designed to support learners at different levels — just come ready to learn.",
    },
    {
      question: "How will I know if I've been selected?",
      answer:
        "You'll be notified via email or our telegram community with your onboarding link, and program access details.",
    },
    {
      question: "Will I have a Portfolio to show to my Prospective employers at the end of the program?",
      answer:
        "Yes! At the end of your program, you will have a robust and functional portfolio to showcase to your employers.",
    },
    {
      question: "Is there Job Support after the program?",
      answer:
        "Yes, there is. When you are done with your program, we will add you to our mentorship community where we send you legit job links and tell you how to apply, and we will also prepare you for your job interview. The idea is that we won't let you go until you get your first job or contract. Of course, this will not be immediate; it might take several months, but we will surely be with you all the way.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-aco-navy/5 via-white to-aco-cyan/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-aco-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-aco-orange rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-aco-cyan rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-aco-cyan/10 rounded-full text-aco-teal font-medium text-sm mb-6 animate-fade-in-up">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions? We've Got Answers
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-aco-navy mb-6 leading-tight animate-fade-in-up delay-200 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Get answers to the most common questions about our scholarship program
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up self-start"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Question button with enhanced styling */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-start hover:bg-gradient-to-r hover:from-aco-cyan/5 hover:to-aco-teal/5 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-aco-cyan to-aco-teal rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-sm">Q</span>
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-aco-navy pr-4 leading-relaxed group-hover:text-aco-teal transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-aco-orange text-white shadow-lg shadow-aco-orange/30 rotate-180' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-aco-orange/10 group-hover:text-aco-orange'
                    }`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </div>
                </button>

                {/* Answer section with enhanced animation */}
                {openIndex === index && (
                  <div className="animate-fade-in-up">
                    <div className="px-8 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 bg-gradient-to-br from-aco-orange to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">A</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="w-full h-px bg-gradient-to-r from-aco-cyan/30 to-transparent mb-4"></div>
                          <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-action section */}
        <div className="text-center mt-16 animate-fade-in-up delay-1000">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-aco-teal/10 to-aco-cyan/10 rounded-full text-aco-navy font-medium">
            <MessageCircle className="w-5 h-5 mr-2 text-aco-orange" />
            <span>Still have questions? We're here to help!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
