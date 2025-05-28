"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  Users,
  UserCog,
  Stethoscope,
  FileText,
  ClipboardList,
  CreditCard,
  BarChart,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Ticket,
  Lock,
  ChevronLeftSquare,
  ChevronRightSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false)

  // Initialize expanded items based on current path
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length > 0) {
      // Always expand surveys section if on a surveys page
      if (parts[0] === "surveys") {
        setExpandedItems((prev) => (prev.includes("surveys") ? prev : [...prev, "surveys"]))
      } else {
        setExpandedItems([parts[0]])
      }
    }
  }, [pathname])

  const isActive = (path: string) => {
    // Handle exact matches (like dashboard)
    if (path === pathname) {
      return true
    }

    // Handle nested routes (like /patients/*)
    if (path !== "/" && pathname.startsWith(path)) {
      return true
    }

    return false
  }

  const toggleExpanded = (item: string) => {
    setExpandedItems((current) => {
      if (current.includes(item)) {
        return current.filter((i) => i !== item)
      } else {
        return [...current, item]
      }
    })
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen border-r bg-[#005566] text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="absolute right-0 top-4 transform translate-x-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-white text-[#005566] border-[#005566]"
          onClick={toggleCollapse}
        >
          {collapsed ? <ChevronRightSquare className="h-4 w-4" /> : <ChevronLeftSquare className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-center p-4 border-b border-[#004455]">
        {collapsed ? (
          <div className="flex justify-center">
            <Image src="/favicon.ico" alt="TruDOSE" width={32} height={32} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Image src="/logo.png" alt="TruDOSE" width={180} height={40} />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          <Link href="/" passHref>
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start",
                !isActive("/") && "text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              <LayoutDashboard className={cn("h-5 w-5", !collapsed && "mr-2")} />
              {!collapsed && "Dashboard"}
            </Button>
          </Link>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("hospitals")}
            >
              <div className="flex items-center">
                <Building2 className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Hospitals"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("hospitals") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("hospitals") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/hospitals" passHref>
                  <Button
                    variant={isActive("/hospitals") && pathname === "/hospitals" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Hospitals
                  </Button>
                </Link>
                <Link href="/hospitals/onboard" passHref>
                  <Button
                    variant={isActive("/hospitals/onboard") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Onboard Hospital
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("clinics")}
            >
              <div className="flex items-center">
                <Building2 className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Clinics"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("clinics") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("clinics") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/clinics" passHref>
                  <Button
                    variant={
                      isActive("/clinics") && !pathname.includes("/new") && !pathname.includes("/certification")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Clinics
                  </Button>
                </Link>
                <Link href="/clinics/new" passHref>
                  <Button
                    variant={isActive("/clinics/new") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Add New Clinic
                  </Button>
                </Link>
                <Link href="/clinics/certification" passHref>
                  <Button
                    variant={isActive("/clinics/certification") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Certification
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("patients")}
            >
              <div className="flex items-center">
                <Users className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Patients"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("patients") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("patients") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/patients" passHref>
                  <Button
                    variant={
                      isActive("/patients") && !pathname.includes("/history") && !pathname.includes("/consent")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Patients
                  </Button>
                </Link>
                <Link href="/patients/history" passHref>
                  <Button
                    variant={isActive("/patients/history") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Treatment History
                  </Button>
                </Link>
                <Link href="/patients/consent" passHref>
                  <Button
                    variant={isActive("/patients/consent") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Consent Forms
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("providers")}
            >
              <div className="flex items-center">
                <UserCog className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Providers"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("providers") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("providers") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/providers" passHref>
                  <Button
                    variant={
                      isActive("/providers") && !pathname.includes("/certifications") && !pathname.includes("/metrics")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Providers
                  </Button>
                </Link>
                <Link href="/providers/certifications" passHref>
                  <Button
                    variant={isActive("/providers/certifications") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Certifications
                  </Button>
                </Link>
                <Link href="/providers/metrics" passHref>
                  <Button
                    variant={isActive("/providers/metrics") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Performance Metrics
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("devices")}
            >
              <div className="flex items-center">
                <Stethoscope className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Devices"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("devices") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("devices") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/devices" passHref>
                  <Button
                    variant={
                      isActive("/devices") && !pathname.includes("/maintenance") && !pathname.includes("/calibration")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Devices
                  </Button>
                </Link>
                <Link href="/devices/maintenance" passHref>
                  <Button
                    variant={isActive("/devices/maintenance") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Maintenance
                  </Button>
                </Link>
                <Link href="/devices/calibration" passHref>
                  <Button
                    variant={isActive("/devices/calibration") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Calibration
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("protocols")}
            >
              <div className="flex items-center">
                <FileText className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Protocols"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("protocols") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("protocols") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/protocols" passHref>
                  <Button
                    variant={
                      isActive("/protocols") && !pathname.includes("/new") && !pathname.includes("/outcomes")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Protocols
                  </Button>
                </Link>
                <Link href="/protocols/new" passHref>
                  <Button
                    variant={isActive("/protocols/new") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Create New
                  </Button>
                </Link>
                <Link href="/protocols/outcomes" passHref>
                  <Button
                    variant={isActive("/protocols/outcomes") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Outcomes
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("surveys")}
            >
              <div className="flex items-center">
                <ClipboardList className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Surveys"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("surveys") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("surveys") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/surveys" passHref>
                  <Button
                    variant={
                      isActive("/surveys") &&
                      !pathname.includes("/active") &&
                      !pathname.includes("/results") &&
                      !pathname.includes("/builder")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Surveys
                  </Button>
                </Link>
                <Link href="/surveys/builder" passHref>
                  <Button
                    variant={isActive("/surveys/builder") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Survey Builder
                  </Button>
                </Link>
                <Link href="/surveys/active" passHref>
                  <Button
                    variant={isActive("/surveys/active") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Active Surveys
                  </Button>
                </Link>
                <Link href="/surveys/results" passHref>
                  <Button
                    variant={isActive("/surveys/results") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Results
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("tickets")}
            >
              <div className="flex items-center">
                <Ticket className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Tickets"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("tickets") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("tickets") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/tickets" passHref>
                  <Button
                    variant={isActive("/tickets") && pathname === "/tickets" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    All Tickets
                  </Button>
                </Link>
                <Link href="/tickets/dashboard" passHref>
                  <Button
                    variant={isActive("/tickets/dashboard") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/tickets/new" passHref>
                  <Button
                    variant={isActive("/tickets/new") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Create Ticket
                  </Button>
                </Link>
                <Link href="/tickets/my-tickets" passHref>
                  <Button
                    variant={isActive("/tickets/my-tickets") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    My Tickets
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("billing")}
            >
              <div className="flex items-center">
                <CreditCard className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Billing"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("billing") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("billing") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/billing" passHref>
                  <Button
                    variant={
                      isActive("/billing") && !pathname.includes("/insurance") && !pathname.includes("/compliance")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Overview
                  </Button>
                </Link>
                <Link href="/billing/insurance" passHref>
                  <Button
                    variant={isActive("/billing/insurance") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Insurance
                  </Button>
                </Link>
                <Link href="/billing/compliance" passHref>
                  <Button
                    variant={isActive("/billing/compliance") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Compliance
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("analytics")}
            >
              <div className="flex items-center">
                <BarChart className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Analytics"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("analytics") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("analytics") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/analytics" passHref>
                  <Button
                    variant={
                      isActive("/analytics") && !pathname.includes("/research") && !pathname.includes("/export")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/analytics/research" passHref>
                  <Button
                    variant={isActive("/analytics/research") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Research
                  </Button>
                </Link>
                <Link href="/analytics/export" passHref>
                  <Button
                    variant={isActive("/analytics/export") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Export Data
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("quality")}
            >
              <div className="flex items-center">
                <ShieldCheck className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Quality"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("quality") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("quality") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/quality" passHref>
                  <Button
                    variant={
                      isActive("/quality") && !pathname.includes("/incidents") && !pathname.includes("/standards")
                        ? "secondary"
                        : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Overview
                  </Button>
                </Link>
                <Link href="/quality/incidents" passHref>
                  <Button
                    variant={isActive("/quality/incidents") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Incidents
                  </Button>
                </Link>
                <Link href="/quality/standards" passHref>
                  <Button
                    variant={isActive("/quality/standards") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Standards
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-between text-white hover:bg-[#004455] hover:text-white",
                collapsed && "justify-center px-2",
              )}
              onClick={() => toggleExpanded("security")}
            >
              <div className="flex items-center">
                <Lock className={cn("h-5 w-5", !collapsed && "mr-2")} />
                {!collapsed && "Security"}
              </div>
              {!collapsed && (
                <div>
                  {expandedItems.includes("security") ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
            {!collapsed && expandedItems.includes("security") && (
              <div className="ml-4 space-y-1 pt-1">
                <Link href="/security" passHref>
                  <Button
                    variant={isActive("/security") && pathname === "/security" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Overview
                  </Button>
                </Link>
                <Link href="/security/users" passHref>
                  <Button
                    variant={isActive("/security/users") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Users
                  </Button>
                </Link>
                <Link href="/security/roles" passHref>
                  <Button
                    variant={isActive("/security/roles") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Roles
                  </Button>
                </Link>
                <Link href="/security/audit" passHref>
                  <Button
                    variant={isActive("/security/audit") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                  >
                    Audit Logs
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
