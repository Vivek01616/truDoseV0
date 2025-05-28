"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Building2,
  Users,
  UserCog,
  Stethoscope,
  FileText,
  ClipboardList,
  CreditCard,
  BarChart,
  Wifi,
  LayoutDashboard,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Ticket,
  MessageSquare,
  PlusCircle,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

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

  return (
    <div className={cn("pb-12 w-full border-r bg-[#005566] text-white", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/" passHref>
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  !isActive("/") && "text-white hover:bg-[#004455] hover:text-white",
                )}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("clinics")}
              >
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  Clinics
                </div>
                {expandedItems.includes("clinics") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("clinics") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("patients")}
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Patients
                </div>
                {expandedItems.includes("patients") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("patients") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("providers")}
              >
                <div className="flex items-center">
                  <UserCog className="mr-2 h-4 w-4" />
                  Providers
                </div>
                {expandedItems.includes("providers") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("providers") && (
                <div className="ml-4 space-y-1 pt-1">
                  <Link href="/providers" passHref>
                    <Button
                      variant={
                        isActive("/providers") &&
                        !pathname.includes("/certifications") &&
                        !pathname.includes("/metrics")
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("devices")}
              >
                <div className="flex items-center">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Devices
                </div>
                {expandedItems.includes("devices") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("devices") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("protocols")}
              >
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Protocols
                </div>
                {expandedItems.includes("protocols") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("protocols") && (
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
                variant={expandedItems.includes("surveys") ? "ghost" : "ghost"}
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("surveys")}
              >
                <div className="flex items-center">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Survey Management
                </div>
                {expandedItems.includes("surveys") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("surveys") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("tickets")}
              >
                <div className="flex items-center">
                  <Ticket className="mr-2 h-4 w-4" />
                  Support Tickets
                </div>
                {expandedItems.includes("tickets") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("tickets") && (
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
                      Ticket Dashboard
                    </Button>
                  </Link>
                  <Link href="/tickets/new" passHref>
                    <Button
                      variant={isActive("/tickets/new") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start flex items-center text-white hover:bg-[#004455] hover:text-white"
                    >
                      <PlusCircle className="mr-1 h-3 w-3" />
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
                  <Link href="/tickets/chat" passHref>
                    <Button
                      variant={isActive("/tickets/chat") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start flex items-center text-white hover:bg-[#004455] hover:text-white"
                    >
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Support Chat
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("billing")}
              >
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </div>
                {expandedItems.includes("billing") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("billing") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("analytics")}
              >
                <div className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </div>
                {expandedItems.includes("analytics") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("analytics") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("remote")}
              >
                <div className="flex items-center">
                  <Wifi className="mr-2 h-4 w-4" />
                  Remote Management
                </div>
                {expandedItems.includes("remote") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("remote") && (
                <div className="ml-4 space-y-1 pt-1">
                  <Link href="/remote" passHref>
                    <Button
                      variant={
                        isActive("/remote") && !pathname.includes("/config") && !pathname.includes("/firmware")
                          ? "secondary"
                          : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Devices
                    </Button>
                  </Link>
                  <Link href="/remote/config" passHref>
                    <Button
                      variant={isActive("/remote/config") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Configuration
                    </Button>
                  </Link>
                  <Link href="/remote/firmware" passHref>
                    <Button
                      variant={isActive("/remote/firmware") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Firmware
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("portal-admin")}
              >
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Portal Admin
                </div>
                {expandedItems.includes("portal-admin") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("portal-admin") && (
                <div className="ml-4 space-y-1 pt-1">
                  <Link href="/portal-admin" passHref>
                    <Button
                      variant={
                        isActive("/portal-admin") && !pathname.includes("/templates") && !pathname.includes("/settings")
                          ? "secondary"
                          : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Overview
                    </Button>
                  </Link>
                  <Link href="/portal-admin/templates" passHref>
                    <Button
                      variant={isActive("/portal-admin/templates") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Templates
                    </Button>
                  </Link>
                  <Link href="/portal-admin/settings" passHref>
                    <Button
                      variant={isActive("/portal-admin/settings") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Settings
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("training")}
              >
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Training
                </div>
                {expandedItems.includes("training") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("training") && (
                <div className="ml-4 space-y-1 pt-1">
                  <Link href="/training" passHref>
                    <Button
                      variant={
                        isActive("/training") &&
                        !pathname.includes("/certifications") &&
                        !pathname.includes("/resources")
                          ? "secondary"
                          : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Overview
                    </Button>
                  </Link>
                  <Link href="/training/certifications" passHref>
                    <Button
                      variant={isActive("/training/certifications") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Certifications
                    </Button>
                  </Link>
                  <Link href="/training/resources" passHref>
                    <Button
                      variant={isActive("/training/resources") ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#004455] hover:text-white"
                    >
                      Resources
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("quality")}
              >
                <div className="flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Quality Management
                </div>
                {expandedItems.includes("quality") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("quality") && (
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
                className="w-full justify-between text-white hover:bg-[#004455] hover:text-white"
                onClick={() => toggleExpanded("security")}
              >
                <div className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </div>
                {expandedItems.includes("security") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedItems.includes("security") && (
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
    </div>
  )
}
