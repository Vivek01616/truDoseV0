"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface DeviceStatus {
  id: string
  name: string
  type: string
  status: "operational" | "maintenance" | "offline"
  utilization: number
  lastCalibration: string
  nextMaintenance: string
  location: string
}

export function DeviceStatusOverview() {
  const [devices, setDevices] = useState<DeviceStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDevices([
        {
          id: "dev-001",
          name: "PRP-2000 Alpha",
          type: "Standard Centrifuge",
          status: "operational",
          utilization: 78,
          lastCalibration: "2023-05-10",
          nextMaintenance: "2023-07-15",
          location: "Northwest Medical Center",
        },
        {
          id: "dev-002",
          name: "PRP-3000 Beta",
          type: "Advanced Separator",
          status: "maintenance",
          utilization: 45,
          lastCalibration: "2023-04-22",
          nextMaintenance: "2023-06-01",
          location: "Eastside Health Partners",
        },
        {
          id: "dev-003",
          name: "PRP-2500 Gamma",
          type: "Leukocyte Filter",
          status: "operational",
          utilization: 92,
          lastCalibration: "2023-05-18",
          nextMaintenance: "2023-08-01",
          location: "South County Medical Group",
        },
        {
          id: "dev-004",
          name: "PRP-1800 Delta",
          type: "Basic Centrifuge",
          status: "offline",
          utilization: 0,
          lastCalibration: "2023-03-05",
          nextMaintenance: "2023-06-05",
          location: "Rural Health Clinic",
        },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {devices.map((device) => (
        <Card key={device.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{device.name}</h3>
                <p className="text-sm text-gray-500">{device.type}</p>
              </div>
              <Badge
                variant={
                  device.status === "operational"
                    ? "default"
                    : device.status === "maintenance"
                      ? "warning"
                      : "destructive"
                }
              >
                {device.status}
              </Badge>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Utilization</span>
                  <span>{device.utilization}%</span>
                </div>
                <Progress value={device.utilization} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Last Calibration</p>
                  <p>{device.lastCalibration}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Maintenance</p>
                  <p>{device.nextMaintenance}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Location: {device.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
