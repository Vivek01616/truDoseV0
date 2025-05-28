"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchClinicById, fetchHospitalById } from "@/lib/features/clinic/clinicSlice"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ClinicInfoCard } from "@/components/clinics/clinic-info-card"
import { ClinicCapabilitiesCard } from "@/components/clinics/clinic-capabilities-card"
import { HospitalInfoCard } from "@/components/clinics/hospital-info-card"

export default function ClinicDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedClinic, selectedHospital, loading, error } = useSelector((state: RootState) => state.clinic)

  useEffect(() => {
    const clinicId = params.id as string
    if (clinicId) {
      dispatch(fetchClinicById(clinicId))
        .unwrap()
        .then((clinic) => {
          if (clinic && clinic.hospitalId) {
            dispatch(fetchHospitalById(clinic.hospitalId))
          }
        })
        .catch((error) => {
          console.error("Failed to fetch clinic details:", error)
        })
    }
  }, [dispatch, params.id])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading clinic details...</div>
  }

  // if (error) {
  //   return <div className="text-red-500 p-4">{error}</div>
  // }

  if (!selectedClinic) {
    return <div className="text-red-500 p-4">Clinic not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{selectedClinic.name}</h1>
          <p className="text-muted-foreground">Clinic details and information</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="hospital">Parent Hospital</TabsTrigger>
          <TabsTrigger value="staff">Staff & Equipment</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-6">
          <ClinicInfoCard clinic={selectedClinic} />
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-6 mt-6">
          <ClinicCapabilitiesCard clinic={selectedClinic} />
        </TabsContent>

        <TabsContent value="hospital" className="space-y-6 mt-6">
          {selectedHospital ? (
            <HospitalInfoCard hospital={selectedHospital} />
          ) : (
            <div className="p-4 border rounded-md">Hospital information not available</div>
          )}
        </TabsContent>

        <TabsContent value="staff" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaffCard clinic={selectedClinic} />
            <EquipmentCard clinic={selectedClinic} />
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6 mt-6">
          <ClinicMetricsCard clinic={selectedClinic} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Internal components for staff, equipment, and metrics sections

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import type { Clinic } from "@/lib/features/clinic/clinicSlice"
import { UsersRound, Stethoscope, GraduationCap, Microscope, Laptop, Wrench } from "lucide-react"

function StaffCard({ clinic }: { clinic: Clinic }) {
  // Mock staff data
  const staffBreakdown = {
    physicians: Math.floor(clinic.certifiedStaff * 0.3),
    nurses: Math.floor(clinic.certifiedStaff * 0.4),
    technicians: Math.floor(clinic.certifiedStaff * 0.2),
    administrative:
      clinic.certifiedStaff -
      Math.floor(clinic.certifiedStaff * 0.3) -
      Math.floor(clinic.certifiedStaff * 0.4) -
      Math.floor(clinic.certifiedStaff * 0.2),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersRound className="h-5 w-5" />
          Staff Information
        </CardTitle>
        <CardDescription>Staff breakdown and certification status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 border rounded-md">
            <div className="bg-primary/10 p-2 rounded-full">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Physicians</p>
              <p className="font-medium">{staffBreakdown.physicians}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-md">
            <div className="bg-primary/10 p-2 rounded-full">
              <UsersRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nurses</p>
              <p className="font-medium">{staffBreakdown.nurses}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-md">
            <div className="bg-primary/10 p-2 rounded-full">
              <Microscope className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Technicians</p>
              <p className="font-medium">{staffBreakdown.technicians}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-md">
            <div className="bg-primary/10 p-2 rounded-full">
              <Laptop className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Administrative</p>
              <p className="font-medium">{staffBreakdown.administrative}</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">Certification Status</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Last inspection date: {new Date(clinic.lastInspection).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">
            PRP administration certification valid until {new Date(clinic.certificationExpiry).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Staff Training Records
        </Button>
      </CardFooter>
    </Card>
  )
}

function EquipmentCard({ clinic }: { clinic: Clinic }) {
  // Mock equipment data based on clinic capabilities
  const equipmentBreakdown = {
    centrifuges: Math.ceil(clinic.equipmentCount * 0.4),
    processing: Math.ceil(clinic.equipmentCount * 0.3),
    injectionSystems: Math.floor(clinic.equipmentCount * 0.2),
    other:
      clinic.equipmentCount -
      Math.ceil(clinic.equipmentCount * 0.4) -
      Math.ceil(clinic.equipmentCount * 0.3) -
      Math.floor(clinic.equipmentCount * 0.2),
  }

  // Calculate maintenance status
  const maintenanceStatus = {
    needsMaintenance: Math.floor(clinic.equipmentCount * 0.15),
    upToDate: clinic.equipmentCount - Math.floor(clinic.equipmentCount * 0.15),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Microscope className="h-5 w-5" />
          Equipment
        </CardTitle>
        <CardDescription>PRP processing equipment and maintenance status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Equipment Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>PRP Centrifuges</span>
              <span className="font-medium">{equipmentBreakdown.centrifuges}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Processing Systems</span>
              <span className="font-medium">{equipmentBreakdown.processing}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Injection Systems</span>
              <span className="font-medium">{equipmentBreakdown.injectionSystems}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Other Equipment</span>
              <span className="font-medium">{equipmentBreakdown.other}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">Maintenance Status</h4>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Up to date</span>
              <span className="font-medium">{maintenanceStatus.upToDate} devices</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-600">Needs maintenance</span>
              <span className="font-medium">{maintenanceStatus.needsMaintenance} devices</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Equipment Records
        </Button>
      </CardFooter>
    </Card>
  )
}

function ClinicMetricsCard({ clinic }: { clinic: Clinic }) {
  // Calculate mock metrics based on the clinic data
  const currentDate = new Date()
  const startDate = new Date(currentDate)
  startDate.setFullYear(startDate.getFullYear() - 1)

  // Monthly data points (12 months)
  const monthlyPatients = Array.from({ length: 12 }, (_, i) => {
    const baseValue = Math.floor(clinic.annualPatientVolume / 12)
    // Add some variation
    return baseValue + Math.floor(Math.random() * (baseValue * 0.2)) - Math.floor(baseValue * 0.1)
  })

  // Calculate derived metrics
  const totalPrpTreatments = Math.floor(clinic.annualPatientVolume * 0.6) // 60% of patients get PRP
  const avgTreatmentsPerPatient = (totalPrpTreatments / (clinic.annualPatientVolume * 0.4)).toFixed(1)
  const returnRate = Math.floor(Math.random() * 20 + 70) // 70-90% return rate

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Annual patient volume and treatment statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <h4 className="text-muted-foreground text-sm">Annual Patient Volume</h4>
            <p className="text-2xl font-bold">{clinic.annualPatientVolume.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Patients per year</p>
          </div>
          <div className="p-4 border rounded-md">
            <h4 className="text-muted-foreground text-sm">PRP Treatments</h4>
            <p className="text-2xl font-bold">{totalPrpTreatments.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Annual treatments</p>
          </div>
          <div className="p-4 border rounded-md">
            <h4 className="text-muted-foreground text-sm">Return Rate</h4>
            <p className="text-2xl font-bold">{returnRate}%</p>
            <p className="text-xs text-muted-foreground">Patient satisfaction</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Treatment Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Avg. treatments per patient</span>
              <span className="font-medium">{avgTreatmentsPerPatient}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Patient-to-staff ratio</span>
              <span className="font-medium">{Math.floor(clinic.annualPatientVolume / clinic.certifiedStaff)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Treatments per equipment</span>
              <span className="font-medium">{Math.floor(totalPrpTreatments / clinic.equipmentCount)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Top Treatment Types</h4>
          <div className="space-y-2">{generateTreatmentTypes(clinic)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock treatment types based on specialties
function generateTreatmentTypes(clinic: Clinic) {
  const treatmentMap: Record<string, { name: string; percentage: number }[]> = {
    "Sports Medicine": [
      { name: "Joint Injections", percentage: 40 },
      { name: "Muscle Recovery", percentage: 35 },
      { name: "Tendon Repair", percentage: 25 },
    ],
    Orthopedics: [
      { name: "Arthritis Management", percentage: 45 },
      { name: "Post-Surgery Recovery", percentage: 30 },
      { name: "Bone Healing", percentage: 25 },
    ],
    Dermatology: [
      { name: "Skin Rejuvenation", percentage: 55 },
      { name: "Scar Reduction", percentage: 25 },
      { name: "Wound Healing", percentage: 20 },
    ],
    "Pain Management": [
      { name: "Chronic Pain Management", percentage: 50 },
      { name: "Nerve Pain", percentage: 30 },
      { name: "Joint Pain", percentage: 20 },
    ],
    "Hair Restoration": [
      { name: "Hair Growth Treatment", percentage: 80 },
      { name: "Scalp Health", percentage: 20 },
    ],
    "Cosmetic Procedures": [
      { name: "Facial Rejuvenation", percentage: 60 },
      { name: "Skin Texture Improvement", percentage: 40 },
    ],
    "Joint Replacement": [
      { name: "Pre-Surgical Preparation", percentage: 40 },
      { name: "Post-Surgical Recovery", percentage: 60 },
    ],
  }

  // Get treatments based on clinic specialties
  const topTreatments: { name: string; percentage: number }[] = []

  clinic.specialties.forEach((specialty) => {
    if (treatmentMap[specialty]) {
      topTreatments.push(...treatmentMap[specialty])
    }
  })

  // Sort and limit to top 5
  const result = topTreatments.sort((a, b) => b.percentage - a.percentage).slice(0, 5)

  return result.map((treatment, index) => (
    <div key={index} className="flex justify-between items-center text-sm">
      <span>{treatment.name}</span>
      <span className="font-medium">{treatment.percentage}%</span>
    </div>
  ))
}
