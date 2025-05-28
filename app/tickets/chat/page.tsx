"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchTickets } from "@/lib/features/ticket/ticketSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Send, Phone, Video, Info, MoreVertical, Search, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: string
  read: boolean
  ticketId?: string
}

interface ChatSession {
  id: string
  user: {
    id: string
    name: string
    role: string
    avatar?: string
  }
  support: {
    id: string
    name: string
    role: string
    avatar?: string
  }
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  status: "active" | "closed"
  ticketId?: string
}

export default function SupportChatPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets } = useSelector((state: RootState) => state.ticket)
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  useEffect(() => {
    // Mock chat sessions based on tickets
    if (tickets.length > 0) {
      const sessions: ChatSession[] = tickets
        .filter((ticket) => ticket.status !== "closed")
        .slice(0, 5)
        .map((ticket) => ({
          id: `chat-${ticket.id}`,
          user: {
            id: ticket.createdById,
            name: ticket.createdByName,
            role: "Provider",
            avatar: undefined,
          },
          support: {
            id: "support-agent-1",
            name: "Support Team",
            role: "Support",
            avatar: undefined,
          },
          lastMessage: `Re: ${ticket.title}`,
          lastMessageTime: ticket.updatedAt,
          unreadCount: Math.floor(Math.random() * 3),
          status: "active",
          ticketId: ticket.id,
        }))

      setChatSessions(sessions)

      // Generate mock messages for each chat
      const mockMessages: Record<string, ChatMessage[]> = {}
      sessions.forEach((session) => {
        const ticket = tickets.find((t) => t.id === session.ticketId)
        if (ticket) {
          const messageCount = 3 + Math.floor(Math.random() * 5)
          const messages: ChatMessage[] = []

          // Initial message from user
          messages.push({
            id: `msg-${session.id}-1`,
            content: ticket.description,
            sender: "user",
            timestamp: ticket.createdAt,
            read: true,
            ticketId: ticket.id,
          })

          // Response from support
          messages.push({
            id: `msg-${session.id}-2`,
            content: `Thank you for reaching out about "${ticket.title}". We're looking into this issue and will get back to you shortly.`,
            sender: "support",
            timestamp: new Date(new Date(ticket.createdAt).getTime() + 30 * 60000).toISOString(),
            read: true,
            ticketId: ticket.id,
          })

          // Additional messages
          for (let i = 3; i <= messageCount; i++) {
            const isUser = i % 2 === 1
            const prevTimestamp = messages[messages.length - 1].timestamp
            const newTimestamp = new Date(new Date(prevTimestamp).getTime() + 60 * 60000).toISOString()

            messages.push({
              id: `msg-${session.id}-${i}`,
              content: isUser
                ? `I have a question about ${ticket.type === "technical" ? "the device" : "the procedure"}. Can you provide more details?`
                : `Of course! Here's some information about ${ticket.type === "technical" ? "the device" : "the procedure"}. Let me know if you need anything else.`,
              sender: isUser ? "user" : "support",
              timestamp: newTimestamp,
              read: isUser || i < messageCount - session.unreadCount,
              ticketId: ticket.id,
            })
          }

          mockMessages[session.id] = messages
        }
      })

      setChatMessages(mockMessages)

      // Set active chat if none is selected
      if (!activeChat && sessions.length > 0) {
        setActiveChat(sessions[0].id)
      }
    }
  }, [tickets, activeChat])

  useEffect(() => {
    // Scroll to bottom when messages change or active chat changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, activeChat])

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage: ChatMessage = {
        id: `msg-${activeChat}-${Date.now()}`,
        content: message,
        sender: "support",
        timestamp: new Date().toISOString(),
        read: true,
      }

      setChatMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }))

      // Update last message in chat session
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === activeChat
            ? {
                ...session,
                lastMessage: message,
                lastMessageTime: newMessage.timestamp,
              }
            : session,
        ),
      )

      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const activeSession = chatSessions.find((session) => session.id === activeChat)
  const activeChatMessages = activeChat ? chatMessages[activeChat] || [] : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Chat</h1>
        <p className="text-muted-foreground">Communicate with patients and providers about support issues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Input placeholder="Search conversations..." className="pl-8" />
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="active">
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="active" className="flex-1">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="flex-1">
                    Closed
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="active" className="m-0">
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  <div className="space-y-0.5">
                    {chatSessions.map((session) => (
                      <button
                        key={session.id}
                        className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors ${
                          activeChat === session.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveChat(session.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{session.user.name}</p>
                              <p className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatRelativeTime(session.lastMessageTime)}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{session.lastMessage}</p>
                            <div className="flex items-center gap-2">
                              {session.ticketId && (
                                <Badge variant="outline" className="text-xs">
                                  Ticket #{session.ticketId.split("-")[1]}
                                </Badge>
                              )}
                              {session.unreadCount > 0 && (
                                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {session.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="closed" className="m-0">
                <div className="p-4 text-center text-muted-foreground">No closed conversations</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          {activeSession ? (
            <>
              <CardHeader className="px-6 py-3 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{activeSession.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{activeSession.user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {activeSession.user.role}
                        {activeSession.ticketId && (
                          <>
                            <span>•</span>
                            <span>Ticket #{activeSession.ticketId.split("-")[1]}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Ticket</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                        <DropdownMenuItem>Transfer Chat</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-error">Close Chat</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="flex flex-col gap-4 p-6">
                    {activeChatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "support" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex gap-3 max-w-[80%]">
                          {msg.sender === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{activeSession.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`space-y-1 ${msg.sender === "support" ? "order-first" : "order-last"}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                msg.sender === "support" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <div
                              className={`flex items-center gap-1 text-xs text-muted-foreground ${
                                msg.sender === "support" ? "justify-end" : ""
                              }`}
                            >
                              <span>{formatTime(msg.timestamp)}</span>
                              {msg.sender === "support" && <span>{msg.read ? "Read" : "Delivered"}</span>}
                            </div>
                          </div>
                          {msg.sender === "support" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{activeSession.support.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Active Chat</h3>
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  } else {
    return formatDate(timestamp)
  }
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
