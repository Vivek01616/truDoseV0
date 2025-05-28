"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from the Redux store
const barData = [
  { name: "Standard PRP", value: 87 },
  { name: "Advanced PRP", value: 92 },
  { name: "Leukocyte-Rich", value: 76 },
  { name: "Platelet-Poor", value: 65 },
]

const lineData = [
  { name: "Jan", value: 24 },
  { name: "Feb", value: 28 },
  { name: "Mar", value: 32 },
  { name: "Apr", value: 40 },
  { name: "May", value: 45 },
  { name: "Jun", value: 52 },
]

interface DashboardChartProps {
  type: "bar" | "line"
}

export function DashboardChart({ type }: DashboardChartProps) {
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Success Rate"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E0E0E0",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" fill="#005566" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineData}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(value) => [value, "Treatments"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#005566"
          strokeWidth={2}
          dot={{ r: 4, fill: "#005566" }}
          activeDot={{ r: 6, fill: "#005566" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
