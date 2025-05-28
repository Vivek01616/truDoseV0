"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchBillingData } from "@/lib/features/billing/billingSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { DataTable } from "@/components/data-table/data-table"
import { columns as procedureColumns } from "@/components/billing/procedure-columns"
import { columns as verificationColumns } from "@/components/billing/verification-columns"
import { columns as complianceColumns } from "@/components/billing/compliance-columns"

export default function BillingPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { procedureCodes, insuranceVerifications, complianceReports, loading } = useSelector(
    (state: RootState) => state.billing,
  )

  useEffect(() => {
    dispatch(fetchBillingData())
  }, [dispatch])

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Billing & Compliance</h1>
        <p className="text-muted-foreground">Manage procedure coding and billing compliance</p>
      </div>

      <Tabs defaultValue="procedures">
        <TabsList className="mb-4">
          <TabsTrigger value="procedures">Procedure Codes</TabsTrigger>
          <TabsTrigger value="verifications">Insurance Verifications</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="procedures">
          <Card>
            <CardHeader>
              <CardTitle>Procedure Codes</CardTitle>
              <CardDescription>Manage PRP procedure codes and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading procedure codes...</div>
              ) : (
                <DataTable columns={procedureColumns} data={procedureCodes} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Verifications</CardTitle>
              <CardDescription>Track patient insurance verification status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading insurance verifications...</div>
              ) : (
                <DataTable columns={verificationColumns} data={insuranceVerifications} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Monitor billing compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">Loading compliance reports...</div>
              ) : (
                <DataTable columns={complianceColumns} data={complianceReports} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
