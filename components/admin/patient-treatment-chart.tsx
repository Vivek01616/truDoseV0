"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface TreatmentData {
  month: string
  treatments: number
}

export function PatientTreatmentChart() {
  const [data, setData] = useState<TreatmentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { month: "Jan", treatments: 420 },
        { month: "Feb", treatments: 380 },
        { month: "Mar", treatments: 510 },
        { month: "Apr", treatments: 580 },
        { month: "May", treatments: 620 },
        { month: "Jun", treatments: 670 },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full bg-gray-200 animate-pulse rounded-md" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "0.375rem" }}
          formatter={(value) => [`${value} treatments`, "Volume"]}
        />
        <Bar dataKey="treatments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
