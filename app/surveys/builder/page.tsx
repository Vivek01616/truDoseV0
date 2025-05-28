"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchSurveyTemplateById, setSelectedTemplate } from "@/lib/features/survey/surveySlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SurveyBuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedTemplate, status } = useSelector((state: RootState) => state.survey)

  const templateId = searchParams.get("template")
  const cloneId = searchParams.get("clone")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<"patient" | "provider" | "clinic" | "research" | "feedback">("patient")
  const [questions, setQuestions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    if (templateId) {
      dispatch(fetchSurveyTemplateById(templateId))
    } else if (cloneId) {
      dispatch(fetchSurveyTemplateById(cloneId))
    } else {
      // Create a new empty template
      dispatch(
        setSelectedTemplate({
          id: "new",
          title: "New Survey",
          description: "",
          category: "patient",
          questions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "Current User",
          isActive: false,
          responseCount: 0,
        }),
      )
    }
  }, [dispatch, templateId, cloneId])

  useEffect(() => {
    if (selectedTemplate) {
      setTitle(cloneId ? `${selectedTemplate.title} (Copy)` : selectedTemplate.title)
      setDescription(selectedTemplate.description)
      setCategory(selectedTemplate.category)
      setQuestions(selectedTemplate.questions || [])
    }
  }, [selectedTemplate, cloneId])

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `q${Date.now()}`,
      type: "text",
      text: "",
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  const handleSave = () => {
    // In a real app, this would dispatch an action to save the survey
    alert("Survey saved successfully!")
    router.push("/surveys")
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64">Loading survey builder...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/surveys")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surveys
          </Button>
          <h1 className="text-2xl font-bold">
            {templateId ? "Edit Survey" : cloneId ? "Clone Survey" : "Create New Survey"}
          </h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Survey
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Survey Details</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Set the basic details for your survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Survey Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter survey title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter survey description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Survey Questions</h2>
            <Button onClick={handleAddQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          {questions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground mb-4">No questions added yet</p>
                <Button onClick={handleAddQuestion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Question
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Question {index + 1}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveQuestion(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`question-${index}`}>Question Text</Label>
                      <Input
                        id={`question-${index}`}
                        value={question.text}
                        onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                        placeholder="Enter question text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`type-${index}`}>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) => handleQuestionChange(index, "type", value)}
                      >
                        <SelectTrigger id={`type-${index}`}>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="scale">Scale</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`required-${index}`}
                        checked={question.required}
                        onChange={(e) => handleQuestionChange(index, "required", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`required-${index}`}>Required</Label>
                    </div>

                    {(question.type === "multipleChoice" || question.type === "checkbox") && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        {(question.options || []).map((option: string, optionIndex: number) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])]
                                newOptions[optionIndex] = e.target.value
                                handleQuestionChange(index, "options", newOptions)
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newOptions = [...(question.options || [])]
                                newOptions.splice(optionIndex, 1)
                                handleQuestionChange(index, "options", newOptions)
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newOptions = [...(question.options || []), ""]
                            handleQuestionChange(index, "options", newOptions)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>
                    )}

                    {question.type === "scale" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`min-${index}`}>Min Value</Label>
                          <Input
                            id={`min-${index}`}
                            type="number"
                            value={question.minValue || 1}
                            onChange={(e) => handleQuestionChange(index, "minValue", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`max-${index}`}>Max Value</Label>
                          <Input
                            id={`max-${index}`}
                            type="number"
                            value={question.maxValue || 5}
                            onChange={(e) => handleQuestionChange(index, "maxValue", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
