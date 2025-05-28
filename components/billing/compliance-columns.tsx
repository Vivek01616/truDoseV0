"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { ComplianceReport } from "@/lib/features/billing/billingSlice"

export const columns: ColumnDef<ComplianceReport>[] = [
  {
    accessorKey: "name",
    header: "Report Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status")
      const variant = status === "compliant" ? "success" : status === "pending" ? "warning" : "destructive"

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "issues",
    header: "Issues",
    cell: ({ row }) => {
      const issues: any[] = row.getValue("issues")
      return issues.length > 0 ? issues.length : "None"
    },
  },
]
