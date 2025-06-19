"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  ArrowLeft, 
  ArrowRight, 
  Palette, 
  Code, 
  BarChart3, 
  Megaphone, 
  Shield, 
  Target,
  Smartphone,
  Image as ImageIcon,
  Globe,
  Server,
  Layers,
  TrendingUp,
  GitBranch,
  Radio,
  Search,
  ShieldCheck,
  Cloud,
  Crown,
  User,
  Shuffle,
  PartyPopper,
  Trophy,
  RefreshCw,
  Mail,
  HelpCircle,
  Loader2,
  Star,
  Sparkles,
  Disc2
} from "lucide-react"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"

interface QuizState {
  userEmail: string
  userFirstName: string
  userLastName: string
  userPhone: string
  userLocation: string
  mainInterest: string
  specialization: string
  finalRecommendation: string
  currentScreen: string
  screenHistory: string[]
}

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    userEmail: '',
    userFirstName: '',
    userLastName: '',
    userPhone: '',
    userLocation: '',
    mainInterest: '',
    specialization: '',
    finalRecommendation: '',
    currentScreen: 'email-capture',
    screenHistory: []
  })

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Load saved user details from localStorage on component mount
  useEffect(() => {
    const savedUserDetails = localStorage.getItem('acoQuizUserDetails')
    if (savedUserDetails) {
      const userDetails = JSON.parse(savedUserDetails)
      setQuizState(prev => ({
        ...prev,
        userFirstName: userDetails.firstName || '',
        userLastName: userDetails.lastName || '',
        userEmail: userDetails.email || '',
        userPhone: userDetails.phone || '',
        userLocation: userDetails.location || ''
      }))
    }
  }, [])

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }))
  }

  const goBack = () => {
    if (quizState.screenHistory.length > 0) {
      const newHistory = [...quizState.screenHistory]
      const previousScreen = newHistory.pop()!
      updateQuizState({
        currentScreen: previousScreen,
        screenHistory: newHistory
      })
    }
  }

  const showScreen = (screenId: string) => {
    updateQuizState({
      screenHistory: [...quizState.screenHistory, quizState.currentScreen],
      currentScreen: screenId
    })
  }

  const startQuiz = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    
    const userDetails = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: formData.get('email') as string,
      userPhone: formData.get('phone') as string,
      userLocation: formData.get('location') as string,
    }

    updateQuizState(userDetails)
    
    // Save user details to localStorage (only basic info)
    const userDetailsForStorage = {
      firstName: firstName,
      lastName: lastName,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
    }
    localStorage.setItem('acoQuizUserDetails', JSON.stringify(userDetailsForStorage))
    
    // Show welcome toast
    setToastMessage(`Welcome ${firstName} ${lastName}! Let's find your perfect tech path.`)
    setShowToast(true)
    
    setTimeout(() => {
      setLoading(false)
      showScreen('question1')
    }, 1000)
  }

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const selectMainInterest = (interest: string) => {
    updateQuizState({ mainInterest: interest })
    
    setTimeout(() => {
      const nextScreen = {
        'design': 'question2A',
        'development': 'question2B',
        'data': 'question2C',
        'marketing': 'question2D',
        'security': 'question2E',
        'product': 'question2F'
      }[interest]
      
      showScreen(nextScreen!)
    }, 300)
  }

  const selectSpecialization = (track: string) => {
    updateQuizState({ specialization: track })
    
    setTimeout(() => {
      if (quizState.mainInterest === 'product') {
        updateQuizState({ finalRecommendation: track })
        showScreen('recommendation')
      } else {
        showScreen('question3')
      }
    }, 300)
  }

  const selectDualInterest = (choice: string) => {
    setTimeout(() => {
      const finalRec = choice === 'single' ? quizState.specialization : `${choice} (Combined Path)`
      updateQuizState({ finalRecommendation: finalRec })
      showScreen('recommendation')
    }, 300)
  }

  const sendEmailResults = async () => {
    setEmailSending(true)
    
    try {
      // Simulate email sending - replace with actual API call
      const emailData = {
        to: quizState.userEmail,
        subject: 'Your Perfect Tech Career Match - Aco NextGen Scholarship',
        firstName: quizState.userFirstName,
        lastName: quizState.userLastName,
        recommendation: quizState.finalRecommendation,
        rationale: generateRationale(quizState.finalRecommendation)
      }
      
      // Send email using the API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
      
      setEmailSent(true)
      setToastMessage(`Results sent to ${quizState.userEmail} successfully!`)
      setShowToast(true)
      
    } catch (error) {
      console.error('Error sending email:', error)
      setToastMessage('Failed to send email. Please try again.')
      setShowToast(true)
    } finally {
      setEmailSending(false)
    }
  }

  const restartQuiz = () => {
    // Clear localStorage when restarting
    localStorage.removeItem('acoQuizUserDetails')
    
    setQuizState({
      userEmail: '',
      userFirstName: '',
      userLastName: '',
      userPhone: '',
      userLocation: '',
      mainInterest: '',
      specialization: '',
      finalRecommendation: '',
      currentScreen: 'email-capture',
      screenHistory: []
    })
  }

  const generateRationale = (recommendation: string) => {
    const rationales: Record<string, string> = {
      'Product Design': 'Based on your interest in visual design and user interfaces, Product Design is perfect for you! You\'ll create wireframes, prototypes, and user experiences that directly impact how people interact with digital products.',
      'Graphics Design': 'Your passion for brand assets and visual communication makes Graphics Design an ideal fit! You\'ll craft compelling logos, marketing materials, and visual identities that tell powerful brand stories.',
      'Front-End Development': 'Your enthusiasm for building user-facing components aligns perfectly with Front-End Development! You\'ll bring designs to life using HTML, CSS, JavaScript, and modern frameworks.',
      'Back-End Development': 'Your interest in server-side logic and databases makes Back-End Development a great match! You\'ll build the robust systems and APIs that power modern applications.',
      'Programming (Full Stack)': 'Your desire to work across both front-end and back-end makes Full Stack Development perfect for you! You\'ll have the versatility to build complete web applications from start to finish.',
      'Data Analysis': 'Your fascination with datasets and insights makes Data Analysis an excellent choice! You\'ll transform raw data into actionable business intelligence through reports and visualizations.',
      'DevOps': 'Your interest in automation and infrastructure aligns perfectly with DevOps! You\'ll streamline development processes and build scalable, reliable systems.',
      'Digital Marketing': 'Your enthusiasm for online marketing campaigns makes Digital Marketing ideal for you! You\'ll drive growth through paid advertising, social media, and email marketing strategies.',
      'SEO Training': 'Your interest in organic traffic and search optimization makes SEO Training perfect for you! You\'ll help websites rank higher and attract more qualified visitors.',
      'Cyber Security': 'Your curiosity about system security makes Cyber Security an excellent fit! You\'ll protect organizations from threats through penetration testing and security protocols.',
      'Product Management': 'Your leadership interests and desire to coordinate teams makes Product Management ideal for you! You\'ll guide product strategy and work with cross-functional teams to deliver successful products.'
    }
    
    if (recommendation.includes('Combined Path')) {
      return 'Amazing choice! Your dual interests make you uniquely positioned for this combined track. You\'ll have the versatility to work across multiple disciplines, making you a valuable asset in today\'s collaborative digital landscape. This combination will set you apart in the job market!'
    }
    
    return rationales[recommendation] || 'This track aligns perfectly with your interests and will provide you with valuable skills in the digital multimedia industry!'
  }

  return (
    <div className="relative min-h-screen bg-aco-navy overflow-hidden overflow-x-hidden w-full">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-aco-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-aco-orange rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-aco-cyan rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-aco-teal rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-aco-orange rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      {/* Gradient overlay with more visual interest */}
      <div className="absolute inset-0 bg-gradient-to-br from-aco-navy via-aco-navy/95 to-aco-navy/90"></div>
      
      {/* Additional pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(22, 211, 193, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(244, 122, 69, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen w-full lg:flex">
        {/* Sidebar - 30% - Fixed */}
        <div className="hidden lg:flex lg:w-[30%] bg-white/10 backdrop-blur-sm border-r border-white/20 flex-col p-8 fixed left-0 top-0 h-screen z-20">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex justify-start items-center pt-8 pb-12">
              <a 
                href="https://acomultimedia.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/logo-dark.webp"
                  alt="Aco NextGen"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </a>
            </div>
            
            {/* Content Container */}
            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">Career Discovery</h3>
                <p className="text-aco-cyan font-comfortaa">Find Your Tech Path</p>
              </div>
            </div>
            
            <div className="space-y-6 text-white">
              <div>
                <h4 className="font-bold font-heading text-lg mb-2 text-aco-cyan">What to Expect</h4>
                <ul className="space-y-2 font-comfortaa text-sm leading-relaxed">
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-aco-orange mt-0.5 mr-2 flex-shrink-0" />
                    3-step personalized assessment
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-aco-orange mt-0.5 mr-2 flex-shrink-0" />
                    Instant career recommendations
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-aco-orange mt-0.5 mr-2 flex-shrink-0" />
                    Personalized learning path
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold font-heading text-lg mb-2 text-aco-cyan">Why Take This Quiz?</h4>
                <ul className="space-y-2 font-comfortaa text-sm leading-relaxed">
                  <li className="flex items-start">
                    <CheckBadgeIcon className="w-4 h-4 text-aco-teal mt-0.5 mr-2 flex-shrink-0" />
                    Discover hidden talents
                  </li>
                  <li className="flex items-start">
                    <CheckBadgeIcon className="w-4 h-4 text-aco-teal mt-0.5 mr-2 flex-shrink-0" />
                    Match skills to opportunities
                  </li>
                  <li className="flex items-start">
                    <CheckBadgeIcon className="w-4 h-4 text-aco-teal mt-0.5 mr-2 flex-shrink-0" />
                    Get started in minutes
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src="/student2.jpeg"
                      alt="Sarah K."
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-comfortaa text-sm italic text-aco-cyan leading-relaxed">
                      "This quiz helped me transition from marketing to UX design. Best decision ever!"
                    </p>
                    <span className="block text-xs mt-2 text-white/70 font-medium">- Sarah K., Product Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Main Content - 70% - Scrollable */}
        <div className="flex-1 lg:w-[70%] lg:ml-[30%] overflow-y-auto min-h-screen relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/quizbg.jpg")',
            }}
          ></div>
          {/* Transparent Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-green-800/20 to-emerald-900/30"></div>
          <div className="relative z-10 flex items-center justify-center py-8 px-4 min-h-screen">
          <div className="w-full max-w-2xl">
          
          {/* Email Capture Screen */}
          {quizState.currentScreen === 'email-capture' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-white/20 w-full max-w-full overflow-hidden">
              {/* Trust indicator */}
              <div className="flex justify-center items-center space-x-1 mb-8">
                <div className="flex items-center bg-aco-teal/10 backdrop-blur-sm rounded-full px-6 py-3 border border-aco-teal/20">
                  <div className="flex space-x-1 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-aco-navy font-comfortaa font-medium">Trusted by 5,000+ students</span>
                  <CheckBadgeIcon className="w-5 h-5 text-aco-cyan ml-2" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-heading text-aco-navy mb-4 text-center leading-tight">
                Discover Your Perfect
                <span className="block text-aco-orange bg-gradient-to-r from-aco-orange to-orange-500 bg-clip-text text-transparent">
                  Tech Career Path
                </span>
              </h1>
              
              <p 
                className="text-xl md:text-2xl font-comfortaa text-gray-600 mb-8 text-center leading-relaxed"
                style={{ 
                  fontWeight: "400",
                  textShadow: "0 0 1px currentColor, 0 0 1px currentColor, 0 0 1px currentColor",
                  WebkitTextStroke: "0.5px currentColor",
                  letterSpacing: "0.025em"
                }}
              >
                Take our free career quiz and unlock your potential in the digital economy. 
                Get personalized recommendations instantly!
              </p>
              
              <form onSubmit={startQuiz} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-aco-navy mb-2 font-sans">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      defaultValue={quizState.userFirstName}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-aco-teal focus:outline-none transition-colors font-sans"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-aco-navy mb-2 font-sans">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      defaultValue={quizState.userLastName}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-aco-teal focus:outline-none transition-colors font-sans"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-aco-navy mb-2 font-sans">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    defaultValue={quizState.userEmail}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-aco-teal focus:outline-none transition-colors font-sans"
                    placeholder="john.doe@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-aco-navy mb-2 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    defaultValue={quizState.userPhone}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-aco-teal focus:outline-none transition-colors font-sans"
                    placeholder="+234 123-456-7890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-aco-navy mb-2 font-sans">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    defaultValue={quizState.userLocation}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-aco-teal focus:outline-none transition-colors font-sans"
                    placeholder="Lagos, Nigeria"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-aco-orange to-orange-500 hover:from-orange-600 hover:to-aco-orange text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-heading flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      Starting Your Journey <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Start My Career Journey <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 pt-4">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    100% Free
                  </span>
                  <span className="w-px h-4 bg-gray-300"></span>
                  <span>No Hidden Costs</span>
                  <span className="w-px h-4 bg-gray-300"></span>
                  <span>Instant Results</span>
                </div>
              </form>
            </div>
          )}

          {/* Question 1 - Main Interest */}
          {quizState.currentScreen === 'question1' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 1 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-4 text-center leading-tight">
                What excites you the most?
              </h2>
              <p className="text-xl font-comfortaa text-gray-600 mb-8 text-center">
                Pick the one that makes your heart race! <HelpCircle className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </p>
              
              <div className="space-y-4">
                {[
                  { value: 'design', icon: Palette, text: 'I love visually designing user experiences, layouts, and brand assets.' },
                  { value: 'development', icon: Code, text: 'I enjoy writing code and building websites or applications.' },
                  { value: 'data', icon: BarChart3, text: 'I\'m fascinated by working with data—analyzing numbers, dashboards, and insights.' },
                  { value: 'marketing', icon: Megaphone, text: 'I want to learn how to market products online—ads, social media, SEO.' },
                  { value: 'security', icon: Shield, text: 'I\'m curious about securing systems or setting up and automating infrastructure.' },
                  { value: 'product', icon: Target, text: 'I want to lead products/projects and coordinate cross-functional teams.' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectMainInterest(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All other question screens follow similar pattern with proper styling */}
          {/* Question 2A - Design Path */}
          {quizState.currentScreen === 'question2A' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 2 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                Which design focus appeals to you most? <Palette className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Product Design', icon: Smartphone, text: 'I want to design user interfaces, wireframes, and clickable prototypes.' },
                  { value: 'Graphics Design', icon: ImageIcon, text: 'I prefer creating brand logos, marketing graphics, and infographics.' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation Screen */}
          {quizState.currentScreen === 'recommendation' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center bg-aco-orange/10 rounded-full px-6 py-3 mb-6">
                  <PartyPopper className="w-6 h-6 text-aco-orange mr-2" />
                  <span className="font-bold text-aco-orange font-heading">Quiz Complete!</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-4 leading-tight">
                  Your Perfect Tech Career Match
                </h2>
              </div>
              
              <div className="bg-gradient-to-br from-aco-orange/10 to-orange-500/10 rounded-2xl p-8 mb-8 relative overflow-hidden border border-aco-orange/20">
                <h3 className="text-2xl md:text-3xl font-bold text-aco-orange mb-4 font-heading">
                  {quizState.finalRecommendation}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-comfortaa">
                  {generateRationale(quizState.finalRecommendation)}
                </p>
              </div>
              
              <div className="bg-aco-teal/10 rounded-xl p-6 mb-8 border-l-4 border-aco-teal">
                <p className="text-lg font-bold text-aco-navy mb-2 font-heading">
                  Perfect Match Found!
                </p>
                <p className="text-gray-600 font-comfortaa">
                  We'll send this personalized recommendation to <strong>{quizState.userEmail}</strong> shortly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-aco-teal text-aco-teal rounded-xl hover:bg-aco-teal hover:text-white transition-colors font-sans font-semibold"
                >
                  <RefreshCw className="w-5 h-5" /> Take Quiz Again
                </button>
                <button
                  onClick={sendEmailResults}
                  disabled={emailSending || emailSent}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors font-heading font-bold ${
                    emailSent
                      ? 'bg-green-500 text-white cursor-default'
                      : emailSending
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-aco-orange to-orange-500 text-white hover:from-orange-600 hover:to-aco-orange'
                  }`}
                >
                  {emailSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : emailSent ? (
                    <>
                      <CheckBadgeIcon className="w-5 h-5" /> Email Sent!
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" /> Email My Results
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Question 2B - Development Path */}
          {quizState.currentScreen === 'question2B' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 2 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                Which part of software development excites you most? <Code className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Front-End Development', icon: Globe, text: 'I want to build user-facing pages and components—HTML, CSS, JavaScript, and front-end frameworks.' },
                  { value: 'Back-End Development', icon: Server, text: 'I want to work on server-side logic, APIs, and databases—back-end development.' },
                  { value: 'Programming (Full Stack)', icon: Layers, text: 'I want to do both front-end and back-end (full-stack).' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2C - Data Path */}
          {quizState.currentScreen === 'question2C' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 2 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                What aspect of working with data appeals to you? <BarChart3 className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Data Analysis', icon: TrendingUp, text: 'I want to analyze datasets, build reports, and visualize insights (dashboards, charts).' },
                  { value: 'DevOps', icon: GitBranch, text: 'I enjoy building data pipelines, automating workflows, and writing scripts to move/transform data.' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2D - Marketing Path */}
          {quizState.currentScreen === 'question2D' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 2 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                Which digital marketing focus fits you best? <Megaphone className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Digital Marketing', icon: Radio, text: 'I want to run paid ads, manage social media campaigns, and learn email marketing.' },
                  { value: 'SEO Training', icon: Search, text: 'I want to optimize websites to rank higher on Google and drive organic traffic.' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2E - Security Path */}
          {quizState.currentScreen === 'question2E' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Question 2 of 3</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                Which technology focus interests you most? <Shield className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Cyber Security', icon: ShieldCheck, text: 'I want to learn how to secure networks, perform penetration testing, and defend systems.' },
                  { value: 'DevOps', icon: Cloud, text: 'I want to build and automate infrastructure—servers, containers, CI/CD, and cloud deployments.' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2F - Product Path */}
          {quizState.currentScreen === 'question2F' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Final Question</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-8 text-center leading-tight">
                What describes your interest in product/project management? <Target className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              
              <div className="space-y-4">
                {[
                  { value: 'Product Management', icon: Crown, text: 'I have some business or leadership experience and enjoy coordinating cross-functional teams to ship products.' },
                  { value: 'Product Management', icon: User, text: 'I\'m new to digital products but want to learn roadmapping, Agile/Scrum, and stakeholder communication.' }
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectSpecialization(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 - Dual Interest */}
          {quizState.currentScreen === 'question3' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">Final Question</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-4 text-center leading-tight">
                Do you have two equally strong interests? <Shuffle className="inline w-10 h-10 text-aco-orange font-bold stroke-[3px] drop-shadow-lg animate-pulse" />
              </h2>
              <p className="text-xl font-comfortaa text-gray-600 mb-8 text-center">
                If so, pick the combo. Otherwise, choose 'No, just one.'
              </p>
              
              <div className="space-y-4">
                {[
                  { value: 'single', text: 'No, I\'m happy with my single recommendation.', icon: 'single' },
                  { value: 'Front-End Development + Graphics Design', text: 'Front-End Development + Graphics Design', icon: 'combo' },
                  { value: 'Product Design + Front-End Development', text: 'Product Design + Front-End Development', icon: 'combo' },
                  { value: 'Data Analysis + Digital Marketing', text: 'Data Analysis + Digital Marketing', icon: 'combo' },
                  { value: 'Back-End Development + DevOps', text: 'Back-End Development + DevOps', icon: 'combo' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectDualInterest(option.value)}
                    className="w-full p-6 bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-orange rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-aco-teal to-aco-cyan rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg">
                      {option.icon === 'single' ? (
                        <CheckBadgeIcon className="w-6 h-6" />
                      ) : (
                        <Disc2 className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-aco-navy font-medium font-sans leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
            </div>
          </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-gradient-to-r from-aco-teal to-aco-cyan text-white rounded-xl shadow-2xl p-4 max-w-sm border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 p-2 bg-white/20 rounded-full">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm font-heading">Welcome aboard!</p>
                <p className="text-sm font-comfortaa opacity-95">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

