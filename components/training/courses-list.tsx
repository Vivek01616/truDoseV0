"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrainingCourse } from "@/lib/features/training/trainingSlice"
import { Clock, Users, Star, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoursesListProps {
  courses: TrainingCourse[]
}

export function CoursesList({ courses }: CoursesListProps) {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return <Badge variant="outline">Beginner</Badge>
      case "intermediate":
        return <Badge variant="secondary">Intermediate</Badge>
      case "advanced":
        return <Badge variant="default">Advanced</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "online":
        return <Badge variant="success">Online</Badge>
      case "in-person":
        return <Badge variant="warning">In-Person</Badge>
      case "hybrid":
        return <Badge variant="info">Hybrid</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "upcoming":
        return <Badge variant="warning">Upcoming</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              {getLevelBadge(course.level)}
              {getStatusBadge(course.status)}
            </div>
            <CardTitle className="mt-2">{course.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              {getTypeBadge(course.type)}
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {course.duration} hours
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>
                  {course.enrolled}/{course.capacity} enrolled
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{course.modules.length} modules</span>
              </div>
              {course.averageRating && (
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-amber-500" />
                  <span>{course.averageRating.toFixed(1)}/5.0</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Course</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
