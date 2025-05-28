"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchHospitals } from "@/lib/features/clinic/clinicSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"

export default function NewClinicPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { hospitals, loading } = useSelector((state: RootState) => state.clinic)

  const hospitalId = searchParams.get("hospitalId") || ""

  const [formData, setFormData] = useState({
    name: "",
    hospitalId: hospitalId,
    department: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    prpCapabilities: [] as string[],
    certifiedStaff: "",
    equipmentCount: "",
    status: "active",
    certificationExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    specialties: [] as string[],
  })

  useEffect(() => {
    dispatch(fetchHospitals())
  }, [dispatch])

  useEffect(() => {
    if (hospitalId) {
      setFormData((prev) => ({ ...prev, hospitalId }))
    }
  }, [hospitalId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, certificationExpiry: date }))
    }
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would dispatch an action to add the clinic
    console.log("Submitting clinic:", formData)

    // Redirect to clinics list
    router.push("/clinics")
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading hospitals...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Clinic</h1>
          <p className="text-muted-foreground">Create a new PRP-capable clinic</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Clinic Information</CardTitle>
            <CardDescription>Enter the basic information about the clinic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Clinic Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter clinic name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalId">Associated Hospital</Label>
                <Select value={formData.hospitalId} onValueChange={(value) => handleSelectChange("hospitalId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Orthopedics, Dermatology, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(XXX) XXX-XXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="clinic@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>PRP Capabilities</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="standard-prp"
                    checked={formData.prpCapabilities.includes("Standard PRP")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("prpCapabilities", "Standard PRP", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="standard-prp"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Standard PRP
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="advanced-prp"
                    checked={formData.prpCapabilities.includes("Advanced PRP")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("prpCapabilities", "Advanced PRP", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="advanced-prp"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Advanced PRP
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leukocyte-rich-prp"
                    checked={formData.prpCapabilities.includes("Leukocyte-Rich PRP")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("prpCapabilities", "Leukocyte-Rich PRP", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="leukocyte-rich-prp"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Leukocyte-Rich PRP
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="platelet-poor-plasma"
                    checked={formData.prpCapabilities.includes("Platelet-Poor Plasma")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("prpCapabilities", "Platelet-Poor Plasma", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="platelet-poor-plasma"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Platelet-Poor Plasma
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Specialties</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sports-medicine"
                    checked={formData.specialties.includes("Sports Medicine")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Sports Medicine", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="sports-medicine"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sports Medicine
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="orthopedics"
                    checked={formData.specialties.includes("Orthopedics")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Orthopedics", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="orthopedics"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Orthopedics
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dermatology"
                    checked={formData.specialties.includes("Dermatology")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Dermatology", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="dermatology"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Dermatology
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pain-management"
                    checked={formData.specialties.includes("Pain Management")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Pain Management", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="pain-management"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pain Management
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hair-restoration"
                    checked={formData.specialties.includes("Hair Restoration")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Hair Restoration", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="hair-restoration"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Hair Restoration
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cosmetic"
                    checked={formData.specialties.includes("Cosmetic Procedures")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("specialties", "Cosmetic Procedures", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="cosmetic"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cosmetic Procedures
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certifiedStaff">Certified Staff</Label>
                <Input
                  id="certifiedStaff"
                  name="certifiedStaff"
                  type="number"
                  value={formData.certifiedStaff}
                  onChange={handleChange}
                  placeholder="Number of certified staff"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipmentCount">Equipment Count</Label>
                <Input
                  id="equipmentCount"
                  name="equipmentCount"
                  type="number"
                  value={formData.equipmentCount}
                  onChange={handleChange}
                  placeholder="Number of PRP devices"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificationExpiry">Certification Expiry</Label>
                <DatePicker date={formData.certificationExpiry} setDate={handleDateChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Clinic</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
