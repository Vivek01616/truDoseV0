"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchTickets, type Ticket } from "@/lib/features/ticket/ticketSlice"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/lib/utils"

export default function MyTicketsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { tickets, loading } = useSelector((state: RootState) => state.ticket)

  // In a real app, we would filter by the current user's ID
  // For demo purposes, we'll just show all tickets
  const myTickets = tickets

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

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
          <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-muted-foreground">View and manage your support tickets</p>
        </div>
        <Button onClick={() => router.push("/tickets/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All My Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={myTickets}
            searchKey="title"
            searchPlaceholder="Search your tickets..."
            onRowClick={handleRowClick}
            filterableColumns={[
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "Open", value: "open" },
                  { label: "In Progress", value: "in_progress" },
                  { label: "Waiting", value: "waiting" },
                  { label: "Resolved", value: "resolved" },
                  { label: "Closed", value: "closed" },
                ],
              },
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
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
