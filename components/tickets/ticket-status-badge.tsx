import { Badge } from "@/components/ui/badge"
import type { TicketStatus, TicketPriority } from "@/lib/features/ticket/ticketSlice"

interface TicketStatusBadgeProps {
  status: TicketStatus
  className?: string
}

interface TicketPriorityBadgeProps {
  priority: TicketPriority
  className?: string
}

export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const variant =
    status === "open"
      ? "default"
      : status === "in_progress"
        ? "secondary"
        : status === "waiting"
          ? "outline"
          : "success"

  const label = status.replace("_", " ")

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}

export function TicketPriorityBadge({ priority, className }: TicketPriorityBadgeProps) {
  const baseClasses = "border"
  const priorityClasses =
    priority === "low"
      ? "border-blue-500 text-blue-500"
      : priority === "medium"
        ? "border-yellow-500 text-yellow-500"
        : priority === "high"
          ? "border-orange-500 text-orange-500"
          : "border-red-500 text-red-500"

  return (
    <Badge variant="outline" className={`${baseClasses} ${priorityClasses} ${className || ""}`}>
      {priority}
    </Badge>
  )
}
