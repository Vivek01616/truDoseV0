"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchPatientById } from "@/lib/features/patient/patientSlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Download, Loader2, Mail, MapPin, Phone, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { PatientTreatmentHistory } from "@/components/admin/patients/patient-treatment-history"
import { PatientSurveyResults } from "@/components/admin/patients/patient-survey-results"
import { PatientOutcomes } from "@/components/admin/patients/patient-outcomes"
import { PatientVitalsChart } from "@/components/admin/patients/patient-vitals-chart"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedPatient, loading, error } = useSelector((state: RootState) => state.patient)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (params.id) {
      console.log("Patient detail page - fetching patient with ID:", params.id)
      dispatch(fetchPatientById(params.id))
    }
  }, [dispatch, params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#005566]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-md max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-medium text-red-700 mb-2">Error Loading Patient</h2>
        <p className="text-red-600 mb-4">Failed to fetch patient details: {error}</p>
        <p className="text-red-600 mb-4">Patient ID: {params.id}</p>
        <Button variant="outline" className="border-[#005566] text-[#005566]" asChild>
          <Link href="/patients">Back to Patients</Link>
        </Button>
      </div>
    )
  }

  if (!selectedPatient) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-md max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-medium text-yellow-800 mb-2">Patient Not Found</h2>
        <p className="text-yellow-700 mb-4">The requested patient could not be found.</p>
        <Button variant="outline" className="border-[#005566] text-[#005566]" asChild>
          <Link href="/patients">Back to Patients</Link>
        </Button>
      </div>
    )
  }

  // Calculate age from date of birth
  const birthDate = new Date(selectedPatient.dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  // Calculate treatment progress
  const activeTreatments = selectedPatient.treatmentHistory.filter((t) => t.outcome === "pending")
  const completedTreatments = selectedPatient.treatmentHistory.filter((t) => t.outcome === "success")
  const failedTreatments = selectedPatient.treatmentHistory.filter((t) => t.outcome === "failed")

  // Get upcoming appointments
  const upcomingAppointment = selectedPatient.nextAppointment ? new Date(selectedPatient.nextAppointment) : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-[#E0E0E0]" asChild>
            <Link href="/patients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#212121]">{selectedPatient.name}</h1>
            <p className="text-sm text-muted-foreground">
              Patient ID: {selectedPatient.id} • DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()} •
              {age} years old
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="border-[#E0E0E0]">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="border-[#E0E0E0]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="border-[#E0E0E0]">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient Summary Card */}
        <Card className="border-[#E0E0E0] lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Patient Summary</CardTitle>
              <StatusBadge status={selectedPatient.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedPatient.name}`}
                  alt={selectedPatient.name}
                />
                <AvatarFallback>
                  {selectedPatient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-lg">{selectedPatient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPatient.gender} • {age} years old
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">
                  {selectedPatient.address}, {selectedPatient.city}, {selectedPatient.state} {selectedPatient.zip}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{selectedPatient.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{selectedPatient.email}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Emergency Contact</h3>
              <p className="text-sm font-medium">{selectedPatient.emergencyContact.name}</p>
              <p className="text-sm text-muted-foreground">{selectedPatient.emergencyContact.relationship}</p>
              <p className="text-sm text-muted-foreground">{selectedPatient.emergencyContact.phone}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Primary Care</h3>
              <p className="text-sm font-medium">{selectedPatient.primaryProvider}</p>
              <p className="text-sm text-muted-foreground">{selectedPatient.primaryClinic}</p>
              <p className="text-sm text-muted-foreground">{selectedPatient.primaryHospital}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Treatment Progress Card */}
          <Card className="border-[#E0E0E0]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Treatment Progress</CardTitle>
              <CardDescription>
                {activeTreatments.length} active, {completedTreatments.length} completed, {failedTreatments.length}{" "}
                unsuccessful
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TreatmentProgressCard
                  title="Active Treatments"
                  count={activeTreatments.length}
                  color="#4DB6AC"
                  icon={<Clock className="h-5 w-5" />}
                />
                <TreatmentProgressCard
                  title="Completed Treatments"
                  count={completedTreatments.length}
                  color="#4CAF50"
                  icon={<Calendar className="h-5 w-5" />}
                />
                <TreatmentProgressCard
                  title="Success Rate"
                  percentage={selectedPatient.successRate}
                  color="#005566"
                  showProgress
                />
              </div>

              {upcomingAppointment && (
                <Card className="border-[#E0E0E0] bg-[#F5F5F5]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Upcoming Appointment</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(upcomingAppointment, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#005566] text-[#005566]">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Tabs for Patient Details */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-[#E0E0E0]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Allergies</h3>
                      {selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {selectedPatient.allergies.map((allergy) => (
                            <Badge key={allergy.id} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {allergy.allergen} ({allergy.severity})
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No known allergies</p>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Medications</h3>
                      {selectedPatient.medications.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatient.medications.map((medication, index) => (
                            <div key={medication.id}>
                              <p className="text-sm font-medium">{medication.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {medication.dosage} • {medication.frequency}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No current medications</p>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Medical History</h3>
                      {selectedPatient.medicalHistory.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatient.medicalHistory.map((condition, index) => (
                            <div key={condition.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{condition.condition}</p>
                                <p className="text-sm text-muted-foreground">
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
                        <p className="text-sm text-muted-foreground">No significant medical history</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#E0E0E0]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">PRP Treatment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">PRP Eligibility</h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            selectedPatient.prpEligibility === "eligible"
                              ? "default"
                              : selectedPatient.prpEligibility === "conditional"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            selectedPatient.prpEligibility === "eligible"
                              ? "bg-[#4CAF50] text-white"
                              : selectedPatient.prpEligibility === "conditional"
                                ? "bg-[#FFC107] text-[#212121]"
                                : "bg-[#D32F2F] text-white"
                          }
                        >
                          {selectedPatient.prpEligibility}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{selectedPatient.prpEligibilityNotes}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Treatment Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Treatments</p>
                          <p className="text-lg font-medium">{selectedPatient.treatmentCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className="text-lg font-medium">{selectedPatient.successRate}%</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Appointments</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">
                            Last Visit:{" "}
                            {selectedPatient.lastVisit
                              ? new Date(selectedPatient.lastVisit).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">
                            Next Appointment:{" "}
                            {selectedPatient.nextAppointment
                              ? new Date(selectedPatient.nextAppointment).toLocaleDateString()
                              : "None scheduled"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Notes</h3>
                      <p className="text-sm">{selectedPatient.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Patient Vitals History</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <PatientVitalsChart patientId={selectedPatient.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treatments" className="space-y-4 pt-4">
              <PatientTreatmentHistory treatments={selectedPatient.treatmentHistory} />
            </TabsContent>

            <TabsContent value="surveys" className="space-y-4 pt-4">
              <PatientSurveyResults patientId={selectedPatient.id} />
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-4 pt-4">
              <PatientOutcomes patientId={selectedPatient.id} />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 pt-4">
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Consent Forms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPatient.consentForms.map((form) => (
                      <div key={form.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{form.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {form.signed
                              ? `Signed on ${new Date(form.signedDate!).toLocaleDateString()}`
                              : "Not signed"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={form.signed ? "default" : "outline"}
                            className={form.signed ? "bg-[#4CAF50]" : ""}
                          >
                            {form.signed ? "Signed" : "Pending"}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-[#005566] text-[#005566]">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: "active" | "pending" | "inactive" }) {
  const variants = {
    active: "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] border-[#4CAF50]",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    inactive: "bg-gray-100 text-gray-600 border-gray-300",
  }

  return (
    <Badge variant="outline" className={`${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

interface TreatmentProgressCardProps {
  title: string
  count?: number
  percentage?: number
  color: string
  icon?: React.ReactNode
  showProgress?: boolean
}

function TreatmentProgressCard({
  title,
  count,
  percentage,
  color,
  icon,
  showProgress = false,
}: TreatmentProgressCardProps) {
  return (
    <Card className="border-[#E0E0E0]">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{title}</h3>
          {icon && <div style={{ color }}>{icon}</div>}
        </div>

        {count !== undefined && (
          <p className="text-3xl font-bold mt-2" style={{ color }}>
            {count}
          </p>
        )}

        {percentage !== undefined && (
          <div className="space-y-2 mt-2">
            <p className="text-3xl font-bold" style={{ color }}>
              {percentage}%
            </p>
            {showProgress && <Progress value={percentage} className="h-2" indicatorClassName={`bg-[${color}]`} />}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
