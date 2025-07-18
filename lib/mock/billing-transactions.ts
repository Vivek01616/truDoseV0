export interface BillingTransaction {
  id: string
  patientId: string
  patientName: string
  procedureCode: string
  procedureDescription: string
  dateOfService: string
  billingDate: string
  providerId: string
  providerName: string
  clinicId: string
  clinicName: string
  chargeAmount: number
  insuranceSubmitted: boolean
  insuranceProvider?: string
  insuranceClaim?: string
  insuranceResponse?: {
    status: "approved" | "denied" | "partial" | "pending"
    approvedAmount?: number
    denialReason?: string
    responseDate?: string
  }
  patientResponsibility?: number
  paymentStatus: "paid" | "partial" | "unpaid" | "waived"
  paymentHistory: {
    id: string
    date: string
    amount: number
    method: "credit" | "debit" | "cash" | "check" | "insurance" | "other"
    reference?: string
  }[]
  notes?: string
  status: "complete" | "pending" | "review" | "cancelled"
}

export const mockBillingTransactions: BillingTransaction[] = [
  {
    id: "tx-00001",
    patientId: "patient-001",
    patientName: "John Smith",
    procedureCode: "0232T",
    procedureDescription: "Injection(s), platelet rich plasma, any site",
    dateOfService: "2023-05-15",
    billingDate: "2023-05-15",
    providerId: "provider-001",
    providerName: "Dr. Sarah Johnson",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    chargeAmount: 850.0,
    insuranceSubmitted: true,
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceClaim: "BCBS-2023-05150001",
    insuranceResponse: {
      status: "approved",
      approvedAmount: 595.0,
      responseDate: "2023-05-25",
    },
    patientResponsibility: 255.0,
    paymentStatus: "paid",
    paymentHistory: [
      {
        id: "pay-00001",
        date: "2023-05-15",
        amount: 30.0,
        method: "credit",
        reference: "AUTH-123456",
      },
      {
        id: "pay-00002",
        date: "2023-05-25",
        amount: 595.0,
        method: "insurance",
        reference: "INS-BCBS-78901",
      },
      {
        id: "pay-00003",
        date: "2023-05-30",
        amount: 225.0,
        method: "credit",
        reference: "AUTH-234567",
      },
    ],
    status: "complete",
  },
  {
    id: "tx-00002",
    patientId: "patient-002",
    patientName: "Mary Johnson",
    procedureCode: "20610",
    procedureDescription: "Arthrocentesis, major joint",
    dateOfService: "2023-05-16",
    billingDate: "2023-05-16",
    providerId: "provider-002",
    providerName: "Dr. Michael Chen",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    chargeAmount: 350.0,
    insuranceSubmitted: true,
    insuranceProvider: "Aetna",
    insuranceClaim: "AETNA-2023-05160001",
    insuranceResponse: {
      status: "partial",
      approvedAmount: 210.0,
      responseDate: "2023-05-26",
    },
    patientResponsibility: 140.0,
    paymentStatus: "partial",
    paymentHistory: [
      {
        id: "pay-00004",
        date: "2023-05-16",
        amount: 35.0,
        method: "debit",
        reference: "AUTH-345678",
      },
      {
        id: "pay-00005",
        date: "2023-05-26",
        amount: 210.0,
        method: "insurance",
        reference: "INS-AETNA-89012",
      },
      {
        id: "pay-00006",
        date: "2023-06-05",
        amount: 50.0,
        method: "credit",
        reference: "AUTH-456789",
      },
    ],
    notes: "Patient on payment plan for remaining balance",
    status: "complete",
  },
  {
    id: "tx-00003",
    patientId: "patient-003",
    patientName: "Robert Davis",
    procedureCode: "0232T",
    procedureDescription: "Injection(s), platelet rich plasma, any site",
    dateOfService: "2023-05-17",
    billingDate: "2023-05-17",
    providerId: "provider-003",
    providerName: "Dr. Emily Rodriguez",
    clinicId: "clinic-002",
    clinicName: "Eastside Health Partners",
    chargeAmount: 850.0,
    insuranceSubmitted: true,
    insuranceProvider: "UnitedHealthcare",
    insuranceClaim: "UHC-2023-05170001",
    insuranceResponse: {
      status: "denied",
      denialReason: "Experimental treatment not covered under policy",
      responseDate: "2023-05-27",
    },
    patientResponsibility: 850.0,
    paymentStatus: "unpaid",
    paymentHistory: [],
    notes: "Patient appealing insurance denial",
    status: "review",
  },
  {
    id: "tx-00004",
    patientId: "patient-004",
    patientName: "Jennifer Lee",
    procedureCode: "20926",
    procedureDescription: "Tissue grafts, other",
    dateOfService: "2023-05-18",
    billingDate: "2023-05-18",
    providerId: "provider-001",
    providerName: "Dr. Sarah Johnson",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    chargeAmount: 650.0,
    insuranceSubmitted: true,
    insuranceProvider: "Cigna",
    insuranceClaim: "CIGNA-2023-05180001",
    insuranceResponse: {
      status: "approved",
      approvedAmount: 520.0,
      responseDate: "2023-05-28",
    },
    patientResponsibility: 130.0,
    paymentStatus: "paid",
    paymentHistory: [
      {
        id: "pay-00007",
        date: "2023-05-18",
        amount: 25.0,
        method: "credit",
        reference: "AUTH-567890",
      },
      {
        id: "pay-00008",
        date: "2023-05-28",
        amount: 520.0,
        method: "insurance",
        reference: "INS-CIGNA-90123",
      },
      {
        id: "pay-00009",
        date: "2023-06-01",
        amount: 105.0,
        method: "credit",
        reference: "AUTH-678901",
      },
    ],
    status: "complete",
  },
  {
    id: "tx-00005",
    patientId: "patient-005",
    patientName: "William Brown",
    procedureCode: "0232T",
    procedureDescription: "Injection(s), platelet rich plasma, any site",
    dateOfService: "2023-05-19",
    billingDate: "2023-05-19",
    providerId: "provider-002",
    providerName: "Dr. Michael Chen",
    clinicId: "clinic-002",
    clinicName: "Eastside Health Partners",
    chargeAmount: 850.0,
    insuranceSubmitted: true,
    insuranceProvider: "Medicare",
    insuranceClaim: "MCARE-2023-05190001",
    insuranceResponse: {
      status: "pending",
      responseDate: "2023-05-29",
    },
    paymentStatus: "unpaid",
    paymentHistory: [],
    status: "pending",
  },
  {
    id: "tx-00006",
    patientId: "patient-006",
    patientName: "Elizabeth Taylor",
    procedureCode: "20552",
    procedureDescription: "Injection(s); single or multiple trigger point(s), 1 or 2 muscle(s)",
    dateOfService: "2023-05-20",
    billingDate: "2023-05-20",
    providerId: "provider-003",
    providerName: "Dr. Emily Rodriguez",
    clinicId: "clinic-003",
    clinicName: "South County Medical Group",
    chargeAmount: 325.0,
    insuranceSubmitted: true,
    insuranceProvider: "Humana",
    insuranceClaim: "HUMANA-2023-05200001",
    insuranceResponse: {
      status: "approved",
      approvedAmount: 243.75,
      responseDate: "2023-05-30",
    },
    patientResponsibility: 81.25,
    paymentStatus: "paid",
    paymentHistory: [
      {
        id: "pay-00010",
        date: "2023-05-20",
        amount: 35.0,
        method: "debit",
        reference: "AUTH-789012",
      },
      {
        id: "pay-00011",
        date: "2023-05-30",
        amount: 243.75,
        method: "insurance",
        reference: "INS-HUMANA-01234",
      },
      {
        id: "pay-00012",
        date: "2023-06-02",
        amount: 46.25,
        method: "check",
        reference: "CHECK-123456",
      },
    ],
    status: "complete",
  },
  {
    id: "tx-00007",
    patientId: "patient-007",
    patientName: "Michael Wilson",
    procedureCode: "76942",
    procedureDescription: "Ultrasonic guidance for needle placement",
    dateOfService: "2023-05-21",
    billingDate: "2023-05-21",
    providerId: "provider-004",
    providerName: "Dr. James Wilson",
    clinicId: "clinic-003",
    clinicName: "South County Medical Group",
    chargeAmount: 250.0,
    insuranceSubmitted: false,
    paymentStatus: "paid",
    paymentHistory: [
      {
        id: "pay-00013",
        date: "2023-05-21",
        amount: 250.0,
        method: "credit",
        reference: "AUTH-890123",
      },
    ],
    notes: "Self-pay patient",
    status: "complete",
  },
  {
    id: "tx-00008",
    patientId: "patient-008",
    patientName: "David Anderson",
    procedureCode: "0232T",
    procedureDescription: "Injection(s), platelet rich plasma, any site",
    dateOfService: "2023-05-22",
    billingDate: "2023-05-22",
    providerId: "provider-005",
    providerName: "Dr. Lisa Martinez",
    clinicId: "clinic-004",
    clinicName: "Downtown Wellness Center",
    chargeAmount: 850.0,
    insuranceSubmitted: true,
    insuranceProvider: "Anthem",
    insuranceClaim: "ANTHEM-2023-05220001",
    insuranceResponse: {
      status: "denied",
      denialReason: "Service not covered under current policy",
      responseDate: "2023-06-01",
    },
    patientResponsibility: 850.0,
    paymentStatus: "waived",
    paymentHistory: [],
    notes: "Fee waived for clinical trial participant",
    status: "complete",
  },
  {
    id: "tx-00009",
    patientId: "patient-009",
    patientName: "Patricia White",
    procedureCode: "20605",
    procedureDescription: "Arthrocentesis, intermediate joint",
    dateOfService: "2023-05-23",
    billingDate: "2023-05-23",
    providerId: "provider-001",
    providerName: "Dr. Sarah Johnson",
    clinicId: "clinic-001",
    clinicName: "Northwest Medical Center",
    chargeAmount: 325.0,
    insuranceSubmitted: true,
    insuranceProvider: "Kaiser Permanente",
    insuranceClaim: "KAISER-2023-05230001",
    insuranceResponse: {
      status: "approved",
      approvedAmount: 260.0,
      responseDate: "2023-06-02",
    },
    patientResponsibility: 65.0,
    paymentStatus: "paid",
    paymentHistory: [
      {
        id: "pay-00014",
        date: "2023-05-23",
        amount: 30.0,
        method: "credit",
        reference: "AUTH-901234",
      },
      {
        id: "pay-00015",
        date: "2023-06-02",
        amount: 260.0,
        method: "insurance",
        reference: "INS-KAISER-12345",
      },
      {
        id: "pay-00016",
        date: "2023-06-05",
        amount: 35.0,
        method: "credit",
        reference: "AUTH-012345",
      },
    ],
    status: "complete",
  },
  {
    id: "tx-00010",
    patientId: "patient-010",
    patientName: "Thomas Brown",
    procedureCode: "0481T",
    procedureDescription: "Injection(s), autologous white blood cell concentrate",
    dateOfService: "2023-05-24",
    billingDate: "2023-05-24",
    providerId: "provider-002",
    providerName: "Dr. Michael Chen",
    clinicId: "clinic-002",
    clinicName: "Eastside Health Partners",
    chargeAmount: 950.0,
    insuranceSubmitted: true,
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceClaim: "BCBS-2023-05240001",
    insuranceResponse: {
      status: "partial",
      approvedAmount: 475.0,
      responseDate: "2023-06-03",
    },
    patientResponsibility: 475.0,
    paymentStatus: "partial",
    paymentHistory: [
      {
        id: "pay-00017",
        date: "2023-05-24",
        amount: 30.0,
        method: "debit",
        reference: "AUTH-123456",
      },
      {
        id: "pay-00018",
        date: "2023-06-03",
        amount: 475.0,
        method: "insurance",
        reference: "INS-BCBS-23456",
      },
      {
        id: "pay-00019",
        date: "2023-06-10",
        amount: 200.0,
        method: "credit",
        reference: "AUTH-234567",
      },
    ],
    notes: "Patient on payment plan for remaining balance",
    status: "complete",
  },
]
