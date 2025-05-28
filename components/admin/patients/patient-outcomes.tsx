"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PatientOutcomesProps {
  patientId: string
}

// Mock outcome data
const mockPainData = [
  { date: "2023-02-15", value: 8, treatment: "Initial Assessment" },
  { date: "2023-03-15", value: 6, treatment: "First Treatment" },
  { date: "2023-04-15", value: 5, treatment: "Follow-up" },
  { date: "2023-05-10", value: 3, treatment: "Second Treatment" },
  { date: "2023-06-10", value: 2, treatment: "Follow-up" },
]

const mockMobilityData = [
  { date: "2023-02-15", value: 4, treatment: "Initial Assessment" },
  { date: "2023-03-15", value: 5, treatment: "First Treatment" },
  { date: "2023-04-15", value: 6, treatment: "Follow-up" },
  { date: "2023-05-10", value: 7, treatment: "Second Treatment" },
  { date: "2023-06-10", value: 8, treatment: "Follow-up" },
]

const mockSatisfactionData = [
  { date: "2023-03-15", value: 7, treatment: "First Treatment" },
  { date: "2023-05-10", value: 9, treatment: "Second Treatment" },
]

export function PatientOutcomes({ patientId }: PatientOutcomesProps) {
  return (
    <Card className="border-[#E0E0E0]">
      <CardHeader>
        <CardTitle className="text-lg">Treatment Outcomes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pain" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pain">Pain Score</TabsTrigger>
            <TabsTrigger value="mobility">Mobility Score</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>
          <TabsContent value="pain" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockPainData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    formatter={(value, name) => [`${value}/10`, "Pain Score"]}
                    labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Pain Score"
                    stroke="#D32F2F"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Pain score has decreased from 8/10 to 2/10 over the course of treatment, indicating significant
                improvement in the patient's condition.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="mobility" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockMobilityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    formatter={(value, name) => [`${value}/10`, "Mobility Score"]}
                    labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Mobility Score"
                    stroke="#4CAF50"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Mobility score has increased from 4/10 to 8/10 over the course of treatment, showing substantial
                improvement in the patient's range of motion and functional capacity.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="satisfaction" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockSatisfactionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    formatter={(value, name) => [`${value}/10`, "Satisfaction Score"]}
                    labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Satisfaction Score"
                    stroke="#005566"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Patient satisfaction has increased from 7/10 to 9/10 between the first and second treatments, indicating
                high satisfaction with the treatment process and outcomes.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
