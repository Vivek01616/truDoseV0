// Survey template interface
export interface SurveyTemplate {
  id: string
  title: string
  description: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  responseCount: number
  questions: SurveyQuestion[]
  sections?: SurveySection[]
  triggerRules?: TriggerRule[]
  assignmentRules?: AssignmentRule[]
}

// Survey section interface
export interface SurveySection {
  id: string
  title: string
  questions: SurveyQuestion[]
}

// Survey question interface
export interface SurveyQuestion {
  id: string
  text: string
  type: "scale" | "checkbox" | "radio" | "text" | "multipleChoice" | "date"
  options?: string[]
  required: boolean
  minValue?: number
  maxValue?: number
  category?: string
}

// Survey response interface
export interface SurveyResponse {
  id: string
  templateId: string
  surveyTitle?: string
  patientId: string
  patientName?: string
  providerId?: string
  providerName?: string
  clinicId?: string
  clinicName?: string
  submittedAt: string
  completionTime?: number
  status: "complete" | "incomplete" | "in-progress"
  score?: number
  answers: SurveyAnswer[]
  categoryScores?: { [key: string]: number }
  totalScore?: number
  toxicityLevel?: string
}

// Survey answer interface
export interface SurveyAnswer {
  questionId: string
  answer: any
  questionText?: string
  category?: string
}

// Survey assignment interface
export interface SurveyAssignment {
  id: string
  templateId: string
  surveyTitle?: string
  patientId: string
  assignedBy: string
  assignedAt: string
  dueDate: string | null
  status: "pending" | "completed" | "expired"
  remindersSent: number
  protocolId?: string
  repetitionCount?: number
  totalRepetitions?: number
  nextDueDate?: string | null
  assignedTo?: {
    type: "patient" | "provider" | "clinic" | "all"
    id?: string
    name?: string
  }
}

// Trigger rule interface
export interface TriggerRule {
  id: string
  name: string
  description: string
  condition: {
    questionId: string
    operator: "equals" | "not-equals" | "greater-than" | "less-than" | "contains"
    value: any
  }
  action: {
    type: "notification" | "alert" | "assignSurvey" | "referral"
    target: string
    data: Record<string, any>
  }
}

// Assignment rule interface
export interface AssignmentRule {
  id: string
  name: string
  frequency: "once" | "daily" | "weekly" | "monthly" | "custom"
  repetitions?: number
  protocolId?: string
}
