"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { RemoteDevice } from "@/lib/features/remote/remoteSlice"
import { formatDistanceToNow } from "date-fns"
import { Wifi, WifiOff, AlertTriangle, PenToolIcon as Tool, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface DeviceListProps {
  devices: RemoteDevice[]
}

export function DeviceList({ devices }: DeviceListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="h-4 w-4 text-success" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-muted-foreground" />
      case "maintenance":
        return <Tool className="h-4 w-4 text-warning" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge variant="success">Online</Badge>
      case "offline":
        return <Badge variant="outline">Offline</Badge>
      case "maintenance":
        return <Badge variant="warning">Maintenance</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return null
    }
  }

  const getConfigStatusBadge = (status: string) => {
    switch (status) {
      case "up-to-date":
        return <Badge variant="success">Up to date</Badge>
      case "update-available":
        return <Badge variant="warning">Update available</Badge>
      case "update-required":
        return <Badge variant="destructive">Update required</Badge>
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Device Name</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Clinic</TableHead>
          <TableHead>Last Connected</TableHead>
          <TableHead>Firmware</TableHead>
          <TableHead>Config Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.id}>
            <TableCell>{getStatusBadge(device.status)}</TableCell>
            <TableCell className="font-medium">{device.name}</TableCell>
            <TableCell>{device.model}</TableCell>
            <TableCell>{device.location}</TableCell>
            <TableCell>{device.clinicName}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(device.lastConnected), { addSuffix: true })}</TableCell>
            <TableCell>{device.firmwareVersion}</TableCell>
            <TableCell>{getConfigStatusBadge(device.configurationStatus)}</TableCell>
            <TableCell>
              <Link href={`/remote/${device.id}`} className="inline-flex items-center text-primary hover:underline">
                Details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
