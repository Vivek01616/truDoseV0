"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsWidget } from "@/components/dashboard/widgets/stats-widget"
import { TreatmentActivityWidget } from "@/components/dashboard/widgets/treatment-activity-widget"
import { HospitalMapWidget } from "@/components/dashboard/widgets/hospital-map-widget"
import { ProtocolPerformanceWidget } from "@/components/dashboard/widgets/protocol-performance-widget"
import { RecentActivityWidget } from "@/components/dashboard/widgets/recent-activity-widget"
import { PatientDemographicsWidget } from "@/components/dashboard/widgets/patient-demographics-widget"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  // Ensure we only render on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Define available widgets
  const availableWidgets = [
    {
      type: "stats",
      title: "Key Metrics",
      description: "Overview of hospitals, clinics, patients, and devices",
      defaultSize: "full" as const,
      category: "metrics" as const,
      component: StatsWidget,
    },
    {
      type: "treatment-activity",
      title: "Treatment Activity",
      description: "Overview of treatment sessions and outcomes",
      defaultSize: "medium" as const,
      category: "charts" as const,
      component: TreatmentActivityWidget,
    },
    {
      type: "hospital-map",
      title: "Hospital Distribution",
      description: "Geographic distribution of hospitals and clinics",
      defaultSize: "medium" as const,
      category: "management" as const,
      component: HospitalMapWidget,
    },
    {
      type: "protocol-performance",
      title: "Protocol Performance",
      description: "Success rates across different PRP protocols",
      defaultSize: "medium" as const,
      category: "charts" as const,
      component: ProtocolPerformanceWidget,
    },
    {
      type: "recent-activity",
      title: "Recent Activity",
      description: "Latest updates across the platform",
      defaultSize: "small" as const,
      category: "activity" as const,
      component: RecentActivityWidget,
    },
    {
      type: "patient-demographics",
      title: "Patient Demographics",
      description: "Age and gender distribution of patients",
      defaultSize: "small" as const,
      category: "charts" as const,
      component: PatientDemographicsWidget,
    },
  ]

  // Define default layout
  const defaultLayout = [
    {
      id: "stats-default",
      type: "stats",
      size: "full" as const,
      position: 0,
      visible: true,
    },
    {
      id: "treatment-activity-default",
      type: "treatment-activity",
      size: "medium" as const,
      position: 1,
      visible: true,
    },
    {
      id: "hospital-map-default",
      type: "hospital-map",
      size: "medium" as const,
      position: 2,
      visible: true,
    },
    {
      id: "recent-activity-default",
      type: "recent-activity",
      size: "small" as const,
      position: 3,
      visible: true,
    },
    {
      id: "protocol-performance-default",
      type: "protocol-performance",
      size: "medium" as const,
      position: 4,
      visible: true,
    },
    {
      id: "patient-demographics-default",
      type: "patient-demographics",
      size: "small" as const,
      position: 5,
      visible: true,
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardLayout availableWidgets={availableWidgets} defaultLayout={defaultLayout} />
    </div>
  )
}
