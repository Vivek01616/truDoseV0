"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchUsers, fetchRoles, fetchAuditLogs } from "@/lib/features/security/securitySlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { DataTable } from "@/components/data-table/data-table"
import { userColumns, roleColumns, auditLogColumns } from "@/components/security/columns"

export default function SecurityPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, roles, auditLogs, status, error } = useSelector((state: RootState) => state.security)
  const [activeTab, setActiveTab] = useState("users")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers())
      dispatch(fetchRoles())
      dispatch(fetchAuditLogs())
    }
  }, [status, dispatch])

  const handleExport = () => {
    // Implement CSV export functionality
    console.log(`Exporting ${activeTab} data...`)
    // Convert data to CSV and trigger download
  }

  if (status === "loading" && users.length === 0 && roles.length === 0 && auditLogs.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading security data...</div>
  }

  if (status === "failed") {
    return <div className="text-red-500">Error loading security data: {error}</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Security Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and audit logs</p>
        </div>
        {activeTab === "users" && (
          <Button asChild>
            <Link href="/security/users/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        )}
        {activeTab === "roles" && (
          <Button asChild>
            <Link href="/security/roles/new">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Add Role
            </Link>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={userColumns} data={users} title="Users" searchKey="name" onExport={handleExport} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Role Management</CardTitle>
              <CardDescription>View and manage roles and associated permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={roleColumns} data={roles} title="Roles" searchKey="name" onExport={handleExport} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>View system activity and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={auditLogColumns}
                data={auditLogs}
                title="Audit Logs"
                searchKey="userName"
                onExport={handleExport}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
