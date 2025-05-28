"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface MetricData {
  month: string
  patientSatisfaction: number
  treatmentSuccess: number
  readmissionRate: number
}

export function HospitalMetricsChart() {
  const [data, setData] = useState<MetricData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        {
          month: "Jan",
          patientSatisfaction: 85,
          treatmentSuccess: 78,
          readmissionRate: 12,
        },
        {
          month: "Feb",
          patientSatisfaction: 83,
          treatmentSuccess: 80,
          readmissionRate: 11,
        },
        {
          month: "Mar",
          patientSatisfaction: 86,
          treatmentSuccess: 82,
          readmissionRate: 10,
        },
        {
          month: "Apr",
          patientSatisfaction: 88,
          treatmentSuccess: 85,
          readmissionRate: 9,
        },
        {
          month: "May",
          patientSatisfaction: 90,
          treatmentSuccess: 87,
          readmissionRate: 8,
        },
        {
          month: "Jun",
          patientSatisfaction: 92,
          treatmentSuccess: 88,
          readmissionRate: 7,
        },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="h-[350px] bg-gray-200 animate-pulse rounded-md" />
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="patientSatisfaction" name="Patient Satisfaction %" fill="#005566" />
        <Bar dataKey="treatmentSuccess" name="Treatment Success %" fill="#4DB6AC" />
        <Bar dataKey="readmissionRate" name="Readmission Rate %" fill="#E0E0E0" />
      </BarChart>
    </ResponsiveContainer>
  )
}
