"use client"

import { useEffect, useState } from "react"
import { Building2, User, Stethoscope, FileText, Calendar } from "lucide-react"

interface Activity {
  id: string
  type: "hospital" | "clinic" | "patient" | "device" | "protocol"
  action: string
  entity: string
  timestamp: string
  user: string
}

export function RecentActivityList() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActivities([
        {
          id: "act-001",
          type: "hospital",
          action: "added",
          entity: "Northwest Medical Center",
          timestamp: "10 minutes ago",
          user: "Admin User",
        },
        {
          id: "act-002",
          type: "clinic",
          action: "updated",
          entity: "Orthopedic & Sports Medicine",
          timestamp: "1 hour ago",
          user: "System Admin",
        },
        {
          id: "act-003",
          type: "patient",
          action: "viewed",
          entity: "Patient #12345",
          timestamp: "2 hours ago",
          user: "Data Analyst",
        },
        {
          id: "act-004",
          type: "device",
          action: "registered",
          entity: "PRP-2000 Device #A12B34",
          timestamp: "3 hours ago",
          user: "System Admin",
        },
        {
          id: "act-005",
          type: "protocol",
          action: "reviewed",
          entity: "Standard PRP Protocol v2.1",
          timestamp: "5 hours ago",
          user: "Medical Director",
        },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "hospital":
      case "clinic":
        return <Building2 className="h-4 w-4" />
      case "patient":
        return <User className="h-4 w-4" />
      case "device":
        return <Stethoscope className="h-4 w-4" />
      case "protocol":
        return <FileText className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="rounded-full bg-gray-100 p-2">{getIcon(activity.type)}</div>
          <div>
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
              <span className="font-medium">{activity.entity}</span>
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
