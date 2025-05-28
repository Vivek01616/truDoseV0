"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  SurveyTemplate,
  SurveySection,
  SurveyQuestion,
  TriggerRule,
  AssignmentRule,
} from "@/lib/models/survey-templates"
import { PlusCircle, Trash2, Save, Eye } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

interface SurveyBuilderProps {
  initialTemplate?: SurveyTemplate
  onSave: (template: SurveyTemplate) => void
}

export function SurveyBuilder({ initialTemplate, onSave }: SurveyBuilderProps) {
  const router = useRouter()
  const [template, setTemplate] = useState<SurveyTemplate>(
    initialTemplate || {
      id: `template-${Date.now()}`,
      name: "",
      description: "",
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current-user", // This would be the actual user ID in a real app
      status: "draft",
      triggerRules: [],
      assignmentRules: [],
    },
  )
  const [activeTab, setActiveTab] = useState("details")
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newQuestionText, setNewQuestionText] = useState("")
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null)

  const handleNameChange = (name: string) => {
    setTemplate({ ...template, name })
  }

  const handleDescriptionChange = (description: string) => {
    setTemplate({ ...template, description })
  }

  const handleStatusChange = (status: "draft" | "active" | "archived") => {
    setTemplate({ ...template, status })
  }

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return

    const newSection: SurveySection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      questions: [],
    }

    setTemplate({
      ...template,
      sections: [...template.sections, newSection],
    })
    setNewSectionTitle("")
    setSelectedSectionIndex(template.sections.length)
  }

  const handleDeleteSection = (index: number) => {
    const updatedSections = [...template.sections]
    updatedSections.splice(index, 1)
    setTemplate({ ...template, sections: updatedSections })
    setSelectedSectionIndex(null)
  }

  const handleAddQuestion = () => {
    if (selectedSectionIndex === null || !newQuestionText.trim()) return

    const newQuestion: SurveyQuestion = {
      id: `question-${Date.now()}`,
      text: newQuestionText,
      type: "scale",
      required: true,
      section: template.sections[selectedSectionIndex].id,
    }

    const updatedSections = [...template.sections]
    updatedSections[selectedSectionIndex].questions.push(newQuestion)

    setTemplate({
      ...template,
      sections: updatedSections,
    })
    setNewQuestionText("")
  }

  const handleDeleteQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...template.sections]
    updatedSections[sectionIndex].questions.splice(questionIndex, 1)
    setTemplate({ ...template, sections: updatedSections })
  }

  const handleAddTriggerRule = () => {
    const newRule: TriggerRule = {
      id: `trigger-${Date.now()}`,
      name: "New Trigger Rule",
      description: "",
      condition: {
        questionId: "",
        operator: "equals",
        value: "",
      },
      action: {
        type: "notification",
        target: "",
        data: {},
      },
    }

    setTemplate({
      ...template,
      triggerRules: [...(template.triggerRules || []), newRule],
    })
  }

  const handleAddAssignmentRule = () => {
    const newRule: AssignmentRule = {
      id: `assignment-${Date.now()}`,
      name: "New Assignment Rule",
      frequency: "once",
    }

    setTemplate({
      ...template,
      assignmentRules: [...(template.assignmentRules || []), newRule],
    })
  }

  const handleSave = () => {
    const updatedTemplate = {
      ...template,
      updatedAt: new Date().toISOString(),
    }
    onSave(updatedTemplate)
  }

  const handlePreview = () => {
    // In a real app, this would navigate to a preview page
    // For now, we'll just save the template
    handleSave()
    router.push(`/surveys/${template.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Survey Builder</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="sections">Sections & Questions</TabsTrigger>
          <TabsTrigger value="triggers">Trigger Rules</TabsTrigger>
          <TabsTrigger value="assignments">Assignment Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Survey Details</CardTitle>
              <CardDescription>Basic information about your survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Survey Name</Label>
                <Input
                  id="name"
                  value={template.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter survey name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={template.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="Enter survey description"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={template.status}
                  onValueChange={(value) => handleStatusChange(value as "draft" | "active" | "archived")}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sections & Questions</CardTitle>
              <CardDescription>Organize your survey into sections and add questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Sections</h3>
                  <div className="flex space-x-2">
                    <Input
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="New section title"
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleAddSection}>
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {template.sections.map((section, index) => (
                        <div
                          key={section.id}
                          className={`p-2 rounded flex justify-between items-center cursor-pointer ${
                            selectedSectionIndex === index ? "bg-muted" : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedSectionIndex(index)}
                        >
                          <span className="text-sm truncate">{section.title}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteSection(index)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="col-span-2 space-y-4">
                  <h3 className="text-sm font-medium">Questions</h3>
                  {selectedSectionIndex !== null ? (
                    <>
                      <div className="flex space-x-2">
                        <Input
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder="New question text"
                          className="flex-1"
                        />
                        <Button size="sm" onClick={handleAddQuestion}>
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {template.sections[selectedSectionIndex].questions.map((question, qIndex) => (
                            <div key={question.id} className="p-3 border rounded flex justify-between items-center">
                              <span className="text-sm">{question.text}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteQuestion(selectedSectionIndex, qIndex)}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </>
                  ) : (
                    <div className="flex h-[400px] items-center justify-center border rounded">
                      <p className="text-muted-foreground">Select a section to manage questions</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triggers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trigger Rules</CardTitle>
              <CardDescription>Define rules that trigger actions based on survey responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={handleAddTriggerRule}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Trigger Rule
                </Button>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {(template.triggerRules || []).map((rule, index) => (
                      <Card key={rule.id}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{rule.name}</CardTitle>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Condition</Label>
                              <Select defaultValue={rule.condition.operator}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select operator" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">Equals</SelectItem>
                                  <SelectItem value="greaterThan">Greater Than</SelectItem>
                                  <SelectItem value="lessThan">Less Than</SelectItem>
                                  <SelectItem value="contains">Contains</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Value</Label>
                              <Input defaultValue={rule.condition.value} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Action</Label>
                            <Select defaultValue={rule.action.type}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select action type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="notification">Notification</SelectItem>
                                <SelectItem value="alert">Alert</SelectItem>
                                <SelectItem value="assignSurvey">Assign Survey</SelectItem>
                                <SelectItem value="referral">Referral</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Rules</CardTitle>
              <CardDescription>Define how and when this survey should be assigned to patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={handleAddAssignmentRule}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Assignment Rule
                </Button>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {(template.assignmentRules || []).map((rule, index) => (
                      <Card key={rule.id}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{rule.name}</CardTitle>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Select defaultValue={rule.frequency}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="once">Once</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Repetitions</Label>
                              <Input type="number" defaultValue={rule.repetitions || 1} min={1} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Protocol (Optional)</Label>
                            <Select defaultValue={rule.protocolId || "none"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select protocol" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="protocol-detox-001">Detox Protocol</SelectItem>
                                <SelectItem value="protocol-immune-001">Immune Support Protocol</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
