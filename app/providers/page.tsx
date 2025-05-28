"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams, useRouter } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProviders } from "@/lib/features/provider/providerSlice"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Filter, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProvidersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { providers, status, error } = useSelector((state: RootState) => state.provider)

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") || "all")
  const [clinicFilter, setClinicFilter] = useState(searchParams.get("clinic") || "all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProviders())
    }
  }, [status, dispatch])

  // Apply filters from URL params on initial load
  useEffect(() => {
    const clinic = searchParams.get("clinic")
    const role = searchParams.get("role")

    if (clinic) {
      setClinicFilter(clinic)
    }

    if (role) {
      setRoleFilter(role)
    }
  }, [searchParams])

  const handleExport = () => {
    console.log("Exporting provider data...")
    // Convert providers to CSV and trigger download
  }

  const handleAddProvider = () => {
    router.push("/providers/new")
  }

  const handleRowClick = (providerId: string) => {
    router.push(`/providers/${providerId}`)
  }

  // Get unique clinics for filter
  const uniqueClinics = Array.from(
    new Set(providers.map((provider) => ({ id: provider.clinic, name: provider.clinicName }))),
  ).reduce(
    (acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) {
        acc.push(curr)
      }
      return acc
    },
    [] as { id: string; name: string }[],
  )

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(providers.map((provider) => provider.role)))

  // Get unique statuses for filter
  const uniqueStatuses = Array.from(new Set(providers.map((provider) => provider.status)))

  // Filter providers based on search and filters
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      searchTerm === "" ||
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || provider.role === roleFilter
    const matchesClinic = clinicFilter === "all" || provider.clinic === clinicFilter
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter

    return matchesSearch && matchesRole && matchesClinic && matchesStatus
  })

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#005566]" />
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-md max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-medium text-red-700 mb-2">Error Loading Providers</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          variant="outline"
          className="border-[#005566] text-[#005566]"
          onClick={() => dispatch(fetchProviders())}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Providers</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all {providers.length} providers across {uniqueClinics.length} clinics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bbio-button-secondary" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bbio-button-primary" onClick={handleAddProvider}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search providers..."
            className="pl-8 bbio-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {uniqueRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={clinicFilter} onValueChange={setClinicFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Clinic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clinics</SelectItem>
            {uniqueClinics.map((clinic) => (
              <SelectItem key={clinic.id} value={clinic.id}>
                {clinic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
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
        <Card>
          <CardContent className="p-0">
            <Table className="bbio-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Clinic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow
                    key={provider.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(provider.id)}
                  >
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.specialty}</TableCell>
                    <TableCell>{provider.clinicName}</TableCell>
                    <TableCell>
                      <StatusBadge status={provider.status} />
                    </TableCell>
                    <TableCell>{provider.certification}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/providers/${provider.id}`)
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <Card
              key={provider.id}
              className="bbio-card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRowClick(provider.id)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                  </div>
                  <StatusBadge status={provider.status} />
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email:</span> {provider.email}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Clinic:</span> {provider.clinicName}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Certification:</span> {provider.certification}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full bbio-button-secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/providers/${provider.id}`)
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

function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800 border-green-300",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    inactive: "bg-red-100 text-red-800 border-red-300",
  }

  const statusKey = status as keyof typeof variants
  const className = variants[statusKey] || "bg-gray-100 text-gray-800 border-gray-300"

  return (
    <Badge variant="outline" className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
