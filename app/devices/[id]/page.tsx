"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchDeviceById } from "@/lib/features/device/deviceSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AssignDevice } from "@/components/devices/assign-device"
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  HardDrive,
  Info,
  Laptop,
  MapPin,
  Smartphone,
  PenToolIcon as Tool,
  Wifi,
} from "lucide-react"
import Link from "next/link"

export default function DeviceDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedDevice, loading, error } = useSelector((state: RootState) => state.device)

  useEffect(() => {
    if (id) {
      dispatch(fetchDeviceById(id as string))
    }
  }, [id, dispatch])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading device details...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading device details: {error}</div>
  }

  if (!selectedDevice) {
    return <div>Device not found</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "maintenance":
        return <Tool className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "offline":
        return <Wifi className="h-5 w-5 text-gray-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Cell Counter":
        return <HardDrive className="h-6 w-6" />
      case "Tablet":
        return <Smartphone className="h-6 w-6" />
      default:
        return <Laptop className="h-6 w-6" />
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">{getDeviceIcon(selectedDevice.type)}</div>
          <div>
            <h1 className="text-3xl font-bold">{selectedDevice.name}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>{selectedDevice.model}</span>
              <span>•</span>
              <span>{selectedDevice.type}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                {getStatusIcon(selectedDevice.status)}
                <span className="capitalize">{selectedDevice.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <AssignDevice device={selectedDevice} />
          <Button variant="outline" asChild>
            <Link href={`/devices/${selectedDevice.id}/edit`}>Edit Device</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Device Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Serial Number</dt>
                    <dd className="text-muted-foreground">{selectedDevice.serialNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Manufacturer</dt>
                    <dd className="text-muted-foreground">{selectedDevice.manufacturer}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Purchase Date</dt>
                    <dd className="text-muted-foreground">{formatDate(selectedDevice.purchaseDate)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Warranty Expiry</dt>
                    <dd className="text-muted-foreground">{formatDate(selectedDevice.warrantyExpiry)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">MAC Address</dt>
                    <dd className="text-muted-foreground font-mono">{selectedDevice.macAddress}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Location & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Clinic</dt>
                    <dd className="text-muted-foreground">
                      <Link href={`/clinics/${selectedDevice.clinicId}`} className="hover:underline flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedDevice.clinicName}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Utilization</dt>
                    <dd className="text-muted-foreground">{selectedDevice.utilization}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Last Calibration</dt>
                    <dd className="text-muted-foreground">{formatDate(selectedDevice.lastCalibration)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Next Calibration</dt>
                    <dd className="text-muted-foreground">{formatDate(selectedDevice.nextCalibration)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Status & Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4 flex flex-col">
                  <span className="text-muted-foreground text-sm">Status</span>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(selectedDevice.status)}
                    <span className="ml-2 font-medium capitalize">{selectedDevice.status}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 flex flex-col">
                  <span className="text-muted-foreground text-sm">Utilization</span>
                  <div className="flex items-center mt-1">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="ml-2 font-medium">{selectedDevice.utilization}%</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 flex flex-col">
                  <span className="text-muted-foreground text-sm">Last Calibration</span>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <span className="ml-2 font-medium">{formatDate(selectedDevice.lastCalibration)}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 flex flex-col">
                  <span className="text-muted-foreground text-sm">Next Calibration</span>
                  <div className="flex items-center mt-1">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span className="ml-2 font-medium">{formatDate(selectedDevice.nextCalibration)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>Detailed technical specifications for {selectedDevice.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Hardware Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(selectedDevice.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-1">
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Software & Firmware</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Firmware Version</dt>
                      <dd className="text-muted-foreground">{selectedDevice.firmwareVersion || "N/A"}</dd>
                    </div>
                    {selectedDevice.type === "Tablet" && (
                      <>
                        <div className="flex justify-between border-b pb-1">
                          <dt className="font-medium">Battery Health</dt>
                          <dd className="text-muted-foreground">{selectedDevice.batteryHealth || "N/A"}%</dd>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <dt className="font-medium">OS Version</dt>
                          <dd className="text-muted-foreground">{selectedDevice.specifications?.["OS"] || "N/A"}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Record of all maintenance activities for {selectedDevice.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDevice.maintenanceRecords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No maintenance records found for this device.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDevice.maintenanceRecords
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record) => (
                      <div key={record.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <Badge
                                variant={
                                  record.type === "routine"
                                    ? "outline"
                                    : record.type === "repair"
                                      ? "destructive"
                                      : "default"
                                }
                              >
                                {record.type}
                              </Badge>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="font-medium mt-2">Technician: {record.technician}</h4>
                          </div>
                          {record.nextScheduled && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Next: {new Date(record.nextScheduled).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-sm">{record.notes}</p>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connectivity Information</CardTitle>
              <CardDescription>Network and connectivity details for {selectedDevice.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Network Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">MAC Address</dt>
                      <dd className="text-muted-foreground font-mono">{selectedDevice.macAddress}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Last Connected</dt>
                      <dd className="text-muted-foreground">
                        {selectedDevice.lastConnected ? new Date(selectedDevice.lastConnected).toLocaleString() : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Connection Type</dt>
                      <dd className="text-muted-foreground">
                        {selectedDevice.type === "Tablet"
                          ? selectedDevice.specifications?.["Connectivity"] || "WiFi"
                          : "Ethernet"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Remote Management</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">
                      This device can be remotely managed through the Trudose Remote Management System.
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline">
                        Remote Diagnostics
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Firmware
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
