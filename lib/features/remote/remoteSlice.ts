import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface RemoteDevice {
  id: string
  name: string
  model: string
  serialNumber: string
  status: "online" | "offline" | "maintenance" | "error"
  lastConnected: string
  firmwareVersion: string
  batteryLevel?: number
  temperature?: number
  location: string
  clinicId: string
  clinicName: string
  ipAddress: string
  macAddress: string
  configurationStatus: "up-to-date" | "update-available" | "update-required"
  alerts: {
    id: string
    type: "info" | "warning" | "error" | "critical"
    message: string
    timestamp: string
    acknowledged: boolean
  }[]
  maintenanceHistory: {
    id: string
    type: "routine" | "calibration" | "repair"
    date: string
    technician: string
    notes: string
  }[]
  usageStats: {
    totalCycles: number
    totalRuntime: number
    averageCycleTime: number
    lastUsed: string
  }
}

export interface RemoteState {
  devices: RemoteDevice[]
  selectedDevice: RemoteDevice | null
  loading: boolean
  error: string | null
}

const initialState: RemoteState = {
  devices: [],
  selectedDevice: null,
  loading: false,
  error: null,
}

export const fetchRemoteDevices = createAsyncThunk("remote/fetchRemoteDevices", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return [
      {
        id: "remote-001",
        name: "PRP Centrifuge #1",
        model: "PRP-5000",
        serialNumber: "SN12345678",
        status: "online",
        lastConnected: "2023-05-20T14:30:00Z",
        firmwareVersion: "v2.3.1",
        batteryLevel: 100,
        temperature: 22.5,
        location: "Lab Room 101",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.101",
        macAddress: "00:1A:2B:3C:4D:5E",
        configurationStatus: "up-to-date",
        alerts: [],
        maintenanceHistory: [
          {
            id: "maint-001",
            type: "routine",
            date: "2023-04-15T09:00:00Z",
            technician: "John Doe",
            notes: "Regular quarterly maintenance performed. All systems functioning normally.",
          },
          {
            id: "maint-002",
            type: "calibration",
            date: "2023-02-10T11:30:00Z",
            technician: "Sarah Smith",
            notes: "Calibration performed. Speed accuracy within 0.1% of specification.",
          },
        ],
        usageStats: {
          totalCycles: 1245,
          totalRuntime: 622.5,
          averageCycleTime: 30,
          lastUsed: "2023-05-20T12:15:00Z",
        },
      },
      {
        id: "remote-002",
        name: "PRP Centrifuge #2",
        model: "PRP-5000",
        serialNumber: "SN23456789",
        status: "online",
        lastConnected: "2023-05-20T14:25:00Z",
        firmwareVersion: "v2.3.1",
        batteryLevel: 100,
        temperature: 23.1,
        location: "Lab Room 101",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.102",
        macAddress: "00:1A:2B:3C:4D:5F",
        configurationStatus: "up-to-date",
        alerts: [],
        maintenanceHistory: [
          {
            id: "maint-003",
            type: "routine",
            date: "2023-04-16T10:00:00Z",
            technician: "John Doe",
            notes: "Regular quarterly maintenance performed. All systems functioning normally.",
          },
        ],
        usageStats: {
          totalCycles: 1089,
          totalRuntime: 544.5,
          averageCycleTime: 30,
          lastUsed: "2023-05-20T11:45:00Z",
        },
      },
      {
        id: "remote-003",
        name: "Blood Analyzer",
        model: "BloodPro 3000",
        serialNumber: "SN34567890",
        status: "error",
        lastConnected: "2023-05-20T10:15:00Z",
        firmwareVersion: "v1.8.5",
        batteryLevel: 100,
        temperature: 25.7,
        location: "Lab Room 102",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.103",
        macAddress: "00:1A:2B:3C:4D:60",
        configurationStatus: "update-required",
        alerts: [
          {
            id: "alert-001",
            type: "error",
            message: "Sensor calibration error detected",
            timestamp: "2023-05-20T10:15:00Z",
            acknowledged: false,
          },
        ],
        maintenanceHistory: [
          {
            id: "maint-004",
            type: "repair",
            date: "2023-03-05T13:20:00Z",
            technician: "Mike Johnson",
            notes: "Replaced faulty sensor module. System tested and functioning properly.",
          },
        ],
        usageStats: {
          totalCycles: 3456,
          totalRuntime: 1728,
          averageCycleTime: 15,
          lastUsed: "2023-05-20T10:00:00Z",
        },
      },
      {
        id: "remote-004",
        name: "PRP Centrifuge #1",
        model: "PRP-4500",
        serialNumber: "SN45678901",
        status: "online",
        lastConnected: "2023-05-20T14:10:00Z",
        firmwareVersion: "v2.2.0",
        batteryLevel: 100,
        temperature: 22.8,
        location: "Treatment Room 3",
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        ipAddress: "192.168.2.101",
        macAddress: "00:2B:3C:4D:5E:6F",
        configurationStatus: "update-available",
        alerts: [
          {
            id: "alert-002",
            type: "info",
            message: "Firmware update available",
            timestamp: "2023-05-19T09:00:00Z",
            acknowledged: true,
          },
        ],
        maintenanceHistory: [
          {
            id: "maint-005",
            type: "routine",
            date: "2023-03-20T09:30:00Z",
            technician: "Sarah Smith",
            notes: "Regular quarterly maintenance performed. All systems functioning normally.",
          },
        ],
        usageStats: {
          totalCycles: 876,
          totalRuntime: 438,
          averageCycleTime: 30,
          lastUsed: "2023-05-20T13:45:00Z",
        },
      },
      {
        id: "remote-005",
        name: "Blood Analyzer",
        model: "BloodPro 2500",
        serialNumber: "SN56789012",
        status: "offline",
        lastConnected: "2023-05-19T16:45:00Z",
        firmwareVersion: "v1.7.2",
        batteryLevel: null,
        temperature: null,
        location: "Treatment Room 4",
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        ipAddress: "192.168.2.102",
        macAddress: "00:2B:3C:4D:5E:70",
        configurationStatus: "update-required",
        alerts: [
          {
            id: "alert-003",
            type: "warning",
            message: "Device offline for more than 12 hours",
            timestamp: "2023-05-20T04:45:00Z",
            acknowledged: false,
          },
        ],
        maintenanceHistory: [
          {
            id: "maint-006",
            type: "repair",
            date: "2023-02-15T14:00:00Z",
            technician: "Mike Johnson",
            notes: "Replaced power supply unit. System tested and functioning properly.",
          },
        ],
        usageStats: {
          totalCycles: 2345,
          totalRuntime: 1172.5,
          averageCycleTime: 15,
          lastUsed: "2023-05-19T16:30:00Z",
        },
      },
      {
        id: "remote-006",
        name: "PRP Centrifuge #1",
        model: "PRP-4000",
        serialNumber: "SN67890123",
        status: "maintenance",
        lastConnected: "2023-05-20T08:30:00Z",
        firmwareVersion: "v2.1.5",
        batteryLevel: 100,
        temperature: 22.0,
        location: "Lab Room",
        clinicId: "clinic-003",
        clinicName: "South County Medical Group",
        ipAddress: "192.168.3.101",
        macAddress: "00:3C:4D:5E:6F:70",
        configurationStatus: "up-to-date",
        alerts: [
          {
            id: "alert-004",
            type: "info",
            message: "Scheduled maintenance in progress",
            timestamp: "2023-05-20T08:30:00Z",
            acknowledged: true,
          },
        ],
        maintenanceHistory: [
          {
            id: "maint-007",
            type: "routine",
            date: "2023-05-20T08:30:00Z",
            technician: "John Doe",
            notes: "Regular quarterly maintenance in progress.",
          },
          {
            id: "maint-008",
            type: "calibration",
            date: "2023-02-10T10:00:00Z",
            technician: "Sarah Smith",
            notes: "Calibration performed. Speed accuracy within 0.2% of specification.",
          },
        ],
        usageStats: {
          totalCycles: 1567,
          totalRuntime: 783.5,
          averageCycleTime: 30,
          lastUsed: "2023-05-19T16:00:00Z",
        },
      },
      {
        id: "remote-007",
        name: "PRP Preparation System",
        model: "PRPPrep-2000",
        serialNumber: "SN78901234",
        status: "online",
        lastConnected: "2023-05-20T14:35:00Z",
        firmwareVersion: "v3.0.2",
        batteryLevel: 95,
        temperature: 21.8,
        location: "Lab Room 103",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.104",
        macAddress: "00:1A:2B:3C:4D:61",
        configurationStatus: "up-to-date",
        alerts: [],
        maintenanceHistory: [
          {
            id: "maint-009",
            type: "routine",
            date: "2023-04-10T11:00:00Z",
            technician: "John Doe",
            notes: "Regular quarterly maintenance performed. All systems functioning normally.",
          },
        ],
        usageStats: {
          totalCycles: 567,
          totalRuntime: 283.5,
          averageCycleTime: 15,
          lastUsed: "2023-05-20T14:00:00Z",
        },
      },
      {
        id: "remote-008",
        name: "Ultrasound Guidance System",
        model: "UltraGuide 500",
        serialNumber: "SN89012345",
        status: "online",
        lastConnected: "2023-05-20T14:40:00Z",
        firmwareVersion: "v4.1.3",
        batteryLevel: 80,
        temperature: 23.5,
        location: "Treatment Room 2",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.105",
        macAddress: "00:1A:2B:3C:4D:62",
        configurationStatus: "up-to-date",
        alerts: [],
        maintenanceHistory: [
          {
            id: "maint-010",
            type: "calibration",
            date: "2023-03-15T13:00:00Z",
            technician: "Sarah Smith",
            notes: "Imaging calibration performed. Resolution and accuracy verified.",
          },
        ],
        usageStats: {
          totalCycles: 789,
          totalRuntime: 394.5,
          averageCycleTime: 20,
          lastUsed: "2023-05-20T13:30:00Z",
        },
      },
      {
        id: "remote-009",
        name: "PRP Centrifuge #3",
        model: "PRP-5000",
        serialNumber: "SN90123456",
        status: "online",
        lastConnected: "2023-05-20T14:20:00Z",
        firmwareVersion: "v2.3.1",
        batteryLevel: 100,
        temperature: 22.3,
        location: "Lab Room 101",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.106",
        macAddress: "00:1A:2B:3C:4D:63",
        configurationStatus: "up-to-date",
        alerts: [],
        maintenanceHistory: [
          {
            id: "maint-011",
            type: "routine",
            date: "2023-04-17T09:30:00Z",
            technician: "John Doe",
            notes: "Regular quarterly maintenance performed. All systems functioning normally.",
          },
        ],
        usageStats: {
          totalCycles: 456,
          totalRuntime: 228,
          averageCycleTime: 30,
          lastUsed: "2023-05-20T12:30:00Z",
        },
      },
      {
        id: "remote-010",
        name: "Platelet Counter",
        model: "PlateletCount 1000",
        serialNumber: "SN01234567",
        status: "online",
        lastConnected: "2023-05-20T14:15:00Z",
        firmwareVersion: "v1.5.2",
        batteryLevel: 90,
        temperature: 22.0,
        location: "Lab Room 102",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        ipAddress: "192.168.1.107",
        macAddress: "00:1A:2B:3C:4D:64",
        configurationStatus: "update-available",
        alerts: [
          {
            id: "alert-005",
            type: "info",
            message: "Firmware update available",
            timestamp: "2023-05-18T10:00:00Z",
            acknowledged: false,
          },
        ],
        maintenanceHistory: [
          {
            id: "maint-012",
            type: "calibration",
            date: "2023-03-01T10:30:00Z",
            technician: "Sarah Smith",
            notes: "Calibration performed. Count accuracy verified with control samples.",
          },
        ],
        usageStats: {
          totalCycles: 1234,
          totalRuntime: 308.5,
          averageCycleTime: 5,
          lastUsed: "2023-05-20T13:00:00Z",
        },
      },
    ]
  } catch (error) {
    return rejectWithValue("Failed to fetch remote devices")
  }
})

export const fetchRemoteDeviceById = createAsyncThunk(
  "remote/fetchRemoteDeviceById",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      const devices = await fetchRemoteDevices().unwrap()
      const device = devices.find((d: RemoteDevice) => d.id === id)
      if (!device) {
        throw new Error("Remote device not found")
      }
      return device
    } catch (error) {
      return rejectWithValue("Failed to fetch remote device details")
    }
  },
)

export const remoteSlice = createSlice({
  name: "remote",
  initialState,
  reducers: {
    resetRemoteDevices: () => initialState,
    setSelectedRemoteDevice: (state, action: PayloadAction<RemoteDevice | null>) => {
      state.selectedDevice = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoteDevices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRemoteDevices.fulfilled, (state, action: PayloadAction<RemoteDevice[]>) => {
        state.loading = false
        state.devices = action.payload
      })
      .addCase(fetchRemoteDevices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchRemoteDeviceById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRemoteDeviceById.fulfilled, (state, action: PayloadAction<RemoteDevice>) => {
        state.loading = false
        state.selectedDevice = action.payload
      })
      .addCase(fetchRemoteDeviceById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetRemoteDevices, setSelectedRemoteDevice } = remoteSlice.actions

export default remoteSlice.reducer
