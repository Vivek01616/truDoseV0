import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export type TicketPriority = "low" | "medium" | "high" | "critical"
export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed"
export type TicketType = "technical" | "billing" | "clinical" | "administrative" | "other"

export interface TicketComment {
  id: string
  ticketId: string
  authorId: string
  authorName: string
  authorRole: string
  content: string
  createdAt: string
  isInternal: boolean
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  type: TicketType
  createdAt: string
  updatedAt: string
  createdById: string
  createdByName: string
  assignedToId?: string
  assignedToName?: string
  patientId?: string
  patientName?: string
  clinicId?: string
  clinicName?: string
  dueDate?: string
  comments: TicketComment[]
  tags: string[]
}

interface TicketState {
  tickets: Ticket[]
  selectedTicket: Ticket | null
  loading: boolean
  error: string | null
  metrics: {
    totalOpen: number
    totalClosed: number
    byPriority: Record<TicketPriority, number>
    byType: Record<TicketType, number>
    averageResolutionTime: number // in hours
  }
}

const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  loading: false,
  error: null,
  metrics: {
    totalOpen: 0,
    totalClosed: 0,
    byPriority: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    },
    byType: {
      technical: 0,
      billing: 0,
      clinical: 0,
      administrative: 0,
      other: 0,
    },
    averageResolutionTime: 0,
  },
}

// Mock data for tickets
const mockTickets: Ticket[] = [
  {
    id: "ticket-001",
    title: "PRP Device Calibration Issue",
    description: "The PRP centrifuge at Northwest Medical Center is showing calibration errors during the spin cycle.",
    status: "open",
    priority: "high",
    type: "technical",
    createdAt: "2023-05-15T09:30:00Z",
    updatedAt: "2023-05-15T09:30:00Z",
    createdById: "user-001",
    createdByName: "Dr. Sarah Johnson",
    assignedToId: "user-005",
    assignedToName: "Tech Support Team",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    dueDate: "2023-05-17T17:00:00Z",
    comments: [
      {
        id: "comment-001",
        ticketId: "ticket-001",
        authorId: "user-001",
        authorName: "Dr. Sarah Johnson",
        authorRole: "Provider",
        content: "The device is showing Error Code E-103 during the second phase of the spin cycle.",
        createdAt: "2023-05-15T09:30:00Z",
        isInternal: false,
      },
      {
        id: "comment-002",
        ticketId: "ticket-001",
        authorId: "user-005",
        authorName: "Tech Support Team",
        authorRole: "Support",
        content:
          "We'll dispatch a technician to inspect the device. In the meantime, please use the backup centrifuge.",
        createdAt: "2023-05-15T10:15:00Z",
        isInternal: false,
      },
    ],
    tags: ["equipment", "urgent", "centrifuge"],
  },
  {
    id: "ticket-002",
    title: "Patient Portal Access Issue",
    description: "Multiple patients reporting inability to access their treatment records in the patient portal.",
    status: "in_progress",
    priority: "medium",
    type: "technical",
    createdAt: "2023-05-14T14:20:00Z",
    updatedAt: "2023-05-15T11:45:00Z",
    createdById: "user-003",
    createdByName: "Emily Rodriguez",
    assignedToId: "user-006",
    assignedToName: "IT Department",
    comments: [
      {
        id: "comment-003",
        ticketId: "ticket-002",
        authorId: "user-003",
        authorName: "Emily Rodriguez",
        authorRole: "Admin",
        content: "We've received 5 calls from patients unable to view their treatment history in the portal.",
        createdAt: "2023-05-14T14:20:00Z",
        isInternal: false,
      },
      {
        id: "comment-004",
        ticketId: "ticket-002",
        authorId: "user-006",
        authorName: "IT Department",
        authorRole: "Support",
        content:
          "We're investigating a potential database connection issue. Will update when we have more information.",
        createdAt: "2023-05-14T15:10:00Z",
        isInternal: false,
      },
      {
        id: "comment-005",
        ticketId: "ticket-002",
        authorId: "user-006",
        authorName: "IT Department",
        authorRole: "Support",
        content: "Internal note: Database server needs to be restarted, scheduling maintenance window.",
        createdAt: "2023-05-15T11:45:00Z",
        isInternal: true,
      },
    ],
    tags: ["portal", "patient access", "database"],
  },
  {
    id: "ticket-003",
    title: "Billing Code Update Request",
    description: "Need to update the billing codes for the new advanced PRP treatment protocol.",
    status: "waiting",
    priority: "low",
    type: "billing",
    createdAt: "2023-05-13T10:05:00Z",
    updatedAt: "2023-05-14T09:30:00Z",
    createdById: "user-004",
    createdByName: "Michael Chen",
    assignedToId: "user-007",
    assignedToName: "Billing Department",
    comments: [
      {
        id: "comment-006",
        ticketId: "ticket-003",
        authorId: "user-004",
        authorName: "Michael Chen",
        authorRole: "Provider",
        content: "We need to add the new CPT code 0232T for the advanced PRP protocol we're implementing next month.",
        createdAt: "2023-05-13T10:05:00Z",
        isInternal: false,
      },
      {
        id: "comment-007",
        ticketId: "ticket-003",
        authorId: "user-007",
        authorName: "Billing Department",
        authorRole: "Support",
        content: "We're waiting for confirmation from the insurance providers before updating the system.",
        createdAt: "2023-05-14T09:30:00Z",
        isInternal: false,
      },
    ],
    tags: ["billing", "cpt codes", "insurance"],
  },
  {
    id: "ticket-004",
    title: "New Provider Onboarding",
    description: "Need to set up system access for Dr. James Wilson joining Northwest Medical Center.",
    status: "resolved",
    priority: "medium",
    type: "administrative",
    createdAt: "2023-05-10T13:15:00Z",
    updatedAt: "2023-05-12T16:45:00Z",
    createdById: "user-002",
    createdByName: "Admin User",
    assignedToId: "user-002",
    assignedToName: "Admin User",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    comments: [
      {
        id: "comment-008",
        ticketId: "ticket-004",
        authorId: "user-002",
        authorName: "Admin User",
        authorRole: "Admin",
        content: "Dr. Wilson will be starting on May 20th. Please set up his account with provider-level access.",
        createdAt: "2023-05-10T13:15:00Z",
        isInternal: false,
      },
      {
        id: "comment-009",
        ticketId: "ticket-004",
        authorId: "user-002",
        authorName: "Admin User",
        authorRole: "Admin",
        content: "Account has been created and credentials sent to Dr. Wilson's email.",
        createdAt: "2023-05-12T16:45:00Z",
        isInternal: false,
      },
    ],
    tags: ["onboarding", "access", "provider"],
  },
  {
    id: "ticket-005",
    title: "Protocol Documentation Update",
    description: "The standard PRP protocol documentation needs to be updated with the latest research findings.",
    status: "open",
    priority: "low",
    type: "clinical",
    createdAt: "2023-05-15T11:20:00Z",
    updatedAt: "2023-05-15T11:20:00Z",
    createdById: "user-001",
    createdByName: "Dr. Sarah Johnson",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    comments: [
      {
        id: "comment-010",
        ticketId: "ticket-005",
        authorId: "user-001",
        authorName: "Dr. Sarah Johnson",
        authorRole: "Provider",
        content:
          "The protocol should be updated to include the new centrifugation parameters based on the latest research.",
        createdAt: "2023-05-15T11:20:00Z",
        isInternal: false,
      },
    ],
    tags: ["documentation", "protocol", "research"],
  },
]

// Calculate metrics from tickets
const calculateMetrics = (tickets: Ticket[]) => {
  const openTickets = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed")
  const closedTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed")

  // Calculate resolution times for closed tickets
  const resolutionTimes = closedTickets.map((ticket) => {
    const created = new Date(ticket.createdAt).getTime()
    const updated = new Date(ticket.updatedAt).getTime()
    return (updated - created) / (1000 * 60 * 60) // Convert to hours
  })

  const avgResolutionTime = resolutionTimes.length
    ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length
    : 0

  // Count by priority
  const byPriority = {
    low: tickets.filter((t) => t.priority === "low").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    high: tickets.filter((t) => t.priority === "high").length,
    critical: tickets.filter((t) => t.priority === "critical").length,
  }

  // Count by type
  const byType = {
    technical: tickets.filter((t) => t.type === "technical").length,
    billing: tickets.filter((t) => t.type === "billing").length,
    clinical: tickets.filter((t) => t.type === "clinical").length,
    administrative: tickets.filter((t) => t.type === "administrative").length,
    other: tickets.filter((t) => t.type === "other").length,
  }

  return {
    totalOpen: openTickets.length,
    totalClosed: closedTickets.length,
    byPriority,
    byType,
    averageResolutionTime: avgResolutionTime,
  }
}

// Async thunks
export const fetchTickets = createAsyncThunk("ticket/fetchTickets", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return mockTickets
  } catch (error) {
    return rejectWithValue("Failed to fetch tickets")
  }
})

export const fetchTicketById = createAsyncThunk("ticket/fetchTicketById", async (id: string, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
    const ticket = mockTickets.find((t) => t.id === id)
    if (!ticket) {
      throw new Error("Ticket not found")
    }
    return ticket
  } catch (error) {
    return rejectWithValue("Failed to fetch ticket details")
  }
})

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "comments">, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise((resolve) => setTimeout(resolve, 700)) // Simulate network delay

      const newTicket: Ticket = {
        ...ticket,
        id: `ticket-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        tags: ticket.tags || [],
      }

      return newTicket
    } catch (error) {
      return rejectWithValue("Failed to create ticket")
    }
  },
)

export const updateTicket = createAsyncThunk("ticket/updateTicket", async (ticket: Ticket, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

    const updatedTicket: Ticket = {
      ...ticket,
      updatedAt: new Date().toISOString(),
    }

    return updatedTicket
  } catch (error) {
    return rejectWithValue("Failed to update ticket")
  }
})

export const addTicketComment = createAsyncThunk(
  "ticket/addTicketComment",
  async (
    {
      ticketId,
      content,
      authorId,
      authorName,
      authorRole,
      isInternal = false,
    }: {
      ticketId: string
      content: string
      authorId: string
      authorName: string
      authorRole: string
      isInternal?: boolean
    },
    { rejectWithValue },
  ) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay

      const newComment: TicketComment = {
        id: `comment-${Date.now()}`,
        ticketId,
        authorId,
        authorName,
        authorRole,
        content,
        createdAt: new Date().toISOString(),
        isInternal,
      }

      return { ticketId, comment: newComment }
    } catch (error) {
      return rejectWithValue("Failed to add comment")
    }
  },
)

// Slice
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetTickets: () => initialState,
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.loading = false
        state.tickets = action.payload
        state.metrics = calculateMetrics(action.payload)
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // fetchTicketById
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTicketById.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.loading = false
        state.selectedTicket = action.payload
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // createTicket
      .addCase(createTicket.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.loading = false
        state.tickets.push(action.payload)
        state.metrics = calculateMetrics(state.tickets)
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // updateTicket
      .addCase(updateTicket.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.loading = false
        const index = state.tickets.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tickets[index] = action.payload
        }
        if (state.selectedTicket?.id === action.payload.id) {
          state.selectedTicket = action.payload
        }
        state.metrics = calculateMetrics(state.tickets)
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // addTicketComment
      .addCase(addTicketComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        addTicketComment.fulfilled,
        (state, action: PayloadAction<{ ticketId: string; comment: TicketComment }>) => {
          state.loading = false
          const { ticketId, comment } = action.payload

          // Add comment to ticket in tickets array
          const ticketIndex = state.tickets.findIndex((t) => t.id === ticketId)
          if (ticketIndex !== -1) {
            state.tickets[ticketIndex].comments.push(comment)
            state.tickets[ticketIndex].updatedAt = new Date().toISOString()
          }

          // Add comment to selectedTicket if it matches
          if (state.selectedTicket?.id === ticketId) {
            state.selectedTicket.comments.push(comment)
            state.selectedTicket.updatedAt = new Date().toISOString()
          }
        },
      )
      .addCase(addTicketComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetTickets, setSelectedTicket } = ticketSlice.actions

export default ticketSlice.reducer
