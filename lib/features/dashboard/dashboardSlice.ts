import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TreatmentData {
  id: string
  patientName: string
  date: string
  protocol: string
  outcome: "success" | "pending" | "failed"
}

export interface DeviceStatus {
  id: string
  name: string
  type: string
  status: "operational" | "maintenance" | "error" | "offline"
  utilization: number
  nextMaintenance: string | null
}

export interface DashboardState {
  treatmentSuccessRate: number
  deviceUtilization: number
  activePatients: number
  pendingTreatments: number
  recentTreatments: TreatmentData[]
  deviceStatuses: DeviceStatus[]
  treatmentsByProtocol: { name: string; value: number }[]
  treatmentTrends: { name: string; value: number }[]
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  treatmentSuccessRate: 0,
  deviceUtilization: 0,
  activePatients: 0,
  pendingTreatments: 0,
  recentTreatments: [],
  deviceStatuses: [],
  treatmentsByProtocol: [],
  treatmentTrends: [],
  loading: false,
  error: null,
}

export const fetchDashboardData = createAsyncThunk("dashboard/fetchData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      treatmentSuccessRate: 87,
      deviceUtilization: 72,
      activePatients: 124,
      pendingTreatments: 18,
      recentTreatments: [
        {
          id: "T-1001",
          patientName: "John D.",
          date: "2023-05-14",
          protocol: "Standard PRP",
          outcome: "success",
        },
        {
          id: "T-1002",
          patientName: "Sarah M.",
          date: "2023-05-13",
          protocol: "Advanced PRP",
          outcome: "pending",
        },
        {
          id: "T-1003",
          patientName: "Robert J.",
          date: "2023-05-12",
          protocol: "Standard PRP",
          outcome: "success",
        },
        {
          id: "T-1004",
          patientName: "Emily K.",
          date: "2023-05-11",
          protocol: "Leukocyte-Rich PRP",
          outcome: "success",
        },
        {
          id: "T-1005",
          patientName: "Michael P.",
          date: "2023-05-10",
          protocol: "Advanced PRP",
          outcome: "failed",
        },
      ],
      deviceStatuses: [
        {
          id: "DEV-001",
          name: "PRP Centrifuge #1",
          type: "Main processing unit",
          status: "operational",
          utilization: 78,
          nextMaintenance: "2023-06-01",
        },
        {
          id: "DEV-002",
          name: "PRP Centrifuge #2",
          type: "Secondary processing unit",
          status: "operational",
          utilization: 65,
          nextMaintenance: "2023-06-15",
        },
        {
          id: "DEV-003",
          name: "Blood Analyzer",
          type: "Quality control unit",
          status: "maintenance",
          utilization: 92,
          nextMaintenance: null,
        },
      ],
      treatmentsByProtocol: [
        { name: "Standard PRP", value: 87 },
        { name: "Advanced PRP", value: 92 },
        { name: "Leukocyte-Rich", value: 76 },
        { name: "Platelet-Poor", value: 65 },
      ],
      treatmentTrends: [
        { name: "Jan", value: 24 },
        { name: "Feb", value: 28 },
        { name: "Mar", value: 32 },
        { name: "Apr", value: 40 },
        { name: "May", value: 45 },
        { name: "Jun", value: 52 },
      ],
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch dashboard data")
  }
})

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.treatmentSuccessRate = action.payload.treatmentSuccessRate
        state.deviceUtilization = action.payload.deviceUtilization
        state.activePatients = action.payload.activePatients
        state.pendingTreatments = action.payload.pendingTreatments
        state.recentTreatments = action.payload.recentTreatments
        state.deviceStatuses = action.payload.deviceStatuses
        state.treatmentsByProtocol = action.payload.treatmentsByProtocol
        state.treatmentTrends = action.payload.treatmentTrends
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer
