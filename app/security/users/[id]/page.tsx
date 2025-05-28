"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchUserById } from "@/lib/features/security/securitySlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedUser, status, error } = useSelector((state: RootState) => state.security)
  const userId = params.id as string

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId))
    }
  }, [dispatch, userId])

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64">Loading user details...</div>
  }

  if (status === "failed" || !selectedUser) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">User Not Found</h2>
          <p className="text-muted-foreground mt-2">The user you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => router.push("/security")}>
            Back to Security
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/security")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{selectedUser.name}</h1>
          <Badge
            variant={
              selectedUser.status === "active" ? "default" : selectedUser.status === "pending" ? "outline" : "secondary"
            }
            className={
              selectedUser.status === "active"
                ? "bg-green-100 text-green-800"
                : selectedUser.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }
          >
            {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/security/users/${userId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Basic user account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Role</h3>
                <p className="capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                <Badge
                  variant={
                    selectedUser.status === "active"
                      ? "default"
                      : selectedUser.status === "pending"
                        ? "outline"
                        : "secondary"
                  }
                  className={
                    selectedUser.status === "active"
                      ? "bg-green-100 text-green-800"
                      : selectedUser.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Account Information</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p>{format(new Date(selectedUser.createdAt), "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p>
                    {selectedUser.lastLogin
                      ? format(new Date(selectedUser.lastLogin), "PPP 'at' p")
                      : "Never logged in"}
                  </p>
                </div>
              </div>
            </div>

            {(selectedUser.clinicId || selectedUser.hospitalId) && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Affiliations</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {selectedUser.clinicId && (
                      <div>
                        <p className="text-sm text-muted-foreground">Clinic</p>
                        <p>{selectedUser.clinicName}</p>
                      </div>
                    )}
                    {selectedUser.hospitalId && (
                      <div>
                        <p className="text-sm text-muted-foreground">Hospital</p>
                        <p>{selectedUser.hospitalName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>User access rights and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedUser.permissions.includes("all") ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-medium text-blue-800">Full System Access</p>
                  <p className="text-sm text-blue-700 mt-1">
                    This user has administrator privileges with full access to all system features and data.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((permission) => {
                      const [action, resource] = permission.split(":")
                      return (
                        <Badge key={permission} variant="outline" className="bg-gray-100 text-gray-800 capitalize">
                          {action} {resource}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
