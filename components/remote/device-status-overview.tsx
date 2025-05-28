"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wifi, WifiOff, AlertTriangle, PenToolIcon as Tool } from "lucide-react"

interface DeviceStatusOverviewProps {
  title: string
  count: number
  total: number
  status: "online" | "offline" | "maintenance" | "error"
}

export function DeviceStatusOverview({ title, count, total, status }: DeviceStatusOverviewProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0

  const getStatusIcon = () => {
    switch (status) {
      case "online":
        return <Wifi className="h-5 w-5 text-success" />
      case "offline":
        return <WifiOff className="h-5 w-5 text-muted-foreground" />
      case "maintenance":
        return <Tool className="h-5 w-5 text-warning" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-success"
      case "offline":
        return "text-muted-foreground"
      case "maintenance":
        return "text-warning"
      case "error":
        return "text-destructive"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">{getStatusIcon()}</div>
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-3xl font-bold">{count}</div>
          <div className="text-sm text-muted-foreground">{percentage}% of total devices</div>
          <div className={`text-sm ${getStatusColor()}`}>
            {status === "online"
              ? "Operational"
              : status === "offline"
                ? "Not Connected"
                : status === "maintenance"
                  ? "Under Maintenance"
                  : "Requires Attention"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
