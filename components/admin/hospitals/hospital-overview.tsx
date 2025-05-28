"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalMetricsChart } from "./hospital-metrics-chart"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Building2, Stethoscope, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
// First import the necessary UI components at the top of the file
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface HospitalData {
  id: string
  name: string
  type: "academic" | "community" | "specialty" | "rural"
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  website: string
  beds: number
  clinicCount: number
  providerCount: number
  patientCount: number
  deviceCount: number
  status: "active" | "pending" | "inactive"
  accreditation: string
  lastInspection: string
  nextInspection: string
  notes: string
}

export function HospitalOverview({ hospitalId }: { hospitalId: string }) {
  const [hospital, setHospital] = useState<HospitalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  // Then, update the useState for formData to initialize with defined values
  const [formData, setFormData] = useState<Partial<HospitalData>>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    website: "",
    notes: "",
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const data: HospitalData = {
        id: hospitalId,
        name: "Northwest Medical Center",
        type: "academic",
        address: "123 Medical Parkway",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1234",
        email: "info@nwmedical.example.com",
        website: "https://nwmedical.example.com",
        beds: 450,
        clinicCount: 12,
        providerCount: 320,
        patientCount: 15000,
        deviceCount: 85,
        status: "active",
        accreditation: "Joint Commission",
        lastInspection: "2023-03-15",
        nextInspection: "2024-03-15",
        notes:
          "Northwest Medical Center is a leading academic hospital with a focus on research and advanced treatments.",
      }
      setHospital(data)
      setFormData({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        email: data.email,
        website: data.website,
        notes: data.notes,
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [hospitalId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : { [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server here
    if (hospital && formData) {
      setHospital({ ...hospital, ...formData })
    }
    setEditMode(false)
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-md" />
        ))}
        <div className="md:col-span-2 lg:col-span-4 h-64 bg-gray-200 animate-pulse rounded-md" />
      </div>
    )
  }

  if (!hospital) {
    return <div>Hospital not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospital.beds}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant={hospital.status === "active" ? "default" : "secondary"}>{hospital.status}</Badge>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Associated Clinics</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospital.clinicCount}</div>
            <p className="text-xs text-muted-foreground">Across multiple specialties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospital.providerCount}</div>
            <p className="text-xs text-muted-foreground">Physicians and staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devices</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospital.deviceCount}</div>
            <p className="text-xs text-muted-foreground">Active medical devices</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Hospital Details</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hospital Information</CardTitle>
                  <CardDescription>View and manage hospital details</CardDescription>
                </div>
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)}>Edit Details</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!editMode ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="font-medium">Address:</span> {hospital.address}, {hospital.city},{" "}
                        {hospital.state} {hospital.zip}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {hospital.phone}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {hospital.email}
                      </div>
                      <div>
                        <span className="font-medium">Website:</span>{" "}
                        <a href={hospital.website} className="text-blue-600 hover:underline">
                          {hospital.website}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Hospital Details</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        {hospital.type.charAt(0).toUpperCase() + hospital.type.slice(1)}
                      </div>
                      <div>
                        <span className="font-medium">Accreditation:</span> {hospital.accreditation}
                      </div>
                      <div>
                        <span className="font-medium">Last Inspection:</span> {hospital.lastInspection}
                      </div>
                      <div>
                        <span className="font-medium">Next Inspection:</span> {hospital.nextInspection}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium">Notes</h3>
                    <p className="mt-2">{hospital.notes}</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Hospital Name</Label>
                      <Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address || ""} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city || ""} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state || ""} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP</Label>
                        <Input id="zip" name="zip" value={formData.zip || ""} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={formData.website || ""} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Latest compliance information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Accreditation Status</span>
                    </div>
                    <Badge variant="outline">{hospital.accreditation}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Last Inspection</span>
                    </div>
                    <span>{hospital.lastInspection}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>Next Inspection</span>
                    </div>
                    <span>{hospital.nextInspection}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patient Statistics</CardTitle>
                <CardDescription>Overview of patient data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Total Patients</span>
                    </div>
                    <span>{hospital.patientCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Active Patients</span>
                    </div>
                    <span>{Math.round(hospital.patientCount * 0.65).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>New Patients (30 days)</span>
                    </div>
                    <span>{Math.round(hospital.patientCount * 0.03).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <HospitalMetricsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
