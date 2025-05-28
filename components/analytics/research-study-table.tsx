"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ResearchStudy } from "@/lib/features/analytics/analyticsSlice"

interface ResearchStudyTableProps {
  data: ResearchStudy[]
}

export function ResearchStudyTable({ data }: ResearchStudyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Principal Investigator</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Participants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((study) => (
          <TableRow key={study.id}>
            <TableCell className="font-medium">{study.title}</TableCell>
            <TableCell>{study.principalInvestigator}</TableCell>
            <TableCell>
              <Badge
                variant={study.status === "active" ? "success" : study.status === "planned" ? "warning" : "default"}
              >
                {study.status}
              </Badge>
            </TableCell>
            <TableCell>{study.startDate}</TableCell>
            <TableCell>{study.participantCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
