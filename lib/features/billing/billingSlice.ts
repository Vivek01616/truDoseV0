import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ProcedureCode {
  id: string
  code: string
  description: string
  fee: number
  category: string
  active: boolean
}

export interface InsuranceVerification {
  id: string
  patientId: string
  patientName: string
  insuranceProvider: string
  policyNumber: string
  groupNumber: string
  verificationDate: string
  coverageStatus: "verified" | "pending" | "denied"
  coverageDetails: string
  authorizationRequired: boolean
  authorizationNumber?: string
  copay?: number
  deductible?: number
  deductibleMet?: number
  outOfPocketMax?: number
  outOfPocketMet?: number
}

export interface ComplianceReport {
  id: string
  name: string
  description: string
  date: string
  status: "compliant" | "non-compliant" | "pending"
  issues: {
    id: string
    description: string
    severity: "low" | "medium" | "high" | "critical"
    resolved: boolean
  }[]
}

export interface BillingState {
  procedureCodes: ProcedureCode[]
  insuranceVerifications: InsuranceVerification[]
  complianceReports: ComplianceReport[]
  loading: boolean
  error: string | null
}

const initialState: BillingState = {
  procedureCodes: [],
  insuranceVerifications: [],
  complianceReports: [],
  loading: false,
  error: null,
}

export const fetchBillingData = createAsyncThunk("billing/fetchBillingData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      procedureCodes: [
        {
          id: "proc-001",
          code: "0232T",
          description:
            "Injection(s), platelet rich plasma, any site, including image guidance, harvesting and preparation when performed",
          fee: 850.0,
          category: "PRP Treatments",
          active: true,
        },
        {
          id: "proc-002",
          code: "20926",
          description: "Tissue grafts, other (eg, paratenon, fat, dermis)",
          fee: 650.0,
          category: "Tissue Grafts",
          active: true,
        },
        {
          id: "proc-003",
          code: "20550",
          description: "Injection(s); single tendon sheath, or ligament, aponeurosis (eg, plantar 'fascia')",
          fee: 350.0,
          category: "Injections",
          active: true,
        },
        {
          id: "proc-004",
          code: "20551",
          description: "Injection(s); single tendon origin/insertion",
          fee: 375.0,
          category: "Injections",
          active: true,
        },
        {
          id: "proc-005",
          code: "20552",
          description: "Injection(s); single or multiple trigger point(s), 1 or 2 muscle(s)",
          fee: 325.0,
          category: "Injections",
          active: true,
        },
        {
          id: "proc-006",
          code: "20553",
          description: "Injection(s); single or multiple trigger point(s), 3 or more muscle(s)",
          fee: 375.0,
          category: "Injections",
          active: true,
        },
        {
          id: "proc-007",
          code: "20600",
          description: "Arthrocentesis, aspiration and/or injection, small joint or bursa",
          fee: 300.0,
          category: "Arthrocentesis",
          active: true,
        },
        {
          id: "proc-008",
          code: "20605",
          description: "Arthrocentesis, aspiration and/or injection, intermediate joint or bursa",
          fee: 325.0,
          category: "Arthrocentesis",
          active: true,
        },
        {
          id: "proc-009",
          code: "20610",
          description: "Arthrocentesis, aspiration and/or injection, major joint or bursa",
          fee: 350.0,
          category: "Arthrocentesis",
          active: true,
        },
        {
          id: "proc-010",
          code: "76942",
          description: "Ultrasonic guidance for needle placement, imaging supervision and interpretation",
          fee: 250.0,
          category: "Imaging",
          active: true,
        },
        {
          id: "proc-011",
          code: "86999",
          description: "Unlisted transfusion medicine procedure (PRP preparation)",
          fee: 450.0,
          category: "PRP Preparation",
          active: true,
        },
        {
          id: "proc-012",
          code: "0481T",
          description: "Injection(s), autologous white blood cell concentrate, any site",
          fee: 950.0,
          category: "Advanced Treatments",
          active: true,
        },
        {
          id: "proc-013",
          code: "J7999",
          description: "Compounded drug, not otherwise classified (PRP kit)",
          fee: 275.0,
          category: "Supplies",
          active: true,
        },
        {
          id: "proc-014",
          code: "99213",
          description: "Office/outpatient visit, established patient, 15 minutes",
          fee: 125.0,
          category: "Office Visits",
          active: true,
        },
        {
          id: "proc-015",
          code: "99214",
          description: "Office/outpatient visit, established patient, 25 minutes",
          fee: 190.0,
          category: "Office Visits",
          active: true,
        },
      ],
      insuranceVerifications: [
        {
          id: "verify-001",
          patientId: "patient-001",
          patientName: "John Smith",
          insuranceProvider: "Blue Cross Blue Shield",
          policyNumber: "BCBS12345678",
          groupNumber: "GRP987654",
          verificationDate: "2023-05-10",
          coverageStatus: "verified",
          coverageDetails: "PRP treatments covered at 70% after deductible",
          authorizationRequired: true,
          authorizationNumber: "AUTH123456",
          copay: 30.0,
          deductible: 1500.0,
          deductibleMet: 750.0,
          outOfPocketMax: 5000.0,
          outOfPocketMet: 1200.0,
        },
        {
          id: "verify-002",
          patientId: "patient-002",
          patientName: "Mary Johnson",
          insuranceProvider: "Aetna",
          policyNumber: "AET87654321",
          groupNumber: "GRP123456",
          verificationDate: "2023-05-12",
          coverageStatus: "pending",
          coverageDetails: "Verification in progress",
          authorizationRequired: true,
        },
        {
          id: "verify-003",
          patientId: "patient-003",
          patientName: "Robert Davis",
          insuranceProvider: "UnitedHealthcare",
          policyNumber: "UHC56789012",
          groupNumber: "GRP345678",
          verificationDate: "2023-05-08",
          coverageStatus: "denied",
          coverageDetails: "PRP treatments not covered under current policy",
          authorizationRequired: false,
        },
        {
          id: "verify-004",
          patientId: "patient-005",
          patientName: "William Brown",
          insuranceProvider: "Medicare",
          policyNumber: "MED12345678",
          groupNumber: "",
          verificationDate: "2023-05-15",
          coverageStatus: "verified",
          coverageDetails: "PRP treatments covered for specific diagnoses only",
          authorizationRequired: true,
          authorizationNumber: "AUTH789012",
          copay: 0.0,
          deductible: 203.0,
          deductibleMet: 203.0,
          outOfPocketMax: 7550.0,
          outOfPocketMet: 450.0,
        },
        {
          id: "verify-005",
          patientId: "patient-006",
          patientName: "Elizabeth Taylor",
          insuranceProvider: "Cigna",
          policyNumber: "CIG98765432",
          groupNumber: "GRP567890",
          verificationDate: "2023-05-18",
          coverageStatus: "verified",
          coverageDetails: "PRP treatments covered at 80% after deductible",
          authorizationRequired: true,
          authorizationNumber: "AUTH234567",
          copay: 25.0,
          deductible: 2000.0,
          deductibleMet: 1200.0,
          outOfPocketMax: 6000.0,
          outOfPocketMet: 1800.0,
        },
        {
          id: "verify-006",
          patientId: "patient-007",
          patientName: "Michael Wilson",
          insuranceProvider: "Humana",
          policyNumber: "HUM45678901",
          groupNumber: "GRP678901",
          verificationDate: "2023-05-20",
          coverageStatus: "verified",
          coverageDetails: "PRP treatments covered at 75% after deductible",
          authorizationRequired: false,
          copay: 35.0,
          deductible: 1800.0,
          deductibleMet: 900.0,
          outOfPocketMax: 5500.0,
          outOfPocketMet: 1500.0,
        },
        {
          id: "verify-007",
          patientId: "patient-008",
          patientName: "Jennifer Martinez",
          insuranceProvider: "Kaiser Permanente",
          policyNumber: "KP34567890",
          groupNumber: "GRP789012",
          verificationDate: "2023-05-19",
          coverageStatus: "pending",
          coverageDetails: "Additional documentation requested",
          authorizationRequired: true,
        },
        {
          id: "verify-008",
          patientId: "patient-009",
          patientName: "David Anderson",
          insuranceProvider: "Anthem",
          policyNumber: "ANT23456789",
          groupNumber: "GRP890123",
          verificationDate: "2023-05-17",
          coverageStatus: "denied",
          coverageDetails: "Experimental treatment not covered",
          authorizationRequired: true,
        },
      ],
      complianceReports: [
        {
          id: "report-001",
          name: "HIPAA Compliance Audit - Q1 2023",
          description: "Quarterly audit of HIPAA compliance across all clinics",
          date: "2023-03-31",
          status: "compliant",
          issues: [],
        },
        {
          id: "report-002",
          name: "Billing Compliance Review - April 2023",
          description: "Monthly review of billing practices and documentation",
          date: "2023-04-30",
          status: "non-compliant",
          issues: [
            {
              id: "issue-001",
              description: "Missing documentation for 3 PRP procedures at Northwest Medical Center",
              severity: "medium",
              resolved: true,
            },
            {
              id: "issue-002",
              description: "Incorrect coding for 2 procedures at Eastside Health Partners",
              severity: "medium",
              resolved: false,
            },
          ],
        },
        {
          id: "report-003",
          name: "Consent Form Audit - May 2023",
          description: "Audit of patient consent forms for PRP treatments",
          date: "2023-05-15",
          status: "pending",
          issues: [
            {
              id: "issue-003",
              description: "5 consent forms missing patient signatures",
              severity: "high",
              resolved: false,
            },
          ],
        },
        {
          id: "report-004",
          name: "Insurance Verification Audit - Q2 2023",
          description: "Quarterly audit of insurance verification processes",
          date: "2023-06-30",
          status: "compliant",
          issues: [],
        },
        {
          id: "report-005",
          name: "Billing Compliance Review - May 2023",
          description: "Monthly review of billing practices and documentation",
          date: "2023-05-31",
          status: "non-compliant",
          issues: [
            {
              id: "issue-004",
              description: "Delayed claim submissions for 4 procedures",
              severity: "low",
              resolved: true,
            },
          ],
        },
        {
          id: "report-006",
          name: "Medicare Billing Audit - Q2 2023",
          description: "Quarterly audit of Medicare billing compliance",
          date: "2023-06-15",
          status: "pending",
          issues: [
            {
              id: "issue-005",
              description: "Documentation gaps in 2 Medicare claims",
              severity: "medium",
              resolved: false,
            },
          ],
        },
      ],
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch billing data")
  }
})

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    resetBilling: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBillingData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.procedureCodes = action.payload.procedureCodes
        state.insuranceVerifications = action.payload.insuranceVerifications
        state.complianceReports = action.payload.complianceReports
      })
      .addCase(fetchBillingData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetBilling } = billingSlice.actions

export default billingSlice.reducer
