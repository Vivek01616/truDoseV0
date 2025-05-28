"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchClinics, fetchHospitals } from "@/lib/features/clinic/clinicSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Download, Filter, Hospital, Loader2, MapPin, Plus, Search, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/data-table/data-table"
import { clinicColumns } from "@/components/data-table/columns"


export default function ClinicsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const { clinics, hospitals, loading, error } = useSelector((state: RootState) => state.clinic)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterHospital, setFilterHospital] = useState("all")
  const [filterState, setFilterState] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchClinics()).unwrap()
        await dispatch(fetchHospitals()).unwrap()
      } catch (err) {
        console.error("Failed to fetch data:", err)
      }
    }

    fetchData()
  }, [dispatch])

  const onViewClick = (clinicId: string) => {
    console.log("testing button click");
    router.push(`/clinics/${clinicId}`)
  }

  // Filter clinics based on search term and filters
  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      searchTerm === "" ||
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.state.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesHospital = filterHospital === "all" || clinic.hospitalId === filterHospital
    const matchesState = filterState === "all" || clinic.state === filterState
    const matchesStatus = filterStatus === "all" || clinic.status === filterStatus
    return matchesSearch && matchesHospital && matchesState && matchesStatus
  })

  // Get unique states for filter
  const states = Array.from(new Set(clinics.map((c) => c.state))).sort()

  const handleRowClick = (clinicId: string) => {
    router.push(`/clinics/${clinicId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#005566]" />
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="p-8 bg-red-50 border border-red-200 rounded-md max-w-3xl mx-auto mt-8">
  //       <h2 className="text-xl font-medium text-red-700 mb-2">Error Loading Clinics</h2>
  //       <p className="text-red-600 mb-4">{error}</p>
  //       <Button variant="outline" className="border-[#005566] text-[#005566]" onClick={() => dispatch(fetchClinics())}>
  //         Retry
  //       </Button>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Clinics</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all {clinics.length} clinics across {hospitals.length} hospitals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bbio-button-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bbio-button-primary" onClick={()=>{
            router.push("/clinics/new")
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Clinic
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            className="pl-8 bbio-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterHospital} onValueChange={setFilterHospital}>
          <SelectTrigger className="w-[180px]">
            <Hospital className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Hospital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hospitals</SelectItem>
            {hospitals.map((hospital) => (
              <SelectItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterState} onValueChange={setFilterState}>
          <SelectTrigger className="w-[180px]">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <div className="w-[120px]">
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as "table" | "card")}>
            <SelectTrigger>
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="card">Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === "table" ? (
                              <DataTable
                   columns={clinicColumns(onViewClick)}
                        data={filteredClinics} />

    
        
        // <Card>
        //   <CardContent className="p-0">
        //     <Table className="bbio-table">
        //       <TableHeader>
        //         <TableRow>
        //           <TableHead>Clinic Name</TableHead>
        //           <TableHead>Hospital</TableHead>
        //           <TableHead>Location</TableHead>
        //           <TableHead>Staff</TableHead>
        //           <TableHead>Equipment</TableHead>
        //           <TableHead>Status</TableHead>
        //           <TableHead>Actions</TableHead>
        //         </TableRow>
        //       </TableHeader>
        //       <TableBody>
        //         {filteredClinics.map((clinic) => (
        //           <TableRow
        //             key={clinic.id}
        //             className="cursor-pointer hover:bg-gray-50"
        //             onClick={() => handleRowClick(clinic.id)}
        //           >
        //             <TableCell className="font-medium">{clinic.name}</TableCell>
        //             <TableCell>{clinic.hospitalName}</TableCell>
        //             <TableCell>
        //               {clinic.city}, {clinic.state}
        //             </TableCell>
        //             <TableCell>{clinic.certifiedStaff}</TableCell>
        //             <TableCell>{clinic.equipmentCount}</TableCell>
        //             <TableCell>
        //               <StatusBadge status={clinic.status} />
        //             </TableCell>
        //             <TableCell>
        //               <Button
        //                 variant="ghost"
        //                 size="sm"
        //                 onClick={(e) => {
        //                   e.stopPropagation()
        //                   router.push(`/clinics/${clinic.id}`)
        //                 }}
        //               >
        //                 View
        //               </Button>
        //             </TableCell>
        //           </TableRow>
        //         ))}
        //       </TableBody>
        //     </Table>
        //   </CardContent>
        // </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="bbio-card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRowClick(clinic.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{clinic.name}</CardTitle>
                  <StatusBadge status={clinic.status} />
                </div>
                <CardDescription>{clinic.department}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                <div className="flex items-start gap-2">
                  <Hospital className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">{clinic.hospitalName}</div>
                    <div className="text-xs text-muted-foreground">Parent Hospital</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm">{clinic.address}</div>
                    <div className="text-sm">
                      {clinic.city}, {clinic.state} {clinic.zip}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={`/providers?clinic=${clinic.id}`}
                    className="flex items-center gap-2 border rounded-md p-2 hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{clinic.certifiedStaff}</div>
                      <div className="text-xs text-muted-foreground">Staff</div>
                    </div>
                  </Link>

                  <Link
                    href={`/devices?clinic=${clinic.id}`}
                    className="flex items-center gap-2 border rounded-md p-2 hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{clinic.equipmentCount}</div>
                      <div className="text-xs text-muted-foreground">Equipment</div>
                    </div>
                  </Link>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full bbio-button-secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/clinics/${clinic.id}`)
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: "active" | "pending" | "inactive" }) {
  const variants = {
    active: "bg-success bg-opacity-10 text-success border-success",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    inactive: "bg-neutral bg-opacity-50 text-muted-foreground border-neutral",
  }

  return (
    <Badge variant="outline" className={`${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
