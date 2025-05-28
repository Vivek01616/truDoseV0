import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Hospital } from "@/lib/features/clinic/clinicSlice"
import { Building2, CalendarClock, BedDouble, Phone, Mail, MapPin } from "lucide-react"

interface HospitalInfoCardProps {
  hospital: Hospital
}

export function HospitalInfoCard({ hospital }: HospitalInfoCardProps) {
  // Calculate days until accreditation expires
  const today = new Date()
  const expiryDate = new Date(hospital.accreditationExpiry)
  const daysRemaining = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const progress = Math.max(0, Math.min(100, (daysRemaining / 365) * 100))

  // Format hospital type for display
  const formatHospitalType = (type: string): string => {
    switch (type) {
      case "academic":
        return "Academic Medical Center"
      case "community":
        return "Community Hospital"
      case "specialty":
        return "Specialty Hospital"
      case "rural":
        return "Rural Health Center"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{hospital.name}</CardTitle>
            <CardDescription>{formatHospitalType(hospital.type)}</CardDescription>
          </div>
          <Badge
            variant={hospital.status === "active" ? "default" : hospital.status === "pending" ? "outline" : "secondary"}
          >
            {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </p>
          <p className="font-medium">
            {hospital.address}, {hospital.city}, {hospital.state} {hospital.zip}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </p>
            <p className="font-medium">{hospital.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </p>
            <p className="font-medium">{hospital.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Accreditation
            </p>
            <p className="font-medium">{hospital.accreditation}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              Capacity
            </p>
            <p className="font-medium">{hospital.totalBeds} beds</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Accreditation Expires</span>
            </div>
            <span className="text-sm font-medium">{new Date(hospital.accreditationExpiry).toLocaleDateString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Accreditation expired"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
