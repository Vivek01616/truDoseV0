"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Activity, BarChart3, FileText, LineChart } from "lucide-react"
import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

interface PatientDataVisualizationProps {
  patientId: string
}

export function PatientDataVisualization({ patientId }: PatientDataVisualizationProps) {
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "1y" | "all">("6m")

  // Mock data - in a real app, this would be fetched based on patientId and timeRange
  const treatmentData = generateTreatmentData(timeRange)
  const outcomeData = generateOutcomeData(timeRange)
  const surveyData = generateSurveyData(timeRange)
  const comparisonData = generateComparisonData()

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Patient Data Analysis</CardTitle>
            <CardDescription>Visualizing treatment outcomes and patient progress</CardDescription>
          </div>
          <Tabs
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as "3m" | "6m" | "1y" | "all")}
            className="w-[250px]"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="6m">6M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="outcomes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="outcomes" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>Outcomes</span>
            </TabsTrigger>
            <TabsTrigger value="treatments" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              <span>Treatments</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Surveys</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Comparison</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="outcomes" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Pain & Mobility Scores Over Time</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={outcomeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="painScore"
                      name="Pain Score"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilityScore"
                      name="Mobility Score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Pain scores are on a scale of 0-10 (lower is better). Mobility scores are on a scale of 0-10 (higher
                  is better).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Overall Improvement</h3>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Pain Reduction", value: 65 },
                          { name: "Remaining Pain", value: 35 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#ef4444" />
                        <Cell fill="#f3f4f6" />
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-center">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">65% Pain Reduction</Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Mobility Improvement</h3>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Mobility Gained", value: 70 },
                          { name: "Mobility Gap", value: 30 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f3f4f6" />
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-center">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">70% Mobility Improvement</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Treatment Effectiveness</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={treatmentData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="beforeScore" name="Before Treatment" fill="#94a3b8" />
                    <Bar dataKey="afterScore" name="After Treatment" fill="#22c55e" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Comparing pain scores before and after each treatment session (lower is better).</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Treatment Timeline</h3>
              <div className="relative pl-6 border-l-2 border-muted space-y-6 py-2">
                {treatmentData.map((treatment, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[22px] h-4 w-4 rounded-full bg-primary"></div>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h4 className="font-medium">{treatment.name}</h4>
                      <time className="text-sm text-muted-foreground">{treatment.date}</time>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        Pain: {treatment.beforeScore} → {treatment.afterScore}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          treatment.effectiveness > 7
                            ? "bg-green-100 text-green-800"
                            : treatment.effectiveness > 4
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        Effectiveness: {treatment.effectiveness}/10
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{treatment.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Patient Satisfaction Over Time</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={surveyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      name="Satisfaction Score"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Patient satisfaction scores from post-treatment surveys (scale of 0-10).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Survey Completion Rate</h3>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: 85 },
                          { name: "Missed", value: 15 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#f3f4f6" />
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-center">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">85% Completion Rate</Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Key Survey Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Experience</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">9.2/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Staff Helpfulness</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">9.5/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Treatment Explanation</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">8.9/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Facility Cleanliness</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">9.7/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wait Time</span>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">7.8/10</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Patient vs. Population Average</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={comparisonData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="patient" name="This Patient" fill="#0ea5e9" />
                    <Bar dataKey="average" name="Population Average" fill="#94a3b8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Comparing this patient's outcomes to the average for similar patients with the same condition and
                  treatment protocol.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Recovery Time Comparison</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">This Patient</span>
                      <span className="text-sm font-medium">4.5 weeks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Population Average</span>
                      <span className="text-sm font-medium">6.2 weeks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Best Case</span>
                      <span className="text-sm font-medium">3.8 weeks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Recovery time to reach 70% improvement</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Treatment Effectiveness Percentile</h3>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-bold">78th</div>
                      <div className="text-sm ml-1">percentile</div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset="62.2"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-center text-sm text-muted-foreground">
                  <p>This patient's treatment effectiveness is better than 78% of similar patients</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Helper functions to generate mock data
function generateTreatmentData(timeRange: "3m" | "6m" | "1y" | "all") {
  const treatments = [
    {
      name: "Initial PRP Treatment",
      date: "Jan 15, 2023",
      beforeScore: 8.5,
      afterScore: 6.2,
      effectiveness: 6,
      notes: "Patient reported mild discomfort during procedure but tolerated well.",
    },
    {
      name: "Follow-up PRP Treatment",
      date: "Feb 20, 2023",
      beforeScore: 6.2,
      afterScore: 4.8,
      effectiveness: 7,
      notes: "Continued improvement observed. Patient reported less discomfort during procedure.",
    },
    {
      name: "Third PRP Treatment",
      date: "Apr 5, 2023",
      beforeScore: 4.8,
      afterScore: 3.1,
      effectiveness: 8,
      notes: "Significant improvement in mobility and reduction in pain.",
    },
    {
      name: "Final PRP Treatment",
      date: "May 25, 2023",
      beforeScore: 3.1,
      afterScore: 1.8,
      effectiveness: 9,
      notes: "Excellent response to treatment. Patient very satisfied with results.",
    },
  ]

  // Filter based on time range
  if (timeRange === "3m") {
    return treatments.slice(2)
  } else if (timeRange === "6m") {
    return treatments.slice(1)
  } else {
    return treatments
  }
}

function generateOutcomeData(timeRange: "3m" | "6m" | "1y" | "all") {
  const outcomes = [
    { date: "Jan 10, 2023", painScore: 8.5, mobilityScore: 3.2 },
    { date: "Jan 25, 2023", painScore: 7.8, mobilityScore: 4.0 },
    { date: "Feb 15, 2023", painScore: 6.5, mobilityScore: 5.1 },
    { date: "Mar 10, 2023", painScore: 5.7, mobilityScore: 5.8 },
    { date: "Apr 5, 2023", painScore: 4.2, mobilityScore: 6.5 },
    { date: "Apr 25, 2023", painScore: 3.5, mobilityScore: 7.2 },
    { date: "May 15, 2023", painScore: 2.8, mobilityScore: 7.9 },
    { date: "Jun 10, 2023", painScore: 2.0, mobilityScore: 8.5 },
  ]

  // Filter based on time range
  if (timeRange === "3m") {
    return outcomes.slice(4)
  } else if (timeRange === "6m") {
    return outcomes.slice(1)
  } else {
    return outcomes
  }
}

function generateSurveyData(timeRange: "3m" | "6m" | "1y" | "all") {
  const surveys = [
    { date: "Jan 20, 2023", satisfaction: 7.5, completed: true },
    { date: "Feb 25, 2023", satisfaction: 8.2, completed: true },
    { date: "Apr 10, 2023", satisfaction: 8.8, completed: true },
    { date: "May 30, 2023", satisfaction: 9.3, completed: true },
  ]

  // Filter based on time range
  if (timeRange === "3m") {
    return surveys.slice(2)
  } else if (timeRange === "6m") {
    return surveys.slice(1)
  } else {
    return surveys
  }
}

function generateComparisonData() {
  return [
    {
      name: "Pain Reduction",
      patient: 78,
      average: 65,
    },
    {
      name: "Mobility Gain",
      patient: 70,
      average: 60,
    },
    {
      name: "Recovery Speed",
      patient: 85,
      average: 70,
    },
    {
      name: "Treatment Sessions",
      patient: 4,
      average: 5,
    },
    {
      name: "Satisfaction",
      patient: 92,
      average: 85,
    },
  ]
}
