import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface QualityMetric {
  id: string
  name: string
  description: string
  category: string
  value: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  changePercentage: number
  lastUpdated: string
}

export interface IncidentReport {
  id: string
  title: string
  description: string
  reportedBy: string
  reportedById: string
  reportedDate: string
  incidentDate: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "investigating" | "resolved" | "closed"
  category: string
  location: string
  clinicId: string
  clinicName: string
  affectedPatients: number
  resolution: string | null
  resolutionDate: string | null
  preventativeMeasures: string | null
}

export interface ProtocolStandard {
  id: string
  name: string
  description: string
  version: string
  status: "active" | "draft" | "archived"
  category: string
  createdBy: string
  createdDate: string
  lastModified: string
  approvedBy: string | null
  approvedDate: string | null
  requirements: {
    id: string
    description: string
    mandatory: boolean
  }[]
  complianceRate: number
}

export interface QualityState {
  metrics: QualityMetric[]
  incidents: IncidentReport[]
  standards: ProtocolStandard[]
  loading: boolean
  error: string | null
}

const initialState: QualityState = {
  metrics: [],
  incidents: [],
  standards: [],
  loading: false,
  error: null,
}

export const fetchQualityData = createAsyncThunk("quality/fetchQualityData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      metrics: [
        {
          id: "metric-001",
          name: "Treatment Success Rate",
          description: "Percentage of PRP treatments resulting in successful outcomes",
          category: "Treatment Outcomes",
          value: 87.5,
          target: 85.0,
          unit: "%",
          trend: "up",
          changePercentage: 2.3,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-002",
          name: "Protocol Adherence",
          description: "Percentage of treatments following established protocols",
          category: "Protocol Compliance",
          value: 94.2,
          target: 95.0,
          unit: "%",
          trend: "down",
          changePercentage: 1.5,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-003",
          name: "Patient Satisfaction",
          description: "Average patient satisfaction score (1-5 scale)",
          category: "Patient Experience",
          value: 4.7,
          target: 4.5,
          unit: "",
          trend: "up",
          changePercentage: 4.4,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-004",
          name: "Documentation Completeness",
          description: "Percentage of treatments with complete documentation",
          category: "Documentation",
          value: 92.8,
          target: 98.0,
          unit: "%",
          trend: "up",
          changePercentage: 3.1,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-005",
          name: "Adverse Event Rate",
          description: "Percentage of treatments resulting in adverse events",
          category: "Safety",
          value: 1.2,
          target: 1.0,
          unit: "%",
          trend: "down",
          changePercentage: 0.3,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-006",
          name: "Equipment Calibration Compliance",
          description: "Percentage of equipment with up-to-date calibration",
          category: "Equipment",
          value: 97.5,
          target: 100.0,
          unit: "%",
          trend: "stable",
          changePercentage: 0.0,
          lastUpdated: "2023-05-15",
        },
        {
          id: "metric-007",
          name: "Staff Certification Rate",
          description: "Percentage of staff with current certifications",
          category: "Training",
          value: 95.0,
          target: 100.0,
          unit: "%",
          trend: "up",
          changePercentage: 5.0,
          lastUpdated: "2023-05-15",
        },
      ],
      incidents: [
        {
          id: "incident-001",
          title: "PRP Preparation Error",
          description: "Incorrect centrifugation protocol used during PRP preparation",
          reportedBy: "Dr. Sarah Johnson",
          reportedById: "provider-001",
          reportedDate: "2023-05-10",
          incidentDate: "2023-05-09",
          severity: "medium",
          status: "resolved",
          category: "Protocol Deviation",
          location: "Lab Room 101",
          clinicId: "clinic-001",
          clinicName: "Northwest Medical Center",
          affectedPatients: 1,
          resolution: "PRP preparation repeated with correct protocol. Patient treatment rescheduled.",
          resolutionDate: "2023-05-10",
          preventativeMeasures: "Protocol checklist implemented for all PRP preparations. Staff retraining conducted.",
        },
        {
          id: "incident-002",
          title: "Equipment Malfunction",
          description: "Blood analyzer error during quality control check",
          reportedBy: "Dr. Michael Chen",
          reportedById: "provider-002",
          reportedDate: "2023-05-12",
          incidentDate: "2023-05-12",
          severity: "high",
          status: "investigating",
          category: "Equipment Failure",
          location: "Lab Room 102",
          clinicId: "clinic-001",
          clinicName: "Northwest Medical Center",
          affectedPatients: 0,
          resolution: null,
          resolutionDate: null,
          preventativeMeasures: null,
        },
        {
          id: "incident-003",
          title: "Documentation Discrepancy",
          description: "Missing patient consent form for PRP treatment",
          reportedBy: "Dr. Emily Rodriguez",
          reportedById: "provider-003",
          reportedDate: "2023-05-08",
          incidentDate: "2023-05-05",
          severity: "medium",
          status: "resolved",
          category: "Documentation",
          location: "Treatment Room 3",
          clinicId: "clinic-002",
          clinicName: "Eastside Health Partners",
          affectedPatients: 1,
          resolution: "Consent form obtained from patient. Documentation updated.",
          resolutionDate: "2023-05-09",
          preventativeMeasures: "Pre-treatment documentation checklist implemented.",
        },
        {
          id: "incident-004",
          title: "Adverse Reaction to PRP Treatment",
          description: "Patient experienced unusual swelling and pain after PRP injection",
          reportedBy: "Dr. Lisa Martinez",
          reportedById: "provider-005",
          reportedDate: "2023-05-15",
          incidentDate: "2023-05-14",
          severity: "high",
          status: "open",
          category: "Adverse Event",
          location: "Treatment Room 1",
          clinicId: "clinic-003",
          clinicName: "South County Medical Group",
          affectedPatients: 1,
          resolution: null,
          resolutionDate: null,
          preventativeMeasures: null,
        },
      ],
      standards: [
        {
          id: "standard-001",
          name: "Standard PRP Preparation Protocol",
          description: "Standard protocol for preparing platelet-rich plasma",
          version: "2.1",
          status: "active",
          category: "Preparation",
          createdBy: "Dr. Sarah Johnson",
          createdDate: "2022-06-15",
          lastModified: "2023-02-10",
          approvedBy: "Dr. Michael Chen",
          approvedDate: "2023-02-15",
          requirements: [
            {
              id: "req-001",
              description: "Use ACD-A anticoagulant tubes for blood collection",
              mandatory: true,
            },
            {
              id: "req-002",
              description: "Centrifuge at 1200 RPM for 10 minutes for first spin",
              mandatory: true,
            },
            {
              id: "req-003",
              description: "Separate plasma layer without disturbing buffy coat",
              mandatory: true,
            },
            {
              id: "req-004",
              description: "Centrifuge at 2000 RPM for 10 minutes for second spin",
              mandatory: true,
            },
            {
              id: "req-005",
              description: "Document platelet concentration",
              mandatory: true,
            },
            {
              id: "req-006",
              description: "Perform quality control check with blood analyzer",
              mandatory: false,
            },
          ],
          complianceRate: 94.5,
        },
        {
          id: "standard-002",
          name: "Advanced PRP Preparation Protocol",
          description: "Advanced protocol for preparing high-concentration platelet-rich plasma",
          version: "1.5",
          status: "active",
          category: "Preparation",
          createdBy: "Dr. Emily Rodriguez",
          createdDate: "2022-09-20",
          lastModified: "2023-03-15",
          approvedBy: "Dr. Sarah Johnson",
          approvedDate: "2023-03-20",
          requirements: [
            {
              id: "req-007",
              description: "Use specialized PRP tubes for blood collection",
              mandatory: true,
            },
            {
              id: "req-008",
              description: "Centrifuge at 1500 RPM for 15 minutes for first spin",
              mandatory: true,
            },
            {
              id: "req-009",
              description: "Extract plasma with precision pipetting",
              mandatory: true,
            },
            {
              id: "req-010",
              description: "Centrifuge at 2500 RPM for 15 minutes for second spin",
              mandatory: true,
            },
            {
              id: "req-011",
              description: "Activate platelets with calcium chloride or thrombin",
              mandatory: true,
            },
            {
              id: "req-012",
              description: "Verify platelet concentration using blood analyzer",
              mandatory: true,
            },
            {
              id: "req-013",
              description: "Document concentration levels and preparation details",
              mandatory: true,
            },
          ],
          complianceRate: 89.2,
        },
        {
          id: "standard-003",
          name: "PRP Administration Standard",
          description: "Standard protocol for administering platelet-rich plasma",
          version: "2.0",
          status: "active",
          category: "Administration",
          createdBy: "Dr. Michael Chen",
          createdDate: "2022-07-10",
          lastModified: "2023-01-20",
          approvedBy: "Dr. Lisa Martinez",
          approvedDate: "2023-01-25",
          requirements: [
            {
              id: "req-014",
              description: "Verify patient identity and consent",
              mandatory: true,
            },
            {
              id: "req-015",
              description: "Confirm PRP preparation meets quality standards",
              mandatory: true,
            },
            {
              id: "req-016",
              description: "Prepare injection site with antiseptic solution",
              mandatory: true,
            },
            {
              id: "req-017",
              description: "Use ultrasound guidance for precise placement when indicated",
              mandatory: false,
            },
            {
              id: "req-018",
              description: "Document injection site, volume, and technique",
              mandatory: true,
            },
            {
              id: "req-019",
              description: "Provide post-procedure instructions to patient",
              mandatory: true,
            },
            {
              id: "req-020",
              description: "Schedule follow-up appointment",
              mandatory: true,
            },
          ],
          complianceRate: 96.8,
        },
        {
          id: "standard-004",
          name: "PRP Quality Control Standard",
          description: "Standard for quality control of platelet-rich plasma preparations",
          version: "1.2",
          status: "active",
          category: "Quality Control",
          createdBy: "Dr. Sarah Johnson",
          createdDate: "2022-08-05",
          lastModified: "2023-04-10",
          approvedBy: "Dr. Michael Chen",
          approvedDate: "2023-04-15",
          requirements: [
            {
              id: "req-021",
              description: "Verify platelet concentration meets minimum threshold",
              mandatory: true,
            },
            {
              id: "req-022",
              description: "Ensure RBC contamination is below maximum threshold",
              mandatory: true,
            },
            {
              id: "req-023",
              description: "Document platelet concentration and quality metrics",
              mandatory: true,
            },
            {
              id: "req-024",
              description: "Perform regular calibration of measurement equipment",
              mandatory: true,
            },
            {
              id: "req-025",
              description: "Maintain temperature control during preparation",
              mandatory: true,
            },
            {
              id: "req-026",
              description: "Conduct sterility testing for random samples",
              mandatory: false,
            },
          ],
          complianceRate: 92.3,
        },
      ],
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch quality data")
  }
})

export const qualitySlice = createSlice({
  name: "quality",
  initialState,
  reducers: {
    resetQuality: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQualityData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQualityData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.metrics = action.payload.metrics
        state.incidents = action.payload.incidents
        state.standards = action.payload.standards
      })
      .addCase(fetchQualityData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetQuality } = qualitySlice.actions

export default qualitySlice.reducer
