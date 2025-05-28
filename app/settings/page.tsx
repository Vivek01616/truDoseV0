import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | BBio Clinic Portal",
  description: "Configure system settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings, user preferences, and application behavior.</p>
      </div>
      <div className="border rounded-lg p-6 bg-white">
        <p>Settings configuration will be displayed here.</p>
      </div>
    </div>
  )
}
