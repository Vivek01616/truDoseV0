import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reports | BBio Clinic Portal",
  description: "Generate and view reports for clinic operations",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and download reports for clinic operations and patient outcomes.
        </p>
      </div>
      <div className="border rounded-lg p-6 bg-white">
        <p>Reporting functionality will be displayed here.</p>
      </div>
    </div>
  )
}
