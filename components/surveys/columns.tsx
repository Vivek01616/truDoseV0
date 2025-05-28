"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Eye, Send, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type {
  SurveyTemplate,
  SurveyResponse,
  SurveyAssignment,
  SurveyQuestion,
} from "@/lib/features/survey/surveySlice"

// Survey template columns
export const templateColumns: ColumnDef<SurveyTemplate>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const template = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{template.title || "Untitled"}</div>
          {template.isActive ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Inactive
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string | undefined
      if (!category)
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Unknown
          </Badge>
        )

      const categoryColors: Record<string, string> = {
        patient: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        provider: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        clinic: "bg-teal-100 text-teal-800 hover:bg-teal-100",
        research: "bg-amber-100 text-amber-800 hover:bg-amber-100",
        feedback: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
      }
      return (
        <Badge variant="outline" className={categoryColors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => {
      const questions = row.getValue("questions") as SurveyQuestion[] | undefined
      return <div className="text-center">{questions?.length || 0}</div>
    },
  },
  {
    accessorKey: "responseCount",
    header: "Responses",
    cell: ({ row }) => {
      const count = row.getValue("responseCount") as number | undefined
      return <div className="text-center">{count || 0}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string | undefined
      return updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : "Never"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const template = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/surveys/${template.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/surveys/builder?template=${template.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/surveys/assign?template=${template.id}`}>
                <Send className="mr-2 h-4 w-4" />
                Assign
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/surveys/builder?clone=${template.id}`}>
                <Copy className="mr-2 h-4 w-4" />
                Clone
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Survey response columns
export const responseColumns: ColumnDef<SurveyResponse>[] = [
  {
    accessorKey: "surveyTitle",
    header: "Survey",
    cell: ({ row }) => {
      const response = row.original
      return <div className="font-medium">{response.surveyTitle || "Unknown Survey"}</div>
    },
  },
  {
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => {
      const patientName = row.getValue("patientName") as string | undefined
      return patientName ? <div>{patientName}</div> : <div className="text-muted-foreground">N/A</div>
    },
  },
  {
    accessorKey: "providerName",
    header: "Provider",
    cell: ({ row }) => {
      const providerName = row.getValue("providerName") as string | undefined
      return providerName ? <div>{providerName}</div> : <div className="text-muted-foreground">N/A</div>
    },
  },
  {
    accessorKey: "clinicName",
    header: "Clinic",
    cell: ({ row }) => {
      const clinicName = row.getValue("clinicName") as string | undefined
      return clinicName ? <div>{clinicName}</div> : <div className="text-muted-foreground">N/A</div>
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => {
      const submittedAt = row.getValue("submittedAt") as string | undefined
      return submittedAt ? formatDistanceToNow(new Date(submittedAt), { addSuffix: true }) : "Not submitted"
    },
  },
  {
    accessorKey: "completionTime",
    header: "Time to Complete",
    cell: ({ row }) => {
      const completionTime = row.getValue("completionTime") as number | undefined
      if (!completionTime) return "N/A"
      const minutes = Math.floor(completionTime / 60)
      const seconds = completionTime % 60
      return `${minutes}m ${seconds}s`
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const response = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/surveys/responses/${response.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      )
    },
  },
]

// Survey assignment columns
export const assignmentColumns: ColumnDef<SurveyAssignment>[] = [
  {
    accessorKey: "surveyTitle",
    header: "Survey",
    cell: ({ row }) => {
      const assignment = row.original
      return <div className="font-medium">{assignment.surveyTitle || "Unknown Survey"}</div>
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as SurveyAssignment["assignedTo"] | undefined
      if (!assignedTo) {
        return <div className="text-muted-foreground">Unknown</div>
      }

      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 capitalize">
            {assignedTo.type || "unknown"}
          </Badge>
          {assignedTo.name ? (
            <span>{assignedTo.name}</span>
          ) : assignedTo.type === "all" ? (
            <span>All Users</span>
          ) : (
            <span className="text-muted-foreground">Unknown</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined
      if (!status)
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Unknown
          </Badge>
        )

      const statusColors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        completed: "bg-green-100 text-green-800 hover:bg-green-100",
        expired: "bg-red-100 text-red-800 hover:bg-red-100",
      }
      return (
        <Badge variant="outline" className={statusColors[status] || "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "assignedAt",
    header: "Assigned",
    cell: ({ row }) => {
      const assignedAt = row.getValue("assignedAt") as string | undefined
      return assignedAt ? formatDistanceToNow(new Date(assignedAt), { addSuffix: true }) : "Not assigned"
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | undefined
      return dueDate ? formatDistanceToNow(new Date(dueDate), { addSuffix: true }) : "No deadline"
    },
  },
  {
    accessorKey: "remindersSent",
    header: "Reminders",
    cell: ({ row }) => {
      const remindersSent = row.getValue("remindersSent") as number | undefined
      return <div className="text-center">{remindersSent || 0}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/surveys/assignments/${assignment.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={assignment.status === "completed"}>
              <Send className="mr-2 h-4 w-4" />
              Send Reminder
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Cancel Assignment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
