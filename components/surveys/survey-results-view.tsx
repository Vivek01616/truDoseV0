"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SurveyResponse } from "@/lib/features/survey/surveySlice"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

interface SurveyResultsViewProps {
  response: SurveyResponse
}

export function SurveyResultsView({ response }: SurveyResultsViewProps) {
  const [activeTab, setActiveTab] = useState("summary")

  // Group answers by category
  const answersByCategory: Record<string, { questionText: string; answer: number }[]> = {}
  response.answers.forEach((answer) => {
    if (typeof answer.answer === "number" && answer.category) {
      if (!answersByCategory[answer.category]) {
        answersByCategory[answer.category] = []
      }
      answersByCategory[answer.category].push({
        questionText: answer.questionText,
        answer: answer.answer as number,
      })
    }
  })

  // Calculate category totals for chart
  const categoryTotals = Object.entries(response.categoryScores || {}).map(([category, score]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: score,
  }))

  // Colors for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#A4DE6C",
    "#D0ED57",
    "#FFC658",
    "#FF8C00",
    "#FF6347",
    "#FF4500",
    "#FF0000",
    "#DC143C",
    "#C71585",
  ]

  // Get toxicity level color
  const getToxicityLevelColor = (level: string | undefined) => {
    switch (level) {
      case "Optimal":
        return "bg-green-100 text-green-800 border-green-200"
      case "Mild Toxicity":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Moderate Toxicity":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Severe Toxicity":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{response.surveyTitle}</h1>
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(response.submittedAt).toLocaleDateString()} by {response.patientName}
          </p>
        </div>
        <Badge variant="outline" className={getToxicityLevelColor(response.toxicityLevel)}>
          {response.toxicityLevel || "Not Scored"}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Detailed Results</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Results</CardTitle>
              <CardDescription>Summary of survey responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Score</p>
                  <p className="text-3xl font-bold">{response.totalScore || 0}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Toxicity Level</p>
                  <Badge variant="outline" className={getToxicityLevelColor(response.toxicityLevel)}>
                    {response.toxicityLevel || "Not Scored"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Score Interpretation</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span>Optimal: Less than 10</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span>Mild Toxicity: 10-50</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                    <span>Moderate Toxicity: 50-100</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    <span>Severe Toxicity: Over 100</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Top Categories</p>
                <div className="space-y-3">
                  {Object.entries(response.categoryScores || {})
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([category, score]) => (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm capitalize">{category}</p>
                          <p className="text-sm font-medium">{score}</p>
                        </div>
                        <Progress value={(score / (response.totalScore || 1)) * 100} className="h-2" />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Based on survey results</CardDescription>
            </CardHeader>
            <CardContent>
              {response.toxicityLevel === "Optimal" && (
                <p>
                  Your results indicate optimal health. Continue with your current health practices and regular
                  check-ups.
                </p>
              )}
              {response.toxicityLevel === "Mild Toxicity" && (
                <div className="space-y-2">
                  <p>Your results indicate mild toxicity. Consider the following recommendations:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Review your diet and consider reducing processed foods</li>
                    <li>Increase water intake to support detoxification</li>
                    <li>Consider gentle exercise to improve circulation</li>
                    <li>Schedule a follow-up appointment to discuss specific symptoms</li>
                  </ul>
                </div>
              )}
              {response.toxicityLevel === "Moderate Toxicity" && (
                <div className="space-y-2">
                  <p>Your results indicate moderate toxicity. We recommend:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Schedule a comprehensive evaluation with your healthcare provider</li>
                    <li>Consider specialized testing for specific areas of concern</li>
                    <li>Implement dietary changes to reduce inflammatory foods</li>
                    <li>Begin a structured detoxification program under medical supervision</li>
                  </ul>
                </div>
              )}
              {response.toxicityLevel === "Severe Toxicity" && (
                <div className="space-y-2">
                  <p>Your results indicate severe toxicity. Immediate action is recommended:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Contact your healthcare provider immediately</li>
                    <li>Schedule comprehensive testing to identify specific toxicity sources</li>
                    <li>Begin a medically supervised detoxification program</li>
                    <li>Consider environmental assessment to identify potential toxin sources</li>
                    <li>Follow up with regular monitoring and assessment</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(answersByCategory).map(([category, answers]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-medium capitalize">{category}</h3>
                  <Separator />
                  <div className="space-y-2">
                    {answers.map((answer, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2">
                        <div className="col-span-9">
                          <p className="text-sm">{answer.questionText}</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <Badge variant={answer.answer > 2 ? "destructive" : "outline"}>Score: {answer.answer}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Analysis</CardTitle>
              <CardDescription>Graphical representation of results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-80 w-full">
                {/* Placeholder for chart - would use a chart library like recharts in a real implementation */}
                <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Chart visualization would be rendered here using a library like Recharts
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {categoryTotals.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center">
                          <div
                            className="h-3 w-3 mr-1 rounded-sm"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-xs">
                            {entry.name}: {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Score Distribution</h3>
                <div className="space-y-2">
                  {categoryTotals.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">{category.name}</p>
                        <p className="text-sm font-medium">{category.value}</p>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(category.value / (response.totalScore || 1)) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
