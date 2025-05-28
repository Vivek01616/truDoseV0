"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts"

interface ProtocolData {
  name: string
  successRate: number
}

export function ProtocolPerformanceChart() {
  const [data, setData] = useState<ProtocolData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { name: "Standard PRP", successRate: 87 },
        { name: "Advanced PRP", successRate: 92 },
        { name: "Leukocyte-Rich", successRate: 89 },
        { name: "Platelet-Poor", successRate: 78 },
        { name: "Custom Protocol A", successRate: 94 },
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

  const colors = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b", "#ef4444"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 120, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <YAxis type="category" dataKey="name" />
        <Tooltip
          contentStyle={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "0.375rem" }}
          formatter={(value) => [`${value}%`, "Success Rate"]}
        />
        <Bar dataKey="successRate" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
