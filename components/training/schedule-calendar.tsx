"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrainingSchedule } from "@/lib/features/training/trainingSlice"
import { Clock, MapPin, Users } from "lucide-react"
import { format } from "date-fns"

interface ScheduleCalendarProps {
  schedule: TrainingSchedule[]
}

export function ScheduleCalendar({ schedule }: ScheduleCalendarProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="success">Scheduled</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      default:
        return null
    }
  }

  // Sort schedule by start date
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return (
    <div className="space-y-4">
      {sortedSchedule.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg text-center min-w-[60px]">
                <div className="text-sm font-semibold">{format(new Date(event.startDate), "MMM")}</div>
                <div className="text-2xl font-bold">{format(new Date(event.startDate), "dd")}</div>
              </div>
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {event.currentAttendees}/{event.maxAttendees} attendees
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              {getStatusBadge(event.status)}
              <span className="text-sm">{event.instructor}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
