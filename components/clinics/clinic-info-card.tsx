import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Clinic } from "@/lib/features/clinic/clinicSlice"
import { CalendarClock, Users, Activity, Building2, Phone, Mail, MapPin, Laptop, UserRound } from "lucide-react"
import Link from "next/link"

interface ClinicInfoCardProps {
  clinic: Clinic
}

export function ClinicInfoCard({ clinic }: ClinicInfoCardProps) {
  // Calculate days until certification expires
  const today = new Date()
  const expiryDate = new Date(clinic.certificationExpiry)
  const daysRemaining = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const progress = Math.max(0, Math.min(100, (daysRemaining / 365) * 100))

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{clinic.name}</CardTitle>
            <CardDescription>{clinic.department}</CardDescription>
          </div>
          <Badge
            variant={clinic.status === "active" ? "default" : clinic.status === "pending" ? "outline" : "secondary"}
          >
            {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Hospital
            </p>
            <p className="font-medium">{clinic.hospitalName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Annual Volume
            </p>
            <p className="font-medium">{clinic.annualPatientVolume.toLocaleString()} patients</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </p>
          <p className="font-medium">
            {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </p>
            <p className="font-medium">{clinic.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </p>
            <p className="font-medium">{clinic.email}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Certification Expires</span>
            </div>
            <span className="text-sm font-medium">{new Date(clinic.certificationExpiry).toLocaleDateString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Certification expired"}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t">
          <Link
            href={`/providers?clinic=${clinic.id}&role=staff`}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Users className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Staff</span>
            <span className="font-medium">{clinic.certifiedStaff}</span>
          </Link>
          <Link
            href={`/devices?clinic=${clinic.id}`}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Laptop className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Devices</span>
            <span className="font-medium">{clinic.equipmentCount}</span>
          </Link>
          <Link
            href={`/providers?clinic=${clinic.id}&role=provider`}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <UserRound className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Providers</span>
            <span className="font-medium">{Math.ceil(clinic.certifiedStaff * 0.4)}</span>
          </Link>
          <Link
            href={`/patients?clinic=${clinic.id}`}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Activity className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Patients</span>
            <span className="font-medium">{clinic.annualPatientVolume}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
