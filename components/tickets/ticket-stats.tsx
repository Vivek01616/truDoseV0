"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Ticket } from "@/lib/features/ticket/ticketSlice"
import { AlertTriangle, CheckCircle2, Clock, TicketIcon } from "lucide-react"

interface TicketStatsProps {
  tickets: Ticket[]
}

export function TicketStats({ tickets }: TicketStatsProps) {
  // Calculate metrics
  const openTickets = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed")
  const closedTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed")
  const highPriorityTickets = tickets.filter((t) => t.priority === "high" || t.priority === "critical")
  const criticalTickets = tickets.filter((t) => t.priority === "critical")

  // Calculate resolution rate
  const totalTickets = tickets.length
  const resolutionRate = totalTickets > 0 ? Math.round((closedTickets.length / totalTickets) * 100) : 0

  // Calculate average resolution time
  const resolutionTimes = closedTickets.map((ticket) => {
    const created = new Date(ticket.createdAt).getTime()
    const updated = new Date(ticket.updatedAt).getTime()
    return (updated - created) / (1000 * 60 * 60) // Convert to hours
  })

  const avgResolutionTime = resolutionTimes.length
    ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <TicketIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openTickets.length}</div>
          <p className="text-xs text-muted-foreground">
            {openTickets.length > 0 ? "Requiring attention" : "All tickets resolved"}
          </p>
          {totalTickets > 0 && (
            <div className="mt-2">
              <Progress value={resolutionRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{resolutionRate}% resolution rate</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResolutionTime.toFixed(1)} hrs</div>
          <p className="text-xs text-muted-foreground">Based on {closedTickets.length} resolved tickets</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPriorityTickets.length}</div>
          {criticalTickets.length > 0 && (
            <p className="text-xs text-red-500 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {criticalTickets.length} critical
            </p>
          )}
          {totalTickets > 0 && (
            <div className="mt-2">
              <Progress value={Math.round((highPriorityTickets.length / totalTickets) * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((highPriorityTickets.length / totalTickets) * 100)}% of all tickets
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{closedTickets.length}</div>
          <p className="text-xs text-muted-foreground">
            {totalTickets > 0
              ? `${Math.round((closedTickets.length / totalTickets) * 100)}% completion rate`
              : "No tickets to resolve"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
