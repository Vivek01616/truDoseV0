"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchTickets } from "@/lib/features/ticket/ticketSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketMetrics } from "@/components/dashboard/ticket-metrics"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function TicketsDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, metrics, loading } = useSelector((state: RootState) => state.ticket)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  if (loading && tickets.length === 0) {
    return <div className="flex items-center justify-center h-full">Loading ticket data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive view of support ticket metrics and status</p>
        </div>
        <Link href="/tickets/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <TicketMetrics tickets={tickets} metrics={metrics} loading={loading} />
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Volume Trends</CardTitle>
              <CardDescription>Monthly ticket volume over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {/* Placeholder for ticket trend chart */}
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Ticket trend visualization will be displayed here
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resolution Time Trends</CardTitle>
                <CardDescription>Average resolution time by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for resolution time trend chart */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Resolution time trend visualization will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Type Trends</CardTitle>
                <CardDescription>Distribution of ticket types over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for ticket type trend chart */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Ticket type trend visualization will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Team Performance</CardTitle>
              <CardDescription>Resolution metrics by support team member</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {/* Placeholder for team performance chart */}
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Support team performance metrics will be displayed here
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>First Response Time</CardTitle>
                <CardDescription>Average time to first response by priority</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for first response time chart */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  First response time visualization will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Satisfaction ratings for resolved tickets</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for satisfaction chart */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Customer satisfaction visualization will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
