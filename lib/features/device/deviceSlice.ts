import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface MaintenanceRecord {
  id: string
  date: string
  type: "routine" | "repair" | "calibration"
  technician: string
  notes: string
  nextScheduled: string | null
}

export interface Device {
  id: string
  name: string
  model: string
  serialNumber: string
  manufacturer: string
  purchaseDate: string
  warrantyExpiry: string
  clinicId: string
  clinicName: string
  status: "operational" | "maintenance" | "error" | "offline"
  lastCalibration: string | null
  nextCalibration: string | null
  utilization: number
  maintenanceRecords: MaintenanceRecord[]
  specifications: Record<string, string>
  type: "Cell Counter" | "Tablet"
  macAddress: string
  firmwareVersion?: string
  lastConnected?: string
  batteryHealth?: number
}

export interface DeviceState {
  devices: Device[]
  selectedDevice: Device | null
  loading: boolean
  error: string | null
  bulkUploadStatus: "idle" | "loading" | "success" | "failed"
  bulkUploadError: string | null
}

const initialState: DeviceState = {
  devices: [],
  selectedDevice: null,
  loading: false,
  error: null,
  bulkUploadStatus: "idle",
  bulkUploadError: null,
}

export const fetchDevices = createAsyncThunk("device/fetchDevices", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return [
      {
        id: "device-001",
        name: "Cell Counter #1",
        model: "CC-5000",
        serialNumber: "SN12345678",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-01-15",
        warrantyExpiry: "2025-01-15",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        status: "operational",
        lastCalibration: "2023-04-10",
        nextCalibration: "2023-10-10",
        utilization: 78,
        type: "Cell Counter",
        macAddress: "00:1A:2B:3C:4D:5E",
        firmwareVersion: "v2.3.1",
        lastConnected: "2023-05-18T14:30:00",
        maintenanceRecords: [
          {
            id: "maint-001",
            date: "2023-04-10",
            type: "routine",
            technician: "John Doe",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-07-10",
          },
          {
            id: "maint-002",
            date: "2023-01-05",
            type: "calibration",
            technician: "Jane Smith",
            notes: "Calibration performed. Device operating within specifications.",
            nextScheduled: "2023-04-05",
          },
        ],
        specifications: {
          "Max RPM": "5000",
          Capacity: "8 tubes",
          Dimensions: "45cm x 35cm x 25cm",
          Weight: "15kg",
          Power: "110-240V",
        },
      },
      {
        id: "device-002",
        name: "Cell Counter #2",
        model: "CC-5000",
        serialNumber: "SN23456789",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-03-20",
        warrantyExpiry: "2025-03-20",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        status: "operational",
        lastCalibration: "2023-03-15",
        nextCalibration: "2023-09-15",
        utilization: 65,
        type: "Cell Counter",
        macAddress: "00:1A:2B:3C:4D:5F",
        firmwareVersion: "v2.3.1",
        lastConnected: "2023-05-18T15:45:00",
        maintenanceRecords: [
          {
            id: "maint-003",
            date: "2023-03-15",
            type: "routine",
            technician: "John Doe",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-06-15",
          },
        ],
        specifications: {
          "Max RPM": "5000",
          Capacity: "8 tubes",
          Dimensions: "45cm x 35cm x 25cm",
          Weight: "15kg",
          Power: "110-240V",
        },
      },
      {
        id: "device-003",
        name: "Tablet #1",
        model: "MedTab Pro",
        serialNumber: "SN34567890",
        manufacturer: "DiagnosticTech Inc.",
        purchaseDate: "2021-11-10",
        warrantyExpiry: "2024-11-10",
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        status: "maintenance",
        lastCalibration: "2023-02-20",
        nextCalibration: "2023-05-20",
        utilization: 92,
        type: "Tablet",
        macAddress: "00:2C:3D:4E:5F:6G",
        firmwareVersion: "v3.1.2",
        lastConnected: "2023-05-17T09:15:00",
        batteryHealth: 87,
        maintenanceRecords: [
          {
            id: "maint-004",
            date: "2023-05-15",
            type: "repair",
            technician: "Sarah Johnson",
            notes: "Sensor malfunction detected. Replacement parts ordered.",
            nextScheduled: null,
          },
          {
            id: "maint-005",
            date: "2023-02-20",
            type: "calibration",
            technician: "Mike Wilson",
            notes: "Calibration performed. Device operating within specifications.",
            nextScheduled: "2023-05-20",
          },
        ],
        specifications: {
          "Screen Size": "10.5 inches",
          Storage: "128GB",
          RAM: "8GB",
          OS: "MedOS 4.2",
          Battery: "10 hours",
          Connectivity: "WiFi, Bluetooth, 5G",
        },
      },
      {
        id: "device-004",
        name: "Cell Counter #1",
        model: "CC-4500",
        serialNumber: "SN45678901",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-05-05",
        warrantyExpiry: "2025-05-05",
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        status: "operational",
        lastCalibration: "2023-04-25",
        nextCalibration: "2023-10-25",
        utilization: 70,
        type: "Cell Counter",
        macAddress: "00:3D:4E:5F:6G:7H",
        firmwareVersion: "v2.2.5",
        lastConnected: "2023-05-18T11:20:00",
        maintenanceRecords: [
          {
            id: "maint-006",
            date: "2023-04-25",
            type: "routine",
            technician: "John Doe",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-07-25",
          },
        ],
        specifications: {
          "Max RPM": "4500",
          Capacity: "6 tubes",
          Dimensions: "40cm x 30cm x 20cm",
          Weight: "12kg",
          Power: "110-240V",
        },
      },
      {
        id: "device-005",
        name: "Tablet #1",
        model: "MedTab Lite",
        serialNumber: "SN56789012",
        manufacturer: "DiagnosticTech Inc.",
        purchaseDate: "2021-08-15",
        warrantyExpiry: "2024-08-15",
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        status: "error",
        lastCalibration: "2023-03-10",
        nextCalibration: "2023-06-10",
        utilization: 85,
        type: "Tablet",
        macAddress: "00:4E:5F:6G:7H:8I",
        firmwareVersion: "v3.0.8",
        lastConnected: "2023-05-15T14:45:00",
        batteryHealth: 65,
        maintenanceRecords: [
          {
            id: "maint-007",
            date: "2023-05-18",
            type: "repair",
            technician: "Sarah Johnson",
            notes: "Critical error detected. Device not operational. Service call scheduled.",
            nextScheduled: null,
          },
          {
            id: "maint-008",
            date: "2023-03-10",
            type: "calibration",
            technician: "Mike Wilson",
            notes: "Calibration performed. Device operating within specifications.",
            nextScheduled: "2023-06-10",
          },
        ],
        specifications: {
          "Screen Size": "8 inches",
          Storage: "64GB",
          RAM: "4GB",
          OS: "MedOS 4.1",
          Battery: "8 hours",
          Connectivity: "WiFi, Bluetooth",
        },
      },
      {
        id: "device-006",
        name: "Cell Counter #1",
        model: "CC-4000",
        serialNumber: "SN67890123",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-02-10",
        warrantyExpiry: "2025-02-10",
        clinicId: "clinic-003",
        clinicName: "South County Medical Group",
        status: "operational",
        lastCalibration: "2023-05-05",
        nextCalibration: "2023-11-05",
        utilization: 60,
        type: "Cell Counter",
        macAddress: "00:5F:6G:7H:8I:9J",
        firmwareVersion: "v2.2.0",
        lastConnected: "2023-05-18T09:10:00",
        maintenanceRecords: [
          {
            id: "maint-009",
            date: "2023-05-05",
            type: "routine",
            technician: "John Doe",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-08-05",
          },
        ],
        specifications: {
          "Max RPM": "4000",
          Capacity: "4 tubes",
          Dimensions: "35cm x 25cm x 15cm",
          Weight: "10kg",
          Power: "110-240V",
        },
      },
      {
        id: "device-007",
        name: "Tablet #1",
        model: "MedTab Pro",
        serialNumber: "SN78901234",
        manufacturer: "DiagnosticTech Inc.",
        purchaseDate: "2022-04-20",
        warrantyExpiry: "2025-04-20",
        clinicId: "clinic-003",
        clinicName: "South County Medical Group",
        status: "operational",
        lastCalibration: "2023-04-15",
        nextCalibration: "2023-10-15",
        utilization: 75,
        type: "Tablet",
        macAddress: "00:6G:7H:8I:9J:0K",
        firmwareVersion: "v3.1.2",
        lastConnected: "2023-05-18T16:30:00",
        batteryHealth: 92,
        maintenanceRecords: [
          {
            id: "maint-010",
            date: "2023-04-15",
            type: "routine",
            technician: "Sarah Johnson",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-07-15",
          },
        ],
        specifications: {
          "Screen Size": "10.5 inches",
          Storage: "128GB",
          RAM: "8GB",
          OS: "MedOS 4.2",
          Battery: "10 hours",
          Connectivity: "WiFi, Bluetooth, 5G",
        },
      },
      {
        id: "device-008",
        name: "Cell Counter #2",
        model: "CC-5000",
        serialNumber: "SN89012345",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-06-10",
        warrantyExpiry: "2025-06-10",
        clinicId: "clinic-004",
        clinicName: "Central Medical Associates",
        status: "operational",
        lastCalibration: "2023-05-01",
        nextCalibration: "2023-11-01",
        utilization: 82,
        type: "Cell Counter",
        macAddress: "00:7H:8I:9J:0K:1L",
        firmwareVersion: "v2.3.1",
        lastConnected: "2023-05-18T13:45:00",
        maintenanceRecords: [
          {
            id: "maint-011",
            date: "2023-05-01",
            type: "calibration",
            technician: "Mike Wilson",
            notes: "Calibration performed. Device operating within specifications.",
            nextScheduled: "2023-11-01",
          },
        ],
        specifications: {
          "Max RPM": "5000",
          Capacity: "8 tubes",
          Dimensions: "45cm x 35cm x 25cm",
          Weight: "15kg",
          Power: "110-240V",
        },
      },
      {
        id: "device-009",
        name: "Tablet #1",
        model: "MedTab Pro",
        serialNumber: "SN90123456",
        manufacturer: "DiagnosticTech Inc.",
        purchaseDate: "2022-03-15",
        warrantyExpiry: "2025-03-15",
        clinicId: "clinic-004",
        clinicName: "Central Medical Associates",
        status: "offline",
        lastCalibration: "2023-03-20",
        nextCalibration: "2023-09-20",
        utilization: 68,
        type: "Tablet",
        macAddress: "00:8I:9J:0K:1L:2M",
        firmwareVersion: "v3.1.0",
        lastConnected: "2023-05-10T11:20:00",
        batteryHealth: 78,
        maintenanceRecords: [
          {
            id: "maint-012",
            date: "2023-03-20",
            type: "routine",
            technician: "Sarah Johnson",
            notes: "Routine maintenance performed. All systems functioning normally.",
            nextScheduled: "2023-06-20",
          },
        ],
        specifications: {
          "Screen Size": "10.5 inches",
          Storage: "128GB",
          RAM: "8GB",
          OS: "MedOS 4.2",
          Battery: "10 hours",
          Connectivity: "WiFi, Bluetooth, 5G",
        },
      },
      {
        id: "device-010",
        name: "Cell Counter #1",
        model: "CC-4500",
        serialNumber: "SN01234567",
        manufacturer: "MedTech Solutions",
        purchaseDate: "2022-01-25",
        warrantyExpiry: "2025-01-25",
        clinicId: "clinic-005",
        clinicName: "Westside Healthcare",
        status: "maintenance",
        lastCalibration: "2023-02-15",
        nextCalibration: "2023-08-15",
        utilization: 73,
        type: "Cell Counter",
        macAddress: "00:9J:0K:1L:2M:3N",
        firmwareVersion: "v2.2.5",
        lastConnected: "2023-05-15T10:30:00",
        maintenanceRecords: [
          {
            id: "maint-013",
            date: "2023-05-10",
            type: "repair",
            technician: "John Doe",
            notes: "Minor issue with sample loading mechanism. Under repair.",
            nextScheduled: "2023-05-20",
          },
          {
            id: "maint-014",
            date: "2023-02-15",
            type: "calibration",
            technician: "Mike Wilson",
            notes: "Calibration performed. Device operating within specifications.",
            nextScheduled: "2023-08-15",
          },
        ],
        specifications: {
          "Max RPM": "4500",
          Capacity: "6 tubes",
          Dimensions: "40cm x 30cm x 20cm",
          Weight: "12kg",
          Power: "110-240V",
        },
      },
    ]
  } catch (error) {
    return rejectWithValue("Failed to fetch devices")
  }
})

export const fetchDeviceById = createAsyncThunk("device/fetchDeviceById", async (id: string, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    const devices = await fetchDevices().unwrap()
    const device = devices.find((d: Device) => d.id === id)
    if (!device) {
      throw new Error("Device not found")
    }
    return device
  } catch (error) {
    return rejectWithValue("Failed to fetch device details")
  }
})

export const bulkUploadDevices = createAsyncThunk(
  "device/bulkUploadDevices",
  async (devices: Partial<Device>[], { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      // Simulate validation and processing
      const processedDevices = devices.map((device, index) => ({
        id: `device-bulk-${Date.now()}-${index}`,
        name: device.name || `Unnamed Device ${index + 1}`,
        model: device.model || "Unknown Model",
        serialNumber: device.serialNumber || `SN-BULK-${Date.now()}-${index}`,
        manufacturer: device.manufacturer || "Unknown Manufacturer",
        purchaseDate: device.purchaseDate || new Date().toISOString().split("T")[0],
        warrantyExpiry: device.warrantyExpiry || new Date(Date.now() + 94608000000).toISOString().split("T")[0], // 3 years from now
        clinicId: device.clinicId || "clinic-001",
        clinicName: device.clinicName || "Default Clinic",
        status: device.status || "operational",
        lastCalibration: device.lastCalibration || null,
        nextCalibration: device.nextCalibration || null,
        utilization: device.utilization || 0,
        type: device.type || "Cell Counter",
        macAddress: device.macAddress || `00:00:00:00:00:${index.toString(16).padStart(2, "0").toUpperCase()}`,
        maintenanceRecords: [],
        specifications: device.specifications || {},
      }))

      return processedDevices
    } catch (error) {
      return rejectWithValue("Failed to process bulk device upload")
    }
  },
)

export const assignDeviceToClinic = createAsyncThunk(
  "device/assignDeviceToClinic",
  async (
    { deviceId, clinicId, clinicName }: { deviceId: string; clinicId: string; clinicName: string },
    { rejectWithValue },
  ) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

      return { deviceId, clinicId, clinicName }
    } catch (error) {
      return rejectWithValue("Failed to assign device to clinic")
    }
  },
)

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    resetDevices: () => initialState,
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload
    },
    resetBulkUploadStatus: (state) => {
      state.bulkUploadStatus = "idle"
      state.bulkUploadError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDevices.fulfilled, (state, action: PayloadAction<Device[]>) => {
        state.loading = false
        state.devices = action.payload
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDeviceById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDeviceById.fulfilled, (state, action: PayloadAction<Device>) => {
        state.loading = false
        state.selectedDevice = action.payload
      })
      .addCase(fetchDeviceById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(bulkUploadDevices.pending, (state) => {
        state.bulkUploadStatus = "loading"
        state.bulkUploadError = null
      })
      .addCase(bulkUploadDevices.fulfilled, (state, action: PayloadAction<Device[]>) => {
        state.bulkUploadStatus = "success"
        state.devices = [...state.devices, ...action.payload]
      })
      .addCase(bulkUploadDevices.rejected, (state, action) => {
        state.bulkUploadStatus = "failed"
        state.bulkUploadError = action.payload as string
      })
      .addCase(assignDeviceToClinic.fulfilled, (state, action) => {
        const { deviceId, clinicId, clinicName } = action.payload
        const deviceIndex = state.devices.findIndex((device) => device.id === deviceId)
        if (deviceIndex !== -1) {
          state.devices[deviceIndex].clinicId = clinicId
          state.devices[deviceIndex].clinicName = clinicName
        }
        if (state.selectedDevice?.id === deviceId) {
          state.selectedDevice.clinicId = clinicId
          state.selectedDevice.clinicName = clinicName
        }
      })
  },
})

export const { resetDevices, setSelectedDevice, resetBulkUploadStatus } = deviceSlice.actions

export default deviceSlice.reducer
