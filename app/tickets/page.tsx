"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchTickets, type Ticket } from "@/lib/features/ticket/ticketSlice"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/lib/utils"
import { TicketStats } from "@/components/tickets/ticket-stats"

export default function TicketsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { tickets, loading, metrics } = useSelector((state: RootState) => state.ticket)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "all") return true
    if (activeTab === "open") return ticket.status === "open"
    if (activeTab === "in_progress") return ticket.status === "in_progress"
    if (activeTab === "waiting") return ticket.status === "waiting"
    if (activeTab === "resolved") return ticket.status === "resolved" || ticket.status === "closed"
    return true
  })

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        return <div className="font-mono text-xs">{id.split("-")[1]}</div>
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.getValue("title") as string
        return <div className="font-medium">{title}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "open"
                ? "default"
                : status === "in_progress"
                  ? "secondary"
                  : status === "waiting"
                    ? "outline"
                    : "success"
            }
          >
            {status.replace("_", " ")}
          </Badge>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <Badge
            variant="outline"
            className={
              priority === "low"
                ? "border-blue-500 text-blue-500"
                : priority === "medium"
                  ? "border-yellow-500 text-yellow-500"
                  : priority === "high"
                    ? "border-orange-500 text-orange-500"
                    : "border-red-500 text-red-500"
            }
          >
            {priority}
          </Badge>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return <div className="capitalize">{row.getValue("type") as string}</div>
      },
    },
    {
      accessorKey: "createdByName",
      header: "Created By",
    },
    {
      accessorKey: "assignedToName",
      header: "Assigned To",
      cell: ({ row }) => {
        const assignedTo = row.getValue("assignedToName") as string | undefined
        return assignedTo || "Unassigned"
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string
        return formatDate(date)
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as string
        return formatDate(date)
      },
    },
  ]

  const handleRowClick = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticketing System</h1>
          <p className="text-muted-foreground">Manage support tickets and requests</p>
        </div>
        <Button onClick={() => router.push("/tickets/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <TicketStats tickets={tickets} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOpen}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalOpen > 0 ? "Requiring attention" : "All tickets resolved"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageResolutionTime.toFixed(1)} hrs</div>
            <p className="text-xs text-muted-foreground">Based on {metrics.totalClosed} resolved tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.byPriority.high + metrics.byPriority.critical}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.byPriority.critical > 0 && `${metrics.byPriority.critical} critical`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.byType.technical}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.byType.technical / tickets.length) * 100)}% of all tickets
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <DataTable
            columns={columns}
            data={filteredTickets}
            searchKey="title"
            searchPlaceholder="Search tickets..."
            onRowClick={handleRowClick}
            filterableColumns={[
              {
                id: "priority",
                title: "Priority",
                options: [
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                  { label: "Critical", value: "critical" },
                ],
              },
              {
                id: "type",
                title: "Type",
                options: [
                  { label: "Technical", value: "technical" },
                  { label: "Billing", value: "billing" },
                  { label: "Clinical", value: "clinical" },
                  { label: "Administrative", value: "administrative" },
                  { label: "Other", value: "other" },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="open" className="mt-6">
          <DataTable
            columns={columns}
            data={filteredTickets}
            searchKey="title"
            searchPlaceholder="Search open tickets..."
            onRowClick={handleRowClick}
          />
        </TabsContent>

        <TabsContent value="in_progress" className="mt-6">
          <DataTable
            columns={columns}
            data={filteredTickets}
            searchKey="title"
            searchPlaceholder="Search in-progress tickets..."
            onRowClick={handleRowClick}
          />
        </TabsContent>

        <TabsContent value="waiting" className="mt-6">
          <DataTable
            columns={columns}
            data={filteredTickets}
            searchKey="title"
            searchPlaceholder="Search waiting tickets..."
            onRowClick={handleRowClick}
          />
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <DataTable
            columns={columns}
            data={filteredTickets}
            searchKey="title"
            searchPlaceholder="Search resolved tickets..."
            onRowClick={handleRowClick}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
