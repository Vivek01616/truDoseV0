// This file contains mock data for system integration points
// that connect the various sections of the Trudose portal

export interface SystemIntegrationPoint {
  id: string
  name: string
  description: string
  sourceSystem: string
  targetSystem: string
  dataElements: {
    name: string
    description: string
    dataType: string
    required: boolean
    validation?: string
  }[]
  frequency: "real-time" | "hourly" | "daily" | "weekly" | "monthly" | "on-demand"
  status: "active" | "inactive" | "development" | "testing"
  lastSync?: string
  nextScheduledSync?: string
  errorRate?: number
  averageProcessingTime?: number
}

export const mockSystemIntegrations: SystemIntegrationPoint[] = [
  {
    id: "integration-001",
    name: "Billing to Analytics Data Flow",
    description: "Integration that transfers billing transaction data to the analytics system for reporting",
    sourceSystem: "Billing",
    targetSystem: "Analytics",
    dataElements: [
      {
        name: "transactionId",
        description: "Unique identifier for the billing transaction",
        dataType: "string",
        required: true,
        validation: "UUID format",
      },
      {
        name: "patientId",
        description: "Identifier for the patient",
        dataType: "string",
        required: true,
      },
      {
        name: "procedureCode",
        description: "Code for the procedure performed",
        dataType: "string",
        required: true,
      },
      {
        name: "chargeAmount",
        description: "Amount charged for the procedure",
        dataType: "number",
        required: true,
        validation: "Positive number",
      },
      {
        name: "insuranceProvider",
        description: "Name of the insurance provider",
        dataType: "string",
        required: false,
      },
      {
        name: "paymentStatus",
        description: "Status of the payment",
        dataType: "string",
        required: true,
        validation: "One of: paid, partial, unpaid, waived",
      },
      {
        name: "dateOfService",
        description: "Date the service was provided",
        dataType: "date",
        required: true,
      },
    ],
    frequency: "daily",
    status: "active",
    lastSync: "2023-05-19T23:00:00Z",
    nextScheduledSync: "2023-05-20T23:00:00Z",
    errorRate: 0.2,
    averageProcessingTime: 45,
  },
  {
    id: "integration-002",
    name: "Device to Remote Management",
    description: "Real-time integration that sends device status and metrics to the remote management system",
    sourceSystem: "Devices",
    targetSystem: "Remote Management",
    dataElements: [
      {
        name: "deviceId",
        description: "Unique identifier for the device",
        dataType: "string",
        required: true,
      },
      {
        name: "timestamp",
        description: "Time of the status update",
        dataType: "datetime",
        required: true,
      },
      {
        name: "status",
        description: "Current status of the device",
        dataType: "string",
        required: true,
        validation: "One of: normal, warning, error, critical",
      },
      {
        name: "metrics",
        description: "Array of device metrics",
        dataType: "array",
        required: true,
      },
      {
        name: "operationalStatus",
        description: "Current operational status",
        dataType: "string",
        required: true,
        validation: "One of: idle, processing, maintenance, error",
      },
      {
        name: "currentUser",
        description: "User currently using the device",
        dataType: "string",
        required: false,
      },
    ],
    frequency: "real-time",
    status: "active",
    lastSync: "2023-05-20T14:25:00Z",
    errorRate: 0.5,
    averageProcessingTime: 0.8,
  },
  {
    id: "integration-003",
    name: "Training to Portal Admin",
    description:
      "Integration that updates user certifications in the portal admin system based on training completions",
    sourceSystem: "Training",
    targetSystem: "Portal Admin",
    dataElements: [
      {
        name: "userId",
        description: "Unique identifier for the user",
        dataType: "string",
        required: true,
      },
      {
        name: "courseId",
        description: "Identifier for the completed course",
        dataType: "string",
        required: true,
      },
      {
        name: "completionDate",
        description: "Date the course was completed",
        dataType: "date",
        required: true,
      },
      {
        name: "score",
        description: "Score achieved in the course",
        dataType: "number",
        required: true,
        validation: "0-100",
      },
      {
        name: "certificationType",
        description: "Type of certification earned",
        dataType: "string",
        required: true,
      },
      {
        name: "expirationDate",
        description: "Date the certification expires",
        dataType: "date",
        required: true,
      },
    ],
    frequency: "daily",
    status: "active",
    lastSync: "2023-05-19T23:00:00Z",
    nextScheduledSync: "2023-05-20T23:00:00Z",
    errorRate: 0.1,
    averageProcessingTime: 30,
  },
  {
    id: "integration-004",
    name: "Protocol to Analytics",
    description: "Integration that transfers protocol outcome data to the analytics system for reporting",
    sourceSystem: "Protocols",
    targetSystem: "Analytics",
    dataElements: [
      {
        name: "protocolId",
        description: "Unique identifier for the protocol",
        dataType: "string",
        required: true,
      },
      {
        name: "protocolName",
        description: "Name of the protocol",
        dataType: "string",
        required: true,
      },
      {
        name: "condition",
        description: "Medical condition being treated",
        dataType: "string",
        required: true,
      },
      {
        name: "totalPatients",
        description: "Number of patients treated with the protocol",
        dataType: "number",
        required: true,
        validation: "Positive integer",
      },
      {
        name: "successRate",
        description: "Success rate of the protocol",
        dataType: "number",
        required: true,
        validation: "0-100",
      },
      {
        name: "averagePainReduction",
        description: "Average pain reduction achieved",
        dataType: "number",
        required: false,
        validation: "0-100",
      },
      {
        name: "averagePatientSatisfaction",
        description: "Average patient satisfaction rating",
        dataType: "number",
        required: false,
        validation: "1-5",
      },
    ],
    frequency: "weekly",
    status: "active",
    lastSync: "2023-05-14T23:00:00Z",
    nextScheduledSync: "2023-05-21T23:00:00Z",
    errorRate: 0.3,
    averageProcessingTime: 60,
  },
  {
    id: "integration-005",
    name: "Portal Admin to Billing",
    description: "Integration that updates billing system with user and clinic information from portal admin",
    sourceSystem: "Portal Admin",
    targetSystem: "Billing",
    dataElements: [
      {
        name: "clinicId",
        description: "Unique identifier for the clinic",
        dataType: "string",
        required: true,
      },
      {
        name: "clinicName",
        description: "Name of the clinic",
        dataType: "string",
        required: true,
      },
      {
        name: "providerId",
        description: "Identifier for the provider",
        dataType: "string",
        required: true,
      },
      {
        name: "providerName",
        description: "Name of the provider",
        dataType: "string",
        required: true,
      },
      {
        name: "billingAddress",
        description: "Billing address for the clinic",
        dataType: "object",
        required: true,
      },
      {
        name: "taxId",
        description: "Tax ID for the clinic",
        dataType: "string",
        required: true,
      },
    ],
    frequency: "daily",
    status: "active",
    lastSync: "2023-05-19T23:00:00Z",
    nextScheduledSync: "2023-05-20T23:00:00Z",
    errorRate: 0.1,
    averageProcessingTime: 35,
  },
]
