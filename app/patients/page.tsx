"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchPatients } from "@/lib/features/patient/patientSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Loader2, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function PatientsPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const { patients, loading, error } = useSelector((state: RootState) => state.patient)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterClinic, setFilterClinic] = useState(searchParams.get("clinic") || "all")

  useEffect(() => {
    dispatch(fetchPatients())
  }, [dispatch])

  // Apply filters from URL params on initial load
  useEffect(() => {
    const clinic = searchParams.get("clinic")
    if (clinic) {
      setFilterClinic(clinic)
    }
  }, [searchParams])

  // Filter patients based on search term and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      searchTerm === "" ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    const matchesClinic = filterClinic === "all" || patient.primaryClinicId === filterClinic

    return matchesSearch && matchesStatus && matchesClinic
  })

  // Get unique clinics for filter
  const clinics = Array.from(new Set(patients.map((p) => p.primaryClinic))).sort()

  // Get clinic name for title
  const clinicName =
    filterClinic !== "all" ? patients.find((p) => p.primaryClinicId === filterClinic)?.primaryClinic || "" : ""

  const handleRowClick = (patientId: string) => {
    // Make sure we're using the correct ID format that matches the data
    router.push(`/patients/${patientId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#005566]" />
      </div>
    )
  }

  if (error) {
    return <div className="text-[#D32F2F] p-4 bg-[#D32F2F] bg-opacity-10 rounded-md">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#212121]">Patients {clinicName && `- ${clinicName}`}</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all {filteredPatients.length} patients {clinicName && `in ${clinicName}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#E0E0E0]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#005566] hover:bg-[#004455]">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8 border-[#E0E0E0]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterClinic} onValueChange={setFilterClinic}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Clinic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clinics</SelectItem>
            {clinics.map((clinic, index) => (
              <SelectItem
                key={index}
                value={patients.find((p) => p.primaryClinic === clinic)?.primaryClinicId || String(index)}
              >
                {clinic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-[#E0E0E0]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Clinic</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Treatments</TableHead>
                <TableHead>Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(patient.id)}
                >
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.primaryProvider}</TableCell>
                  <TableCell>{patient.primaryClinic}</TableCell>
                  <TableCell>
                    <StatusBadge status={patient.status} />
                  </TableCell>
                  <TableCell>{patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>{patient.treatmentCount}</TableCell>
                  <TableCell>{patient.successRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: "active" | "pending" | "inactive" }) {
  const variants = {
    active: "bg-[#005566] text-white",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    inactive: "bg-gray-100 text-gray-600 border-gray-300",
  }

  return (
    <Badge variant={status === "active" ? "default" : "outline"} className={variants[status]}>
      {status}
    </Badge>
  )
}
