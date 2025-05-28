"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchTrainingData } from "@/lib/features/training/trainingSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { CoursesList } from "@/components/training/courses-list"
import { CertificationsTable } from "@/components/training/certifications-table"
import { ResourcesList } from "@/components/training/resources-list"
import { ScheduleCalendar } from "@/components/training/schedule-calendar"

export default function TrainingPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { courses, certifications, resources, trainingSchedule, loading } = useSelector(
    (state: RootState) => state.training,
  )

  useEffect(() => {
    dispatch(fetchTrainingData())
  }, [dispatch])

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Training & Certification</h1>
        <p className="text-muted-foreground">Manage training courses and certification programs</p>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Training Courses</CardTitle>
              <CardDescription>Browse available training courses</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading courses...</div>
              ) : (
                <CoursesList courses={courses} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Provider Certifications</CardTitle>
              <CardDescription>Manage provider certification status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading certifications...</div>
              ) : (
                <CertificationsTable certifications={certifications} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Training Resources</CardTitle>
              <CardDescription>Access training materials and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading resources...</div>
              ) : (
                <ResourcesList resources={resources} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Training Schedule</CardTitle>
              <CardDescription>View upcoming training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading schedule...</div>
              ) : (
                <ScheduleCalendar schedule={trainingSchedule} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
