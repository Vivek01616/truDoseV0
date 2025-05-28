"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import {
  fetchTicketById,
  updateTicket,
  addTicketComment,
  type TicketStatus,
  type TicketPriority,
} from "@/lib/features/ticket/ticketSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Clock, MessageSquare, Send, User, Building, Tag } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function TicketDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedTicket: ticket, loading } = useSelector((state: RootState) => state.ticket)

  const [newComment, setNewComment] = useState("")
  const [isInternalComment, setIsInternalComment] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketById(id as string))
    }
  }, [dispatch, id])

  const handleStatusChange = (status: TicketStatus) => {
    if (ticket) {
      dispatch(
        updateTicket({
          ...ticket,
          status,
        }),
      )
    }
  }

  const handlePriorityChange = (priority: TicketPriority) => {
    if (ticket) {
      dispatch(
        updateTicket({
          ...ticket,
          priority,
        }),
      )
    }
  }

  const handleSubmitComment = () => {
    if (newComment.trim() && ticket) {
      dispatch(
        addTicketComment({
          ticketId: ticket.id,
          content: newComment,
          authorId: "current-user-id", // In a real app, this would be the current user's ID
          authorName: "Admin User", // In a real app, this would be the current user's name
          authorRole: "Admin",
          isInternal: isInternalComment,
        }),
      )
      setNewComment("")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading ticket details...</div>
  }

  if (!ticket) {
    return <div>Ticket not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{ticket.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Ticket #{ticket.id.split("-")[1]}</span>
            <span>•</span>
            <span>Created {formatDate(ticket.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{ticket.description}</p>

              {ticket.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(ticket.patientId || ticket.clinicId) && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-2">Related Information</h3>
                  <div className="grid gap-2">
                    {ticket.patientId && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Patient:{" "}
                          <Link href={`/patients/${ticket.patientId}`} className="text-primary hover:underline">
                            {ticket.patientName}
                          </Link>
                        </span>
                      </div>
                    )}
                    {ticket.clinicId && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Clinic:{" "}
                          <Link href={`/clinics/${ticket.clinicId}`} className="text-primary hover:underline">
                            {ticket.clinicName}
                          </Link>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <Tabs defaultValue="all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Comments & Activity</CardTitle>
                  <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="public">Public Only</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {ticket.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-lg ${comment.isInternal ? "bg-amber-50 border border-amber-200" : "bg-gray-50 border border-gray-200"}`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.authorName}</span>
                              <span className="text-xs text-muted-foreground">{comment.authorRole}</span>
                              {comment.isInternal && (
                                <Badge variant="outline" className="text-amber-600 border-amber-600">
                                  Internal Note
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(comment.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="public" className="mt-0">
                  <div className="space-y-4">
                    {ticket.comments
                      .filter((c) => !c.isInternal)
                      .map((comment) => (
                        <div key={comment.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.authorName}</span>
                                <span className="text-xs text-muted-foreground">{comment.authorRole}</span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(comment.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <Separator className="mb-4" />
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="internal-comment"
                        checked={isInternalComment}
                        onCheckedChange={setIsInternalComment}
                      />
                      <Label htmlFor="internal-comment">Internal note (not visible to patient)</Label>
                    </div>
                  </div>
                  <div className="flex w-full items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={ticket.status} onValueChange={(value) => handleStatusChange(value as TicketStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={ticket.priority}
                  onValueChange={(value) => handlePriorityChange(value as TicketPriority)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assigned">Assigned To</Label>
                <Select defaultValue={ticket.assignedToId || "unassigned"}>
                  <SelectTrigger id="assigned">
                    <SelectValue placeholder="Assign ticket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="user-001">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="user-002">Admin User</SelectItem>
                    <SelectItem value="user-005">Tech Support Team</SelectItem>
                    <SelectItem value="user-006">IT Department</SelectItem>
                    <SelectItem value="user-007">Billing Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {ticket.dueDate && (
                <div className="flex items-center gap-2 pt-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Due by: <span className="font-medium">{formatDate(ticket.dueDate)}</span>
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat Session
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>People</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{ticket.createdByName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{ticket.createdByName}</div>
                    <div className="text-xs text-muted-foreground">Reporter</div>
                  </div>
                </div>
              </div>

              {ticket.assignedToName && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{ticket.assignedToName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{ticket.assignedToName}</div>
                      <div className="text-xs text-muted-foreground">Assignee</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
