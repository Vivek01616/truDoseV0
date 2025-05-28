"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { SurveyTemplate, SurveySection, SurveyQuestion } from "@/lib/models/survey-templates"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface MSQTemplateProps {
  template: SurveyTemplate
  patientId: string
  onSubmit: (answers: { questionId: string; value: any }[], score: { [key: string]: number }) => void
  isReadOnly?: boolean
  initialAnswers?: { questionId: string; value: any }[]
}

export function MSQTemplate({
  template,
  patientId,
  onSubmit,
  isReadOnly = false,
  initialAnswers = [],
}: MSQTemplateProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [sectionScores, setSectionScores] = useState<{ [key: string]: number }>({})
  const [totalScore, setTotalScore] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Initialize answers from initialAnswers if provided
  useEffect(() => {
    if (initialAnswers && initialAnswers.length > 0) {
      const answerMap: { [key: string]: number } = {}
      initialAnswers.forEach((answer) => {
        answerMap[answer.questionId] = answer.value
      })
      setAnswers(answerMap)
      calculateScores(answerMap)

      // If in read-only mode, show results immediately
      if (isReadOnly) {
        setShowResults(true)
      }
    }
  }, [initialAnswers, isReadOnly])

  // Calculate progress
  useEffect(() => {
    const totalQuestions = template.sections.reduce((acc, section) => acc + section.questions.length, 0)
    const answeredQuestions = Object.keys(answers).length
    const calculatedProgress = (answeredQuestions / totalQuestions) * 100
    setProgress(calculatedProgress)
    setIsComplete(calculatedProgress === 100)
  }, [answers, template.sections])

  const handleAnswerChange = (questionId: string, value: number) => {
    if (isReadOnly) return

    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    calculateScores(newAnswers)
  }

  const calculateScores = (currentAnswers: { [key: string]: number }) => {
    const scores: { [key: string]: number } = {}
    let total = 0

    template.sections.forEach((section) => {
      const sectionScore = section.questions.reduce((acc, question) => {
        return acc + (currentAnswers[question.id] || 0)
      }, 0)

      scores[section.id] = sectionScore
      total += sectionScore
    })

    setSectionScores(scores)
    setTotalScore(total)
  }

  const handleNext = () => {
    if (currentSectionIndex < template.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
    }
  }

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }))

    const scoreData = {
      ...sectionScores,
      total: totalScore,
    }

    onSubmit(formattedAnswers, scoreData)
    setShowResults(true)
  }

  const renderQuestion = (question: SurveyQuestion) => {
    return (
      <div key={question.id} className="mb-6">
        <div className="flex items-start mb-2">
          <p className="text-sm font-medium">{question.text}</p>
        </div>
        <RadioGroup
          value={answers[question.id]?.toString() || ""}
          onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
          disabled={isReadOnly}
          className="flex space-x-2"
        >
          {[0, 1, 2, 3, 4].map((value) => (
            <div key={value} className="flex flex-col items-center">
              <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
              <Label htmlFor={`${question.id}-${value}`} className="text-xs mt-1">
                {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Never</span>
          <span>Frequently & Severe</span>
        </div>
      </div>
    )
  }

  const renderSection = (section: SurveySection) => {
    return (
      <div key={section.id} className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>
          {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
        </div>
        <div className="space-y-4">{section.questions.map(renderQuestion)}</div>
        {!isReadOnly && (
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentSectionIndex === 0}>
              Previous
            </Button>
            <Button
              onClick={currentSectionIndex === template.sections.length - 1 ? handleSubmit : handleNext}
              disabled={!section.questions.every((q) => answers[q.id] !== undefined)}
            >
              {currentSectionIndex === template.sections.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        )}
      </div>
    )
  }

  const getToxicityLevel = (score: number) => {
    if (score < 10) return { level: "Optimal", color: "bg-green-500" }
    if (score < 50) return { level: "Mild Toxicity", color: "bg-yellow-500" }
    if (score < 100) return { level: "Moderate Toxicity", color: "bg-orange-500" }
    return { level: "Severe Toxicity", color: "bg-red-500" }
  }

  const renderResults = () => {
    const { level, color } = getToxicityLevel(totalScore)

    return (
      <div className="space-y-6">
        <Alert variant={totalScore >= 100 ? "destructive" : "default"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>MSQ Score: {totalScore}</AlertTitle>
          <AlertDescription>Your toxicity level is: {level}</AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Section Scores</h3>
          {template.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{section.title}</span>
                <span className="text-sm">{sectionScores[section.id] || 0}</span>
              </div>
              <Progress value={((sectionScores[section.id] || 0) / 20) * 100} className="h-2" />
            </div>
          ))}
        </div>

        {!isReadOnly && (
          <div className="flex justify-end">
            <Button onClick={() => setShowResults(false)}>Back to Questionnaire</Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
        {!isReadOnly && !showResults && (
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {showResults ? renderResults() : renderSection(template.sections[currentSectionIndex])}
        </ScrollArea>
      </CardContent>
      {isReadOnly && (
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <span>Completed: {new Date(initialAnswers?.[0]?.value || Date.now()).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
            <span>Submitted</span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
