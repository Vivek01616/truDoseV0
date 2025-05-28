"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function PatientDemographicsWidget() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center">Loading demographics data...</div>
  }

  const ageData = [
    { name: "Under 30", value: 12, color: "#3b82f6" },
    { name: "30-45", value: 28, color: "#10b981" },
    { name: "46-60", value: 35, color: "#8b5cf6" },
    { name: "61-75", value: 20, color: "#f59e0b" },
    { name: "Over 75", value: 5, color: "#ef4444" },
  ]

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ageData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between mb-1 text-xs">
            <span>Male</span>
            <span>42%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-xs">
            <span>Female</span>
            <span>58%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: "58%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
