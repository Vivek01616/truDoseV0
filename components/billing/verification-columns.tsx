"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { InsuranceVerification } from "@/lib/features/billing/billingSlice"

export const columns: ColumnDef<InsuranceVerification>[] = [
  {
    accessorKey: "patientName",
    header: "Patient",
  },
  {
    accessorKey: "insuranceProvider",
    header: "Insurance Provider",
  },
  {
    accessorKey: "policyNumber",
    header: "Policy Number",
  },
  {
    accessorKey: "verificationDate",
    header: "Verification Date",
  },
  {
    accessorKey: "coverageStatus",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("coverageStatus")
      const variant = status === "verified" ? "success" : status === "pending" ? "warning" : "destructive"

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "authorizationRequired",
    header: "Auth Required",
    cell: ({ row }) => {
      const required: boolean = row.getValue("authorizationRequired")
      return required ? "Yes" : "No"
    },
  },
]
