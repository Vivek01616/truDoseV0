"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProtocols } from "@/lib/features/protocol/protocolSlice"
import { DataTable } from "@/components/data-table/data-table"
import { protocolColumns } from "@/components/data-table/columns"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileDown, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ProtocolsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { protocols, loading, error } = useSelector((state: RootState) => state.protocol)
  const [filteredProtocols, setFilteredProtocols] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    dispatch(fetchProtocols())
  }, [dispatch])

  useEffect(() => {
    if (protocols.length > 0) {
      if (statusFilter === "all") {
        setFilteredProtocols(protocols)
      } else {
        setFilteredProtocols(protocols.filter((protocol) => protocol.status === statusFilter))
      }
    }
  }, [protocols, statusFilter])

  const handleExport = () => {
    // Implement CSV export functionality
    console.log("Exporting protocol data...")
    // Convert protocols to CSV and trigger download
    const headers = ["Name", "Version", "Status", "Created At", "Updated At", "Created By"]
    const csvData = [
      headers.join(","),
      ...filteredProtocols.map((p) =>
        [p.name, p.version, p.status, p.createdDate, p.lastModified, p.createdBy].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "protocols.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleAddProtocol = () => {
    router.push("/protocols/new")
  }

  const handleFilterChange = (status) => {
    setStatusFilter(status)
  }

  // Map the protocols data to match the expected format for the DataTable
  const tableData = filteredProtocols.map((protocol) => ({
    id: protocol.id,
    name: protocol.name,
    version: protocol.version,
    status: protocol.status,
    createdAt: protocol.createdDate,
    updatedAt: protocol.lastModified,
    createdBy: protocol.createdBy,
  }))

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading protocols...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading protocols: {error}</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Protocol Management</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter: {statusFilter === "all" ? "All" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilterChange("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("archived")}>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleExport} variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddProtocol}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Protocol
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Protocols</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={protocolColumns} data={tableData} searchKey="name" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.slice(0, 3).map((protocol) => (
          <Card
            key={protocol.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/protocols/${protocol.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{protocol.name}</CardTitle>
                <Badge
                  variant={
                    protocol.status === "active" ? "default" : protocol.status === "draft" ? "outline" : "secondary"
                  }
                >
                  {protocol.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{protocol.description}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Version: {protocol.version}</span>
                <span>Steps: {protocol.steps.length}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {protocol.indications.slice(0, 3).map((indication, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {indication}
                  </Badge>
                ))}
                {protocol.indications.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{protocol.indications.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
