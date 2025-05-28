import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to MM/DD/YYYY
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Generate a random ID
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

// HIPAA compliance helper - redact sensitive information
export function redactPHI(text: string): string {
  // This is a simplified example - in a real app, you'd use more sophisticated methods
  return text
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "XXX-XX-XXXX") // Redact SSN
    .replace(/\b\d{10,16}\b/g, "XXXX-XXXX-XXXX-XXXX") // Redact potential credit card/patient IDs
}

// Calculate time difference in days
export function daysSince(date: string | Date): number {
  const now = new Date()
  const then = new Date(date)
  const diffTime = Math.abs(now.getTime() - then.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Calculate success rate percentage
export function calculateSuccessRate(success: number, total: number): number {
  if (total === 0) return 0
  return Math.round((success / total) * 100)
}

// Get status color class based on status
export function getStatusColorClass(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "operational":
    case "success":
    case "completed":
      return "text-success"
    case "warning":
    case "pending":
    case "in progress":
      return "text-amber-500"
    case "error":
    case "failed":
    case "critical":
      return "text-error"
    case "inactive":
    case "offline":
      return "text-gray-500"
    default:
      return "text-gray-700"
  }
}
