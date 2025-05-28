"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchPatients } from "@/lib/features/patient/patientSlice"
import Link from "next/link"

export function HospitalPatients({ hospitalId }: { hospitalId: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const { patients, loading } = useSelector((state: RootState) => state.patient)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    dispatch(fetchPatients())
  }, [dispatch])

  // Filter patients by hospital ID and search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.hospitalId === hospitalId &&
      (searchTerm === "" ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || patient.status === filterStatus),
  )

  if (loading) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded-md" />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8 border-[#E0E0E0] focus-visible:ring-[#4DB6AC]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] border-[#E0E0E0]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#005566] hover:bg-[#004455] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-[#212121]">Patient ID</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Name</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Age</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Treatment</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Status</TableHead>
                  <TableHead className="font-semibold text-[#212121] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>
                      <Link href={`/patients/${patient.id}`} className="font-medium hover:underline">
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.treatmentType}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          patient.status === "active"
                            ? "default"
                            : patient.status === "completed"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#005566] hover:bg-[#005566]/10" asChild>
                        <Link href={`/patients/${patient.id}`}>
                          <span className="sr-only">View {patient.name}</span>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">No patients found for this hospital</p>
            <Button className="bg-[#005566] hover:bg-[#004455] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add First Patient
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
