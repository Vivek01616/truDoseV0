"use client"

import type React from "react"

import { Building2, Users, Stethoscope } from "lucide-react"
import { useEffect, useState } from "react"

export function StatsWidget() {
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
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Hospitals"
        value={stats.hospitals.value}
        change={stats.hospitals.change}
        changeType={stats.hospitals.changeType}
        icon={<Building2 className="h-4 w-4" />}
      />
      <StatCard
        title="Clinics"
        value={stats.clinics.value}
        change={stats.clinics.change}
        changeType={stats.clinics.changeType}
        icon={<Building2 className="h-4 w-4" />}
      />
      <StatCard
        title="Patients"
        value={stats.patients.value}
        change={stats.patients.change}
        changeType={stats.patients.changeType}
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Devices"
        value={stats.devices.value}
        change={stats.devices.change}
        changeType={stats.devices.changeType}
        icon={<Stethoscope className="h-4 w-4" />}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ReactNode
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="rounded-full bg-primary/10 p-1.5">{icon}</div>
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div
        className={`text-xs mt-1 ${
          changeType === "increase" ? "text-green-500" : changeType === "decrease" ? "text-red-500" : "text-gray-500"
        }`}
      >
        {change}
      </div>
    </div>
  )
}
