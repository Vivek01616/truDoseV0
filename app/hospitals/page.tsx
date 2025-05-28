"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchHospitals } from "@/lib/features/clinic/clinicSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  Plus,
  Search,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function HospitalsPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { hospitals, loading, error } = useSelector((state: RootState) => state.clinic)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterState, setFilterState] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    dispatch(fetchHospitals())
  }, [dispatch])

  // Filter hospitals based on search term and filters
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      searchTerm === "" ||
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.state.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesState = filterState === "all" || hospital.state === filterState
    const matchesType = filterType === "all" || hospital.type === filterType
    const matchesStatus = filterStatus === "all" || hospital.status === filterStatus

    return matchesSearch && matchesState && matchesType && matchesStatus
  })

  // Calculate pagination
  useEffect(() => {
    setTotalPages(Math.ceil(filteredHospitals.length / itemsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [filteredHospitals.length, itemsPerPage])

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredHospitals.slice(indexOfFirstItem, indexOfLastItem)

  // Pagination controls
  const goToPage = (page: number) => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  // Get unique states for filter
  const states = Array.from(new Set(hospitals.map((h) => h.state))).sort()

  // Get unique hospital types for filter
  const types = Array.from(new Set(hospitals.map((h) => h.type))).sort()

  // Handle row click
  const handleRowClick = (hospitalId: string) => {
    router.push(`/hospitals/${hospitalId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005566]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-[#D32F2F] bg-opacity-10 border border-[#D32F2F] rounded-md text-[#D32F2F]">{error}</div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#212121]">Hospitals</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all {filteredHospitals.length} hospitals in the system
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="border-[#005566] text-[#005566] hover:bg-[#005566] hover:text-white transition-colors flex-1 sm:flex-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            className="bg-[#005566] hover:bg-[#004455] text-white flex-1 sm:flex-none"
            onClick={() => router.push("/hospitals/onboard")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals..."
            className="pl-8 border-[#E0E0E0] focus-visible:ring-[#4DB6AC]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterState} onValueChange={setFilterState}>
          <SelectTrigger className="border-[#E0E0E0]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="State" />
            </div>
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

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="border-[#E0E0E0]">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] border-[#E0E0E0]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "table" | "card")} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "table" | "card")} className="w-full">
        <TabsContent value="table" className="m-0">
          <Card className="border-[#E0E0E0] shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold text-[#212121]">Hospital Name</TableHead>
                      <TableHead className="font-semibold text-[#212121]">Location</TableHead>
                      <TableHead className="font-semibold text-[#212121]">Type</TableHead>
                      <TableHead className="font-semibold text-[#212121] text-center">Beds</TableHead>
                      <TableHead className="font-semibold text-[#212121]">Accreditation</TableHead>
                      <TableHead className="font-semibold text-[#212121]">Status</TableHead>
                      <TableHead className="font-semibold text-[#212121] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((hospital) => (
                        <TableRow
                          key={hospital.id}
                          className="border-b border-[#E0E0E0] cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(hospital.id)}
                        >
                          <TableCell className="font-medium">{hospital.name}</TableCell>
                          <TableCell>
                            {hospital.city}, {hospital.state}
                          </TableCell>
                          <TableCell className="capitalize">{hospital.type}</TableCell>
                          <TableCell className="text-center">{hospital.totalBeds}</TableCell>
                          <TableCell>{hospital.accreditation}</TableCell>
                          <TableCell>
                            <StatusBadge status={hospital.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#005566] hover:bg-[#005566]/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRowClick(hospital.id)
                              }}
                            >
                              <span className="sr-only">View {hospital.name}</span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No hospitals found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card" className="m-0">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((hospital) => (
                <Card
                  key={hospital.id}
                  className="border-[#E0E0E0] shadow-sm hover:shadow transition-shadow cursor-pointer"
                  onClick={() => handleRowClick(hospital.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-[#212121]">{hospital.name}</CardTitle>
                      <StatusBadge status={hospital.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hospital.city}, {hospital.state}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm font-medium capitalize">{hospital.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Beds</p>
                        <p className="text-sm font-medium">{hospital.totalBeds}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Accreditation</p>
                      <p className="text-sm font-medium">{hospital.accreditation}</p>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full border-[#005566] text-[#005566] hover:bg-[#005566] hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(hospital.id)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground bg-white rounded-md border border-[#E0E0E0]">
              No hospitals found matching your filters
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination Controls */}
      {filteredHospitals.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredHospitals.length)} of{" "}
            {filteredHospitals.length} hospitals
          </div>

          <div className="flex items-center gap-1">
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[110px] h-9 border-[#E0E0E0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E0E0E0]"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E0E0E0]"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>

              <div className="flex items-center mx-2">
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E0E0E0]"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E0E0E0]"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        </div>
      )}
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
