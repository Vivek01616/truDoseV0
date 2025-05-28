import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Clinic } from "@/lib/features/clinic/clinicSlice"
import { Check } from "lucide-react"

interface ClinicCapabilitiesCardProps {
  clinic: Clinic
}

export function ClinicCapabilitiesCard({ clinic }: ClinicCapabilitiesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>PRP Capabilities & Specialties</CardTitle>
        <CardDescription>Treatment capabilities and medical specialties of this clinic</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold">PRP Capabilities</h4>
          <div className="grid grid-cols-2 gap-2">
            {clinic.prpCapabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-1">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Medical Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {clinic.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
