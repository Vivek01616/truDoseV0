"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Ticket, TicketPriority, TicketType } from "@/lib/features/ticket/ticketSlice"
import { formatDate } from "@/lib/utils"
import { ArrowRight, Clock, TicketIcon, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TicketMetricsProps {
  tickets: Ticket[]
  metrics: {
    totalOpen: number
    totalClosed: number
    byPriority: Record<TicketPriority, number>
    byType: Record<TicketType, number>
    averageResolutionTime: number
  }
  loading: boolean
}

export function TicketMetrics({ tickets, metrics, loading }: TicketMetricsProps) {
  // Prepare data for status distribution chart
  const statusData = [
    { name: "Open", value: tickets.filter((t) => t.status === "open").length, color: "#2563eb" },
    { name: "In Progress", value: tickets.filter((t) => t.status === "in_progress").length, color: "#8b5cf6" },
    { name: "Waiting", value: tickets.filter((t) => t.status === "waiting").length, color: "#f59e0b" },
    { name: "Resolved", value: tickets.filter((t) => t.status === "resolved").length, color: "#10b981" },
    { name: "Closed", value: tickets.filter((t) => t.status === "closed").length, color: "#6b7280" },
  ].filter((item) => item.value > 0)

  // Prepare data for priority distribution chart
  const priorityData = [
    { name: "Critical", value: metrics.byPriority.critical, color: "#ef4444" },
    { name: "High", value: metrics.byPriority.high, color: "#f97316" },
    { name: "Medium", value: metrics.byPriority.medium, color: "#f59e0b" },
    { name: "Low", value: metrics.byPriority.low, color: "#3b82f6" },
  ].filter((item) => item.value > 0)

  // Prepare data for ticket type distribution
  const typeData = [
    { name: "Technical", value: metrics.byType.technical },
    { name: "Billing", value: metrics.byType.billing },
    { name: "Clinical", value: metrics.byType.clinical },
    { name: "Administrative", value: metrics.byType.administrative },
    { name: "Other", value: metrics.byType.other },
  ].filter((item) => item.value > 0)

  // Calculate ticket age metrics
  const ticketAges = tickets
    .filter((t) => t.status !== "resolved" && t.status !== "closed")
    .map((ticket) => {
      const created = new Date(ticket.createdAt).getTime()
      const now = new Date().getTime()
      return Math.floor((now - created) / (1000 * 60 * 60 * 24)) // Age in days
    })

  const oldTickets = ticketAges.filter((age) => age > 7).length
  const veryOldTickets = ticketAges.filter((age) => age > 14).length

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOpen}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalOpen > 0 ? "Requiring attention" : "All tickets resolved"}
            </p>
            {metrics.totalOpen > 0 && (
              <div className="mt-2">
                <Progress
                  value={Math.round((metrics.totalClosed / (metrics.totalOpen + metrics.totalClosed)) * 100)}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((metrics.totalClosed / (metrics.totalOpen + metrics.totalClosed)) * 100)}% resolution rate
                </p>
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
            <div className="text-2xl font-bold">{metrics.averageResolutionTime.toFixed(1)} hrs</div>
            <p className="text-xs text-muted-foreground">Based on {metrics.totalClosed} resolved tickets</p>
            {oldTickets > 0 && (
              <div className="mt-2 flex items-center text-xs text-amber-500">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {oldTickets} ticket{oldTickets !== 1 ? "s" : ""} older than 7 days
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.byPriority.high + metrics.byPriority.critical}</div>
            {metrics.byPriority.critical > 0 && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {metrics.byPriority.critical} critical issue{metrics.byPriority.critical !== 1 ? "s" : ""}
              </div>
            )}
            <div className="mt-2">
              <Progress
                value={Math.round(((metrics.byPriority.high + metrics.byPriority.critical) / tickets.length) * 100)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(((metrics.byPriority.high + metrics.byPriority.critical) / tickets.length) * 100)}% of all
                tickets
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalClosed > 0
                ? `${Math.round((metrics.totalClosed / (metrics.totalOpen + metrics.totalClosed)) * 100)}%`
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalClosed} resolved out of {metrics.totalOpen + metrics.totalClosed} total
            </p>
            <div className="mt-2">
              <Progress
                value={Math.round((metrics.totalClosed / (metrics.totalOpen + metrics.totalClosed)) * 100)}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Status Distribution</CardTitle>
            <CardDescription>Current distribution of tickets by status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading chart data...</div>
            ) : statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tickets`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No ticket data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Type Distribution</CardTitle>
            <CardDescription>Breakdown of tickets by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading chart data...</div>
            ) : typeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} tickets`, "Count"]} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No ticket data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Support Tickets</CardTitle>
            <CardDescription>Latest support requests and issues</CardDescription>
          </div>
          <Link href="/tickets">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <p>Loading tickets...</p>
            ) : tickets.length > 0 ? (
              [...tickets] // Create a copy of the array before sorting
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((ticket) => (
                  <div key={ticket.id} className="flex items-start justify-between border-b pb-4">
                    <div className="space-y-1">
                      <Link href={`/tickets/${ticket.id}`} className="font-medium hover:underline">
                        {ticket.title}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>#{ticket.id.split("-")[1]}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.createdAt)}</span>
                        <span>•</span>
                        <span>{ticket.createdByName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          ticket.status === "open"
                            ? "default"
                            : ticket.status === "in_progress"
                              ? "secondary"
                              : ticket.status === "waiting"
                                ? "outline"
                                : "success"
                        }
                      >
                        {ticket.status.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          ticket.priority === "low"
                            ? "border-blue-500 text-blue-500"
                            : ticket.priority === "medium"
                              ? "border-yellow-500 text-yellow-500"
                              : ticket.priority === "high"
                                ? "border-orange-500 text-orange-500"
                                : "border-red-500 text-red-500"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground">No tickets available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
