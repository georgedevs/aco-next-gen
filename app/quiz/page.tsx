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
  Disc2,
  Circle,
  CheckCircle2
} from "lucide-react"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"

// Quiz Data Structure
const courses = {
  'Graphic Design': { description: 'Master visual communication through creative design, branding, and digital artwork.' },
  'Product Design Mastery': { description: 'Design user-centered products and experiences.' },
  'Cyber Security': { description: 'Protect digital assets and systems from cyber threats.' },
  'Web Design (WordPress)': { description: 'Create stunning, responsive websites using WordPress.' },
  'Front-end Web Development': { description: 'Build interactive user interfaces with HTML, CSS, JS.' },
  'Backend Web Development': { description: 'Develop server-side applications and APIs.' },
  'Full Stack Programming': { description: 'Master both frontend and backend development.' },
  'SEO Training': { description: 'Optimize websites for search engines and drive organic traffic.' },
  'Business Model Mastery': { description: 'Create, analyze, and optimize business models.' },
  'Digital Marketing': { description: 'Master online marketing strategies and campaigns.' },
  'Cloud Computing': { description: 'Deploy and manage applications on cloud platforms.' },
  'Dev Ops': { description: 'Streamline development and build scalable systems.' },
  'Data Analysis': { description: 'Extract insights from data using analysis and visualization.' },
  'Product Management': { description: 'Lead product development and coordinate teams.' },
  'Office Suite': { description: 'Master productivity tools for business efficiency.' }
}

const sections = [
  { title: "Core Interests", subtitle: "What drives your passion in technology?" },
  { title: "Creative Preferences", subtitle: "How do you prefer to express creativity?" },
  { title: "Problem-Solving Style", subtitle: "Your approach to tackling challenges" },
  { title: "Data & Analysis", subtitle: "Your relationship with data and insights" },
  { title: "Communication & Business", subtitle: "Business acumen and marketing interests" },
  { title: "Work Environment", subtitle: "Your preferred working style and setup" },
  { title: "Career Goals", subtitle: "Long-term goals and vision" }
]

const questions = [
  // Section 1: Core Interests
  [
    {
      type: "single",
      question: "What excites you the most?",
      options: [
        { text: "I love visually designing user experiences, layouts, and brand assets.", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2 } },
        { text: "I enjoy writing code and building websites or applications.", scores: { 'Front-end Web Development': 2, 'Backend Web Development': 2, 'Full Stack Programming': 2 } },
        { text: "I'm fascinated by working with data—analyzing numbers, dashboards, and insights.", scores: { 'Data Analysis': 3, 'SEO Training': 1 } },
        { text: "I want to learn how to market products online—ads, social media, SEO.", scores: { 'Digital Marketing': 2, 'SEO Training': 2 } },
        { text: "I'm curious about securing systems or setting up and automating infrastructure.", scores: { 'Cyber Security': 3, 'Dev Ops': 2, 'Cloud Computing': 1 } },
        { text: "I want to lead products/projects and coordinate cross-functional teams.", scores: { 'Product Management': 3, 'Business Model Mastery': 2 } }
      ]
    },
    {
      type: "single",
      question: "Which of these would you most like to master?",
      options: [
        { text: "Building beautiful, functional websites", scores: { 'Web Design (WordPress)': 3, 'Front-end Web Development': 2 } },
        { text: "Designing digital products and apps", scores: { 'Product Design Mastery': 3, 'Graphic Design': 2 } },
        { text: "Protecting data and digital assets", scores: { 'Cyber Security': 3, 'Cloud Computing': 1 } },
        { text: "Analyzing and visualizing data", scores: { 'Data Analysis': 3, 'SEO Training': 1 } },
        { text: "Marketing and growing businesses online", scores: { 'Digital Marketing': 3, 'Business Model Mastery': 2 } }
      ]
    },
    {
      type: "single",
      question: "What motivates you to keep learning?",
      options: [
        { text: "The satisfaction of creating something new", scores: { 'Product Design Mastery': 2, 'Graphic Design': 2, 'Web Design (WordPress)': 1 } },
        { text: "Solving complex technical problems", scores: { 'Backend Web Development': 2, 'Full Stack Programming': 2, 'Dev Ops': 1 } },
        { text: "Keeping systems and data safe", scores: { 'Cyber Security': 2, 'Cloud Computing': 1 } },
        { text: "Making data-driven decisions", scores: { 'Data Analysis': 2, 'Digital Marketing': 1, 'SEO Training': 1 } },
        { text: "The impact of visual communication", scores: { 'Graphic Design': 2, 'Product Design Mastery': 1 } }
      ]
    }
  ],
  // Section 2: Creative Preferences
  [
    {
      type: "single",
      question: "How do you prefer to express your creativity?",
      options: [
        { text: "Visual design - creating layouts, graphics, and brand aesthetics", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2, 'Web Design (WordPress)': 1 } },
        { text: "Code as craft - building elegant, functional solutions", scores: { 'Front-end Web Development': 2, 'Full Stack Programming': 2, 'Backend Web Development': 1 } },
        { text: "Data visualization - making complex information beautiful and clear", scores: { 'Data Analysis': 3, 'Digital Marketing': 1, 'SEO Training': 1 } },
        { text: "Content creation - writing, storytelling, and communication", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Business Model Mastery': 1 } },
        { text: "System design - architecting and organizing complex structures", scores: { 'Dev Ops': 2, 'Cloud Computing': 2, 'Backend Web Development': 1 } }
      ]
    },
    {
      type: "single",
      question: "What type of creative projects energize you most?",
      options: [
        { text: "Brand identity and visual communication projects", scores: { 'Graphic Design': 3, 'Product Design Mastery': 1 } },
        { text: "User interface and experience design", scores: { 'Product Design Mastery': 3, 'Front-end Web Development': 2, 'Web Design (WordPress)': 1 } },
        { text: "Website design and development", scores: { 'Web Design (WordPress)': 3, 'Front-end Web Development': 2 } },
        { text: "Marketing campaigns and growth strategies", scores: { 'Digital Marketing': 3, 'SEO Training': 2, 'Business Model Mastery': 1 } },
        { text: "Security solutions and system protection", scores: { 'Cyber Security': 3, 'Dev Ops': 1 } }
      ]
    }
  ],
  // Section 3: Problem-Solving Style
  [
    {
      type: "single",
      question: "How do you approach complex problems?",
      options: [
        { text: "Break it down visually - diagrams, wireframes, and mockups", scores: { 'Graphic Design': 2, 'Product Design Mastery': 3, 'Web Design (WordPress)': 1 } },
        { text: "Code through it - prototype and iterate quickly", scores: { 'Front-end Web Development': 2, 'Full Stack Programming': 2, 'Backend Web Development': 1 } },
        { text: "Analyze the data - gather metrics and evidence first", scores: { 'Data Analysis': 3, 'Digital Marketing': 1, 'SEO Training': 1 } },
        { text: "Assess risks and vulnerabilities systematically", scores: { 'Cyber Security': 3, 'Dev Ops': 2, 'Cloud Computing': 1 } },
        { text: "Define strategy and coordinate team resources", scores: { 'Product Management': 3, 'Business Model Mastery': 2, 'Digital Marketing': 1 } }
      ]
    },
    {
      type: "single",
      question: "What energizes you most when solving technical challenges?",
      options: [
        { text: "Making it beautiful and user-friendly", scores: { 'Graphic Design': 2, 'Product Design Mastery': 2, 'Web Design (WordPress)': 2 } },
        { text: "Building robust, scalable systems", scores: { 'Backend Web Development': 3, 'Dev Ops': 2, 'Cloud Computing': 2 } },
        { text: "Finding patterns and insights in complex data", scores: { 'Data Analysis': 3, 'SEO Training': 1 } },
        { text: "Protecting and securing digital assets", scores: { 'Cyber Security': 3, 'Dev Ops': 1 } },
        { text: "Optimizing for growth and performance", scores: { 'Digital Marketing': 2, 'SEO Training': 3, 'Business Model Mastery': 1 } }
      ]
    },
    {
      type: "multi",
      question: "Which problem-solving approaches do you naturally gravitate toward?",
      options: [
        { text: "User-centered design thinking", scores: { 'Product Design Mastery': 2, 'Graphic Design': 1, 'Web Design (WordPress)': 1 } },
        { text: "Technical debugging and troubleshooting", scores: { 'Backend Web Development': 2, 'Dev Ops': 2, 'Full Stack Programming': 1 } },
        { text: "Data-driven hypothesis testing", scores: { 'Data Analysis': 3, 'Digital Marketing': 1 } },
        { text: "Security-first threat modeling", scores: { 'Cyber Security': 3, 'Cloud Computing': 1 } },
        { text: "Business process optimization", scores: { 'Business Model Mastery': 2, 'Product Management': 2, 'Office Suite': 1 } },
        { text: "Cross-platform integration solutions", scores: { 'Full Stack Programming': 2, 'Cloud Computing': 2, 'Dev Ops': 1 } }
      ]
    }
  ],
  // Section 4: Data & Analysis
  [
    {
      type: "single",
      question: "What excites you most about working with data?",
      options: [
        { text: "Creating compelling visualizations and dashboards", scores: { 'Data Analysis': 3, 'Digital Marketing': 1 } },
        { text: "Discovering hidden patterns and insights", scores: { 'Data Analysis': 3, 'SEO Training': 1, 'Cyber Security': 1 } },
        { text: "Tracking and optimizing marketing performance", scores: { 'Digital Marketing': 3, 'SEO Training': 2, 'Data Analysis': 1 } },
        { text: "Making data-driven product decisions", scores: { 'Product Management': 2, 'Data Analysis': 2, 'Business Model Mastery': 1 } },
        { text: "Analyzing security logs and threat patterns", scores: { 'Cyber Security': 3, 'Data Analysis': 1 } }
      ]
    },
    {
      type: "single",
      question: "How comfortable are you with numbers and statistics?",
      options: [
        { text: "Very comfortable - I love diving deep into complex datasets", scores: { 'Data Analysis': 3, 'Digital Marketing': 1, 'SEO Training': 1 } },
        { text: "Moderately comfortable - I can work with basic analytics", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Product Management': 1 } },
        { text: "I prefer visual representations over raw numbers", scores: { 'Graphic Design': 2, 'Product Design Mastery': 2, 'Web Design (WordPress)': 1 } },
        { text: "I focus more on implementation than analysis", scores: { 'Front-end Web Development': 2, 'Backend Web Development': 2, 'Dev Ops': 1 } },
        { text: "I'm more comfortable with basic spreadsheets and reports", scores: { 'Office Suite': 3, 'Business Model Mastery': 1 } }
      ]
    },
    {
      type: "multi",
      question: "Which data-related activities interest you?",
      options: [
        { text: "Building interactive charts and reports", scores: { 'Data Analysis': 3, 'Digital Marketing': 1 } },
        { text: "SEO keyword research and website analytics", scores: { 'SEO Training': 3, 'Digital Marketing': 2, 'Data Analysis': 1 } },
        { text: "A/B testing and conversion optimization", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Data Analysis': 1 } },
        { text: "Security monitoring and log analysis", scores: { 'Cyber Security': 3, 'Dev Ops': 1 } },
        { text: "Cloud metrics and infrastructure monitoring", scores: { 'Cloud Computing': 2, 'Dev Ops': 2, 'Data Analysis': 1 } },
        { text: "I prefer to avoid working with data", scores: { 'Graphic Design': 1, 'Product Design Mastery': 1 } }
      ]
    }
  ],
  // Section 5: Communication & Business
  [
    {
      type: "single",
      question: "How do you prefer to communicate your ideas?",
      options: [
        { text: "Through visual design and compelling graphics", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2, 'Digital Marketing': 1 } },
        { text: "Written content, blogs, and documentation", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Business Model Mastery': 1 } },
        { text: "Data presentations and analytical reports", scores: { 'Data Analysis': 3, 'Product Management': 1 } },
        { text: "Strategic presentations and business cases", scores: { 'Product Management': 3, 'Business Model Mastery': 2, 'Digital Marketing': 1 } },
        { text: "Through code, prototypes, and technical demos", scores: { 'Front-end Web Development': 2, 'Full Stack Programming': 2, 'Backend Web Development': 1 } }
      ]
    },
    {
      type: "single",
      question: "What aspects of business interest you most?",
      options: [
        { text: "Marketing strategy and customer acquisition", scores: { 'Digital Marketing': 3, 'SEO Training': 2, 'Business Model Mastery': 1 } },
        { text: "Product strategy and roadmap planning", scores: { 'Product Management': 3, 'Product Design Mastery': 1, 'Business Model Mastery': 1 } },
        { text: "Business model innovation and revenue optimization", scores: { 'Business Model Mastery': 3, 'Digital Marketing': 1 } },
        { text: "Risk management and compliance", scores: { 'Cyber Security': 2, 'Business Model Mastery': 1 } },
        { text: "Operations and process optimization", scores: { 'Dev Ops': 2, 'Office Suite': 2, 'Cloud Computing': 1 } }
      ]
    },
    {
      type: "multi",
      question: "Which business activities would you enjoy being involved in?",
      options: [
        { text: "Market research and competitive analysis", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Data Analysis': 1 } },
        { text: "Brand development and visual identity", scores: { 'Graphic Design': 3, 'Digital Marketing': 1 } },
        { text: "Growth hacking and performance marketing", scores: { 'Digital Marketing': 3, 'SEO Training': 2 } },
        { text: "Product launch planning and coordination", scores: { 'Product Management': 3, 'Business Model Mastery': 1 } },
        { text: "Documentation and process standardization", scores: { 'Office Suite': 3, 'Business Model Mastery': 1, 'Product Management': 1 } },
        { text: "I prefer to focus purely on technical work", scores: { 'Backend Web Development': 2, 'Dev Ops': 2, 'Cyber Security': 1 } }
      ]
    }
  ],
  // Section 6: Work Environment
  [
    {
      type: "single",
      question: "What type of work environment motivates you most?",
      options: [
        { text: "Creative studio environment with design freedom", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2, 'Web Design (WordPress)': 1 } },
        { text: "Collaborative teams with cross-functional projects", scores: { 'Product Management': 3, 'Business Model Mastery': 2, 'Digital Marketing': 1 } },
        { text: "Focused coding environment with minimal distractions", scores: { 'Backend Web Development': 3, 'Full Stack Programming': 2, 'Front-end Web Development': 1 } },
        { text: "Secure, high-stakes environment with clear protocols", scores: { 'Cyber Security': 3, 'Dev Ops': 1 } },
        { text: "Data-rich environment with analytics and insights", scores: { 'Data Analysis': 3, 'SEO Training': 1, 'Digital Marketing': 1 } }
      ]
    },
    {
      type: "single",
      question: "How do you prefer to structure your workday?",
      options: [
        { text: "Project sprints with clear deliverables and deadlines", scores: { 'Product Management': 2, 'Digital Marketing': 2, 'SEO Training': 1 } },
        { text: "Deep focus blocks for complex problem-solving", scores: { 'Backend Web Development': 2, 'Data Analysis': 2, 'Cyber Security': 2 } },
        { text: "Creative exploration with flexible timelines", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2 } },
        { text: "Systematic processes with automation and optimization", scores: { 'Dev Ops': 3, 'Cloud Computing': 2, 'Office Suite': 1 } },
        { text: "Client work with varied projects and requirements", scores: { 'Web Design (WordPress)': 3, 'Digital Marketing': 2, 'Graphic Design': 1 } }
      ]
    },
    {
      type: "multi",
      question: "Which work characteristics appeal to you?",
      options: [
        { text: "Fast-paced, dynamic environment with rapid changes", scores: { 'Digital Marketing': 2, 'Front-end Web Development': 2, 'SEO Training': 1 } },
        { text: "Detail-oriented work requiring precision and accuracy", scores: { 'Cyber Security': 2, 'Data Analysis': 2, 'Backend Web Development': 1 } },
        { text: "High collaboration and team interaction", scores: { 'Product Management': 2, 'Product Design Mastery': 2, 'Business Model Mastery': 1 } },
        { text: "Independent work with creative autonomy", scores: { 'Graphic Design': 2, 'Full Stack Programming': 2, 'Web Design (WordPress)': 1 } },
        { text: "Results-driven environment with clear metrics", scores: { 'Digital Marketing': 2, 'SEO Training': 2, 'Data Analysis': 1 } },
        { text: "Hands-on technical implementation", scores: { 'Dev Ops': 2, 'Cloud Computing': 2, 'Backend Web Development': 1 } }
      ]
    }
  ],
  // Section 7: Career Goals
  [
    {
      type: "single",
      question: "What's your primary career goal in the next 2-3 years?",
      options: [
        { text: "Become a skilled designer creating impactful visual work", scores: { 'Graphic Design': 3, 'Product Design Mastery': 2, 'Web Design (WordPress)': 1 } },
        { text: "Master programming and build complex applications", scores: { 'Full Stack Programming': 3, 'Backend Web Development': 2, 'Front-end Web Development': 2 } },
        { text: "Become a data expert driving business insights", scores: { 'Data Analysis': 3, 'Digital Marketing': 1, 'SEO Training': 1 } },
        { text: "Lead products and teams to successful launches", scores: { 'Product Management': 3, 'Business Model Mastery': 2, 'Digital Marketing': 1 } },
        { text: "Specialize in cybersecurity and system protection", scores: { 'Cyber Security': 3, 'Dev Ops': 1, 'Cloud Computing': 1 } }
      ]
    },
    {
      type: "single",
      question: "How do you define career success?",
      options: [
        { text: "Financial stability and high earning potential", scores: { 'Business Model Mastery': 2, 'Product Management': 2, 'Cyber Security': 1 } },
        { text: "Making a meaningful impact through my work", scores: { 'Product Design Mastery': 2, 'Digital Marketing': 2, 'Data Analysis': 1 } },
        { text: "Continuous learning and skill development", scores: { 'Full Stack Programming': 2, 'Dev Ops': 2, 'Cloud Computing': 2 } },
        { text: "Creative fulfillment and artistic expression", scores: { 'Graphic Design': 3, 'Product Design Mastery': 1, 'Web Design (WordPress)': 1 } },
        { text: "Building and leading successful teams", scores: { 'Product Management': 3, 'Business Model Mastery': 2 } }
      ]
    },
    {
      type: "multi",
      question: "Which long-term career paths interest you?",
      options: [
        { text: "Creative director or senior designer", scores: { 'Graphic Design': 2, 'Product Design Mastery': 2, 'Web Design (WordPress)': 1 } },
        { text: "Tech lead or engineering manager", scores: { 'Full Stack Programming': 2, 'Backend Web Development': 2, 'Dev Ops': 1 } },
        { text: "Data scientist or analytics leader", scores: { 'Data Analysis': 3, 'Digital Marketing': 1 } },
        { text: "Product manager or startup founder", scores: { 'Product Management': 3, 'Business Model Mastery': 2 } },
        { text: "Security architect or compliance officer", scores: { 'Cyber Security': 3, 'Dev Ops': 1 } },
        { text: "Marketing director or growth specialist", scores: { 'Digital Marketing': 3, 'SEO Training': 2, 'Business Model Mastery': 1 } },
        { text: "Cloud architect or infrastructure specialist", scores: { 'Cloud Computing': 3, 'Dev Ops': 2, 'Backend Web Development': 1 } }
      ]
    }
  ]
]

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
  currentSection: number
  currentQuestion: number
  answers: Record<string, number | number[]>
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
    currentSection: 0,
    currentQuestion: 0,
    answers: {}
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
        currentSection: progress.currentSection || 0,
        currentQuestion: progress.currentQuestion || 0,
        answers: progress.answers || {},
        currentScreen: progress.currentScreen || 'email-capture'
      }))
    }
  }, [])

  // Save quiz progress to localStorage whenever answers or progress changes
  useEffect(() => {
    if (quizState.answers && Object.keys(quizState.answers).length > 0) {
      const progressData = {
        currentSection: quizState.currentSection,
        currentQuestion: quizState.currentQuestion,
        answers: quizState.answers,
        currentScreen: quizState.currentScreen
      }
      localStorage.setItem('acoQuizProgress', JSON.stringify(progressData))
    }
  }, [quizState.currentSection, quizState.currentQuestion, quizState.answers, quizState.currentScreen])

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
      showScreen('quiz-question')
    }, 1000)
  }

  // New quiz navigation functions
  const selectAnswer = (optionIndex: number) => {
    const questionId = `${quizState.currentSection}-${quizState.currentQuestion}`
    const currentQuestionData = questions[quizState.currentSection]?.[quizState.currentQuestion]
    
    if (!currentQuestionData) return

    let newAnswers = { ...quizState.answers }
    
    if (currentQuestionData.type === 'single') {
      newAnswers[questionId] = optionIndex
    } else if (currentQuestionData.type === 'multi') {
      const currentSelection = newAnswers[questionId] as number[] || []
      if (currentSelection.includes(optionIndex)) {
        newAnswers[questionId] = currentSelection.filter(i => i !== optionIndex)
      } else {
        newAnswers[questionId] = [...currentSelection, optionIndex]
      }
    }
    
    updateQuizState({ answers: newAnswers })
  }

  const nextQuestion = () => {
    const currentSectionQuestions = questions[quizState.currentSection]
    
    if (quizState.currentQuestion < currentSectionQuestions.length - 1) {
      // Move to next question in current section
      updateQuizState({ currentQuestion: quizState.currentQuestion + 1 })
    } else if (quizState.currentSection < questions.length - 1) {
      // Move to first question of next section
      updateQuizState({ 
        currentSection: quizState.currentSection + 1,
        currentQuestion: 0
      })
    } else {
      // Quiz complete - calculate results
      calculateResults()
    }
  }

  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      // Go back one question in current section
      updateQuizState({ currentQuestion: quizState.currentQuestion - 1 })
    } else if (quizState.currentSection > 0) {
      // Go back to last question of previous section
      const prevSectionQuestions = questions[quizState.currentSection - 1]
      updateQuizState({ 
        currentSection: quizState.currentSection - 1,
        currentQuestion: prevSectionQuestions.length - 1
      })
    } else {
      // Go back to start
      showScreen('email-capture')
    }
  }

  const calculateResults = () => {
    const scores: Record<string, number> = {}
    Object.keys(courses).forEach(course => { scores[course] = 0 })

    Object.entries(quizState.answers).forEach(([questionId, answer]) => {
      const [sectionIdx, questionIdx] = questionId.split('-').map(Number)
      const question = questions[sectionIdx]?.[questionIdx]

      if (!question) return

      if (question.type === 'single' && typeof answer === 'number') {
        const selectedOption = question.options[answer]
        if (selectedOption?.scores) {
          Object.entries(selectedOption.scores).forEach(([course, points]) => {
            scores[course] += points
          })
        }
      } else if (question.type === 'multi' && Array.isArray(answer)) {
        answer.forEach(optionIdx => {
          const selectedOption = question.options[optionIdx]
          if (selectedOption?.scores) {
            Object.entries(selectedOption.scores).forEach(([course, points]) => {
              scores[course] += points
            })
          }
        })
      }
    })

    const sortedResults = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)

    const topRecommendation = sortedResults[0]?.[0] || 'Digital Marketing'
    
    updateQuizState({ 
      finalRecommendation: topRecommendation,
      currentScreen: 'recommendation' 
    })
  }

  const isCurrentQuestionAnswered = () => {
    const questionId = `${quizState.currentSection}-${quizState.currentQuestion}`
    const answer = quizState.answers[questionId]
    const currentQuestionData = questions[quizState.currentSection]?.[quizState.currentQuestion]
    
    if (!currentQuestionData) return false
    
    if (currentQuestionData.type === 'single') {
      return typeof answer === 'number'
    } else if (currentQuestionData.type === 'multi') {
      return Array.isArray(answer) && answer.length > 0
    }
    
    return false
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
    // Clear localStorage when restarting
    localStorage.removeItem('acoQuizUserDetails')
    localStorage.removeItem('acoQuizProgress')
    
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
      currentSection: 0,
      currentQuestion: 0,
      answers: {}
    })
  }

  const generateRationale = (recommendation: string) => {
    const rationales: Record<string, string> = {
      'Graphic Design': 'Based on your interest in visual design and brand aesthetics, Graphic Design is perfect for you! You\'ll create compelling logos, marketing materials, and visual identities that tell powerful brand stories.',
      'Product Design Mastery': 'Your passion for user experiences and interfaces makes Product Design Mastery an ideal fit! You\'ll create wireframes, prototypes, and user experiences that directly impact how people interact with digital products.',
      'Front-end Web Development': 'Your enthusiasm for building user-facing components aligns perfectly with Front-end Web Development! You\'ll bring designs to life using HTML, CSS, JavaScript, and modern frameworks.',
      'Backend Web Development': 'Your interest in server-side logic and databases makes Backend Web Development a great match! You\'ll build the robust systems and APIs that power modern applications.',
      'Full Stack Programming': 'Your desire to work across both front-end and back-end makes Full Stack Programming perfect for you! You\'ll have the versatility to build complete web applications from start to finish.',
      'Data Analysis': 'Your fascination with datasets and insights makes Data Analysis an excellent choice! You\'ll transform raw data into actionable business intelligence through reports and visualizations.',
      'Dev Ops': 'Your interest in automation and infrastructure aligns perfectly with DevOps! You\'ll streamline development processes and build scalable, reliable systems.',
      'Digital Marketing': 'Your enthusiasm for online marketing campaigns makes Digital Marketing ideal for you! You\'ll drive growth through paid advertising, social media, and email marketing strategies.',
      'SEO Training': 'Your interest in organic traffic and search optimization makes SEO Training perfect for you! You\'ll help websites rank higher and attract more qualified visitors.',
      'Cyber Security': 'Your curiosity about system security makes Cyber Security an excellent fit! You\'ll protect organizations from threats through penetration testing and security protocols.',
      'Product Management': 'Your leadership interests and desire to coordinate teams makes Product Management ideal for you! You\'ll guide product strategy and work with cross-functional teams to deliver successful products.',
      'Web Design (WordPress)': 'Your interest in website creation makes WordPress Web Design perfect for you! You\'ll build beautiful, functional websites using the world\'s most popular content management system.',
      'Business Model Mastery': 'Your strategic thinking and business interests make Business Model Mastery ideal for you! You\'ll learn to create, analyze, and optimize business models for success.',
      'Cloud Computing': 'Your interest in modern infrastructure makes Cloud Computing a great choice! You\'ll deploy and manage applications on cutting-edge cloud platforms.',
      'Office Suite': 'Your practical approach to productivity makes Office Suite training perfect for you! You\'ll master essential business tools that are valuable in any career.'
    }
    
    return rationales[recommendation] || courses[recommendation]?.description || 'This track aligns perfectly with your interests and will provide you with valuable skills in the digital multimedia industry!'
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
                  Section {quizState.currentSection + 1} of {sections.length} - Question {quizState.currentQuestion + 1}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-gradient-to-r from-aco-teal to-aco-cyan h-2 rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${(() => {
                      const totalQuestions = questions.reduce((sum, section) => sum + section.length, 0)
                      const currentProgress = questions.slice(0, quizState.currentSection).reduce((sum, section) => sum + section.length, 0) + quizState.currentQuestion + 1
                      return (currentProgress / totalQuestions) * 100
                    })()}%` 
                  }}
                ></div>
              </div>

              {/* Section Info */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-aco-cyan mb-1">{sections[quizState.currentSection]?.title}</div>
                <div className="text-xs text-gray-500">{sections[quizState.currentSection]?.subtitle}</div>
              </div>
              
              {/* Question */}
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-aco-navy mb-4 text-center leading-tight">
                {questions[quizState.currentSection]?.[quizState.currentQuestion]?.question}
              </h2>
              
              {/* Question Type Indicator */}
              {questions[quizState.currentSection]?.[quizState.currentQuestion]?.type === 'multi' && (
                <p className="text-sm text-aco-orange mb-6 text-center font-medium">
                  Select all that apply
                </p>
              )}
              
              {/* Options */}
              <div className="space-y-4 mb-8">
                {questions[quizState.currentSection]?.[quizState.currentQuestion]?.options.map((option, index) => {
                  const questionId = `${quizState.currentSection}-${quizState.currentQuestion}`
                  const currentAnswer = quizState.answers[questionId]
                  const isSelected = questions[quizState.currentSection]?.[quizState.currentQuestion]?.type === 'single' 
                    ? currentAnswer === index 
                    : Array.isArray(currentAnswer) && currentAnswer.includes(index)

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
                        {/* Use different icons based on question content */}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 0 && <Palette className="w-6 h-6" />}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 1 && <Code className="w-6 h-6" />}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 2 && <BarChart3 className="w-6 h-6" />}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 3 && <Megaphone className="w-6 h-6" />}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 4 && <Shield className="w-6 h-6" />}
                        {quizState.currentSection === 0 && quizState.currentQuestion === 0 && index === 5 && <Target className="w-6 h-6" />}
                        {!(quizState.currentSection === 0 && quizState.currentQuestion === 0) && (
                          isSelected ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />
                        )}
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

              {/* Navigation */}
              <div className="flex justify-center">
                <button
                  onClick={nextQuestion}
                  disabled={!isCurrentQuestionAnswered()}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-aco-orange to-orange-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-aco-orange transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-heading disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {(() => {
                    const isLastSection = quizState.currentSection === questions.length - 1
                    const isLastQuestion = quizState.currentQuestion === (questions[quizState.currentSection]?.length || 0) - 1
                    return isLastSection && isLastQuestion ? 'Complete Quiz' : 'Next Question'
                  })()}
                  <ArrowRight className="w-5 h-5" />
                </button>
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

