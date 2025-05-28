"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OutcomeMetric } from "@/lib/features/analytics/analyticsSlice"

interface OutcomeMetricsTableProps {
  data: OutcomeMetric[]
}

export function OutcomeMetricsTable({ data }: OutcomeMetricsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Protocol</TableHead>
          <TableHead>Baseline</TableHead>
          <TableHead>3 Months</TableHead>
          <TableHead>6 Months</TableHead>
          <TableHead>12 Months</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((metric) => (
          <TableRow key={metric.id}>
            <TableCell className="font-medium">{metric.name}</TableCell>
            <TableCell>{metric.condition}</TableCell>
            <TableCell>{metric.protocol}</TableCell>
            <TableCell>{metric.baseline ?? "N/A"}</TableCell>
            <TableCell>{metric.threeMonths ?? "N/A"}</TableCell>
            <TableCell>{metric.sixMonths ?? "N/A"}</TableCell>
            <TableCell>{metric.twelveMonths ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
