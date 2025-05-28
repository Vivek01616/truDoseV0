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
import { fetchDevices } from "@/lib/features/device/deviceSlice"
import Link from "next/link"

export function HospitalDevices({ hospitalId }: { hospitalId: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const { devices, loading } = useSelector((state: RootState) => state.device)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    dispatch(fetchDevices())
  }, [dispatch])

  // Filter devices by hospital ID and search term
  const filteredDevices = devices.filter(
    (device) =>
      device.hospitalId === hospitalId &&
      (searchTerm === "" ||
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || device.status === filterStatus) &&
      (filterType === "all" || device.type === filterType),
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
            placeholder="Search devices..."
            className="pl-8 border-[#E0E0E0] focus-visible:ring-[#4DB6AC]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px] border-[#E0E0E0]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="centrifuge">Centrifuge</SelectItem>
              <SelectItem value="injector">Injector</SelectItem>
              <SelectItem value="processor">Processor</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#005566] hover:bg-[#004455] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {filteredDevices.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-[#212121]">Serial Number</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Device Name</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Type</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Location</TableHead>
                  <TableHead className="font-semibold text-[#212121]">Status</TableHead>
                  <TableHead className="font-semibold text-[#212121] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.serialNumber}</TableCell>
                    <TableCell>
                      <Link href={`/devices/${device.id}`} className="font-medium hover:underline">
                        {device.name}
                      </Link>
                    </TableCell>
                    <TableCell className="capitalize">{device.type}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          device.status === "active"
                            ? "default"
                            : device.status === "maintenance"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#005566] hover:bg-[#005566]/10" asChild>
                        <Link href={`/devices/${device.id}`}>
                          <span className="sr-only">View {device.name}</span>
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
            <p className="text-muted-foreground mb-4">No devices found for this hospital</p>
            <Button className="bg-[#005566] hover:bg-[#004455] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add First Device
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
