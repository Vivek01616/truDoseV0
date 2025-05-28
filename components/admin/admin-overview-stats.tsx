"use client"

import type React from "react"

import { Building2, Users, Stethoscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ElementType
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight mt-1">{value}</h3>
            <p
              className={`text-xs font-medium mt-1 ${
                changeType === "increase"
                  ? "text-green-500"
                  : changeType === "decrease"
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              {change}
            </p>
          </div>
          <div className="rounded-full bg-gray-100 p-3">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminOverviewStats() {
  const [stats, setStats] = useState({
    hospitals: { value: "0", change: "0%", changeType: "neutral" as const },
    clinics: { value: "0", change: "0%", changeType: "neutral" as const },
    patients: { value: "0", change: "0%", changeType: "neutral" as const },
    devices: { value: "0", change: "0%", changeType: "neutral" as const },
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        hospitals: { value: "24", change: "+2 (9.1%)", changeType: "increase" },
        clinics: { value: "87", change: "+5 (6.1%)", changeType: "increase" },
        patients: { value: "12,458", change: "+342 (2.8%)", changeType: "increase" },
        devices: { value: "156", change: "+3 (2.0%)", changeType: "increase" },
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Hospitals"
        value={stats.hospitals.value}
        change={stats.hospitals.change}
        changeType={stats.hospitals.changeType}
        icon={Building2}
      />
      <StatCard
        title="Total Clinics"
        value={stats.clinics.value}
        change={stats.clinics.change}
        changeType={stats.clinics.changeType}
        icon={Building2}
      />
      <StatCard
        title="Total Patients"
        value={stats.patients.value}
        change={stats.patients.change}
        changeType={stats.patients.changeType}
        icon={Users}
      />
      <StatCard
        title="Active Devices"
        value={stats.devices.value}
        change={stats.devices.change}
        changeType={stats.devices.changeType}
        icon={Stethoscope}
      />
    </div>
  )
}
