import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TreatmentAnalytic {
  id: string
  name: string
  data: {
    label: string
    value: number
  }[]
  trend: "up" | "down" | "stable"
  changePercentage: number
}

export interface ResearchStudy {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "planned"
  startDate: string
  endDate: string | null
  principalInvestigator: string
  participantCount: number
  protocols: string[]
}

export interface OutcomeMetric {
  id: string
  name: string
  category: string
  baseline: number | null
  threeMonths: number | null
  sixMonths: number | null
  twelveMonths: number | null
  protocol: string
  condition: string
}

export interface AnalyticsState {
  treatmentAnalytics: TreatmentAnalytic[]
  researchStudies: ResearchStudy[]
  outcomeMetrics: OutcomeMetric[]
  loading: boolean
  error: string | null
}

const initialState: AnalyticsState = {
  treatmentAnalytics: [],
  researchStudies: [],
  outcomeMetrics: [],
  loading: false,
  error: null,
}

export const fetchAnalyticsData = createAsyncThunk("analytics/fetchAnalyticsData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      treatmentAnalytics: [
        {
          id: "analytic-001",
          name: "Treatment Success Rate by Protocol",
          data: [
            { label: "Standard PRP", value: 87 },
            { label: "Advanced PRP", value: 92 },
            { label: "Leukocyte-Rich PRP", value: 76 },
            { label: "Platelet-Poor Plasma", value: 65 },
            { label: "Growth Factor Enhanced", value: 89 },
            { label: "Dual-Spin PRP", value: 91 },
          ],
          trend: "up",
          changePercentage: 3.5,
        },
        {
          id: "analytic-002",
          name: "Treatment Volume by Month",
          data: [
            { label: "Jan", value: 24 },
            { label: "Feb", value: 28 },
            { label: "Mar", value: 32 },
            { label: "Apr", value: 40 },
            { label: "May", value: 45 },
            { label: "Jun", value: 52 },
            { label: "Jul", value: 48 },
            { label: "Aug", value: 50 },
            { label: "Sep", value: 55 },
            { label: "Oct", value: 58 },
            { label: "Nov", value: 62 },
            { label: "Dec", value: 56 },
          ],
          trend: "up",
          changePercentage: 12.5,
        },
        {
          id: "analytic-003",
          name: "Treatment Success Rate by Condition",
          data: [
            { label: "Osteoarthritis", value: 82 },
            { label: "Tendinopathy", value: 88 },
            { label: "Muscle Injuries", value: 91 },
            { label: "Ligament Injuries", value: 85 },
            { label: "Cartilage Defects", value: 72 },
            { label: "Plantar Fasciitis", value: 86 },
            { label: "Rotator Cuff Tears", value: 79 },
            { label: "Tennis Elbow", value: 84 },
            { label: "Achilles Tendinitis", value: 87 },
          ],
          trend: "stable",
          changePercentage: 0.8,
        },
        {
          id: "analytic-004",
          name: "Patient Satisfaction by Clinic",
          data: [
            { label: "Northwest Medical Center", value: 4.8 },
            { label: "Eastside Health Partners", value: 4.6 },
            { label: "South County Medical Group", value: 4.3 },
            { label: "Downtown Wellness Center", value: 4.7 },
            { label: "Northgate Medical Associates", value: 4.5 },
            { label: "Westside Sports Medicine", value: 4.9 },
            { label: "Central Regenerative Clinic", value: 4.4 },
            { label: "Harbor View Medical", value: 4.2 },
          ],
          trend: "up",
          changePercentage: 2.2,
        },
        {
          id: "analytic-005",
          name: "Treatment Cost Efficiency",
          data: [
            { label: "Standard PRP", value: 92 },
            { label: "Advanced PRP", value: 78 },
            { label: "Leukocyte-Rich PRP", value: 85 },
            { label: "Platelet-Poor Plasma", value: 95 },
            { label: "Growth Factor Enhanced", value: 72 },
            { label: "Dual-Spin PRP", value: 80 },
          ],
          trend: "up",
          changePercentage: 4.1,
        },
        {
          id: "analytic-006",
          name: "Recovery Time by Protocol (Days)",
          data: [
            { label: "Standard PRP", value: 28 },
            { label: "Advanced PRP", value: 21 },
            { label: "Leukocyte-Rich PRP", value: 32 },
            { label: "Platelet-Poor Plasma", value: 35 },
            { label: "Growth Factor Enhanced", value: 19 },
            { label: "Dual-Spin PRP", value: 24 },
          ],
          trend: "down",
          changePercentage: 5.3,
        },
        {
          id: "analytic-007",
          name: "Treatment Volume by Age Group",
          data: [
            { label: "18-30", value: 15 },
            { label: "31-40", value: 22 },
            { label: "41-50", value: 28 },
            { label: "51-60", value: 35 },
            { label: "61-70", value: 25 },
            { label: "71+", value: 12 },
          ],
          trend: "stable",
          changePercentage: 1.2,
        },
        {
          id: "analytic-008",
          name: "Insurance Approval Rate (%)",
          data: [
            { label: "Blue Cross", value: 78 },
            { label: "Aetna", value: 65 },
            { label: "UnitedHealthcare", value: 72 },
            { label: "Cigna", value: 68 },
            { label: "Medicare", value: 45 },
            { label: "Humana", value: 70 },
            { label: "Kaiser", value: 62 },
          ],
          trend: "up",
          changePercentage: 3.8,
        },
      ],
      researchStudies: [
        {
          id: "study-001",
          title: "Comparative Effectiveness of PRP Protocols for Osteoarthritis",
          description:
            "A randomized controlled trial comparing standard and advanced PRP protocols for knee osteoarthritis",
          status: "active",
          startDate: "2023-01-15",
          endDate: null,
          principalInvestigator: "Dr. Sarah Johnson",
          participantCount: 120,
          protocols: ["Standard PRP Protocol", "Advanced PRP Protocol"],
        },
        {
          id: "study-002",
          title: "Long-term Outcomes of PRP for Tendinopathy",
          description: "A longitudinal study tracking outcomes of PRP treatments for tendinopathy over 2 years",
          status: "active",
          startDate: "2022-06-10",
          endDate: null,
          principalInvestigator: "Dr. Michael Chen",
          participantCount: 85,
          protocols: ["Standard PRP Protocol", "Leukocyte-Rich PRP Protocol"],
        },
        {
          id: "study-003",
          title: "PRP vs. Corticosteroid Injections for Rotator Cuff Injuries",
          description: "Comparative study of PRP and corticosteroid injections for partial rotator cuff tears",
          status: "completed",
          startDate: "2021-09-20",
          endDate: "2022-12-15",
          principalInvestigator: "Dr. Emily Rodriguez",
          participantCount: 64,
          protocols: ["Standard PRP Protocol"],
        },
        {
          id: "study-004",
          title: "Growth Factor-Enhanced PRP for Cartilage Regeneration",
          description: "Pilot study evaluating the effectiveness of growth factor-enhanced PRP for cartilage defects",
          status: "planned",
          startDate: "2023-07-01",
          endDate: null,
          principalInvestigator: "Dr. Robert Kim",
          participantCount: 30,
          protocols: ["Growth Factor-Enhanced PRP"],
        },
        {
          id: "study-005",
          title: "Dual-Spin vs. Single-Spin PRP Preparation Methods",
          description:
            "Comparative analysis of platelet concentration and clinical outcomes between preparation methods",
          status: "active",
          startDate: "2023-03-10",
          endDate: null,
          principalInvestigator: "Dr. Lisa Martinez",
          participantCount: 50,
          protocols: ["Single-Spin PRP Protocol", "Dual-Spin PRP Protocol"],
        },
        {
          id: "study-006",
          title: "PRP for Plantar Fasciitis: A Randomized Trial",
          description: "Evaluating the efficacy of PRP injections for chronic plantar fasciitis",
          status: "active",
          startDate: "2023-02-15",
          endDate: null,
          principalInvestigator: "Dr. James Wilson",
          participantCount: 45,
          protocols: ["Standard PRP Protocol"],
        },
        {
          id: "study-007",
          title: "Leukocyte-Poor vs. Leukocyte-Rich PRP for Osteoarthritis",
          description: "Comparing inflammatory responses and clinical outcomes between PRP preparations",
          status: "planned",
          startDate: "2023-08-01",
          endDate: null,
          principalInvestigator: "Dr. Sarah Johnson",
          participantCount: 80,
          protocols: ["Leukocyte-Poor PRP Protocol", "Leukocyte-Rich PRP Protocol"],
        },
        {
          id: "study-008",
          title: "PRP Combined with Physical Therapy for ACL Reconstruction",
          description: "Evaluating recovery outcomes when PRP is used as an adjunct to standard rehabilitation",
          status: "completed",
          startDate: "2021-05-15",
          endDate: "2023-01-20",
          principalInvestigator: "Dr. Michael Chen",
          participantCount: 40,
          protocols: ["Standard PRP Protocol"],
        },
      ],
      outcomeMetrics: [
        {
          id: "metric-001",
          name: "Pain Reduction (VAS Scale)",
          category: "Patient Reported",
          baseline: 7.8,
          threeMonths: 4.2,
          sixMonths: 3.1,
          twelveMonths: 2.5,
          protocol: "Standard PRP",
          condition: "Knee Osteoarthritis",
        },
        {
          id: "metric-002",
          name: "Functional Improvement (WOMAC)",
          category: "Patient Reported",
          baseline: 65.3,
          threeMonths: 48.7,
          sixMonths: 35.2,
          twelveMonths: 28.9,
          protocol: "Standard PRP",
          condition: "Knee Osteoarthritis",
        },
        {
          id: "metric-003",
          name: "Return to Activity (Days)",
          category: "Functional",
          baseline: null,
          threeMonths: 45.2,
          sixMonths: null,
          twelveMonths: null,
          protocol: "Advanced PRP",
          condition: "Tendinopathy",
        },
        {
          id: "metric-004",
          name: "Cartilage Thickness (mm)",
          category: "Imaging",
          baseline: 1.2,
          threeMonths: 1.3,
          sixMonths: 1.5,
          twelveMonths: 1.6,
          protocol: "Growth Factor Enhanced PRP",
          condition: "Knee Osteoarthritis",
        },
      ],
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch analytics data")
  }
})

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    resetAnalytics: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.treatmentAnalytics = action.payload.treatmentAnalytics
        state.researchStudies = action.payload.researchStudies
        state.outcomeMetrics = action.payload.outcomeMetrics
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetAnalytics } = analyticsSlice.actions

export default analyticsSlice.reducer
