"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProviderById } from "@/lib/features/provider/providerSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Edit, Mail, MapPin, Phone, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ProviderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedProvider, loading, error } = useSelector((state: RootState) => state.provider)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProviderById(params.id as string))
    }
  }, [dispatch, params.id])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005566]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-md max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-medium text-red-700 mb-2">Error Loading Provider</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-red-600 mb-4">Provider ID: {params.id}</p>
        <Button variant="outline" className="border-[#005566] text-[#005566]" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    )
  }

  if (!selectedProvider) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-md max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-medium text-yellow-700 mb-2">Provider Not Found</h2>
        <p className="text-yellow-600 mb-4">The provider with ID {params.id} could not be found.</p>
        <Button variant="outline" className="border-[#005566] text-[#005566]" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Provider Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedProvider.name}</CardTitle>
                <CardDescription>{selectedProvider.specialty}</CardDescription>
              </div>
              <Badge
                className={`
                  ${selectedProvider.status === "active" ? "bg-green-100 text-green-800 border-green-300" : ""}
                  ${selectedProvider.status === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""}
                  ${selectedProvider.status === "inactive" ? "bg-red-100 text-red-800 border-red-300" : ""}
                `}
              >
                {selectedProvider.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{selectedProvider.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{selectedProvider.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{selectedProvider.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>License: {selectedProvider.licenseNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Hire Date: {selectedProvider.hireDate}</span>
            </div>

            <Separator />

            <div className="pt-2">
              <Button className="w-full bg-[#005566] hover:bg-[#004455]">
                <Edit className="mr-2 h-4 w-4" />
                Edit Provider
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Provider Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Clinic</h3>
                      <p>{selectedProvider.clinicName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Role</h3>
                      <p>{selectedProvider.role}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Certification</h3>
                      <p>{selectedProvider.certification}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">License Expiry</h3>
                      <p>{selectedProvider.licenseExpiry}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Last Active</h3>
                      <p>{selectedProvider.lastActive}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Treatment Count</h3>
                      <p>{selectedProvider.treatmentCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Patient Satisfaction</span>
                        <span className="text-sm font-medium">{selectedProvider.rating}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#4DB6AC] h-2 rounded-full"
                          style={{ width: `${(selectedProvider.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Treatment Efficiency</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#4DB6AC] h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Documentation Compliance</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#4DB6AC] h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Provider certifications will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Provider schedule will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Provider metrics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
