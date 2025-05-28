"use client"

import { useState, useEffect } from "react"
import { Building2, MoreHorizontal, MapPin, Phone, Mail, Users, Stethoscope } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Hospital {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  type: "academic" | "community" | "specialty" | "rural"
  accreditation: string
  accreditationExpiry: string
  totalBeds: number
  status: "active" | "pending" | "inactive"
  clinicCount: number
  providerCount: number
  patientCount: number
  deviceCount: number
}

export function HospitalsList() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setHospitals([
        {
          id: "hospital-001",
          name: "Northwest Medical Center",
          address: "123 Medical Parkway",
          city: "Seattle",
          state: "WA",
          zip: "98101",
          phone: "(206) 555-1234",
          email: "info@nwmedical.example.com",
          type: "academic",
          accreditation: "Joint Commission",
          accreditationExpiry: "2025-06-30",
          totalBeds: 450,
          status: "active",
          clinicCount: 12,
          providerCount: 87,
          patientCount: 4250,
          deviceCount: 32,
        },
        {
          id: "hospital-002",
          name: "Eastside Health System",
          address: "456 Wellness Blvd",
          city: "Bellevue",
          state: "WA",
          zip: "98004",
          phone: "(425) 555-5678",
          email: "contact@eastsidehealth.example.com",
          type: "community",
          accreditation: "DNV GL Healthcare",
          accreditationExpiry: "2024-09-15",
          totalBeds: 280,
          status: "active",
          clinicCount: 8,
          providerCount: 54,
          patientCount: 3180,
          deviceCount: 24,
        },
        {
          id: "hospital-003",
          name: "South County Medical Center",
          address: "789 Healthcare Drive",
          city: "Renton",
          state: "WA",
          zip: "98057",
          phone: "(253) 555-9012",
          email: "info@southcountymed.example.com",
          type: "community",
          accreditation: "Joint Commission",
          accreditationExpiry: "2024-11-20",
          totalBeds: 180,
          status: "active",
          clinicCount: 5,
          providerCount: 32,
          patientCount: 2150,
          deviceCount: 18,
        },
        {
          id: "hospital-004",
          name: "Pacific Specialty Hospital",
          address: "101 Specialist Way",
          city: "Tacoma",
          state: "WA",
          zip: "98402",
          phone: "(253) 555-3456",
          email: "info@pacificspecialty.example.com",
          type: "specialty",
          accreditation: "AAAHC",
          accreditationExpiry: "2025-03-10",
          totalBeds: 120,
          status: "active",
          clinicCount: 3,
          providerCount: 28,
          patientCount: 1580,
          deviceCount: 12,
        },
        {
          id: "hospital-005",
          name: "Cascade Rural Health Center",
          address: "222 Mountain View Road",
          city: "North Bend",
          state: "WA",
          zip: "98045",
          phone: "(425) 555-7890",
          email: "info@cascadehealth.example.com",
          type: "rural",
          accreditation: "DNV GL Healthcare",
          accreditationExpiry: "2024-08-15",
          totalBeds: 75,
          status: "active",
          clinicCount: 1,
          providerCount: 12,
          patientCount: 950,
          deviceCount: 5,
        },
        {
          id: "hospital-006",
          name: "Metro University Hospital",
          address: "333 University Ave",
          city: "Seattle",
          state: "WA",
          zip: "98105",
          phone: "(206) 555-4567",
          email: "info@metrouniversity.example.com",
          type: "academic",
          accreditation: "Joint Commission",
          accreditationExpiry: "2025-05-20",
          totalBeds: 520,
          status: "active",
          clinicCount: 15,
          providerCount: 110,
          patientCount: 5800,
          deviceCount: 38,
        },
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{hospital.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Hospital</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Clinics</DropdownMenuItem>
                  <DropdownMenuItem>View Providers</DropdownMenuItem>
                  <DropdownMenuItem>View Patients</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {hospital.city}, {hospital.state}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Hospital Type</h4>
                <Badge variant="secondary" className="capitalize">
                  {hospital.type}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Total Beds</p>
                  <p className="text-lg font-medium">{hospital.totalBeds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accreditation</p>
                  <p className="text-sm font-medium">{hospital.accreditation}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-sm">{hospital.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="grid grid-cols-4 w-full text-center">
              <div className="flex flex-col items-center">
                <Building2 className="h-4 w-4 text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Clinics</span>
                <span className="text-sm font-medium">{hospital.clinicCount}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-4 w-4 text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Providers</span>
                <span className="text-sm font-medium">{hospital.providerCount}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-4 w-4 text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Patients</span>
                <span className="text-sm font-medium">{hospital.patientCount}</span>
              </div>
              <div className="flex flex-col items-center">
                <Stethoscope className="h-4 w-4 text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Devices</span>
                <span className="text-sm font-medium">{hospital.deviceCount}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
