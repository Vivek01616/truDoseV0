import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Appointments | BBio Clinic Portal",
  description: "Manage patient appointments and scheduling",
}

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">View and manage patient appointments across all clinics.</p>
      </div>
      <div className="border rounded-lg p-6 bg-white">
        <p>Appointment management functionality will be displayed here.</p>
      </div>
    </div>
  )
}
