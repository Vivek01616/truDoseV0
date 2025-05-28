"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchPatients } from "@/lib/features/patient/patientSlice"
import { fetchClinics } from "@/lib/features/clinic/clinicSlice"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AdminPatientsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { patients, loading: patientsLoading } = useSelector((state: RootState) => state.patient)
  const { clinics, loading: clinicsLoading } = useSelector((state: RootState) => state.clinic)

  const [selectedClinic, setSelectedClinic] = useState<string>("all")
  const [filteredPatients, setFilteredPatients] = useState(patients)

  useEffect(() => {
    dispatch(fetchPatients())
    dispatch(fetchClinics())
  }, [dispatch])

  useEffect(() => {
    if (selectedClinic === "all") {
      setFilteredPatients(patients)
    } else {
      setFilteredPatients(patients.filter((patient) => patient.primaryClinic === selectedClinic))
    }
  }, [selectedClinic, patients])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        return <div className="font-mono text-xs">{id.split("-")[1]}</div>
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return <div className="font-medium">{name}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={status === "active" ? "bg-success" : status === "pending" ? "bg-secondary" : "bg-muted"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "primaryClinic",
      header: "Clinic",
    },
    {
      accessorKey: "primaryProvider",
      header: "Provider",
    },
    {
      accessorKey: "lastVisit",
      header: "Last Visit",
      cell: ({ row }) => {
        const date = row.getValue("lastVisit") as string
        return date ? formatDate(date) : "No visits"
      },
    },
    {
      accessorKey: "nextAppointment",
      header: "Next Appointment",
      cell: ({ row }) => {
        const date = row.getValue("nextAppointment") as string
        return date ? formatDate(date) : "None scheduled"
      },
    },
    {
      accessorKey: "treatmentCount",
      header: "Treatments",
      cell: ({ row }) => {
        const patient = row.original as any
        return patient.treatmentHistory?.length || 0
      },
    },
  ]

  const handleRowClick = (patient: any) => {
    router.push(`/patients/${patient.id}`)
  }

  const handleExport = () => {
    // In a real app, this would export the data to CSV or Excel
    console.log("Exporting patient data")
  }

  if (patientsLoading || clinicsLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Administration</h1>
          <p className="text-muted-foreground">Manage patients across all clinics</p>
        </div>
        <Button onClick={() => router.push("/patients/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Patients</CardTitle>
          <CardDescription>Select a clinic to view its patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="clinic-filter">Clinic</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger id="clinic-filter">
                  <SelectValue placeholder="Select a clinic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.name}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={filteredPatients}
        title={`Patients ${selectedClinic !== "all" ? `- ${selectedClinic}` : ""}`}
        searchKey="name"
        searchPlaceholder="Search patients..."
        onRowClick={handleRowClick}
        onExport={handleExport}
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
              { label: "Inactive", value: "inactive" },
            ],
          },
          {
            id: "primaryProvider",
            title: "Provider",
            options: Array.from(new Set(patients.map((p) => p.primaryProvider))).map((provider) => ({
              label: provider,
              value: provider,
            })),
          },
        ]}
      />
    </div>
  )
}
