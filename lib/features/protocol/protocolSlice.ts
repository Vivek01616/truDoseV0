import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

// Mock data function to be used by both thunks
const getMockProtocols = () => {
  return [
    {
      id: "protocol-001",
      name: "Standard PRP Protocol",
      description: "Basic platelet-rich plasma preparation and application",
      version: "1.2",
      status: "active",
      createdBy: "Dr. Sarah Johnson",
      createdById: "provider-001",
      createdDate: "2022-01-15",
      lastModified: "2023-03-10",
      approvedBy: "Dr. Michael Chen",
      approvedById: "provider-002",
      approvedDate: "2023-03-15",
      steps: [
        {
          id: "step-001",
          order: 1,
          title: "Blood Collection",
          description: "Collect 15-30ml of venous blood using ACD-A anticoagulant tubes.",
          duration: 5,
          requiredEquipment: ["Venipuncture kit", "ACD-A tubes"],
          criticalStep: true,
        },
        {
          id: "step-002",
          order: 2,
          title: "First Centrifugation",
          description: "Centrifuge blood at 1200 RPM for 10 minutes to separate RBCs from plasma.",
          duration: 10,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-003",
          order: 3,
          title: "Plasma Collection",
          description: "Carefully extract plasma layer, avoiding RBC contamination.",
          duration: 5,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-004",
          order: 4,
          title: "Second Centrifugation",
          description: "Centrifuge plasma at 2000 RPM for 10 minutes to concentrate platelets.",
          duration: 10,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-005",
          order: 5,
          title: "PRP Extraction",
          description: "Extract the platelet-rich plasma layer for application.",
          duration: 5,
          requiredEquipment: ["Sterile syringes", "Collection tubes"],
          criticalStep: true,
        },
      ],
      indications: ["Osteoarthritis", "Tendinopathy", "Muscle injuries", "Ligament injuries"],
      contraindications: [
        "Active infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Hemodynamic instability",
      ],
      successRate: 87,
      usageCount: 245,
      averageDuration: 35,
      targetPlateletCount: "5-7x baseline",
      targetLeukocyteCount: "Minimal",
      anticoagulant: "ACD-A",
      activationMethod: null,
      doseGuidelines: [
        {
          id: "dose-001",
          condition: "Knee Osteoarthritis",
          site: "Intra-articular",
          volume: "4-6 mL",
          concentration: "5x baseline",
          notes: "Inject slowly with patient in supine position",
        },
        {
          id: "dose-002",
          condition: "Tennis Elbow",
          site: "Lateral epicondyle",
          volume: "2-3 mL",
          concentration: "5x baseline",
          notes: "Multiple small injections at tendon insertion",
        },
        {
          id: "dose-003",
          condition: "Plantar Fasciitis",
          site: "Plantar fascia",
          volume: "2-3 mL",
          concentration: "5x baseline",
          notes: "Use ultrasound guidance for precise placement",
        },
      ],
    },
    {
      id: "protocol-002",
      name: "Advanced PRP Protocol",
      description: "Enhanced concentration with specialized activation",
      version: "2.0",
      status: "active",
      createdBy: "Dr. Emily Rodriguez",
      createdById: "provider-003",
      createdDate: "2022-05-20",
      lastModified: "2023-02-15",
      approvedBy: "Dr. Sarah Johnson",
      approvedById: "provider-001",
      approvedDate: "2023-02-20",
      steps: [
        {
          id: "step-006",
          order: 1,
          title: "Blood Collection",
          description: "Collect 30-60ml of venous blood using specialized PRP tubes.",
          duration: 10,
          requiredEquipment: ["Venipuncture kit", "Specialized PRP tubes"],
          criticalStep: true,
        },
        {
          id: "step-007",
          order: 2,
          title: "First Centrifugation",
          description: "Centrifuge blood at 1500 RPM for 15 minutes for initial separation.",
          duration: 15,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-008",
          order: 3,
          title: "Plasma Collection",
          description: "Extract plasma layer with precision pipetting.",
          duration: 10,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-009",
          order: 4,
          title: "Second Centrifugation",
          description: "Centrifuge plasma at 2500 RPM for 15 minutes for high concentration.",
          duration: 15,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-010",
          order: 5,
          title: "Platelet Activation",
          description: "Activate platelets using calcium chloride or thrombin.",
          duration: 5,
          requiredEquipment: ["Activation agents", "Sterile mixing tubes"],
          criticalStep: true,
        },
        {
          id: "step-011",
          order: 6,
          title: "Quality Control",
          description: "Verify platelet concentration using blood analyzer.",
          duration: 10,
          requiredEquipment: ["Blood Analyzer"],
          criticalStep: true,
        },
        {
          id: "step-012",
          order: 7,
          title: "PRP Extraction",
          description: "Extract the activated, concentrated PRP for application.",
          duration: 5,
          requiredEquipment: ["Sterile syringes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-013",
          order: 8,
          title: "Documentation",
          description: "Document concentration levels and preparation details.",
          duration: 5,
          requiredEquipment: ["Documentation system"],
          criticalStep: false,
        },
      ],
      indications: ["Severe osteoarthritis", "Chronic tendinopathy", "Post-surgical recovery", "Cartilage defects"],
      contraindications: [
        "Active infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Hemodynamic instability",
        "Cancer",
        "Pregnancy",
      ],
      successRate: 92,
      usageCount: 128,
      averageDuration: 75,
      targetPlateletCount: "7-9x baseline",
      targetLeukocyteCount: "Moderate",
      anticoagulant: "Sodium Citrate",
      activationMethod: "Calcium Chloride",
      doseGuidelines: [
        {
          id: "dose-004",
          condition: "Severe Knee Osteoarthritis",
          site: "Intra-articular",
          volume: "5-7 mL",
          concentration: "7x baseline",
          notes: "Consider series of 3 injections at 2-week intervals",
        },
        {
          id: "dose-005",
          condition: "Rotator Cuff Tendinopathy",
          site: "Subacromial space",
          volume: "3-5 mL",
          concentration: "7x baseline",
          notes: "Use ultrasound guidance for precise placement",
        },
        {
          id: "dose-006",
          condition: "Achilles Tendinopathy",
          site: "Peritendinous",
          volume: "4-6 mL",
          concentration: "7x baseline",
          notes: "Avoid intratendinous injection",
        },
        {
          id: "dose-007",
          condition: "Hip Osteoarthritis",
          site: "Intra-articular",
          volume: "5-7 mL",
          concentration: "7x baseline",
          notes: "Use fluoroscopic or ultrasound guidance",
        },
      ],
    },
    {
      id: "protocol-003",
      name: "Leukocyte-Rich PRP Protocol",
      description: "Specialized protocol with increased white blood cell content",
      version: "1.5",
      status: "active",
      createdBy: "Dr. Michael Chen",
      createdById: "provider-002",
      createdDate: "2022-08-10",
      lastModified: "2023-01-20",
      approvedBy: "Dr. Lisa Martinez",
      approvedById: "provider-005",
      approvedDate: "2023-01-25",
      steps: [
        {
          id: "step-014",
          order: 1,
          title: "Blood Collection",
          description: "Collect 30ml of venous blood using ACD-A anticoagulant tubes.",
          duration: 5,
          requiredEquipment: ["Venipuncture kit", "ACD-A tubes"],
          criticalStep: true,
        },
        {
          id: "step-015",
          order: 2,
          title: "Single Centrifugation",
          description: "Centrifuge blood at 1800 RPM for 8 minutes to maintain WBC content.",
          duration: 8,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-016",
          order: 3,
          title: "Buffy Coat Collection",
          description: "Carefully extract buffy coat layer containing platelets and WBCs.",
          duration: 10,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-017",
          order: 4,
          title: "Resuspension",
          description: "Resuspend buffy coat in plasma to achieve desired concentration.",
          duration: 5,
          requiredEquipment: ["Sterile mixing tubes"],
          criticalStep: true,
        },
        {
          id: "step-018",
          order: 5,
          title: "Quality Control",
          description: "Verify platelet and WBC concentration using blood analyzer.",
          duration: 10,
          requiredEquipment: ["Blood Analyzer"],
          criticalStep: true,
        },
        {
          id: "step-019",
          order: 6,
          title: "PRP Extraction",
          description: "Extract the leukocyte-rich PRP for application.",
          duration: 5,
          requiredEquipment: ["Sterile syringes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-020",
          order: 7,
          title: "Documentation",
          description: "Document WBC and platelet concentration levels.",
          duration: 5,
          requiredEquipment: ["Documentation system"],
          criticalStep: false,
        },
      ],
      indications: ["Chronic tendinopathy", "Muscle injuries", "Ligament injuries", "Inflammatory conditions"],
      contraindications: [
        "Active infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Hemodynamic instability",
        "Autoimmune disorders",
      ],
      successRate: 76,
      usageCount: 87,
      averageDuration: 48,
      targetPlateletCount: "4-6x baseline",
      targetLeukocyteCount: "High",
      anticoagulant: "ACD-A",
      activationMethod: null,
      doseGuidelines: [
        {
          id: "dose-008",
          condition: "Patellar Tendinopathy",
          site: "Peritendinous",
          volume: "3-4 mL",
          concentration: "5x baseline",
          notes: "High leukocyte content beneficial for chronic cases",
        },
        {
          id: "dose-009",
          condition: "Muscle Strain",
          site: "Intramuscular",
          volume: "5-10 mL",
          concentration: "4x baseline",
          notes: "Multiple injection sites throughout affected area",
        },
        {
          id: "dose-010",
          condition: "Ankle Sprain",
          site: "Ligament",
          volume: "2-4 mL",
          concentration: "5x baseline",
          notes: "Use within 7-14 days post-injury",
        },
      ],
    },
    {
      id: "protocol-004",
      name: "Experimental Growth Factor Protocol",
      description: "Research protocol with additional growth factors",
      version: "0.9",
      status: "draft",
      createdBy: "Dr. Sarah Johnson",
      createdById: "provider-001",
      createdDate: "2023-04-05",
      lastModified: "2023-05-10",
      approvedBy: null,
      approvedById: null,
      approvedDate: null,
      steps: [
        {
          id: "step-021",
          order: 1,
          title: "Blood Collection",
          description: "Collect 60ml of venous blood using specialized tubes.",
          duration: 10,
          requiredEquipment: ["Venipuncture kit", "Specialized tubes"],
          criticalStep: true,
        },
        {
          id: "step-022",
          order: 2,
          title: "First Centrifugation",
          description: "Centrifuge blood at 1200 RPM for 10 minutes.",
          duration: 10,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-023",
          order: 3,
          title: "Plasma Collection",
          description: "Extract plasma layer with precision pipetting.",
          duration: 10,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-024",
          order: 4,
          title: "Growth Factor Addition",
          description: "Add specialized growth factors to plasma.",
          duration: 15,
          requiredEquipment: ["Growth factor kit", "Sterile mixing tubes"],
          criticalStep: true,
        },
        {
          id: "step-025",
          order: 5,
          title: "Second Centrifugation",
          description: "Centrifuge mixture at 2000 RPM for 15 minutes.",
          duration: 15,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-026",
          order: 6,
          title: "Activation",
          description: "Activate platelets and growth factors.",
          duration: 10,
          requiredEquipment: ["Activation agents", "Sterile mixing tubes"],
          criticalStep: true,
        },
        {
          id: "step-027",
          order: 7,
          title: "Quality Control",
          description: "Verify concentration and growth factor levels.",
          duration: 15,
          requiredEquipment: ["Blood Analyzer", "Growth factor analyzer"],
          criticalStep: true,
        },
        {
          id: "step-028",
          order: 8,
          title: "PRP Extraction",
          description: "Extract the enhanced PRP for application.",
          duration: 5,
          requiredEquipment: ["Sterile syringes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-029",
          order: 9,
          title: "Research Documentation",
          description: "Document detailed preparation process and concentrations.",
          duration: 10,
          requiredEquipment: ["Research documentation system"],
          criticalStep: true,
        },
        {
          id: "step-030",
          order: 10,
          title: "Patient Consent Verification",
          description: "Verify research consent documentation is complete.",
          duration: 5,
          requiredEquipment: ["Consent verification system"],
          criticalStep: true,
        },
      ],
      indications: [
        "Research purposes only",
        "Severe osteoarthritis (experimental)",
        "Cartilage regeneration (experimental)",
      ],
      contraindications: [
        "Active infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Hemodynamic instability",
        "Cancer",
        "Pregnancy",
        "Autoimmune disorders",
      ],
      successRate: 65,
      usageCount: 12,
      averageDuration: 105,
      targetPlateletCount: "10-12x baseline",
      targetLeukocyteCount: "Variable",
      anticoagulant: "Proprietary",
      activationMethod: "Thrombin + Calcium Chloride",
      doseGuidelines: [
        {
          id: "dose-011",
          condition: "Severe Knee Osteoarthritis (Experimental)",
          site: "Intra-articular",
          volume: "6-8 mL",
          concentration: "10x baseline",
          notes: "Research protocol only - requires special consent",
        },
        {
          id: "dose-012",
          condition: "Cartilage Defect (Experimental)",
          site: "Intra-articular",
          volume: "4-6 mL",
          concentration: "10x baseline",
          notes: "For use in conjunction with microfracture procedure",
        },
      ],
    },
    {
      id: "protocol-005",
      name: "Knee Osteoarthritis Protocol",
      description: "Specialized protocol for knee osteoarthritis treatment",
      version: "2.1",
      status: "active",
      createdBy: "Dr. Lisa Martinez",
      createdById: "provider-005",
      createdDate: "2022-09-15",
      lastModified: "2023-04-20",
      approvedBy: "Dr. Michael Chen",
      approvedById: "provider-002",
      approvedDate: "2023-04-25",
      steps: [
        {
          id: "step-031",
          order: 1,
          title: "Patient Preparation",
          description: "Position patient supine with knee slightly flexed.",
          duration: 5,
          requiredEquipment: ["Examination table", "Positioning aids"],
          criticalStep: false,
        },
        {
          id: "step-032",
          order: 2,
          title: "Blood Collection",
          description: "Collect 30ml of venous blood using ACD-A anticoagulant tubes.",
          duration: 5,
          requiredEquipment: ["Venipuncture kit", "ACD-A tubes"],
          criticalStep: true,
        },
        {
          id: "step-033",
          order: 3,
          title: "Centrifugation",
          description: "Centrifuge blood at 1500 RPM for 15 minutes.",
          duration: 15,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-034",
          order: 4,
          title: "PRP Extraction",
          description: "Extract 5-7ml of PRP from the buffy coat layer.",
          duration: 10,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-035",
          order: 5,
          title: "Injection Site Preparation",
          description: "Clean and prepare lateral knee injection site.",
          duration: 5,
          requiredEquipment: ["Antiseptic solution", "Sterile drapes"],
          criticalStep: true,
        },
        {
          id: "step-036",
          order: 6,
          title: "Ultrasound Guidance Setup",
          description: "Position ultrasound for guided injection if needed.",
          duration: 5,
          requiredEquipment: ["Ultrasound machine", "Sterile ultrasound gel"],
          criticalStep: false,
        },
        {
          id: "step-037",
          order: 7,
          title: "PRP Injection",
          description: "Inject PRP into knee joint space using lateral approach.",
          duration: 5,
          requiredEquipment: ["Sterile syringes", "Injection needles"],
          criticalStep: true,
        },
        {
          id: "step-038",
          order: 8,
          title: "Post-Injection Care",
          description: "Apply pressure and bandage. Provide post-care instructions.",
          duration: 5,
          requiredEquipment: ["Bandages", "Patient instructions"],
          criticalStep: false,
        },
      ],
      indications: ["Mild to moderate knee osteoarthritis", "Early degenerative joint disease"],
      contraindications: [
        "Active infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Advanced bone-on-bone osteoarthritis",
      ],
      successRate: 83,
      usageCount: 156,
      averageDuration: 55,
      targetPlateletCount: "5-7x baseline",
      targetLeukocyteCount: "Low",
      anticoagulant: "ACD-A",
      activationMethod: null,
      doseGuidelines: [
        {
          id: "dose-013",
          condition: "Mild Knee Osteoarthritis",
          site: "Intra-articular",
          volume: "4-5 mL",
          concentration: "5x baseline",
          notes: "Single injection, evaluate at 6 weeks",
        },
        {
          id: "dose-014",
          condition: "Moderate Knee Osteoarthritis",
          site: "Intra-articular",
          volume: "5-7 mL",
          concentration: "6x baseline",
          notes: "Consider series of 3 injections at 2-week intervals",
        },
      ],
    },
    {
      id: "protocol-006",
      name: "Hair Restoration Protocol",
      description: "PRP application for androgenetic alopecia and hair loss",
      version: "1.3",
      status: "active",
      createdBy: "Dr. Emily Rodriguez",
      createdById: "provider-003",
      createdDate: "2022-07-12",
      lastModified: "2023-03-05",
      approvedBy: "Dr. Sarah Johnson",
      approvedById: "provider-001",
      approvedDate: "2023-03-10",
      steps: [
        {
          id: "step-039",
          order: 1,
          title: "Blood Collection",
          description: "Collect 20ml of venous blood using ACD-A anticoagulant tubes.",
          duration: 5,
          requiredEquipment: ["Venipuncture kit", "ACD-A tubes"],
          criticalStep: true,
        },
        {
          id: "step-040",
          order: 2,
          title: "Centrifugation",
          description: "Centrifuge blood at 1500 RPM for 10 minutes.",
          duration: 10,
          requiredEquipment: ["PRP Centrifuge"],
          criticalStep: true,
        },
        {
          id: "step-041",
          order: 3,
          title: "PRP Extraction",
          description: "Extract PRP layer, avoiding RBC contamination.",
          duration: 5,
          requiredEquipment: ["Sterile pipettes", "Collection tubes"],
          criticalStep: true,
        },
        {
          id: "step-042",
          order: 4,
          title: "Scalp Preparation",
          description: "Clean scalp and mark injection sites at 1cm intervals.",
          duration: 10,
          requiredEquipment: ["Antiseptic solution", "Surgical marker"],
          criticalStep: true,
        },
        {
          id: "step-043",
          order: 5,
          title: "Local Anesthesia",
          description: "Apply topical anesthetic to scalp if needed.",
          duration: 20,
          requiredEquipment: ["Topical anesthetic", "Applicator"],
          criticalStep: false,
        },
        {
          id: "step-044",
          order: 6,
          title: "PRP Injection",
          description: "Inject 0.1ml of PRP at each marked site using microneedle technique.",
          duration: 20,
          requiredEquipment: ["Sterile syringes", "Microneedles"],
          criticalStep: true,
        },
        {
          id: "step-045",
          order: 7,
          title: "Post-Procedure Care",
          description: "Provide post-care instructions and schedule follow-up.",
          duration: 5,
          requiredEquipment: ["Patient instructions", "Scheduling system"],
          criticalStep: false,
        },
      ],
      indications: ["Androgenetic alopecia", "Hair thinning", "Non-scarring alopecia"],
      contraindications: [
        "Active scalp infection",
        "Platelet dysfunction syndrome",
        "Critical thrombocytopenia",
        "Skin cancer in treatment area",
      ],
      successRate: 72,
      usageCount: 98,
      averageDuration: 75,
      targetPlateletCount: "4-5x baseline",
      targetLeukocyteCount: "Low",
      anticoagulant: "ACD-A",
      activationMethod: null,
      doseGuidelines: [
        {
          id: "dose-015",
          condition: "Androgenetic Alopecia",
          site: "Scalp",
          volume: "0.1 mL per cm²",
          concentration: "5x baseline",
          notes: "Series of 3-4 treatments at 4-week intervals",
        },
        {
          id: "dose-016",
          condition: "Diffuse Hair Thinning",
          site: "Scalp",
          volume: "0.1 mL per cm²",
          concentration: "4x baseline",
          notes: "Treat entire affected area with 1cm spacing between injections",
        },
      ],
    },
  ]
}

export interface ProtocolStep {
  id: string
  order: number
  title: string
  description: string
  duration: number
  requiredEquipment: string[]
  criticalStep: boolean
}

export interface DoseGuideline {
  id: string
  condition: string
  site: string
  volume: string
  concentration: string
  notes: string | null
}

export interface Protocol {
  id: string
  name: string
  description: string
  version: string
  status: "active" | "draft" | "archived"
  createdBy: string
  createdById: string
  createdDate: string
  lastModified: string
  approvedBy: string | null
  approvedById: string | null
  approvedDate: string | null
  steps: ProtocolStep[]
  indications: string[]
  contraindications: string[]
  successRate: number
  usageCount: number
  averageDuration: number
  doseGuidelines?: DoseGuideline[]
  targetPlateletCount?: string
  targetLeukocyteCount?: string
  anticoagulant?: string
  activationMethod?: string | null
}

export interface ProtocolState {
  protocols: Protocol[]
  selectedProtocol: Protocol | null
  loading: boolean
  error: string | null
}

const initialState: ProtocolState = {
  protocols: [],
  selectedProtocol: null,
  loading: false,
  error: null,
}

export const fetchProtocols = createAsyncThunk("protocol/fetchProtocols", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo with dosing sheet data
    return getMockProtocols()
  } catch (error) {
    return rejectWithValue("Failed to fetch protocols")
  }
})

export const fetchProtocolById = createAsyncThunk(
  "protocol/fetchProtocolById",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      const protocols = getMockProtocols()
      const protocol = protocols.find((p: Protocol) => p.id === id)
      if (!protocol) {
        return rejectWithValue("Protocol not found: The requested protocol does not exist")
      }
      return protocol
    } catch (error) {
      console.error("Error fetching protocol:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch protocol details")
    }
  },
)

export const protocolSlice = createSlice({
  name: "protocol",
  initialState,
  reducers: {
    resetProtocols: () => initialState,
    setSelectedProtocol: (state, action: PayloadAction<Protocol | null>) => {
      state.selectedProtocol = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtocols.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProtocols.fulfilled, (state, action: PayloadAction<Protocol[]>) => {
        state.loading = false
        state.protocols = action.payload
      })
      .addCase(fetchProtocols.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchProtocolById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProtocolById.fulfilled, (state, action: PayloadAction<Protocol>) => {
        state.loading = false
        state.selectedProtocol = action.payload
      })
      .addCase(fetchProtocolById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetProtocols, setSelectedProtocol } = protocolSlice.actions

export default protocolSlice.reducer
