"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { assignDeviceToClinic } from "@/lib/features/device/deviceSlice"
import { fetchClinics } from "@/lib/features/clinic/clinicSlice"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Clinic } from "@/lib/features/clinic/clinicSlice"
import type { Device } from "@/lib/features/device/deviceSlice"
import { toast } from "@/components/ui/use-toast"

interface AssignDeviceProps {
  device: Device
  onAssigned?: () => void
}

export function AssignDevice({ device, onAssigned }: AssignDeviceProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { clinics, loading: clinicsLoading } = useSelector((state: RootState) => state.clinic)

  const [selectedClinicId, setSelectedClinicId] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)

  useEffect(() => {
    if (open && clinics.length === 0 && !clinicsLoading) {
      dispatch(fetchClinics())
    }
  }, [open, clinics.length, clinicsLoading, dispatch])

  const handleAssign = async () => {
    if (!selectedClinicId) return

    const selectedClinic = clinics.find((clinic: Clinic) => clinic.id === selectedClinicId)
    if (!selectedClinic) return

    setIsAssigning(true)

    try {
      await dispatch(
        assignDeviceToClinic({
          deviceId: device.id,
          clinicId: selectedClinicId,
          clinicName: selectedClinic.name,
        }),
      ).unwrap()

      toast({
        title: "Device Assigned",
        description: `${device.name} has been assigned to ${selectedClinic.name}`,
      })

      setOpen(false)
      if (onAssigned) onAssigned()
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "There was an error assigning the device to the clinic.",
        variant: "destructive",
      })
    } finally {
      setIsAssigning(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Assign to Clinic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Device to Clinic</DialogTitle>
          <DialogDescription>
            Select a clinic to assign this device to. This will update the device's location and management.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="device-name" className="text-right">
              Device
            </Label>
            <div id="device-name" className="col-span-3 font-medium">
              {device.name} ({device.model})
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="device-type" className="text-right">
              Type
            </Label>
            <div id="device-type" className="col-span-3">
              {device.type}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-clinic" className="text-right">
              Current Clinic
            </Label>
            <div id="current-clinic" className="col-span-3">
              {device.clinicName || "Not Assigned"}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clinic" className="text-right">
              New Clinic
            </Label>
            <Select value={selectedClinicId} onValueChange={setSelectedClinicId} disabled={clinicsLoading}>
              <SelectTrigger id="clinic" className="col-span-3">
                <SelectValue placeholder="Select a clinic" />
              </SelectTrigger>
              <SelectContent>
                {clinicsLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading clinics...
                  </SelectItem>
                ) : (
                  clinics.map((clinic: Clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedClinicId || isAssigning}>
            {isAssigning ? "Assigning..." : "Assign Device"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
