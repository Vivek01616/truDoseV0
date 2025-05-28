"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { ProcedureCode } from "@/lib/features/billing/billingSlice"

export const columns: ColumnDef<ProcedureCode>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("description")
      return <div className="max-w-[400px] truncate">{description}</div>
    },
  },
  {
    accessorKey: "fee",
    header: "Fee",
    cell: ({ row }) => {
      const fee: number = row.getValue("fee")
      return <div>${fee.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: string = row.getValue("category")
      return <Badge variant="outline">{category}</Badge>
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const active: boolean = row.getValue("active")
      return <Badge variant={active ? "success" : "destructive"}>{active ? "Active" : "Inactive"}</Badge>
    },
  },
]
