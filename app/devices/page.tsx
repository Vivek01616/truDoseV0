"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchDevices } from "@/lib/features/device/deviceSlice"
import { fetchRemoteDevices } from "@/lib/features/remote/remoteSlice"
import { DataTable } from "@/components/data-table/data-table"
import { deviceColumns } from "@/components/data-table/columns"
import { Button } from "@/components/ui/button"
import {
  Download,
  Filter,
  Laptop,
  Loader2,
  PlusCircle,
  Search,
  Settings,
  Signal,
  Upload,
  Wifi,
  WifiOff,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BulkUploadDevices } from "@/components/devices/bulk-upload-devices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function DevicesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { devices, loading: deviceLoading, error: deviceError } = useSelector((state: RootState) => state.device)
  const { devices: remoteDevices, loading: remoteLoading } = useSelector((state: RootState) => state.remote)
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"management" | "remote">("management")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterClinic, setFilterClinic] = useState(searchParams.get("clinic") || "all")

  useEffect(() => {
    if (!deviceLoading && devices.length === 0) {
      dispatch(fetchDevices())
    }
    dispatch(fetchRemoteDevices())
  }, [deviceLoading, devices.length, dispatch])

  // Apply filters from URL params on initial load
  useEffect(() => {
    const clinic = searchParams.get("clinic")
    if (clinic) {
      setFilterClinic(clinic)
    }
  }, [searchParams])

  // Combine device data with remote status
  const combinedDevices = devices.map((device) => {
    const remoteDevice = remoteDevices.find((rd) => rd.deviceId === device.id)
    return {
      ...device,
      remoteStatus: remoteDevice?.status || "unknown",
      lastConnected: remoteDevice?.lastConnected || null,
      batteryLevel: remoteDevice?.batteryLevel || null,
      signalStrength: remoteDevice?.signalStrength || null,
      firmwareVersion: remoteDevice?.firmwareVersion || "Unknown",
    }
  })

  // Filter devices based on search term and filters
  const filteredDevices = combinedDevices.filter((device) => {
    const matchesSearch =
      searchTerm === "" ||
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || device.type === filterType
    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    const matchesTab = activeTab === "all" || device.type === activeTab
    const matchesClinic = filterClinic === "all" || device.clinicId === filterClinic

    return matchesSearch && matchesType && matchesStatus && matchesTab && matchesClinic
  })

  const handleExport = () => {
    // Implement CSV export functionality
    console.log("Exporting device data...")
    // Convert devices to CSV and trigger download
  }

  const handleAddDevice = () => {
    router.push("/devices/new")
  }

  if (deviceLoading || remoteLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (deviceError) {
    return (
      <div className="p-4 bg-error bg-opacity-10 border border-error rounded-md text-error">
        Error loading devices: {deviceError}
      </div>
    )
  }

  // Calculate device status counts
  const statusCounts = {
    online: remoteDevices.filter((d) => d.status === "online").length,
    offline: remoteDevices.filter((d) => d.status === "offline").length,
    maintenance: remoteDevices.filter((d) => d.status === "maintenance").length,
    error: remoteDevices.filter((d) => d.status === "error").length,
  }

  // Get clinic name for title
  const clinicName = filterClinic !== "all" ? devices.find((d) => d.clinicId === filterClinic)?.clinicName || "" : ""

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Device Management {clinicName && `- ${clinicName}`}</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all {filteredDevices.length} devices {clinicName && `in ${clinicName}`}
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={bulkUploadOpen} onOpenChange={setBulkUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bbio-button-secondary">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Bulk Upload Devices</DialogTitle>
                <DialogDescription>Upload multiple devices at once using CSV or JSON format.</DialogDescription>
              </DialogHeader>
              <BulkUploadDevices />
            </DialogContent>
          </Dialog>

          <Button className="bbio-button-primary" onClick={handleAddDevice}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "management" | "remote")}>
        <TabsList className="w-[400px] mx-auto">
          <TabsTrigger value="management" className="flex-1">
            <Laptop className="h-4 w-4 mr-2" />
            Device Management
          </TabsTrigger>
          <TabsTrigger value="remote" className="flex-1">
            <Signal className="h-4 w-4 mr-2" />
            Remote Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="management" className="mt-6 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search devices..."
                    className="pl-8 bbio-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <Laptop className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Cell Counter">Cell Counter</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Centrifuge">Centrifuge</SelectItem>
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
                    <SelectItem value="maintenance">Maintenance</SelectItem>
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
                    {Array.from(new Set(devices.map((d) => d.clinicId))).map((clinicId) => {
                      const clinic = devices.find((d) => d.clinicId === clinicId)?.clinicName || clinicId
                      return (
                        <SelectItem key={clinicId} value={clinicId}>
                          {clinic}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="bbio-button-secondary" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Devices</TabsTrigger>
              <TabsTrigger value="Cell Counter">Cell Counters</TabsTrigger>
              <TabsTrigger value="Tablet">Tablets</TabsTrigger>
              <TabsTrigger value="Centrifuge">Centrifuges</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <DataTable
                columns={deviceColumns}
                data={filteredDevices}
                title={`${activeTab === "all" ? "All" : activeTab} Devices${clinicName ? ` - ${clinicName}` : ""}`}
                searchKey="name"
                onExport={handleExport}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="remote" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <DeviceStatusCard
              title="Online Devices"
              count={statusCounts.online}
              total={remoteDevices.length}
              status="online"
            />
            <DeviceStatusCard
              title="Offline Devices"
              count={statusCounts.offline}
              total={remoteDevices.length}
              status="offline"
            />
            <DeviceStatusCard
              title="Maintenance"
              count={statusCounts.maintenance}
              total={remoteDevices.length}
              status="maintenance"
            />
            <DeviceStatusCard
              title="Error State"
              count={statusCounts.error}
              total={remoteDevices.length}
              status="error"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Remote Devices {clinicName && `- ${clinicName}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="bg-muted px-4 py-2 font-medium text-sm grid grid-cols-12 gap-4">
                  <div className="col-span-3">Device</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Battery</div>
                  <div className="col-span-2">Signal</div>
                  <div className="col-span-1">Actions</div>
                </div>

                <div className="divide-y">
                  {filteredDevices.map((device) => (
                    <div key={device.id} className="px-4 py-3 grid grid-cols-12 gap-4 items-center text-sm">
                      <div className="col-span-3">
                        <div className="font-medium">{device.name}</div>
                        <div className="text-muted-foreground">{device.serialNumber}</div>
                      </div>

                      <div className="col-span-2">
                        <div>{device.type}</div>
                      </div>

                      <div className="col-span-2">
                        <RemoteStatusBadge status={device.remoteStatus} />
                      </div>

                      <div className="col-span-2">
                        {device.batteryLevel !== null ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{device.batteryLevel}%</span>
                            </div>
                            <Progress value={device.batteryLevel} className="h-2" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </div>

                      <div className="col-span-2">
                        {device.remoteStatus === "online" ? (
                          <div className="flex items-center">
                            <Wifi className="h-4 w-4 mr-1 text-success" />
                            <span>{device.signalStrength}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <WifiOff className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Offline</span>
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 text-right">
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DeviceStatusCard({
  title,
  count,
  total,
  status,
}: {
  title: string
  count: number
  total: number
  status: "online" | "offline" | "maintenance" | "error"
}) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0

  const statusColors = {
    online: "text-success",
    offline: "text-muted-foreground",
    maintenance: "text-yellow-500",
    error: "text-error",
  }

  const statusIcons = {
    online: <Wifi className={`h-5 w-5 ${statusColors[status]}`} />,
    offline: <WifiOff className={`h-5 w-5 ${statusColors[status]}`} />,
    maintenance: <Settings className={`h-5 w-5 ${statusColors[status]}`} />,
    error: <Loader2 className={`h-5 w-5 ${statusColors[status]}`} />,
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h3 className={`text-2xl font-bold ${statusColors[status]}`}>{count}</h3>
              <p className="text-sm text-muted-foreground">of {total}</p>
            </div>
          </div>
          {statusIcons[status]}
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs">
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

function RemoteStatusBadge({ status }: { status: string }) {
  const variants = {
    online: "bg-success bg-opacity-10 text-success border-success",
    offline: "bg-neutral bg-opacity-50 text-muted-foreground border-neutral",
    maintenance: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-error bg-opacity-10 text-error border-error",
    unknown: "bg-neutral bg-opacity-50 text-muted-foreground border-neutral",
  }

  const statusDisplay = {
    online: "Online",
    offline: "Offline",
    maintenance: "Maintenance",
    error: "Error",
    unknown: "Unknown",
  }

  const statusType = status in variants ? status : "unknown"

  return (
    <Badge variant="outline" className={variants[statusType as keyof typeof variants]}>
      {statusDisplay[statusType as keyof typeof statusDisplay]}
    </Badge>
  )
}
