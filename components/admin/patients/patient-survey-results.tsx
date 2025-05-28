"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface PatientSurveyResultsProps {
  patientId: string
}

// Mock survey data
const mockSurveys = [
  {
    id: "survey-001",
    name: "Post-Treatment Satisfaction",
    date: "2023-05-15",
    status: "completed",
    score: 85,
    questions: [
      { question: "How would you rate your pain level after treatment?", answer: "2/10", category: "Pain" },
      {
        question: "How satisfied are you with the treatment results?",
        answer: "Very Satisfied",
        category: "Satisfaction",
      },
      { question: "Would you recommend this treatment to others?", answer: "Yes", category: "Recommendation" },
      { question: "Did you experience any side effects?", answer: "Minor bruising", category: "Side Effects" },
      { question: "How would you rate your mobility after treatment?", answer: "8/10", category: "Mobility" },
    ],
  },
  {
    id: "survey-002",
    name: "30-Day Follow-up",
    date: "2023-06-10",
    status: "completed",
    score: 92,
    questions: [
      { question: "How would you rate your pain level now?", answer: "1/10", category: "Pain" },
      {
        question: "Has your condition improved since treatment?",
        answer: "Significantly improved",
        category: "Improvement",
      },
      {
        question: "Are you able to perform daily activities better?",
        answer: "Yes, much better",
        category: "Function",
      },
      { question: "Have you experienced any delayed side effects?", answer: "None", category: "Side Effects" },
      { question: "How would you rate your overall satisfaction?", answer: "9/10", category: "Satisfaction" },
    ],
  },
  {
    id: "survey-003",
    name: "90-Day Follow-up",
    date: "2023-08-10",
    status: "pending",
    score: null,
    questions: [],
  },
]

export function PatientSurveyResults({ patientId }: PatientSurveyResultsProps) {
  const [selectedSurvey, setSelectedSurvey] = useState(mockSurveys[0])

  // Group questions by category
  const groupedQuestions = selectedSurvey.questions.reduce(
    (acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = []
      }
      acc[question.category].push(question)
      return acc
    },
    {} as Record<string, typeof selectedSurvey.questions>,
  )

  const categories = Object.keys(groupedQuestions)

  if (mockSurveys.length === 0) {
    return (
      <Card className="border-[#E0E0E0]">
        <CardHeader>
          <CardTitle className="text-lg">Survey Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No surveys have been completed by this patient.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {mockSurveys.map((survey) => (
          <Button
            key={survey.id}
            variant={selectedSurvey.id === survey.id ? "default" : "outline"}
            className={selectedSurvey.id === survey.id ? "bg-[#005566]" : "border-[#E0E0E0]"}
            onClick={() => setSelectedSurvey(survey)}
            disabled={survey.status === "pending"}
          >
            {survey.name}
            {survey.status === "pending" && (
              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-300">
                Pending
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {selectedSurvey.status === "completed" ? (
        <Card className="border-[#E0E0E0]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">{selectedSurvey.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Completed on {format(new Date(selectedSurvey.date), "MMMM d, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Overall Score:</div>
              <Badge className="bg-[#4CAF50]">{selectedSurvey.score}%</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-medium mb-2">{category}</h3>
                <div className="space-y-2">
                  {groupedQuestions[category].map((question, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 border-b">
                      <div className="text-sm">{question.question}</div>
                      <div className="text-sm font-medium">{question.answer}</div>
                    </div>
                  ))}
                </div>
                {category !== categories[categories.length - 1] && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#E0E0E0]">
          <CardHeader>
            <CardTitle className="text-lg">{selectedSurvey.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">This survey is scheduled but not yet completed.</p>
              <p className="text-muted-foreground">Due date: {format(new Date(selectedSurvey.date), "MMMM d, yyyy")}</p>
              <Button variant="outline" className="mt-4 border-[#005566] text-[#005566]">
                Send Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
