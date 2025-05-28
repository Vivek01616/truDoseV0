import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalOverview } from "@/components/admin/hospitals/hospital-overview"
import { HospitalClinics } from "@/components/admin/hospitals/hospital-clinics"
import { HospitalProviders } from "@/components/admin/hospitals/hospital-providers"
import { HospitalPatients } from "@/components/admin/hospitals/hospital-patients"
import { HospitalDevices } from "@/components/admin/hospitals/hospital-devices"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/hospitals">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Northwest Medical Center</h1>
            <p className="text-muted-foreground">Academic hospital with 450 beds and 12 associated clinics</p>
          </div>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Hospital
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clinics">Clinics</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <HospitalOverview hospitalId={params.id} />
        </TabsContent>
        <TabsContent value="clinics" className="space-y-4 pt-4">
          <HospitalClinics hospitalId={params.id} />
        </TabsContent>
        <TabsContent value="providers" className="space-y-4 pt-4">
          <HospitalProviders hospitalId={params.id} />
        </TabsContent>
        <TabsContent value="patients" className="space-y-4 pt-4">
          <HospitalPatients hospitalId={params.id} />
        </TabsContent>
        <TabsContent value="devices" className="space-y-4 pt-4">
          <HospitalDevices hospitalId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
