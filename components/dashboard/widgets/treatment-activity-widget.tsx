"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format, subDays } from "date-fns"

export function TreatmentActivityWidget() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock data
    const mockData = generateTreatmentData()
    setData(mockData)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center">Loading treatment data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Total Treatments</div>
          <div className="text-xl font-bold">12,568</div>
          <div className="text-xs text-green-500 mt-1">+156 from last month</div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <div className="text-xl font-bold">428</div>
          <div className="text-xs text-muted-foreground mt-1">Currently in progress</div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
          <div className="text-xl font-bold">87%</div>
          <div className="text-xs text-green-500 mt-1">+2.3% from last month</div>
        </div>
      </div>

      <div className="h-[200px] border rounded-lg p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="treatments"
              name="Treatments"
              stroke="#005566"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="completions"
              name="Completions"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Helper function to generate mock data
function generateTreatmentData() {
  const data = []
  for (let i = 0; i < 10; i++) {
    const date = format(subDays(new Date(), 10 - i), "MMM d")
    const baseValue = 100 + i * 10
    const treatments = baseValue + Math.floor(Math.random() * 30)
    const completions = treatments - Math.floor(Math.random() * 20)

    data.push({
      date,
      treatments,
      completions,
    })
  }
  return data
}
