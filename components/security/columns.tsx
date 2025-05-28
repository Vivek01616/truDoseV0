"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
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
import type { User, Role, AuditLog } from "@/lib/features/security/securitySlice"

// User columns
export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{user.name}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return <div className="capitalize">{role}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "active" ? "default" : status === "pending" ? "outline" : "secondary"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLogin") as string
      return lastLogin ? formatDistanceToNow(new Date(lastLogin), { addSuffix: true }) : "Never"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
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
              <Link href={`/security/users/${user.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/security/users/${user.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
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

// Role columns
export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const role = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{role.name}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "userCount",
    header: "Users",
    cell: ({ row }) => {
      const count = row.getValue("userCount") as number
      return <div className="text-center">{count}</div>
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {permissions.includes("all") ? (
            <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              All Permissions
            </Badge>
          ) : (
            permissions.slice(0, 2).map((permission) => (
              <Badge key={permission} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                {permission.split(":")[1]}
              </Badge>
            ))
          )}
          {permissions.length > 2 && (
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              +{permissions.length - 2} more
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "isDefault",
    header: "Default",
    cell: ({ row }) => {
      const isDefault = row.getValue("isDefault") as boolean
      return isDefault ? (
        <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Default
        </Badge>
      ) : (
        <span>-</span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original
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
              <Link href={`/security/roles/${role.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/security/roles/${role.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" disabled={role.isDefault}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Audit log columns
export const auditLogColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    },
  },
  {
    accessorKey: "userName",
    header: "User",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.getValue("action") as string
      const actionColors: Record<string, string> = {
        login: "bg-green-100 text-green-800 hover:bg-green-100",
        logout: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        create: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        update: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        delete: "bg-red-100 text-red-800 hover:bg-red-100",
        view: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      }
      return (
        <Badge variant="outline" className={actionColors[action] || "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "resource",
    header: "Resource",
    cell: ({ row }) => {
      const resource = row.getValue("resource") as string
      return <div className="capitalize">{resource}</div>
    },
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const log = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/security/audit/${log.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
      )
    },
  },
]
