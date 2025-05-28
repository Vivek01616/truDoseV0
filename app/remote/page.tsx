"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchRemoteDevices } from "@/lib/features/remote/remoteSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { DeviceStatusOverview } from "@/components/remote/device-status-overview"
import { DeviceList } from "@/components/remote/device-list"

export default function RemoteManagementPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { devices, loading } = useSelector((state: RootState) => state.remote)

  useEffect(() => {
    dispatch(fetchRemoteDevices())
  }, [dispatch])

  // Calculate device status counts
  const statusCounts = devices.reduce(
    (acc, device) => {
      acc[device.status] = (acc[device.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Device Remote Management</h1>
        <p className="text-muted-foreground">Monitor and manage PRP devices remotely</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <DeviceStatusOverview
          title="Online Devices"
          count={statusCounts.online || 0}
          total={devices.length}
          status="online"
        />
        <DeviceStatusOverview
          title="Offline Devices"
          count={statusCounts.offline || 0}
          total={devices.length}
          status="offline"
        />
        <DeviceStatusOverview
          title="Maintenance"
          count={statusCounts.maintenance || 0}
          total={devices.length}
          status="maintenance"
        />
        <DeviceStatusOverview
          title="Error State"
          count={statusCounts.error || 0}
          total={devices.length}
          status="error"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Remote Devices</CardTitle>
          <CardDescription>Monitor and manage connected PRP devices</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">Loading devices...</div>
          ) : (
            <DeviceList devices={devices} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
