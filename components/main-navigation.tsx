"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart,
  Building2,
  Building,
  Users,
  UserCog,
  Stethoscope,
  FileText,
  Calendar,
  Ticket,
  FileBarChart,
  Settings,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  GraduationCap,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function MainNavigation() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="relative h-full">
      <div
        className={cn(
          "h-full bg-[#005566] text-white flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="p-4 flex justify-center items-center border-b border-[#004455]">
          {collapsed ? (
            <Image src="/favicon.ico" alt="TruDOSE" width={32} height={32} />
          ) : (
            <Image src="/logo.png" alt="TruDOSE" width={160} height={40} className="object-contain" />
          )}
        </div>

        {/* Add overflow-y-auto to enable scrolling when needed */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <h2 className={cn("text-sm uppercase tracking-wider text-white/70 mb-2", collapsed && "sr-only")}>
              Dashboard
            </h2>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              {!collapsed && "Overview"}
            </Link>

            <Link
              href="/analytics"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/analytics") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <BarChart className="h-5 w-5" />
              {!collapsed && "Analytics"}
            </Link>
          </div>

          <div className="px-3 py-2">
            <h2 className={cn("text-sm uppercase tracking-wider text-white/70 mb-2", collapsed && "sr-only")}>
              Management
            </h2>
            <Link
              href="/hospitals"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/hospitals") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Building2 className="h-5 w-5" />
              {!collapsed && "Hospitals"}
            </Link>

            <Link
              href="/clinics"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/clinics") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Building className="h-5 w-5" />
              {!collapsed && "Clinics"}
            </Link>

            <Link
              href="/patients"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/patients") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Users className="h-5 w-5" />
              {!collapsed && "Patients"}
            </Link>

            <Link
              href="/providers"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/providers") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <UserCog className="h-5 w-5" />
              {!collapsed && "Providers"}
            </Link>

            <Link
              href="/devices"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/devices") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Stethoscope className="h-5 w-5" />
              {!collapsed && "Devices"}
            </Link>

            <Link
              href="/surveys"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/surveys") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <ClipboardList className="h-5 w-5" />
              {!collapsed && "Surveys"}
            </Link>
          </div>

          <div className="px-3 py-2">
            <h2 className={cn("text-sm uppercase tracking-wider text-white/70 mb-2", collapsed && "sr-only")}>
              Operations
            </h2>
            <Link
              href="/protocols"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/protocols") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <FileText className="h-5 w-5" />
              {!collapsed && "Protocols"}
            </Link>

            <Link
              href="/billing"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/billing") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <CreditCard className="h-5 w-5" />
              {!collapsed && "Billing"}
            </Link>

            <Link
              href="/training"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/training") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <GraduationCap className="h-5 w-5" />
              {!collapsed && "Training"}
            </Link>

            <Link
              href="/quality"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/quality") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <ShieldCheck className="h-5 w-5" />
              {!collapsed && "Quality"}
            </Link>

            <Link
              href="/appointments"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/appointments") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Calendar className="h-5 w-5" />
              {!collapsed && "Appointments"}
            </Link>

            <Link
              href="/tickets"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/tickets") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Ticket className="h-5 w-5" />
              {!collapsed && "Support Tickets"}
            </Link>

            <Link
              href="/reports"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/reports") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <FileBarChart className="h-5 w-5" />
              {!collapsed && "Reports"}
            </Link>
          </div>

          <div className="px-3 py-2">
            <h2 className={cn("text-sm uppercase tracking-wider text-white/70 mb-2", collapsed && "sr-only")}>
              System
            </h2>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/settings") ? "bg-white text-[#005566]" : "hover:bg-white/10",
                collapsed && "justify-center px-2",
              )}
            >
              <Settings className="h-5 w-5" />
              {!collapsed && "Settings"}
            </Link>
          </div>
        </div>
      </div>

      {/* Collapse toggle button - properly positioned */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-[#005566] hover:bg-[#004455] text-white rounded-full p-1 shadow-md border border-[#004455] z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  )
}
