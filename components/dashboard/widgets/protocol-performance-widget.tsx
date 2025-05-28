"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ProtocolPerformanceWidget() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { name: "Standard PRP", successRate: 87, color: "#3b82f6" },
        { name: "Advanced PRP", successRate: 92, color: "#10b981" },
        { name: "Leukocyte-Rich", successRate: 89, color: "#8b5cf6" },
        { name: "Platelet-Poor", successRate: 78, color: "#f59e0b" },
        { name: "Custom Protocol A", successRate: 94, color: "#ef4444" },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center">Loading protocol data...</div>
  }

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: 80, bottom: 5 }}>
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Success Rate"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="successRate" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
