import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "provider" | "staff" | "readonly"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  permissions: string[]
  clinicId?: string
  clinicName?: string
  hospitalId?: string
  hospitalName?: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isDefault: boolean
  createdAt: string
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  userAgent: string
  timestamp: string
}

export interface SecurityState {
  users: User[]
  roles: Role[]
  auditLogs: AuditLog[]
  selectedUser: User | null
  selectedRole: Role | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: SecurityState = {
  users: [],
  roles: [],
  auditLogs: [],
  selectedUser: null,
  selectedRole: null,
  status: "idle",
  error: null,
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-05-15T10:30:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    permissions: ["all"],
  },
  {
    id: "user-002",
    name: "Dr. Sarah Johnson",
    email: "sjohnson@example.com",
    role: "provider",
    status: "active",
    lastLogin: "2023-05-14T15:45:00Z",
    createdAt: "2023-01-15T00:00:00Z",
    permissions: ["read:patients", "write:patients", "read:treatments", "write:treatments"],
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    hospitalId: "hospital-001",
    hospitalName: "University Medical Center",
  },
  {
    id: "user-003",
    name: "Dr. Michael Chen",
    email: "mchen@example.com",
    role: "provider",
    status: "active",
    lastLogin: "2023-05-15T09:20:00Z",
    createdAt: "2023-02-01T00:00:00Z",
    permissions: ["read:patients", "write:patients", "read:treatments", "write:treatments"],
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    hospitalId: "hospital-001",
    hospitalName: "University Medical Center",
  },
  {
    id: "user-004",
    name: "Dr. Emily Rodriguez",
    email: "erodriguez@example.com",
    role: "provider",
    status: "active",
    lastLogin: "2023-05-14T11:10:00Z",
    createdAt: "2023-02-15T00:00:00Z",
    permissions: ["read:patients", "write:patients", "read:treatments", "write:treatments"],
    clinicId: "clinic-002",
    clinicName: "Eastside Health Partners",
    hospitalId: "hospital-002",
    hospitalName: "Eastside Regional Hospital",
  },
  {
    id: "user-005",
    name: "Dr. Lisa Martinez",
    email: "lmartinez@example.com",
    role: "provider",
    status: "active",
    lastLogin: "2023-05-13T16:30:00Z",
    createdAt: "2023-03-01T00:00:00Z",
    permissions: ["read:patients", "write:patients", "read:treatments", "write:treatments"],
    clinicId: "clinic-003",
    clinicName: "South County Medical Group",
    hospitalId: "hospital-003",
    hospitalName: "South County Hospital",
  },
  {
    id: "user-006",
    name: "John Williams",
    email: "jwilliams@example.com",
    role: "staff",
    status: "active",
    lastLogin: "2023-05-15T08:45:00Z",
    createdAt: "2023-03-15T00:00:00Z",
    permissions: ["read:patients", "read:treatments", "write:surveys"],
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
  },
  {
    id: "user-007",
    name: "Mary Davis",
    email: "mdavis@example.com",
    role: "staff",
    status: "active",
    lastLogin: "2023-05-14T14:20:00Z",
    createdAt: "2023-04-01T00:00:00Z",
    permissions: ["read:patients", "read:treatments", "write:surveys"],
    clinicId: "clinic-002",
    clinicName: "Eastside Health Partners",
  },
  {
    id: "user-008",
    name: "Robert Wilson",
    email: "rwilson@example.com",
    role: "readonly",
    status: "active",
    lastLogin: "2023-05-13T10:15:00Z",
    createdAt: "2023-04-15T00:00:00Z",
    permissions: ["read:patients", "read:treatments", "read:analytics"],
  },
  {
    id: "user-009",
    name: "Jennifer Brown",
    email: "jbrown@example.com",
    role: "staff",
    status: "pending",
    lastLogin: "",
    createdAt: "2023-05-10T00:00:00Z",
    permissions: ["read:patients", "read:treatments"],
    clinicId: "clinic-003",
    clinicName: "South County Medical Group",
  },
  {
    id: "user-010",
    name: "David Miller",
    email: "dmiller@example.com",
    role: "provider",
    status: "inactive",
    lastLogin: "2023-04-01T09:30:00Z",
    createdAt: "2023-02-10T00:00:00Z",
    permissions: ["read:patients", "write:patients", "read:treatments", "write:treatments"],
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    hospitalId: "hospital-001",
    hospitalName: "University Medical Center",
  },
]

// Mock data for roles
const mockRoles: Role[] = [
  {
    id: "role-001",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: ["all"],
    userCount: 1,
    isDefault: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "role-002",
    name: "Provider",
    description: "Medical providers with patient management permissions",
    permissions: [
      "read:patients",
      "write:patients",
      "read:treatments",
      "write:treatments",
      "read:protocols",
      "read:analytics",
    ],
    userCount: 5,
    isDefault: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "role-003",
    name: "Staff",
    description: "Clinical staff with limited patient management permissions",
    permissions: ["read:patients", "read:treatments", "write:surveys", "read:analytics"],
    userCount: 3,
    isDefault: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "role-004",
    name: "Read-Only",
    description: "View-only access to system data",
    permissions: ["read:patients", "read:treatments", "read:analytics", "read:protocols"],
    userCount: 1,
    isDefault: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "role-005",
    name: "Research",
    description: "Access to anonymized data for research purposes",
    permissions: ["read:analytics", "read:research", "export:anonymized"],
    userCount: 0,
    isDefault: false,
    createdAt: "2023-03-15T00:00:00Z",
  },
]

// Mock data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: "log-001",
    userId: "user-001",
    userName: "Admin User",
    action: "login",
    resource: "system",
    resourceId: "",
    details: "User logged in successfully",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-05-15T10:30:00Z",
  },
  {
    id: "log-002",
    userId: "user-002",
    userName: "Dr. Sarah Johnson",
    action: "view",
    resource: "patient",
    resourceId: "patient-001",
    details: "Viewed patient details",
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2023-05-14T15:45:00Z",
  },
  {
    id: "log-003",
    userId: "user-002",
    userName: "Dr. Sarah Johnson",
    action: "create",
    resource: "treatment",
    resourceId: "treatment-001",
    details: "Created new treatment record",
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2023-05-14T16:00:00Z",
  },
  {
    id: "log-004",
    userId: "user-003",
    userName: "Dr. Michael Chen",
    action: "login",
    resource: "system",
    resourceId: "",
    details: "User logged in successfully",
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-05-15T09:20:00Z",
  },
  {
    id: "log-005",
    userId: "user-003",
    userName: "Dr. Michael Chen",
    action: "view",
    resource: "patient",
    resourceId: "patient-003",
    details: "Viewed patient details",
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-05-15T09:25:00Z",
  },
  {
    id: "log-006",
    userId: "user-003",
    userName: "Dr. Michael Chen",
    action: "update",
    resource: "patient",
    resourceId: "patient-003",
    details: "Updated patient medical history",
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-05-15T09:30:00Z",
  },
  {
    id: "log-007",
    userId: "user-006",
    userName: "John Williams",
    action: "login",
    resource: "system",
    resourceId: "",
    details: "User logged in successfully",
    ipAddress: "192.168.1.4",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15",
    timestamp: "2023-05-15T08:45:00Z",
  },
  {
    id: "log-008",
    userId: "user-006",
    userName: "John Williams",
    action: "create",
    resource: "survey",
    resourceId: "survey-001",
    details: "Created new patient survey",
    ipAddress: "192.168.1.4",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15",
    timestamp: "2023-05-15T09:00:00Z",
  },
  {
    id: "log-009",
    userId: "user-001",
    userName: "Admin User",
    action: "create",
    resource: "user",
    resourceId: "user-009",
    details: "Created new user account",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-05-10T11:15:00Z",
  },
  {
    id: "log-010",
    userId: "user-001",
    userName: "Admin User",
    action: "update",
    resource: "user",
    resourceId: "user-010",
    details: "Updated user status to inactive",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2023-04-01T10:00:00Z",
  },
]

// Async thunks
export const fetchUsers = createAsyncThunk("security/fetchUsers", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockUsers
})

export const fetchRoles = createAsyncThunk("security/fetchRoles", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockRoles
})

export const fetchAuditLogs = createAsyncThunk("security/fetchAuditLogs", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockAuditLogs
})

export const fetchUserById = createAsyncThunk("security/fetchUserById", async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = mockUsers.find((u) => u.id === id)
  if (!user) {
    throw new Error("User not found")
  }
  return user
})

export const fetchRoleById = createAsyncThunk("security/fetchRoleById", async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  const role = mockRoles.find((r) => r.id === id)
  if (!role) {
    throw new Error("Role not found")
  }
  return role
})

export const createUser = createAsyncThunk(
  "security/createUser",
  async (user: Omit<User, "id" | "createdAt" | "lastLogin">) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: "",
    }
    return newUser
  },
)

export const updateUser = createAsyncThunk("security/updateUser", async (user: User) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return user
})

export const createRole = createAsyncThunk(
  "security/createRole",
  async (role: Omit<Role, "id" | "createdAt" | "userCount">) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newRole: Role = {
      ...role,
      id: `role-${Date.now()}`,
      createdAt: new Date().toISOString(),
      userCount: 0,
    }
    return newRole
  },
)

export const updateRole = createAsyncThunk("security/updateRole", async (role: Role) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return role
})

// Slice
const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    resetSecurity: () => initialState,
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    setSelectedRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch users"
      })

      // fetchRoles
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.roles = action.payload
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch roles"
      })

      // fetchAuditLogs
      .addCase(fetchAuditLogs.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.auditLogs = action.payload
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch audit logs"
      })

      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch user"
      })

      // fetchRoleById
      .addCase(fetchRoleById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.selectedRole = action.payload
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch role"
      })

      // createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users.push(action.payload)
        state.selectedUser = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to create user"
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        const index = state.users.findIndex((u) => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
        state.selectedUser = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to update user"
      })

      // createRole
      .addCase(createRole.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.roles.push(action.payload)
        state.selectedRole = action.payload
      })
      .addCase(createRole.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to create role"
      })

      // updateRole
      .addCase(updateRole.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = "succeeded"
        const index = state.roles.findIndex((r) => r.id === action.payload.id)
        if (index !== -1) {
          state.roles[index] = action.payload
        }
        state.selectedRole = action.payload
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to update role"
      })
  },
})

export const { resetSecurity, setSelectedUser, setSelectedRole } = securitySlice.actions

export default securitySlice.reducer
