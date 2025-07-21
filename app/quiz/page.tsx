"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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
  Disc2,
  Circle,
  CheckCircle2,
  MessageCircle,
  Users,
  ExternalLink
} from "lucide-react"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"

// Quiz Data Structure - Updated to match instruction.md
const courses = {
  'Web Development Fundamentals': { description: 'Learn the basics of web development to start your career quickly.' },
  'Beginner Coding Bootcamp': { description: 'Build something for yourself or as a hobby with fundamental coding skills.' },
  'Advanced Front-End Development Program': { description: 'Specialize in user interfaces and modern frontend technologies.' },
  'Backend Development Professional Track': { description: 'Work with databases, servers, and backend architecture.' },
  'Complete Full-Stack Developer Program': { description: 'Build complete web applications from frontend to backend.' },
  'Graphic Design Bootcamp': { description: 'Create compelling visual designs and brand materials quickly.' },
  'UX/UI Design Essentials': { description: 'Design user-friendly websites and applications.' },
  'WordPress Web Design': { description: 'Build websites using WordPress and drag-and-drop tools.' },
  'Freelance Graphic Designer Course': { description: 'Start your own graphic design business.' },
  'Freelance UX/UI Designer Track': { description: 'Work independently as a UX/UI designer.' },
  'WordPress Freelancer Program': { description: 'Build WordPress websites for clients.' },
  'Professional Graphic Design Program': { description: 'Become a professional with strong graphic design skills.' },
  'Complete UX/UI Design Program': { description: 'Master comprehensive product design and user experience.' },
  'Advanced WordPress Development': { description: 'Advanced WordPress development and customization.' },
  'Cyber Security (Foundations Course)': { description: 'Learn cybersecurity basics and fundamentals.' },
  'Ethical Hacking and Pentesting': { description: 'Become a penetration tester and ethical hacker.' },
  'Bug Bounty Program': { description: 'Find and report security vulnerabilities for rewards.' },
  'Digital Forensics': { description: 'Investigate cyber incidents and digital forensics.' },
  'Governance, Risk, and Compliance (GRC)': { description: 'Work in cybersecurity governance and compliance.' },
  'Data Analysis': { description: 'Work with spreadsheets and find trends in data.' },
  'SEO Training': { description: 'Learn how websites rank on Google and optimization techniques.' },
  'Office Suite': { description: 'Master Word, Excel, PowerPoint for team organization.' },
  'Digital Marketing': { description: 'Create online ads, content, and grow brands on social media.' },
  'Graphic Design Basics': { description: 'Learn fundamental design principles and tools for personal projects.' }
}

// Simplified structure for new 5-question flow
const sections = [
  { title: "Career Discovery", subtitle: "Let's find your perfect tech path" }
]

// New question structure based on instruction.md
const questionFlows = {
  "Q1": {
    id: "Q1",
    type: "single",
    question: "What kind of work sounds exciting to you?",
    options: [
      { 
        text: "Building websites, apps, or tech products from scratch", 
        nextQuestion: "dev-explorer",
        icon: "code"
      },
      { 
        text: "Designing beautiful visuals or making websites look nice and easy to use", 
        nextQuestion: "design-explorer",
        icon: "palette"
      },
      { 
        text: "Figuring out how to protect computers, networks, and information", 
        nextQuestion: "cyber-explorer",
        icon: "shield"
      },
      { 
        text: "Finding insights in numbers, spreadsheets, or search engines", 
        nextQuestion: "data-explorer",
        icon: "bar-chart"
      },
      { 
        text: "Organizing documents, helping teams work smoothly, or marketing things online", 
        nextQuestion: "tools-explorer",
        icon: "megaphone"
      }
    ]
  },
  
  "dev-explorer": {
    id: "dev-explorer",
    type: "single",
    question: "Which of these feels most natural to you?",
    options: [
      { 
        text: "I want to build how things look on a site (buttons, layout, animations)", 
        nextQuestion: "dev-style-frontend",
        pathway: "Front-End"
      },
      { 
        text: "I want to build how things work behind the scenes (data, logic)", 
        nextQuestion: "dev-style-backend",
        pathway: "Back-End"
      },
      { 
        text: "I'd love to learn everything and build full websites or apps myself", 
        nextQuestion: "dev-style-fullstack",
        pathway: "Full-Stack"
      }
    ]
  },
  
  "design-explorer": {
    id: "design-explorer",
    type: "single",
    question: "What's your design vibe?",
    options: [
      { 
        text: "I enjoy creating posters, flyers, logos, or Instagram graphics", 
        nextQuestion: "design-comfort-graphic",
        pathway: "Graphic Design"
      },
      { 
        text: "I love designing websites/apps and making them easy to use", 
        nextQuestion: "design-comfort-product",
        pathway: "Product Design"
      },
      { 
        text: "I want to build websites using drag-and-drop tools (like WordPress)", 
        nextQuestion: "design-comfort-wordpress",
        pathway: "Web Design – WordPress"
      }
    ]
  },
  
  "cyber-explorer": {
    id: "cyber-explorer",
    type: "single",
    question: "What would you rather do first?",
    options: [
      { 
        text: "Learn how to find and fix security issues", 
        nextQuestion: "cyber-style"
      },
      { 
        text: "Understand how hackers think and how systems are protected", 
        nextQuestion: "cyber-style"
      }
    ]
  },
  
  "data-explorer": {
    id: "data-explorer",
    type: "single",
    question: "Which sounds more like you?",
    options: [
      { 
        text: "I like working with spreadsheets and finding trends", 
        recommendation: "Data Analysis",
        exit: true
      },
      { 
        text: "I'm curious about how websites rank on Google", 
        recommendation: "SEO Training",
        exit: true
      }
    ]
  },
  
  "tools-explorer": {
    id: "tools-explorer",
    type: "single",
    question: "Pick what you'd enjoy doing most:",
    options: [
      { 
        text: "Helping teams stay organized using tools like Word, Excel, or PowerPoint", 
        recommendation: "Office Suite",
        exit: true
      },
      { 
        text: "Creating online ads, content, and growing brands on social media", 
        nextQuestion: "marketing-style"
      }
    ]
  },
  
  "dev-style-frontend": {
    id: "dev-style-frontend",
    type: "single",
    question: "How comfortable are you with coding?",
    pathway: "Front-End",
    options: [
      { 
        text: "I'm completely new to coding and want to start simple", 
        nextQuestion: "dev-learning-beginner"
      },
      { 
        text: "I have some experience or I'm ready for a challenge", 
        recommendation: "Advanced Front-End Development Program",
        exit: true
      }
    ]
  },
  
  "dev-style-backend": {
    id: "dev-style-backend",
    type: "single",
    question: "How comfortable are you with coding?",
    pathway: "Back-End",
    options: [
      { 
        text: "I'm completely new to coding and want to start simple", 
        nextQuestion: "dev-learning-beginner"
      },
      { 
        text: "I have some experience or I'm ready for a challenge", 
        recommendation: "Backend Development Professional Track",
        exit: true
      }
    ]
  },
  
  "dev-style-fullstack": {
    id: "dev-style-fullstack",
    type: "single",
    question: "How comfortable are you with coding?",
    pathway: "Full-Stack",
    options: [
      { 
        text: "I'm completely new to coding and want to start simple", 
        nextQuestion: "dev-learning-beginner"
      },
      { 
        text: "I have some experience or I'm ready for a challenge", 
        recommendation: "Complete Full-Stack Developer Program",
        exit: true
      }
    ]
  },
  
  "dev-learning-beginner": {
    id: "dev-learning-beginner",
    type: "single",
    question: "What's your main goal for learning development?",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "Web Development Fundamentals",
        exit: true
      },
      { 
        text: "To build something for myself or as a hobby", 
        recommendation: "Beginner Coding Bootcamp",
        exit: true
      }
    ]
  },
  
  "design-comfort-graphic": {
    id: "design-comfort-graphic",
    type: "single",
    question: "Have you used any design tools like Canva, Figma, or Photoshop?",
    pathway: "Graphic Design",
    options: [
      { 
        text: "Yes, I've used them a little or want to learn more", 
        nextQuestion: "design-goal-graphic"
      },
      { 
        text: "Not really, but I'm excited to start simple", 
        nextQuestion: "design-goal-beginner-graphic"
      }
    ]
  },
  
  "design-comfort-product": {
    id: "design-comfort-product",
    type: "single",
    question: "Have you used any design tools like Canva, Figma, or Photoshop?",
    pathway: "Product Design",
    options: [
      { 
        text: "Yes, I've used them a little or want to learn more", 
        nextQuestion: "design-goal-product"
      },
      { 
        text: "Not really, but I'm excited to start simple", 
        nextQuestion: "design-goal-beginner-product"
      }
    ]
  },
  
  "design-comfort-wordpress": {
    id: "design-comfort-wordpress",
    type: "single",
    question: "Have you used any design tools like Canva, Figma, or Photoshop?",
    pathway: "WordPress",
    options: [
      { 
        text: "Yes, I've used them a little or want to learn more", 
        nextQuestion: "design-goal-wordpress"
      },
      { 
        text: "Not really, but I'm excited to start simple", 
        recommendation: "WordPress Web Design",
        exit: true
      }
    ]
  },
  
  "cyber-style": {
    id: "cyber-style",
    type: "single",
    question: "Would you enjoy learning how to hack and protect systems?",
    options: [
      { 
        text: "Yes, I want to go deep into it", 
        nextQuestion: "cyber-goal"
      },
      { 
        text: "I want to try the basics first, then decide", 
        recommendation: "Cyber Security (Foundations Course)",
        exit: true
      }
    ]
  },
  
  "marketing-style": {
    id: "marketing-style",
    type: "single",
    question: "Which best describes you?",
    options: [
      { 
        text: "I love social media and can create content or run ads", 
        recommendation: "Digital Marketing",
        exit: true
      },
      { 
        text: "I prefer staying in the background and analyzing what works", 
        recommendation: "SEO Training",
        exit: true
      }
    ]
  },
  
  "design-goal-graphic": {
    id: "design-goal-graphic",
    type: "single",
    question: "What's your main goal for learning design?",
    pathway: "Graphic Design",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "Graphic Design Bootcamp",
        exit: true
      },
      { 
        text: "To build something for myself or freelancing", 
        recommendation: "Freelance Graphic Designer Course",
        exit: true
      },
      { 
        text: "To become a professional with strong skills long-term", 
        recommendation: "Professional Graphic Design Program",
        exit: true
      }
    ]
  },
  
  "design-goal-product": {
    id: "design-goal-product",
    type: "single",
    question: "What's your main goal for learning design?",
    pathway: "Product Design",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "UX/UI Design Essentials",
        exit: true
      },
      { 
        text: "To build something for myself or freelancing", 
        recommendation: "Freelance UX/UI Designer Track",
        exit: true
      },
      { 
        text: "To become a professional with strong skills long-term", 
        recommendation: "Complete UX/UI Design Program",
        exit: true
      }
    ]
  },
  
  "design-goal-wordpress": {
    id: "design-goal-wordpress",
    type: "single",
    question: "What's your main goal for learning design?",
    pathway: "WordPress",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "WordPress Web Design",
        exit: true
      },
      { 
        text: "To build something for myself or freelancing", 
        recommendation: "WordPress Freelancer Program",
        exit: true
      },
      { 
        text: "To become a professional with strong skills long-term", 
        recommendation: "Advanced WordPress Development",
        exit: true
      }
    ]
  },
  
  "design-goal-beginner-graphic": {
    id: "design-goal-beginner-graphic",
    type: "single",
    question: "What's your main goal for learning design?",
    pathway: "Graphic Design",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "WordPress Web Design",
        exit: true
      },
      { 
        text: "To build something for myself or freelancing", 
        recommendation: "Graphic Design Basics",
        exit: true
      },
      { 
        text: "To become a professional with strong skills long-term", 
        recommendation: "Professional Graphic Design Program",
        exit: true
      }
    ]
  },
  
  "design-goal-beginner-product": {
    id: "design-goal-beginner-product",
    type: "single",
    question: "What's your main goal for learning design?",
    pathway: "Product Design",
    options: [
      { 
        text: "To get a job as soon as possible", 
        recommendation: "WordPress Web Design",
        exit: true
      },
      { 
        text: "To build something for myself or freelancing", 
        recommendation: "Graphic Design Basics",
        exit: true
      },
      { 
        text: "To become a professional with strong skills long-term", 
        recommendation: "Complete UX/UI Design Program",
        exit: true
      }
    ]
  },
  
  "cyber-goal": {
    id: "cyber-goal",
    type: "single",
    question: "What's your ultimate career goal in cybersecurity?",
    options: [
      { 
        text: "To become a penetration tester or ethical hacker", 
        recommendation: "Ethical Hacking and Pentesting",
        exit: true
      },
      { 
        text: "To find and report security vulnerabilities for rewards", 
        recommendation: "Bug Bounty Program",
        exit: true
      },
      { 
        text: "To investigate cyber incidents and digital forensics", 
        recommendation: "Digital Forensics",
        exit: true
      },
      { 
        text: "To work in governance, risk, and compliance", 
        recommendation: "Governance, Risk, and Compliance (GRC)",
        exit: true
      }
    ]
  }
};

// For compatibility with existing code, create a questions array
const questions = [[questionFlows["Q1"]]];

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
  currentQuestionId: string
  questionHistory: string[]
  answers: Record<string, number>
  pathway: string
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
    screenHistory: [],
    currentQuestionId: 'Q1',
    questionHistory: [],
    answers: {},
    pathway: ''
  })

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Load saved user details and quiz progress from localStorage on component mount
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

    const savedQuizProgress = localStorage.getItem('acoQuizProgress')
    if (savedQuizProgress) {
      const progress = JSON.parse(savedQuizProgress)
      setQuizState(prev => ({
        ...prev,
        currentQuestionId: progress.currentQuestionId || 'Q1',
        questionHistory: progress.questionHistory || [],
        answers: progress.answers || {},
        currentScreen: progress.currentScreen || 'email-capture',
        pathway: progress.pathway || ''
      }))
    }

    // Load saved quiz results if available
    const savedQuizResults = localStorage.getItem('acoQuizResults')
    if (savedQuizResults) {
      const results = JSON.parse(savedQuizResults)
      setQuizState(prev => ({
        ...prev,
        finalRecommendation: results.finalRecommendation || '',
        currentScreen: results.finalRecommendation ? 'recommendation' : prev.currentScreen
      }))
      setEmailSent(results.emailSent || false)
    }
  }, [])

  // Save quiz progress to localStorage whenever answers or progress changes
  useEffect(() => {
    if (quizState.answers && Object.keys(quizState.answers).length > 0) {
      const progressData = {
        currentQuestionId: quizState.currentQuestionId,
        questionHistory: quizState.questionHistory,
        answers: quizState.answers,
        currentScreen: quizState.currentScreen,
        pathway: quizState.pathway
      }
      localStorage.setItem('acoQuizProgress', JSON.stringify(progressData))
    }
  }, [quizState.currentQuestionId, quizState.questionHistory, quizState.answers, quizState.currentScreen, quizState.pathway])

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }))
  }

  // Get current question from the flow
  const getCurrentQuestion = () => {
    return questionFlows[quizState.currentQuestionId as keyof typeof questionFlows]
  }


  // Simple progress calculation based on question history
  const progressPercentage = useMemo(() => {
    const totalSteps = 5 // Average expected questions in the flow
    const currentStep = quizState.questionHistory.length + 1
    return Math.min((currentStep / totalSteps) * 100, 90) // Cap at 90% until completion
  }, [quizState.questionHistory])

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
      showScreen('quiz-question')
    }, 1000)
  }

  // New quiz navigation functions for conditional flow
  const selectAnswer = (optionIndex: number) => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    const selectedOption = currentQuestion.options[optionIndex]
    if (!selectedOption) return

    // Store the answer
    const newAnswers = { ...quizState.answers }
    newAnswers[quizState.currentQuestionId] = optionIndex
    
    // Update pathway if specified
    let newPathway = quizState.pathway
    if ('pathway' in selectedOption && selectedOption.pathway) {
      newPathway = selectedOption.pathway
    }
    
    updateQuizState({ 
      answers: newAnswers,
      pathway: newPathway
    })
    
    // Auto-advance after a short delay
    setTimeout(() => {
      handleOptionSelection(selectedOption)
    }, 800)
  }

  const handleOptionSelection = (selectedOption: any) => {
    // Check if this is an exit point (has recommendation)
    if (selectedOption.exit && selectedOption.recommendation) {
      // Complete quiz with this recommendation
      completeQuiz(selectedOption.recommendation)
      return
    }
    
    // Check if there's a next question to navigate to
    if (selectedOption.nextQuestion) {
      // Move to the next question in the flow
      const newHistory = [...quizState.questionHistory, quizState.currentQuestionId]
      updateQuizState({
        currentQuestionId: selectedOption.nextQuestion,
        questionHistory: newHistory
      })
    } else {
      // Fallback - should not happen with proper flow setup
      console.warn('No next question or exit defined for option:', selectedOption)
    }
  }

  const previousQuestion = () => {
    if (quizState.questionHistory.length > 0) {
      // Go back to previous question
      const newHistory = [...quizState.questionHistory]
      const previousQuestionId = newHistory.pop()!
      
      // Remove the current answer
      const newAnswers = { ...quizState.answers }
      delete newAnswers[quizState.currentQuestionId]
      
      updateQuizState({ 
        currentQuestionId: previousQuestionId,
        questionHistory: newHistory,
        answers: newAnswers
      })
    } else {
      // Go back to start
      showScreen('email-capture')
    }
  }

  const completeQuiz = async (recommendation: string) => {
    updateQuizState({ 
      finalRecommendation: recommendation,
      currentScreen: 'recommendation' 
    })

    // Save final recommendation to localStorage
    const quizResults = {
      finalRecommendation: recommendation,
      completedAt: new Date().toISOString(),
      emailSent: false
    }
    localStorage.setItem('acoQuizResults', JSON.stringify(quizResults))

    // Automatically send email results
    try {
      const emailData = {
        to: quizState.userEmail,
        subject: 'Your Perfect Tech Career Match - Aco NextGen Scholarship',
        firstName: quizState.userFirstName,
        lastName: quizState.userLastName,
        recommendation: recommendation,
        rationale: generateRationale(recommendation)
      }
      
      console.log('Sending email with data:', emailData)
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })
      
      console.log('Email API response status:', response.status)
      console.log('Email API response ok:', response.ok)
      
      if (response.ok) {
        const responseData = await response.json()
        console.log('Email sent successfully:', responseData)
        setEmailSent(true)
        setToastMessage(`Results sent to ${quizState.userEmail} automatically!`)
        setShowToast(true)
        
        // Update localStorage to mark email as sent
        const savedResults = localStorage.getItem('acoQuizResults')
        if (savedResults) {
          const results = JSON.parse(savedResults)
          results.emailSent = true
          localStorage.setItem('acoQuizResults', JSON.stringify(results))
        }
      } else {
        const errorData = await response.text()
        console.error('Email API error response:', errorData)
        console.error('Email sending failed with status:', response.status)
      }
    } catch (error) {
      console.error('Error sending email automatically:', error)
      console.error('Full error details:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const isCurrentQuestionAnswered = () => {
    const answer = quizState.answers[quizState.currentQuestionId]
    return typeof answer === 'number'
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


  const sendEmailResults = async () => {
    setEmailSending(true)
    
    try {
      // Simulate email sending 
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
    // Clear all localStorage when restarting
    localStorage.removeItem('acoQuizUserDetails')
    localStorage.removeItem('acoQuizProgress')
    localStorage.removeItem('acoQuizResults')
    
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
      screenHistory: [],
      currentQuestionId: 'Q1',
      questionHistory: [],
      answers: {},
      pathway: ''
    })
    
    setEmailSent(false)
  }

  const generateRationale = (recommendation: string) => {
    const rationales: Record<string, string> = {
      'Web Development Fundamentals': 'Perfect! You want to start your coding journey and get job-ready quickly. This course will give you the essential web development skills needed to land your first tech job.',
      'Beginner Coding Bootcamp': 'Excellent choice! You\'re interested in coding as a hobby or personal project. This bootcamp will teach you the fundamentals at your own pace without the pressure of job hunting.',
      'Advanced Front-End Development Program': 'Great match! You have coding experience and want to specialize in user interfaces. You\'ll master modern frontend frameworks and advanced UI development techniques.',
      'Backend Development Professional Track': 'Perfect fit! You have coding experience and want to work with databases and servers. You\'ll become proficient in server-side development and API creation.',
      'Complete Full-Stack Developer Program': 'Ideal choice! You have coding experience and want to build complete applications. You\'ll master both frontend and backend development for maximum versatility.',
      'Graphic Design Bootcamp': 'Excellent! You want to get into graphic design quickly. This bootcamp will fast-track your visual design skills for immediate career opportunities.',
      'UX/UI Design Essentials': 'Perfect match! You want to focus on user experience and interface design. You\'ll learn to create intuitive, user-friendly digital experiences.',
      'WordPress Web Design': 'Great choice! You want to build websites using drag-and-drop tools. WordPress is perfect for creating professional websites without deep coding knowledge.',
      'Freelance Graphic Designer Course': 'Ideal for you! You want to start your own graphic design business. This course teaches both design skills and freelancing business strategies.',
      'Freelance UX/UI Designer Track': 'Perfect fit! You want to work independently as a UX/UI designer. You\'ll learn design skills plus how to run a successful design freelance business.',
      'WordPress Freelancer Program': 'Excellent choice! You want to build WordPress websites for clients. This program teaches both technical skills and client management.',
      'Professional Graphic Design Program': 'Great match! You want to become a professional with strong graphic design skills. This comprehensive program builds mastery for long-term career success.',
      'Complete UX/UI Design Program': 'Perfect! You want comprehensive product design skills for long-term success. This program covers everything from user research to advanced prototyping.',
      'Advanced WordPress Development': 'Ideal choice! You want advanced WordPress skills for professional development. You\'ll learn custom themes, plugins, and advanced functionality.',
      'Cyber Security (Foundations Course)': 'Perfect starting point! You want to try cybersecurity basics first. This foundation course lets you explore the field before diving deeper.',
      'Ethical Hacking and Pentesting': 'Excellent match! You want to become a penetration tester or ethical hacker. You\'ll learn to find vulnerabilities and protect systems from cyber threats.',
      'Bug Bounty Program': 'Great choice! You want to find and report security vulnerabilities for rewards. This program teaches you to discover bugs that companies will pay you to find.',
      'Digital Forensics': 'Perfect fit! You want to investigate cyber incidents and analyze digital evidence. You\'ll learn to uncover what happened during security breaches.',
      'Governance, Risk, and Compliance (GRC)': 'Ideal choice! You want to work in cybersecurity governance and compliance. You\'ll learn to manage risk and ensure organizations meet security standards.',
      'Data Analysis': 'Excellent match! You like working with spreadsheets and finding trends. You\'ll learn to extract insights from data and create compelling visualizations.',
      'SEO Training': 'Perfect choice! You\'re curious about how websites rank on Google. You\'ll master search engine optimization to help websites get discovered online.',
      'Office Suite': 'Great fit! You want to help teams stay organized using productivity tools. You\'ll become an expert in Word, Excel, PowerPoint, and team collaboration.',
      'Digital Marketing': 'Ideal match! You love social media and creating content. You\'ll learn to run ads, grow brands, and drive business results through digital channels.',
      'Graphic Design Basics': 'Perfect starting point! You want to learn design for personal projects or freelancing. This course teaches fundamental design principles and tools.'
    }
    
    return rationales[recommendation as keyof typeof rationales] || courses[recommendation as keyof typeof courses]?.description || 'This track aligns perfectly with your interests and will provide you with valuable skills in the tech industry!'
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

      {/* Gradient overlay  */}
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
                href="/" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/Asset 2 -dark.png"
                  alt="Aco NextGen"
                  width={180}
                  height={60}
                  className="h-40 w-auto"
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
                      src="/Muyiwa.jpg"
                      alt="Muyiwa Taiwo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-comfortaa text-sm italic text-aco-cyan leading-relaxed">
                      "This quiz helped me transition from marketing to UX design. Best decision ever!"
                    </p>
                    <span className="block text-xs mt-2 text-white/70 font-medium">- Muyiwa Taiwo, Product Designer</span>
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
              {/* Trust indicator - Hidden on mobile */}
              <div className="hidden sm:flex justify-center items-center space-x-1 mb-8">
                <div className="flex items-center bg-aco-teal/10 backdrop-blur-sm rounded-full px-6 py-3 border border-aco-teal/20">
                  <div className="flex space-x-1 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-aco-navy font-comfortaa font-medium">Trusted by 600+ students</span>
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
                    80% Free
                  </span>
                  <span className="w-px h-4 bg-gray-300"></span>
                  <span>No Hidden Costs</span>
                  <span className="w-px h-4 bg-gray-300"></span>
                  <span>Instant Results</span>
                </div>
              </form>
            </div>
          )}

          {/* Comprehensive Quiz */}
          {quizState.currentScreen === 'quiz-question' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={previousQuestion}
                  className="flex items-center gap-2 px-4 py-2 text-aco-navy border-2 border-aco-navy rounded-full hover:bg-aco-navy hover:text-white transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm font-medium text-aco-navy font-sans">
                  Question {quizState.questionHistory.length + 1}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${progressPercentage}%` 
                  }}
                ></div>
              </div>

              {/* Section Info */}
              <div className="mb-6">
                <div className="text-2xl md:text-3xl font-black text-aco-cyan mb-2 font-heading">{sections[0]?.title}</div>
                <div className="text-lg md:text-xl font-extrabold text-gray-600 font-sans">{sections[0]?.subtitle}</div>
              </div>
              
              {/* Question */}
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-4 text-center leading-tight">
                {getCurrentQuestion()?.question}
              </h2>
              
              {/* Options */}
              <div className="space-y-4 mb-8">
                {getCurrentQuestion()?.options.map((option, index) => {
                  const currentAnswer = quizState.answers[quizState.currentQuestionId]
                  const isSelected = currentAnswer === index

                  const getIconForOption = (questionId: string, optionIndex: number, optionIcon?: string) => {
                    if (questionId === 'Q1') {
                      switch (optionIcon) {
                        case 'code': return <Code className="w-6 h-6" />
                        case 'palette': return <Palette className="w-6 h-6" />
                        case 'shield': return <Shield className="w-6 h-6" />
                        case 'bar-chart': return <BarChart3 className="w-6 h-6" />
                        case 'megaphone': return <Megaphone className="w-6 h-6" />
                        default: return <Circle className="w-6 h-6" />
                      }
                    }
                    return isSelected ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={`w-full p-6 rounded-2xl transition-all duration-300 text-left flex items-start gap-4 group hover:shadow-lg hover:scale-[1.02] ${
                        isSelected 
                          ? 'bg-gradient-to-r from-aco-orange/10 to-orange-50/80 border-2 border-aco-orange shadow-lg shadow-aco-orange/20' 
                          : 'bg-gray-50/70 hover:bg-white border-2 border-transparent hover:border-aco-teal/30 hover:shadow-md'
                      }`}
                    >
                      <div className={`flex-shrink-0 p-3 rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg ${
                        isSelected 
                          ? 'bg-aco-orange' 
                          : 'bg-gradient-to-r from-aco-teal to-aco-cyan'
                      }`}>
                        {getIconForOption(quizState.currentQuestionId, index, (option as any).icon)}
                      </div>
                      <span className={`text-lg font-medium font-sans leading-relaxed ${
                        isSelected ? 'text-aco-navy' : 'text-gray-700 group-hover:text-aco-navy'
                      }`}>
                        {option.text}
                      </span>
                    </button>
                  )
                })}
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
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    Smart Quiz: We found your perfect match in just {quizState.questionHistory.length + 1} questions!
                  </p>
                </div>
              </div>

              {/* Telegram Group Invitation */}
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 mb-8 border border-blue-500/20">
                <div className="flex items-center justify-center mb-4">
            
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-aco-navy font-heading">Join Our Community!</h3>
                    <p className="text-sm text-gray-600 font-comfortaa">Connect with fellow learners and get exclusive updates</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a
                    href="https://t.me/+RhDh1qlwurNmODlk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-heading"
                  >
                    <Users className="w-5 h-5" />
                    Join Telegram Group
                    <ExternalLink className="w-4 h-4" />
                  </a>
                
                </div>
              </div>
              
              {/* Optional restart button */}
              {/* <div className="text-center">
                <button
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-transparent border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-sans"
                >
                  <RefreshCw className="w-4 h-4" />
                  Take New Quiz
                </button>
              </div> */}
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

