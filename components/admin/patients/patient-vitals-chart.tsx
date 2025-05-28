"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PatientVitalsChartProps {
  patientId: string
}

// Mock platelet count data
const mockPlateletData = [
  { date: "2023-01-15", count: 250 },
  { date: "2023-02-15", count: 245 },
  { date: "2023-03-15", count: 260 },
  { date: "2023-04-15", count: 270 },
  { date: "2023-05-15", count: 255 },
]

// Mock other lab values
const mockHemoglobinData = [
  { date: "2023-01-15", value: 14.0 },
  { date: "2023-02-15", value: 14.1 },
  { date: "2023-03-15", value: 14.3 },
  { date: "2023-04-15", value: 14.2 },
  { date: "2023-05-15", value: 14.2 },
]

const mockCRPData = [
  { date: "2023-01-15", value: 2.5 },
  { date: "2023-02-15", value: 2.3 },
  { date: "2023-03-15", value: 2.0 },
  { date: "2023-04-15", value: 1.8 },
  { date: "2023-05-15", value: 2.1 },
]

export function PatientVitalsChart({ patientId }: PatientVitalsChartProps) {
  return (
    <Tabs defaultValue="platelets" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="platelets">Platelet Count</TabsTrigger>
        <TabsTrigger value="hemoglobin">Hemoglobin</TabsTrigger>
        <TabsTrigger value="crp">C-Reactive Protein</TabsTrigger>
      </TabsList>
      <TabsContent value="platelets">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockPlateletData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[200, 300]} />
            <Tooltip
              formatter={(value) => [`${value} K/µL`, "Platelet Count"]}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Platelet Count"
              stroke="#005566"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="hemoglobin">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockHemoglobinData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[13, 15]} />
            <Tooltip
              formatter={(value) => [`${value} g/dL`, "Hemoglobin"]}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Hemoglobin"
              stroke="#4DB6AC"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="crp">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockCRPData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} />
            <Tooltip
              formatter={(value) => [`${value} mg/L`, "C-Reactive Protein"]}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="C-Reactive Protein"
              stroke="#FF5722"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}
