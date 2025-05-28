"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CommunicationTemplate } from "@/lib/features/portal/portalSlice"
import { formatDistanceToNow } from "date-fns"

interface TemplatesTableProps {
  templates: CommunicationTemplate[]
}

export function TemplatesTable({ templates }: TemplatesTableProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "email":
        return <Badge variant="default">Email</Badge>
      case "sms":
        return <Badge variant="secondary">SMS</Badge>
      case "portal":
        return <Badge variant="outline">Portal</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Template Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead>Usage Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell className="font-medium">{template.name}</TableCell>
            <TableCell>{getTypeBadge(template.type)}</TableCell>
            <TableCell>{template.category}</TableCell>
            <TableCell>{getStatusBadge(template.status)}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(template.lastModified), { addSuffix: true })}</TableCell>
            <TableCell>{template.usageCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
