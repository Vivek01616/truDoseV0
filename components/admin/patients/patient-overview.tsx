"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Phone, Mail, Calendar, Building2, UserCog } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { PatientVitalsChart } from "./patient-vitals-chart"

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  gender: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  status: "active" | "inactive" | "pending"
  primaryProvider: string
  primaryProviderId: string
  primaryClinic: string
  primaryClinicId: string
  primaryHospital: string
  primaryHospitalId: string
  lastVisit: string | null
  nextAppointment: string | null
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  allergies: string[]
  medications: {
    name: string
    dosage: string
    frequency: string
  }[]
  medicalHistory: {
    condition: string
    diagnosisDate: string
    status: "active" | "resolved" | "managed"
  }[]
  prpEligibility: "eligible" | "conditional" | "ineligible"
  prpEligibilityNotes: string
  treatmentCount: number
  successRate: number
  notes: string
}

export function PatientOverview({ patientId }: { patientId: string }) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPatient({
        id: "patient-001",
        name: "John Smith",
        dateOfBirth: "1975-08-15",
        gender: "Male",
        email: "jsmith@example.com",
        phone: "(206) 555-1234",
        address: "123 Main St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        status: "active",
        primaryProvider: "Dr. Sarah Johnson",
        primaryProviderId: "provider-001",
        primaryClinic: "Orthopedic & Sports Medicine",
        primaryClinicId: "clinic-001",
        primaryHospital: "Northwest Medical Center",
        primaryHospitalId: "hospital-001",
        lastVisit: "2023-05-10",
        nextAppointment: "2023-06-10",
        emergencyContact: {
          name: "Mary Smith",
          relationship: "Spouse",
          phone: "(206) 555-5678",
        },
        allergies: ["Penicillin"],
        medications: [
          {
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
          },
        ],
        medicalHistory: [
          {
            condition: "Hypertension",
            diagnosisDate: "2020-05-01",
            status: "managed",
          },
          {
            condition: "Osteoarthritis - Right Knee",
            diagnosisDate: "2022-11-15",
            status: "active",
          },
        ],
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy based on condition and health status.",
        treatmentCount: 2,
        successRate: 100,
        notes:
          "Patient has responded well to initial PRP treatments for knee osteoarthritis. Considering a third treatment to maximize benefits.",
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [patientId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-64 bg-gray-200 animate-pulse rounded-md" />
        </div>
        <div className="h-80 bg-gray-200 animate-pulse rounded-md" />
      </div>
    )
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Basic information and demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-3">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {patient.gender} • {new Date(patient.dateOfBirth).toLocaleDateString()} (
                    {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years)
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">
                    {patient.address}, {patient.city}, {patient.state} {patient.zip}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{patient.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{patient.email}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Emergency Contact</h3>
                <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
                <p className="text-sm text-gray-500">{patient.emergencyContact.relationship}</p>
                <p className="text-sm text-gray-500">{patient.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Allergies, medications, and medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Allergies</h3>
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No known allergies</p>
                )}
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Medications</h3>
                {patient.medications.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medications.map((medication, index) => (
                      <div key={index}>
                        <p className="text-sm font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-500">
                          {medication.dosage} • {medication.frequency}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No current medications</p>
                )}
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Medical History</h3>
                {patient.medicalHistory.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{condition.condition}</p>
                          <p className="text-sm text-gray-500">
                            Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            condition.status === "active"
                              ? "default"
                              : condition.status === "managed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {condition.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No significant medical history</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PRP Treatment Information</CardTitle>
          <CardDescription>Treatment eligibility and care team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">PRP Eligibility</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      patient.prpEligibility === "eligible"
                        ? "default"
                        : patient.prpEligibility === "conditional"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {patient.prpEligibility}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{patient.prpEligibilityNotes}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Treatment Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Treatments</p>
                    <p className="text-lg font-medium">{patient.treatmentCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="text-lg font-medium">{patient.successRate}%</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Appointments</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">
                      Last Visit: {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">
                      Next Appointment:{" "}
                      {patient.nextAppointment
                        ? new Date(patient.nextAppointment).toLocaleDateString()
                        : "None scheduled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Care Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Primary Provider</p>
                      <p className="text-sm">{patient.primaryProvider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Primary Clinic</p>
                      <p className="text-sm">{patient.primaryClinic}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Hospital</p>
                      <p className="text-sm">{patient.primaryHospital}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Notes</h3>
                <p className="text-sm">{patient.notes}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient Vitals History</CardTitle>
          <CardDescription>Tracking key health metrics over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <PatientVitalsChart patientId={patient.id} />
        </CardContent>
      </Card>
    </div>
  )
}
