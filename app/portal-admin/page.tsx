"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchPortalData } from "@/lib/features/portal/portalSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { ResourcesGrid } from "@/components/portal/resources-grid"
import { TemplatesTable } from "@/components/portal/templates-table"

export default function PortalAdminPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { educationResources, communicationTemplates, loading } = useSelector((state: RootState) => state.portal)

  useEffect(() => {
    dispatch(fetchPortalData())
  }, [dispatch])

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Patient Portal Administration</h1>
        <p className="text-muted-foreground">Manage the patient education portal</p>
      </div>

      <Tabs defaultValue="resources">
        <TabsList className="mb-4">
          <TabsTrigger value="resources">Education Resources</TabsTrigger>
          <TabsTrigger value="templates">Communication Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Education Resources</CardTitle>
              <CardDescription>Manage patient education materials</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading education resources...</div>
              ) : (
                <ResourcesGrid resources={educationResources} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Communication Templates</CardTitle>
              <CardDescription>Manage patient communication templates</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading communication templates...</div>
              ) : (
                <TemplatesTable templates={communicationTemplates} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
