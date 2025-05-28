import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Define provider types
export interface Provider {
  id: string
  name: string
  email: string
  specialty: string
  clinic: string
  clinicName: string
  status: string
  certification: string
  role: string
  phone: string
  address: string
  licenseNumber: string
  licenseExpiry: string
  hireDate: string
  lastActive: string
  treatmentCount: number
  rating: number
  profileImage?: string
  title?: string
  specialties?: Specialty[]
  hospitalId?: string
  hospitalName?: string
  certifications?: Certification[]
  performanceMetrics?: PerformanceMetric[]
  successRate?: number
  avatar?: string
  bio?: string
  education?: Education[]
  schedule?: Schedule[]
  languages?: string[]
  publications?: Publication[]
  yearsOfExperience?: number
  patientCount?: number
  acceptingNewPatients?: boolean
  prpTrainingLevel?: "basic" | "advanced" | "expert" | "instructor"
  prpTrainingDate?: string
  prpProceduresPerformed?: number
  notes?: string
  licenseState?: string
  npiNumber?: string
  taxId?: string
  insuranceAccepted?: string[]
  availableForRemoteConsultation?: boolean
  preferredContactMethod?: "email" | "phone" | "portal"
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  lastActivity?: string
  licenseExpiryDate?: string
}

export interface Certification {
  id: string
  name: string
  issuedDate: string
  expiryDate: string
  status: "active" | "expired" | "pending" | "revoked"
  issuingAuthority: string
  certificationNumber: string
  verificationUrl: string
  requiresContinuingEducation: boolean
  continuingEducationCredits: number
  continuingEducationRequired: number
  continuingEducationDeadline: string | null
  specialtyArea: string[]
  notes: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  honors: string[]
  gpa: number | null
}

export interface PerformanceMetric {
  id: string
  name: string
  value: number
  target: number
  trend: "up" | "down" | "stable"
  period: "weekly" | "monthly" | "quarterly" | "yearly"
  lastUpdated: string
  category: "clinical" | "patient satisfaction" | "efficiency" | "compliance"
}

export interface Schedule {
  id: string
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
  startTime: string
  endTime: string
  location: string
  clinicId: string
  hospitalId: string
}

export interface Specialty {
  id: string
  name: string
  primarySpecialty: boolean
  yearsOfExperience: number
  boardCertified: boolean
  certificationDetails?: string
}

export interface Publication {
  id: string
  title: string
  journal: string
  date: string
  authors: string[]
  doi: string
  abstract: string
  url: string
}

interface ProviderState {
  providers: Provider[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  selectedProvider?: Provider | null
  loading?: boolean
}

// Mock data for providers
const mockProviders: Provider[] = [
  {
    id: "prov-001",
    name: "Dr. Sarah Johnson",
    email: "sjohnson@example.com",
    specialty: "Orthopedic Surgery",
    clinic: "clinic-001",
    clinicName: "Northwest Medical Center",
    status: "active",
    certification: "Board Certified",
    role: "Provider",
    phone: "(206) 555-1234",
    address: "123 Medical Parkway, Seattle, WA 98101",
    licenseNumber: "MD12345",
    licenseExpiry: "2025-12-31",
    hireDate: "2018-05-15",
    lastActive: "2023-06-01",
    treatmentCount: 1245,
    rating: 4.8,
  },
  {
    id: "prov-002",
    name: "Dr. Michael Chen",
    email: "mchen@example.com",
    specialty: "Sports Medicine",
    clinic: "clinic-001",
    clinicName: "Northwest Medical Center",
    status: "active",
    certification: "Board Certified",
    role: "Provider",
    phone: "(206) 555-2345",
    address: "123 Medical Parkway, Seattle, WA 98101",
    licenseNumber: "MD23456",
    licenseExpiry: "2024-10-15",
    hireDate: "2019-03-22",
    lastActive: "2023-06-02",
    treatmentCount: 987,
    rating: 4.7,
  },
  {
    id: "prov-003",
    name: "Dr. Emily Rodriguez",
    email: "erodriguez@example.com",
    specialty: "Dermatology",
    clinic: "clinic-002",
    clinicName: "Eastside Health Partners",
    status: "active",
    certification: "Board Certified",
    role: "Provider",
    phone: "(206) 555-3456",
    address: "456 Health Avenue, Bellevue, WA 98004",
    licenseNumber: "MD34567",
    licenseExpiry: "2025-08-22",
    hireDate: "2020-01-10",
    lastActive: "2023-06-01",
    treatmentCount: 765,
    rating: 4.9,
  },
  {
    id: "prov-004",
    name: "Dr. Robert Kim",
    email: "rkim@example.com",
    specialty: "Pain Management",
    clinic: "clinic-002",
    clinicName: "Eastside Health Partners",
    status: "pending",
    certification: "Board Eligible",
    role: "Provider",
    phone: "(206) 555-4567",
    address: "456 Health Avenue, Bellevue, WA 98004",
    licenseNumber: "MD45678",
    licenseExpiry: "2024-05-18",
    hireDate: "2021-06-15",
    lastActive: "2023-05-28",
    treatmentCount: 432,
    rating: 4.5,
  },
  {
    id: "prov-005",
    name: "Dr. Lisa Martinez",
    email: "lmartinez@example.com",
    specialty: "Regenerative Medicine",
    clinic: "clinic-003",
    clinicName: "South County Medical",
    status: "active",
    certification: "Board Certified",
    role: "Provider",
    phone: "(206) 555-5678",
    address: "789 Wellness Road, Renton, WA 98057",
    licenseNumber: "MD56789",
    licenseExpiry: "2025-03-12",
    hireDate: "2019-11-05",
    lastActive: "2023-06-02",
    treatmentCount: 876,
    rating: 4.6,
  },
  {
    id: "staff-001",
    name: "Jennifer Williams",
    email: "jwilliams@example.com",
    specialty: "Nursing",
    clinic: "clinic-001",
    clinicName: "Northwest Medical Center",
    status: "active",
    certification: "RN",
    role: "Staff",
    phone: "(206) 555-6789",
    address: "123 Medical Parkway, Seattle, WA 98101",
    licenseNumber: "RN12345",
    licenseExpiry: "2024-09-30",
    hireDate: "2020-02-15",
    lastActive: "2023-06-02",
    treatmentCount: 0,
    rating: 4.8,
  },
  {
    id: "staff-002",
    name: "David Thompson",
    email: "dthompson@example.com",
    specialty: "Medical Assistant",
    clinic: "clinic-002",
    clinicName: "Eastside Health Partners",
    status: "active",
    certification: "CMA",
    role: "Staff",
    phone: "(206) 555-7890",
    address: "456 Health Avenue, Bellevue, WA 98004",
    licenseNumber: "CMA23456",
    licenseExpiry: "2024-11-15",
    hireDate: "2021-01-10",
    lastActive: "2023-06-01",
    treatmentCount: 0,
    rating: 4.7,
  },
  {
    id: "staff-003",
    name: "Maria Garcia",
    email: "mgarcia@example.com",
    specialty: "Physical Therapy",
    clinic: "clinic-003",
    clinicName: "South County Medical",
    status: "active",
    certification: "DPT",
    role: "Staff",
    phone: "(206) 555-8901",
    address: "789 Wellness Road, Renton, WA 98057",
    licenseNumber: "PT34567",
    licenseExpiry: "2025-01-22",
    hireDate: "2019-08-15",
    lastActive: "2023-06-02",
    treatmentCount: 0,
    rating: 4.9,
  },
]

// Async thunk for fetching providers
export const fetchProviders = createAsyncThunk("providers/fetchProviders", async () => {
  // In a real app, this would be an API call
  return new Promise<Provider[]>((resolve) => {
    setTimeout(() => resolve(mockProviders), 500)
  })
})

const initialState: ProviderState = {
  providers: [],
  status: "idle",
  error: null,
  selectedProvider: null,
  loading: false,
}

export const fetchProviderById = createAsyncThunk(
  "provider/fetchProviderById",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      // First, check if we already have providers loaded
      const state = getState() as { provider: ProviderState }
      let providers = state.provider.providers

      // If providers array is empty, fetch all providers
      if (providers.length === 0) {
        // In a real app, we would make a specific API call for a single provider
        // For this demo, we'll fetch all providers and find the one we need
        const response = await new Promise<Provider[]>((resolve) => {
          setTimeout(() => resolve(mockProviders), 500)
        })
        providers = response
      }

      // Find the provider with the matching ID
      const provider = providers.find((p) => p.id === id)

      if (!provider) {
        throw new Error(`Provider with ID ${id} not found`)
      }

      return provider
    } catch (error) {
      console.error("Error fetching provider:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch provider details")
    }
  },
)

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    resetProviders: () => initialState,
    setSelectedProvider: (state, action: PayloadAction<Provider | null>) => {
      state.selectedProvider = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = "loading"
        state.loading = true
        state.error = null
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.providers = action.payload
        state.loading = false
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch providers"
        state.loading = false
      })
      .addCase(fetchProviderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProviderById.fulfilled, (state, action: PayloadAction<Provider>) => {
        state.loading = false
        state.selectedProvider = action.payload
      })
      .addCase(fetchProviderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetProviders, setSelectedProvider } = providerSlice.actions

export default providerSlice.reducer
