import { BarChart, Users, Calendar, Stethoscope, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface DashboardMetricCardProps {
  title: string
  value: string
  description: string
  icon: "chart" | "users" | "calendar" | "device"
  trend: "up" | "down" | "neutral"
  trendValue: string
}

export function DashboardMetricCard({ title, value, description, icon, trend, trendValue }: DashboardMetricCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return <BarChart className="h-5 w-5 text-primary" />
      case "users":
        return <Users className="h-5 w-5 text-primary" />
      case "calendar":
        return <Calendar className="h-5 w-5 text-primary" />
      case "device":
        return <Stethoscope className="h-5 w-5 text-primary" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">{getIcon()}</div>
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
          <div className="flex items-center space-x-2">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-error" />
            )}
            <span className={trend === "up" ? "text-success" : "text-error"}>
              {trend === "up" ? "+" : "-"}
              {trendValue} from last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
