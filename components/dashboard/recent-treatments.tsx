import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Treatment {
  id: string
  patientName: string
  date: string
  protocol: string
  outcome: "success" | "pending" | "failed"
}

interface RecentTreatmentsTableProps {
  treatments: Treatment[]
}

export function RecentTreatmentsTable({ treatments }: RecentTreatmentsTableProps) {
  const getOutcomeBadge = (outcome: Treatment["outcome"]) => {
    switch (outcome) {
      case "success":
        return <Badge className="bg-success">Success</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "failed":
        return <Badge className="bg-error">Failed</Badge>
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Protocol</TableHead>
          <TableHead>Outcome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {treatments.map((treatment) => (
          <TableRow key={treatment.id}>
            <TableCell className="font-medium">{treatment.id}</TableCell>
            <TableCell>{treatment.patientName}</TableCell>
            <TableCell>{new Date(treatment.date).toLocaleDateString()}</TableCell>
            <TableCell>{treatment.protocol}</TableCell>
            <TableCell>{getOutcomeBadge(treatment.outcome)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
