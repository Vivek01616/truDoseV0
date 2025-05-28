"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Ticket } from "@/lib/features/ticket/ticketSlice"
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"

interface TicketOverviewProps {
  tickets: Ticket[]
  loading: boolean
}

export function TicketOverview({ tickets, loading }: TicketOverviewProps) {
  // Calculate metrics
  const openTickets = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed")
  const closedTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed")
  const highPriorityTickets = tickets.filter((t) => t.priority === "high" || t.priority === "critical")
  const criticalTickets = tickets.filter((t) => t.priority === "critical")

  // Calculate resolution rate
  const totalTickets = tickets.length
  const resolutionRate = totalTickets > 0 ? Math.round((closedTickets.length / totalTickets) * 100) : 0

  // Calculate ticket ages
  const ticketAges = openTickets.map((ticket) => {
    const created = new Date(ticket.createdAt).getTime()
    const now = new Date().getTime()
    return Math.floor((now - created) / (1000 * 60 * 60 * 24)) // Age in days
  })

  const oldTickets = ticketAges.filter((age) => age > 7).length
  const averageAge = ticketAges.length > 0 ? ticketAges.reduce((sum, age) => sum + age, 0) / ticketAges.length : 0

  if (loading) {
    return <div>Loading ticket overview...</div>
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Ticket Status</CardTitle>
          <CardDescription>Current open vs. resolved tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{openTickets.length}</p>
              <p className="text-xs text-muted-foreground">Open tickets</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{closedTickets.length}</p>
              <p className="text-xs text-muted-foreground">Resolved tickets</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Resolution Rate</span>
              <span>{resolutionRate}%</span>
            </div>
            <Progress value={resolutionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Priority Distribution</CardTitle>
          <CardDescription>Tickets by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {criticalTickets.length > 0 && (
              <div className="flex items-center text-xs">
                <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium">
                  {criticalTickets.length} critical issue{criticalTickets.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-blue-100 dark:bg-blue-900/20 p-2">
                <div className="text-xs text-blue-500 font-medium">Low</div>
                <div className="text-lg font-bold">{tickets.filter((t) => t.priority === "low").length}</div>
              </div>
              <div className="rounded-md bg-yellow-100 dark:bg-yellow-900/20 p-2">
                <div className="text-xs text-yellow-500 font-medium">Medium</div>
                <div className="text-lg font-bold">{tickets.filter((t) => t.priority === "medium").length}</div>
              </div>
              <div className="rounded-md bg-orange-100 dark:bg-orange-900/20 p-2">
                <div className="text-xs text-orange-500 font-medium">High</div>
                <div className="text-lg font-bold">{tickets.filter((t) => t.priority === "high").length}</div>
              </div>
              <div className="rounded-md bg-red-100 dark:bg-red-900/20 p-2">
                <div className="text-xs text-red-500 font-medium">Critical</div>
                <div className="text-lg font-bold">{tickets.filter((t) => t.priority === "critical").length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <CardDescription>Average ticket age and response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{averageAge.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg. days open</p>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{oldTickets}</p>
                <p className="text-xs text-muted-foreground">Tickets &gt; 7 days</p>
              </div>
            </div>
          </div>
          {oldTickets > 0 && (
            <div className="mt-4 text-xs text-amber-500 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {oldTickets} ticket{oldTickets !== 1 ? "s" : ""} require attention
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
