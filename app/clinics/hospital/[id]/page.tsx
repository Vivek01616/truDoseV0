"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchHospitalById, fetchClinicsByHospitalId } from "@/lib/features/clinic/clinicSlice"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HospitalInfoCard } from "@/components/clinics/hospital-info-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function HospitalDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedHospital, clinics, loading, error } = useSelector((state: RootState) => state.clinic)

  useEffect(() => {
    const hospitalId = params.id as string
    dispatch(fetchHospitalById(hospitalId))
    dispatch(fetchClinicsByHospitalId(hospitalId))
  }, [dispatch, params.id])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading hospital details...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  if (!selectedHospital) {
    return <div className="text-red-500 p-4">Hospital not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{selectedHospital.name}</h1>
          <p className="text-muted-foreground">Hospital details and information</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Hospital Details</TabsTrigger>
          <TabsTrigger value="clinics">Associated Clinics</TabsTrigger>
          <TabsTrigger value="summary">Staff & Equipment</TabsTrigger>
          <TabsTrigger value="compliance">Reports & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-6">
          <HospitalInfoCard hospital={selectedHospital} />
          <HospitalAdditionalInfo hospital={selectedHospital} />
        </TabsContent>

        <TabsContent value="clinics" className="space-y-6 mt-6">
          {clinics && clinics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} onClick={() => router.push(`/clinics/${clinic.id}`)} />
              ))}
            </div>
          ) : (
            <div className="p-4 border rounded-md text-center">
              <p>No clinics associated with this hospital</p>
              <Button className="mt-4" onClick={() => router.push(`/clinics/new?hospitalId=${selectedHospital.id}`)}>
                Add Clinic
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="summary" className="space-y-6 mt-6">
          <HospitalSummary hospital={selectedHospital} clinics={clinics} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6 mt-6">
          <HospitalComplianceReport hospital={selectedHospital} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Internal components for hospital details page
import { ClipboardCheck, FileText, Calendar, ShieldCheck, BarChart4 } from "lucide-react"
import type { Clinic, Hospital } from "@/lib/features/clinic/clinicSlice"

function HospitalAdditionalInfo({ hospital }: { hospital: Hospital }) {
  // Mock additional hospital data
  const hospitalData = {
    departments: {
      emergency: hospital.type !== "specialty",
      surgery: true,
      pediatrics: hospital.type !== "specialty" && hospital.type !== "rural",
      cardiology: hospital.type !== "rural",
      neurology: hospital.type === "academic" || hospital.type === "specialty",
      orthopedics: true,
      oncology: hospital.type === "academic" || hospital.type === "specialty",
      radiology: true,
      laboratory: true,
      pharmacy: true,
    },
    foundation: {
      year: 1980 + Math.floor(Math.random() * 30),
      lastRenovation: 2010 + Math.floor(Math.random() * 12),
    },
    leadership: {
      ceo:
        "Dr. " +
        ["James Wilson", "Sarah Miller", "Robert Johnson", "Emily Chen", "Michael Davis"][
          Math.floor(Math.random() * 5)
        ],
      medicalDirector:
        "Dr. " +
        ["Jennifer Smith", "David Lee", "Lisa Brown", "Thomas Garcia", "Patricia White"][Math.floor(Math.random() * 5)],
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>Key details about the hospital</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Key Departments</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(hospitalData.departments)
              .filter(([_, exists]) => exists)
              .map(([dept, _]) => (
                <div key={dept} className="flex items-center gap-2">
                  <div className="bg-primary/10 rounded-full p-1">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm capitalize">{dept}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Foundation</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Founded</span>
                <span>{hospitalData.foundation.year}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Major Renovation</span>
                <span>{hospitalData.foundation.lastRenovation}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Leadership</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>CEO</span>
                <span>{hospitalData.leadership.ceo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medical Director</span>
                <span>{hospitalData.leadership.medicalDirector}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ClinicCard({ clinic, onClick }: { clinic: Clinic; onClick: () => void }) {
  // Calculate days until certification expires
  const today = new Date()
  const expiryDate = new Date(clinic.certificationExpiry)
  const daysRemaining = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{clinic.name}</CardTitle>
          <Badge
            variant={clinic.status === "active" ? "default" : clinic.status === "pending" ? "outline" : "secondary"}
          >
            {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>{clinic.department}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 space-y-4">
        <div className="text-sm flex flex-wrap gap-2">
          {clinic.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
          {clinic.specialties.length > 3 && <Badge variant="outline">+{clinic.specialties.length - 3} more</Badge>}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Staff</p>
            <p className="font-medium">{clinic.certifiedStaff}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Equipment</p>
            <p className="font-medium">{clinic.equipmentCount}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Certification</span>
            <span className={daysRemaining > 30 ? "text-green-600" : "text-amber-600"}>
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
            </span>
          </div>
          <Progress value={Math.max(0, Math.min(100, (daysRemaining / 365) * 100))} className="h-1" />
        </div>
      </CardContent>
    </Card>
  )
}

function HospitalSummary({ hospital, clinics }: { hospital: Hospital; clinics: Clinic[] }) {
  // Calculate summary statistics
  const totalStaff = clinics.reduce((sum, clinic) => sum + clinic.certifiedStaff, 0)
  const totalEquipment = clinics.reduce((sum, clinic) => sum + clinic.equipmentCount, 0)
  const totalPatientVolume = clinics.reduce((sum, clinic) => sum + clinic.annualPatientVolume, 0)

  // Calculate PRP capability counts
  const prpCapabilityCounts: Record<string, number> = {}
  clinics.forEach((clinic) => {
    clinic.prpCapabilities.forEach((capability) => {
      prpCapabilityCounts[capability] = (prpCapabilityCounts[capability] || 0) + 1
    })
  })

  // Calculate specialty counts
  const specialtyCounts: Record<string, number> = {}
  clinics.forEach((clinic) => {
    clinic.specialties.forEach((specialty) => {
      specialtyCounts[specialty] = (specialtyCounts[specialty] || 0) + 1
    })
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart4 className="h-5 w-5" />
            Summary Statistics
          </CardTitle>
          <CardDescription>Overview of all PRP-capable clinics in this hospital</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-muted-foreground text-xs">Total Clinics</h4>
              <p className="text-2xl font-bold">{clinics.length}</p>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-muted-foreground text-xs">Total Staff</h4>
              <p className="text-2xl font-bold">{totalStaff}</p>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-muted-foreground text-xs">PRP Equipment</h4>
              <p className="text-2xl font-bold">{totalEquipment}</p>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="text-muted-foreground text-xs">Annual Patients</h4>
              <p className="text-2xl font-bold">{totalPatientVolume.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>PRP Capabilities</CardTitle>
            <CardDescription>Available PRP treatment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(prpCapabilityCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([capability, count]) => (
                  <div key={capability} className="flex justify-between items-center">
                    <span>{capability}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">clinics</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
            <CardDescription>Medical specialties available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(specialtyCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([specialty, count]) => (
                  <div key={specialty} className="flex justify-between items-center">
                    <span>{specialty}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">clinics</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HospitalComplianceReport({ hospital }: { hospital: Hospital }) {
  // Mock compliance data
  const complianceData = {
    lastAudit: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    nextScheduledAudit: new Date(
      Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(),
    complianceScore: Math.floor(Math.random() * 10) + 90, // 90-99%
    recentReports: [
      {
        id: "rep-" + Math.random().toString(36).substring(2, 8),
        name: "Annual Compliance Review",
        date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Completed",
      },
      {
        id: "rep-" + Math.random().toString(36).substring(2, 8),
        name: "Quality Management Audit",
        date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Completed",
      },
      {
        id: "rep-" + Math.random().toString(36).substring(2, 8),
        name: "Staff Certification Review",
        date: new Date(Date.now() - Math.floor(Math.random() * 120) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Completed",
      },
      {
        id: "rep-" + Math.random().toString(36).substring(2, 8),
        name: "PRP Protocol Compliance",
        date: new Date(Date.now() - Math.floor(Math.random() * 150) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Completed",
      },
      {
        id: "rep-" + Math.random().toString(36).substring(2, 8),
        name: "Quarterly Safety Report",
        date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Scheduled",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Compliance Overview
          </CardTitle>
          <CardDescription>Accreditation and regulatory compliance status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="text-muted-foreground text-sm">Last Audit</h4>
              <p className="font-medium">{complianceData.lastAudit}</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="text-muted-foreground text-sm">Next Scheduled Audit</h4>
              <p className="font-medium">{complianceData.nextScheduledAudit}</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="text-muted-foreground text-sm">Compliance Score</h4>
              <p className="font-medium">{complianceData.complianceScore}%</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Accreditation Status
              </h4>
              <Badge variant="outline">{hospital.accreditation}</Badge>
            </div>
            <p className="text-sm">
              Certification valid until {new Date(hospital.accreditationExpiry).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Reports
          </CardTitle>
          <CardDescription>Compliance and regulatory reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceData.recentReports.map((report) => (
              <div key={report.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                </div>
                <Badge variant={report.status === "Completed" ? "default" : "outline"}>{report.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
