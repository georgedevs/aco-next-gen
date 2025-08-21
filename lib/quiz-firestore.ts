import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface QuizParticipant {
  email: string
  firstName: string
  lastName: string
  phone: string
  location: string
  courseRecommendation: string
  rationale: string
  completedAt: any // Firebase serverTimestamp
}

export async function saveQuizParticipant(participantData: Omit<QuizParticipant, 'completedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'quiz-participants'), {
      ...participantData,
      completedAt: serverTimestamp()
    })
    
    return docRef.id
  } catch (error) {
    console.error('Error saving quiz participant: ', error)
    throw error
  }
}