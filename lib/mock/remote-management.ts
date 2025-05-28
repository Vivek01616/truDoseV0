export interface DeviceConfiguration {
  id: string
  deviceId: string
  deviceName: string
  deviceModel: string
  configName: string
  description: string
  createdBy: string
  createdDate: string
  lastModified: string
  status: "active" | "draft" | "archived"
  parameters: {
    id: string
    name: string
    description: string
    value: string | number | boolean
    unit?: string
    minValue?: number
    maxValue?: number
    options?: string[]
    type: "number" | "string" | "boolean" | "select"
    category: string
  }[]
  compatibleDevices: string[]
  version: string
  isDefault: boolean
}

export interface DeviceMonitoring {
  id: string
  deviceId: string
  timestamp: string
  status: "normal" | "warning" | "error" | "critical"
  metrics: {
    name: string
    value: number
    unit: string
    status: "normal" | "warning" | "error"
    thresholds?: {
      warning: number
      error: number
    }
  }[]
  alerts: {
    id: string
    type: "info" | "warning" | "error" | "critical"
    message: string
    timestamp: string
    acknowledged: boolean
    acknowledgedBy?: string
    acknowledgedAt?: string
  }[]
  operationalStatus: "idle" | "processing" | "maintenance" | "error"
  currentUser?: string
  currentProgram?: string
  programProgress?: number
  estimatedCompletion?: string
}

export interface FirmwareUpdate {
  id: string
  version: string
  releaseDate: string
  deviceModels: string[]
  description: string
  changeLog: string[]
  fileSize: number
  downloadUrl: string
  status: "available" | "mandatory" | "deprecated"
  compatibilityNotes: string
  installationTime: number
  releaseNotes: string
}

export const mockDeviceConfigurations: DeviceConfiguration[] = [
  {
    id: "config-001",
    deviceId: "remote-001",
    deviceName: "PRP Centrifuge #1",
    deviceModel: "PRP-5000",
    configName: "Standard PRP Protocol",
    description: "Standard configuration for PRP preparation",
    createdBy: "Dr. Sarah Johnson",
    createdDate: "2023-01-15T10:30:00Z",
    lastModified: "2023-03-10T14:45:00Z",
    status: "active",
    parameters: [
      {
        id: "param-001",
        name: "First Spin Speed",
        description: "Centrifugation speed for the first spin",
        value: 1500,
        unit: "RPM",
        minValue: 1000,
        maxValue: 2000,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-002",
        name: "First Spin Duration",
        description: "Duration of the first spin",
        value: 5,
        unit: "minutes",
        minValue: 3,
        maxValue: 10,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-003",
        name: "Second Spin Speed",
        description: "Centrifugation speed for the second spin",
        value: 3000,
        unit: "RPM",
        minValue: 2000,
        maxValue: 4000,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-004",
        name: "Second Spin Duration",
        description: "Duration of the second spin",
        value: 10,
        unit: "minutes",
        minValue: 5,
        maxValue: 15,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-005",
        name: "Temperature Control",
        description: "Enable temperature control during centrifugation",
        value: true,
        type: "boolean",
        category: "Environmental",
      },
      {
        id: "param-006",
        name: "Target Temperature",
        description: "Target temperature during centrifugation",
        value: 22,
        unit: "°C",
        minValue: 18,
        maxValue: 25,
        type: "number",
        category: "Environmental",
      },
      {
        id: "param-007",
        name: "Acceleration Profile",
        description: "Acceleration profile for centrifugation",
        value: "moderate",
        options: ["gentle", "moderate", "rapid"],
        type: "select",
        category: "Spin Parameters",
      },
      {
        id: "param-008",
        name: "Deceleration Profile",
        description: "Deceleration profile for centrifugation",
        value: "gentle",
        options: ["gentle", "moderate", "rapid"],
        type: "select",
        category: "Spin Parameters",
      },
    ],
    compatibleDevices: ["PRP-5000", "PRP-4500", "PRP-4000"],
    version: "1.2.0",
    isDefault: true,
  },
  {
    id: "config-002",
    deviceId: "remote-001",
    deviceName: "PRP Centrifuge #1",
    deviceModel: "PRP-5000",
    configName: "Leukocyte-Rich PRP Protocol",
    description: "Configuration for leukocyte-rich PRP preparation",
    createdBy: "Dr. Michael Chen",
    createdDate: "2023-02-10T09:15:00Z",
    lastModified: "2023-04-05T11:30:00Z",
    status: "active",
    parameters: [
      {
        id: "param-009",
        name: "First Spin Speed",
        description: "Centrifugation speed for the first spin",
        value: 1200,
        unit: "RPM",
        minValue: 1000,
        maxValue: 2000,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-010",
        name: "First Spin Duration",
        description: "Duration of the first spin",
        value: 8,
        unit: "minutes",
        minValue: 3,
        maxValue: 10,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-011",
        name: "Second Spin Speed",
        description: "Centrifugation speed for the second spin",
        value: 2500,
        unit: "RPM",
        minValue: 2000,
        maxValue: 4000,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-012",
        name: "Second Spin Duration",
        description: "Duration of the second spin",
        value: 8,
        unit: "minutes",
        minValue: 5,
        maxValue: 15,
        type: "number",
        category: "Spin Parameters",
      },
      {
        id: "param-013",
        name: "Temperature Control",
        description: "Enable temperature control during centrifugation",
        value: true,
        type: "boolean",
        category: "Environmental",
      },
      {
        id: "param-014",
        name: "Target Temperature",
        description: "Target temperature during centrifugation",
        value: 21,
        unit: "°C",
        minValue: 18,
        maxValue: 25,
        type: "number",
        category: "Environmental",
      },
      {
        id: "param-015",
        name: "Acceleration Profile",
        description: "Acceleration profile for centrifugation",
        value: "gentle",
        options: ["gentle", "moderate", "rapid"],
        type: "select",
        category: "Spin Parameters",
      },
      {
        id: "param-016",
        name: "Deceleration Profile",
        description: "Deceleration profile for centrifugation",
        value: "gentle",
        options: ["gentle", "moderate", "rapid"],
        type: "select",
        category: "Spin Parameters",
      },
    ],
    compatibleDevices: ["PRP-5000", "PRP-4500"],
    version: "1.1.0",
    isDefault: false,
  },
  {
    id: "config-003",
    deviceId: "remote-003",
    deviceName: "Blood Analyzer",
    deviceModel: "BloodPro 3000",
    configName: "Standard Blood Analysis",
    description: "Standard configuration for blood sample analysis",
    createdBy: "Dr. Emily Rodriguez",
    createdDate: "2023-01-20T13:45:00Z",
    lastModified: "2023-03-15T10:20:00Z",
    status: "active",
    parameters: [
      {
        id: "param-017",
        name: "Sample Volume",
        description: "Volume of blood sample to analyze",
        value: 2.0,
        unit: "mL",
        minValue: 0.5,
        maxValue: 5.0,
        type: "number",
        category: "Sample Parameters",
      },
      {
        id: "param-018",
        name: "Analysis Mode",
        description: "Mode of analysis to perform",
        value: "comprehensive",
        options: ["basic", "comprehensive", "research"],
        type: "select",
        category: "Analysis Parameters",
      },
      {
        id: "param-019",
        name: "Platelet Count",
        description: "Include platelet count in analysis",
        value: true,
        type: "boolean",
        category: "Analysis Parameters",
      },
      {
        id: "param-020",
        name: "White Blood Cell Count",
        description: "Include white blood cell count in analysis",
        value: true,
        type: "boolean",
        category: "Analysis Parameters",
      },
      {
        id: "param-021",
        name: "Red Blood Cell Count",
        description: "Include red blood cell count in analysis",
        value: true,
        type: "boolean",
        category: "Analysis Parameters",
      },
      {
        id: "param-022",
        name: "Growth Factor Analysis",
        description: "Include growth factor analysis",
        value: false,
        type: "boolean",
        category: "Analysis Parameters",
      },
      {
        id: "param-023",
        name: "Analysis Temperature",
        description: "Temperature for sample analysis",
        value: 23,
        unit: "°C",
        minValue: 20,
        maxValue: 25,
        type: "number",
        category: "Environmental",
      },
    ],
    compatibleDevices: ["BloodPro 3000", "BloodPro 2500"],
    version: "2.0.1",
    isDefault: true,
  },
]

export const mockDeviceMonitoring: DeviceMonitoring[] = [
  {
    id: "monitor-001",
    deviceId: "remote-001",
    timestamp: "2023-05-20T14:30:00Z",
    status: "normal",
    metrics: [
      {
        name: "Temperature",
        value: 22.5,
        unit: "°C",
        status: "normal",
        thresholds: {
          warning: 25,
          error: 28,
        },
      },
      {
        name: "Humidity",
        value: 45.2,
        unit: "%",
        status: "normal",
        thresholds: {
          warning: 60,
          error: 70,
        },
      },
      {
        name: "Vibration",
        value: 0.3,
        unit: "mm/s",
        status: "normal",
        thresholds: {
          warning: 1.0,
          error: 2.0,
        },
      },
      {
        name: "Spin Speed Accuracy",
        value: 99.8,
        unit: "%",
        status: "normal",
        thresholds: {
          warning: 98.0,
          error: 95.0,
        },
      },
      {
        name: "Power Consumption",
        value: 120.5,
        unit: "W",
        status: "normal",
        thresholds: {
          warning: 150,
          error: 180,
        },
      },
    ],
    alerts: [],
    operationalStatus: "idle",
    currentUser: null,
    currentProgram: null,
    programProgress: null,
    estimatedCompletion: null,
  },
  {
    id: "monitor-002",
    deviceId: "remote-002",
    timestamp: "2023-05-20T14:25:00Z",
    status: "normal",
    metrics: [
      {
        name: "Temperature",
        value: 23.1,
        unit: "°C",
        status: "normal",
        thresholds: {
          warning: 25,
          error: 28,
        },
      },
      {
        name: "Humidity",
        value: 46.8,
        unit: "%",
        status: "normal",
        thresholds: {
          warning: 60,
          error: 70,
        },
      },
      {
        name: "Vibration",
        value: 0.4,
        unit: "mm/s",
        status: "normal",
        thresholds: {
          warning: 1.0,
          error: 2.0,
        },
      },
      {
        name: "Spin Speed Accuracy",
        value: 99.5,
        unit: "%",
        status: "normal",
        thresholds: {
          warning: 98.0,
          error: 95.0,
        },
      },
      {
        name: "Power Consumption",
        value: 125.2,
        unit: "W",
        status: "normal",
        thresholds: {
          warning: 150,
          error: 180,
        },
      },
    ],
    alerts: [],
    operationalStatus: "processing",
    currentUser: "Dr. Michael Chen",
    currentProgram: "Standard PRP Protocol",
    programProgress: 45,
    estimatedCompletion: "2023-05-20T14:40:00Z",
  },
  {
    id: "monitor-003",
    deviceId: "remote-003",
    timestamp: "2023-05-20T10:15:00Z",
    status: "error",
    metrics: [
      {
        name: "Temperature",
        value: 25.7,
        unit: "°C",
        status: "warning",
        thresholds: {
          warning: 25,
          error: 28,
        },
      },
      {
        name: "Humidity",
        value: 48.3,
        unit: "%",
        status: "normal",
        thresholds: {
          warning: 60,
          error: 70,
        },
      },
      {
        name: "Sensor Calibration",
        value: 92.1,
        unit: "%",
        status: "error",
        thresholds: {
          warning: 95.0,
          error: 93.0,
        },
      },
      {
        name: "Analysis Accuracy",
        value: 94.2,
        unit: "%",
        status: "warning",
        thresholds: {
          warning: 95.0,
          error: 90.0,
        },
      },
      {
        name: "Power Consumption",
        value: 110.8,
        unit: "W",
        status: "normal",
        thresholds: {
          warning: 130,
          error: 150,
        },
      },
    ],
    alerts: [
      {
        id: "alert-001",
        type: "error",
        message: "Sensor calibration error detected",
        timestamp: "2023-05-20T10:15:00Z",
        acknowledged: false,
      },
    ],
    operationalStatus: "error",
    currentUser: null,
    currentProgram: null,
    programProgress: null,
    estimatedCompletion: null,
  },
]

export const mockFirmwareUpdates: FirmwareUpdate[] = [
  {
    id: "firmware-001",
    version: "v2.3.2",
    releaseDate: "2023-05-15",
    deviceModels: ["PRP-5000", "PRP-4500"],
    description: "Maintenance update with performance improvements and bug fixes",
    changeLog: [
      "Improved temperature control accuracy",
      "Fixed issue with spin speed calibration",
      "Enhanced user interface responsiveness",
      "Added support for new protocol templates",
      "Improved error reporting and diagnostics",
    ],
    fileSize: 15.7,
    downloadUrl: "/firmware/prp-5000-v2.3.2.bin",
    status: "available",
    compatibilityNotes: "Compatible with all PRP-5000 and PRP-4500 devices running v2.2.0 or later",
    installationTime: 10,
    releaseNotes: "This update is recommended for all users to ensure optimal performance and reliability.",
  },
  {
    id: "firmware-002",
    version: "v1.8.6",
    releaseDate: "2023-05-18",
    deviceModels: ["BloodPro 3000", "BloodPro 2500"],
    description: "Critical update addressing sensor calibration issues",
    changeLog: [
      "Fixed sensor calibration error affecting analysis accuracy",
      "Improved error detection and reporting",
      "Enhanced calibration procedure",
      "Updated diagnostic tools",
      "Performance optimizations",
    ],
    fileSize: 12.3,
    downloadUrl: "/firmware/bloodpro-3000-v1.8.6.bin",
    status: "mandatory",
    compatibilityNotes: "Required update for all BloodPro 3000 and BloodPro 2500 devices",
    installationTime: 15,
    releaseNotes:
      "This update addresses a critical issue affecting sensor calibration and analysis accuracy. All devices should be updated as soon as possible.",
  },
  {
    id: "firmware-003",
    version: "v4.1.4",
    releaseDate: "2023-05-10",
    deviceModels: ["UltraGuide 500"],
    description: "Feature update with enhanced imaging capabilities",
    changeLog: [
      "Improved image resolution and clarity",
      "Added new measurement tools",
      "Enhanced depth perception",
      "Reduced power consumption",
      "Updated user interface",
    ],
    fileSize: 18.5,
    downloadUrl: "/firmware/ultraguide-500-v4.1.4.bin",
    status: "available",
    compatibilityNotes: "Compatible with all UltraGuide 500 devices",
    installationTime: 12,
    releaseNotes:
      "This update enhances imaging capabilities and adds new measurement tools for improved guidance during procedures.",
  },
]
