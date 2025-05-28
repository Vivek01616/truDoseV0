"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchAnalyticsData } from "@/lib/features/analytics/analyticsSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { ResearchStudyTable } from "@/components/analytics/research-study-table"
import { OutcomeMetricsTable } from "@/components/analytics/outcome-metrics-table"

export default function AnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { treatmentAnalytics, researchStudies, outcomeMetrics, loading } = useSelector(
    (state: RootState) => state.analytics,
  )

  useEffect(() => {
    dispatch(fetchAnalyticsData())
  }, [dispatch])

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics & Research</h1>
        <p className="text-muted-foreground">Analyze treatment data and research outcomes</p>
      </div>

      <Tabs defaultValue="treatment">
        <TabsList className="mb-4">
          <TabsTrigger value="treatment">Treatment Analytics</TabsTrigger>
          <TabsTrigger value="research">Research Studies</TabsTrigger>
          <TabsTrigger value="outcomes">Outcome Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="treatment">
          <div className="grid gap-6 md:grid-cols-2">
            {loading ? (
              <div className="col-span-2 flex justify-center p-8">Loading analytics data...</div>
            ) : (
              treatmentAnalytics.map((analytic) => (
                <Card key={analytic.id}>
                  <CardHeader>
                    <CardTitle>{analytic.name}</CardTitle>
                    <CardDescription>
                      <span
                        className={
                          analytic.trend === "up"
                            ? "text-success"
                            : analytic.trend === "down"
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }
                      >
                        {analytic.trend === "up" ? "↑" : analytic.trend === "down" ? "↓" : "→"}{" "}
                        {analytic.changePercentage}% from previous period
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsChart data={analytic.data} />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research Studies</CardTitle>
              <CardDescription>Current and planned research initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading research studies...</div>
              ) : (
                <ResearchStudyTable data={researchStudies} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes">
          <Card>
            <CardHeader>
              <CardTitle>Outcome Metrics</CardTitle>
              <CardDescription>Treatment outcome measurements over time</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading outcome metrics...</div>
              ) : (
                <OutcomeMetricsTable data={outcomeMetrics} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
