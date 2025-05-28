"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchSurveyTemplateById } from "@/lib/features/survey/surveySlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Send, Copy, BarChart } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export default function SurveyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedTemplate, status, error } = useSelector((state: RootState) => state.survey)
  const surveyId = params.id as string

  useEffect(() => {
    if (surveyId) {
      dispatch(fetchSurveyTemplateById(surveyId))
    }
  }, [dispatch, surveyId])

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64">Loading survey details...</div>
  }

  if (status === "failed" || !selectedTemplate) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Survey Not Found</h2>
          <p className="text-muted-foreground mt-2">The survey you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => router.push("/surveys")}>
            Back to Surveys
          </Button>
        </div>
      </div>
    )
  }

  // Ensure questions array exists and has a length property
  const questions = selectedTemplate.questions || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/surveys")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{selectedTemplate.title}</h1>
          <Badge
            variant={selectedTemplate.isActive ? "default" : "outline"}
            className={selectedTemplate.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
          >
            {selectedTemplate.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/surveys/builder?template=${surveyId}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/surveys/assign?template=${surveyId}`}>
              <Send className="mr-2 h-4 w-4" />
              Assign
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/surveys/analytics?template=${surveyId}`}>
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/surveys/builder?clone=${surveyId}`}>
              <Copy className="mr-2 h-4 w-4" />
              Clone
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Survey Information</CardTitle>
            <CardDescription>Basic survey details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 capitalize">
                  {selectedTemplate.category}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                <Badge
                  variant={selectedTemplate.isActive ? "default" : "outline"}
                  className={selectedTemplate.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {selectedTemplate.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Questions</h3>
                <p>{questions.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Responses</h3>
                <p>{selectedTemplate.responseCount || 0}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
              <p className="text-sm">{selectedTemplate.description || "No description provided."}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
              <p className="text-sm">{selectedTemplate.createdBy || "System"}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Dates</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm">
                    {selectedTemplate.createdAt ? format(new Date(selectedTemplate.createdAt), "PPP") : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm">
                    {selectedTemplate.updatedAt ? format(new Date(selectedTemplate.updatedAt), "PPP") : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Survey Questions</CardTitle>
            <CardDescription>Preview of survey questions</CardDescription>
          </CardHeader>
          <CardContent>
            {questions.length > 0 ? (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                        <h3 className="font-medium">{question.text}</h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={question.required ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}
                      >
                        {question.required ? "Required" : "Optional"}
                      </Badge>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Type: {formatQuestionType(question.type)}</p>

                      {question.type === "multipleChoice" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "checkbox" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border border-gray-300"></div>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "scale" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{question.minValue || 1}</span>
                            <span className="text-sm">{question.maxValue || 10}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full"></div>
                        </div>
                      )}

                      {question.type === "text" && <div className="border rounded p-2 bg-gray-50 h-20"></div>}

                      {question.type === "date" && <div className="border rounded p-2 bg-gray-50 h-10 w-40"></div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No questions have been added to this survey yet.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href={`/surveys/builder?template=${surveyId}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Add Questions
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function formatQuestionType(type: string): string {
  switch (type) {
    case "text":
      return "Text Input"
    case "multipleChoice":
      return "Multiple Choice"
    case "checkbox":
      return "Checkbox"
    case "scale":
      return "Scale"
    case "date":
      return "Date"
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}
