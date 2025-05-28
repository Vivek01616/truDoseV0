"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchSurveyTemplates, fetchSurveyResponses, fetchSurveyAssignments } from "@/lib/features/survey/surveySlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Send } from "lucide-react"
import Link from "next/link"
import { DataTable } from "@/components/data-table/data-table"
import { templateColumns, responseColumns, assignmentColumns } from "@/components/surveys/columns"

export default function SurveysPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { templates, responses, assignments, status, error } = useSelector((state: RootState) => state.survey)
  const [activeTab, setActiveTab] = useState("templates")

  useEffect(() => {
    const loadData = async () => {
      try {
        if (status === "idle") {
          await dispatch(fetchSurveyTemplates()).unwrap()
          await dispatch(fetchSurveyResponses()).unwrap()
          await dispatch(fetchSurveyAssignments()).unwrap()
        }
      } catch (error) {
        console.error("Error loading survey data:", error)
      }
    }

    loadData()
  }, [status, dispatch])

  const handleExport = () => {
    // Implement CSV export functionality
    console.log(`Exporting ${activeTab} data...`)
    // Convert data to CSV and trigger download
  }

  if (status === "loading" && templates.length === 0 && responses.length === 0 && assignments.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading survey data...</div>
  }

  if (status === "failed") {
    return <div className="text-red-500">Error loading survey data: {error}</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Surveys</h1>
          <p className="text-muted-foreground">Create, manage, and analyze surveys</p>
        </div>
        <div className="flex gap-2">
          {activeTab === "templates" && (
            <Button asChild>
              <Link href="/surveys/builder">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Survey
              </Link>
            </Button>
          )}
          {activeTab === "assignments" && (
            <Button asChild>
              <Link href="/surveys/assign">
                <Send className="mr-2 h-4 w-4" />
                Assign Survey
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Survey Templates</CardTitle>
            <CardDescription>{templates.length} total templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-sm text-muted-foreground">
              {templates.filter((t) => t.isActive).length} active templates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Survey Responses</CardTitle>
            <CardDescription>{responses.length} total responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responses.length}</div>
            <p className="text-sm text-muted-foreground">
              {responses.filter((r) => new Date(r.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}{" "}
              responses in the last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Survey Assignments</CardTitle>
            <CardDescription>{assignments.length} total assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-sm text-muted-foreground">
              {assignments.filter((a) => a.status === "pending").length} pending assignments
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Survey Templates</CardTitle>
              <CardDescription>View and manage survey templates</CardDescription>
            </CardHeader>
            <CardContent>
              {templates.length > 0 ? (
                <DataTable
                  columns={templateColumns}
                  data={templates}
                  title="Survey Templates"
                  searchKey="title"
                  onExport={handleExport}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No survey templates found. Create a new survey to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Survey Responses</CardTitle>
              <CardDescription>View and analyze survey responses</CardDescription>
            </CardHeader>
            <CardContent>
              {responses.length > 0 ? (
                <DataTable
                  columns={responseColumns}
                  data={responses}
                  title="Survey Responses"
                  searchKey="surveyTitle"
                  onExport={handleExport}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">No survey responses found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Survey Assignments</CardTitle>
              <CardDescription>View and manage survey assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.length > 0 ? (
                <DataTable
                  columns={assignmentColumns}
                  data={assignments}
                  title="Survey Assignments"
                  searchKey="surveyTitle"
                  onExport={handleExport}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">No survey assignments found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
