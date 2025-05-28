"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Building, Calendar, Hospital, Stethoscope, Users } from "lucide-react"
import { format, subDays } from "date-fns"
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
import Link from "next/link"

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")

  // Mock data - in a real app, this would be fetched based on timeRange
  const summaryStats = {
    hospitals: 12,
    clinics: 48,
    providers: 156,
    patients: 3842,
    treatments: 12568,
    activeTreatments: 428,
    successRate: 87,
    avgSatisfaction: 8.7,
  }

  const treatmentData = generateTreatmentData(timeRange)
  const patientData = generatePatientData(timeRange)
  const outcomeData = generateOutcomeData(timeRange)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of all Trudose operations and patient outcomes</p>
        </div>
        <Tabs
          value={timeRange}
          onValueChange={(v) => setTimeRange(v as "7d" | "30d" | "90d" | "1y")}
          className="w-[300px]"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Hospitals"
          value={summaryStats.hospitals}
          icon={<Hospital className="h-5 w-5" />}
          linkHref="/hospitals"
          linkText="View all hospitals"
        />
        <StatCard
          title="Total Clinics"
          value={summaryStats.clinics}
          icon={<Building className="h-5 w-5" />}
          linkHref="/clinics"
          linkText="View all clinics"
        />
        <StatCard
          title="Total Providers"
          value={summaryStats.providers}
          icon={<Stethoscope className="h-5 w-5" />}
          linkHref="/providers"
          linkText="View all providers"
        />
        <StatCard
          title="Total Patients"
          value={summaryStats.patients}
          icon={<Users className="h-5 w-5" />}
          linkHref="/patients"
          linkText="View all patients"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Activity</CardTitle>
            <CardDescription>Overview of treatment sessions and outcomes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Treatments</div>
                <div className="text-2xl font-bold">{summaryStats.treatments.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>
                    +{timeRange === "7d" ? "42" : timeRange === "30d" ? "156" : timeRange === "90d" ? "487" : "1,245"}{" "}
                    from previous period
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Active Treatments</div>
                <div className="text-2xl font-bold">{summaryStats.activeTreatments}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Currently in progress</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                <div className="text-2xl font-bold">{summaryStats.successRate}%</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+2.3% from previous period</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Treatment Trends</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={treatmentData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="treatments"
                      name="Treatments"
                      stroke="#0ea5e9"
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
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Outcomes</CardTitle>
            <CardDescription>Treatment effectiveness and patient satisfaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Avg. Pain Reduction</div>
                <div className="text-2xl font-bold">68%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Avg. Satisfaction</div>
                <div className="text-2xl font-bold">{summaryStats.avgSatisfaction}/10</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${summaryStats.avgSatisfaction * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Outcome Metrics</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={outcomeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Success Rate (%)" fill="#22c55e" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
            <CardDescription>Distribution of patients across hospitals and clinics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">New Patients Over Time</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={patientData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newPatients"
                      name="New Patients"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Patient Age Distribution</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Under 30</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">30-45</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">46-60</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">61-75</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Over 75</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Treatment Types</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Standard PRP", value: 45 },
                          { name: "Advanced PRP", value: 30 },
                          { name: "Leukocyte-Rich PRP", value: 15 },
                          { name: "Other", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#0ea5e9" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#22c55e" />
                        <Cell fill="#94a3b8" />
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-muted space-y-6 py-2">
                {generateRecentActivity().map((activity, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[22px] h-4 w-4 rounded-full ${activity.color}`}></div>
                    <div className="mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <time className="text-xs text-muted-foreground">{activity.time}</time>
                    </div>
                    <p className="text-sm">{activity.description}</p>
                    {activity.link && (
                      <Link
                        href={activity.link.href}
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        {activity.link.text}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  linkHref,
  linkText,
}: {
  title: string
  value: number
  icon: React.ReactNode
  linkHref: string
  linkText: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <Link href={linkHref} className="text-xs text-primary hover:underline mt-1 inline-block">
          {linkText}
        </Link>
      </CardContent>
    </Card>
  )
}

// Helper functions to generate mock data
function generateTreatmentData(timeRange: "7d" | "30d" | "90d" | "1y") {
  const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 10 : timeRange === "90d" ? 12 : 12
  const data = []

  for (let i = 0; i < dataPoints; i++) {
    const date = format(
      subDays(
        new Date(),
        (dataPoints - i) * (timeRange === "7d" ? 1 : timeRange === "30d" ? 3 : timeRange === "90d" ? 7 : 30),
      ),
      "MMM d",
    )

    // Generate some realistic looking data with an upward trend
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

function generatePatientData(timeRange: "7d" | "30d" | "90d" | "1y") {
  const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 10 : timeRange === "90d" ? 12 : 12
  const data = []

  for (let i = 0; i < dataPoints; i++) {
    const date = format(
      subDays(
        new Date(),
        (dataPoints - i) * (timeRange === "7d" ? 1 : timeRange === "30d" ? 3 : timeRange === "90d" ? 7 : 30),
      ),
      "MMM d",
    )

    // Generate some realistic looking data with an upward trend
    const baseValue = 20 + i
    const newPatients = baseValue + Math.floor(Math.random() * 10)

    data.push({
      date,
      newPatients,
    })
  }

  return data
}

function generateOutcomeData(timeRange: "7d" | "30d" | "90d" | "1y") {
  return [
    {
      name: "Knee Osteoarthritis",
      value: 92,
    },
    {
      name: "Shoulder Injuries",
      value: 88,
    },
    {
      name: "Tennis Elbow",
      value: 85,
    },
    {
      name: "Plantar Fasciitis",
      value: 82,
    },
    {
      name: "Hair Restoration",
      value: 78,
    },
    {
      name: "Facial Rejuvenation",
      value: 75,
    },
  ]
}

function generateRecentActivity() {
  return [
    {
      title: "New Hospital Onboarded",
      time: "2 hours ago",
      description: "Pacific Northwest Medical Center has been successfully onboarded to the platform.",
      color: "bg-green-500",
      link: {
        href: "/hospitals/h-123",
        text: "View hospital details",
      },
    },
    {
      title: "Treatment Protocol Updated",
      time: "5 hours ago",
      description: "The Advanced PRP protocol has been updated with new guidelines.",
      color: "bg-blue-500",
      link: {
        href: "/protocols/p-456",
        text: "View protocol changes",
      },
    },
    {
      title: "Patient Milestone Reached",
      time: "Yesterday",
      description: "We've reached 1,000 successful knee osteoarthritis treatments!",
      color: "bg-purple-500",
      link: null,
    },
    {
      title: "New Clinic Added",
      time: "2 days ago",
      description: "Eastside Sports Medicine Clinic has been added to Seattle General Hospital.",
      color: "bg-green-500",
      link: {
        href: "/clinics/c-789",
        text: "View clinic details",
      },
    },
    {
      title: "System Maintenance",
      time: "3 days ago",
      description: "Scheduled maintenance completed successfully with no downtime.",
      color: "bg-gray-500",
      link: null,
    },
  ]
}
