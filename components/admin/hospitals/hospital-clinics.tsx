"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { ClinicInfoCard } from "@/components/clinics/clinic-info-card"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchClinics } from "@/lib/features/clinic/clinicSlice"

export function HospitalClinics({ hospitalId }: { hospitalId: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const { clinics, loading } = useSelector((state: RootState) => state.clinic)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchClinics())
  }, [dispatch])

  // Filter clinics by hospital ID and search term
  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.hospitalId === hospitalId &&
      (searchTerm === "" ||
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.department.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            className="pl-8 border-[#E0E0E0] focus-visible:ring-[#4DB6AC]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-[#005566] hover:bg-[#004455] text-white w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Clinic
        </Button>
      </div>

      {filteredClinics.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredClinics.map((clinic) => (
            <ClinicInfoCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">No clinics found for this hospital</p>
            <Button className="bg-[#005566] hover:bg-[#004455] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add First Clinic
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
