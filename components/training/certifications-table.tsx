"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProviderCertification } from "@/lib/features/training/trainingSlice"

interface CertificationsTableProps {
  certifications: ProviderCertification[]
}

export function CertificationsTable({ certifications }: CertificationsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Provider</TableHead>
          <TableHead>Certification Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Issue Date</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Issuing Authority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certifications.map((certification) => (
          <TableRow key={certification.id}>
            <TableCell className="font-medium">{certification.providerName}</TableCell>
            <TableCell>{certification.certificationType}</TableCell>
            <TableCell>{getStatusBadge(certification.status)}</TableCell>
            <TableCell>{certification.issueDate}</TableCell>
            <TableCell>{certification.expiryDate}</TableCell>
            <TableCell>{certification.issuingAuthority}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
