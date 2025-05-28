import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  type: "academic" | "community" | "specialty" | "rural"
  accreditation: string
  accreditationExpiry: string
  totalBeds: number
  status: "active" | "pending" | "inactive"
}

export interface Clinic {
  id: string
  name: string
  hospitalId: string
  hospitalName: string
  department: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  prpCapabilities: string[]
  certifiedStaff: number
  equipmentCount: number
  status: "active" | "pending" | "inactive"
  certificationExpiry: string
  lastInspection: string
  annualPatientVolume: number
  specialties: string[]
}

export interface ClinicState {
  hospitals: Hospital[]
  clinics: Clinic[]
  selectedHospital: Hospital | null
  selectedClinic: Clinic | null
  loading: boolean
  error: string | null
}

const initialState: ClinicState = {
  hospitals: [],
  clinics: [],
  selectedHospital: null,
  selectedClinic: null,
  loading: false,
  error: null,
}

export const fetchHospitals = createAsyncThunk("clinic/fetchHospitals", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return [
      {
        id: "hospital-001",
        name: "Northwest Medical Center",
        address: "123 Medical Parkway",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1234",
        email: "info@nwmedical.example.com",
        type: "academic",
        accreditation: "Joint Commission",
        accreditationExpiry: "2025-06-30",
        totalBeds: 450,
        status: "active",
      },
      {
        id: "hospital-002",
        name: "Eastside Health System",
        address: "456 Wellness Blvd",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        phone: "(425) 555-5678",
        email: "contact@eastsidehealth.example.com",
        type: "community",
        accreditation: "DNV GL Healthcare",
        accreditationExpiry: "2024-09-15",
        totalBeds: 280,
        status: "active",
      },
      {
        id: "hospital-003",
        name: "South County Medical Center",
        address: "789 Healthcare Drive",
        city: "Renton",
        state: "WA",
        zip: "98057",
        phone: "(253) 555-9012",
        email: "info@southcountymed.example.com",
        type: "community",
        accreditation: "Joint Commission",
        accreditationExpiry: "2024-11-20",
        totalBeds: 180,
        status: "active",
      },
      {
        id: "hospital-004",
        name: "Pacific Specialty Hospital",
        address: "101 Specialist Way",
        city: "Tacoma",
        state: "WA",
        zip: "98402",
        phone: "(253) 555-3456",
        email: "info@pacificspecialty.example.com",
        type: "specialty",
        accreditation: "AAAHC",
        accreditationExpiry: "2025-03-10",
        totalBeds: 120,
        status: "active",
      },
      {
        id: "hospital-005",
        name: "Cascade Rural Health Center",
        address: "222 Mountain View Road",
        city: "North Bend",
        state: "WA",
        zip: "98045",
        phone: "(425) 555-7890",
        email: "info@cascadehealth.example.com",
        type: "rural",
        accreditation: "DNV GL Healthcare",
        accreditationExpiry: "2024-08-15",
        totalBeds: 75,
        status: "active",
      },
    ]
  } catch (error) {
    return rejectWithValue("Failed to fetch hospitals")
  }
})

export const fetchClinics = createAsyncThunk("clinic/fetchClinics", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return [
      {
        id: "clinic-001",
        name: "Orthopedic & Sports Medicine",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Orthopedics",
        address: "123 Medical Parkway, Suite 200",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1235",
        email: "ortho@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP", "Leukocyte-Rich PRP"],
        certifiedStaff: 8,
        equipmentCount: 5,
        status: "active",
        certificationExpiry: "2024-12-31",
        lastInspection: "2023-06-15",
        annualPatientVolume: 2800,
        specialties: ["Sports Medicine", "Joint Replacement", "Spine"],
      },
      {
        id: "clinic-002",
        name: "Dermatology & Aesthetics",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Dermatology",
        address: "123 Medical Parkway, Suite 300",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1236",
        email: "derm@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2025-02-28",
        lastInspection: "2023-08-10",
        annualPatientVolume: 3200,
        specialties: ["Cosmetic Dermatology", "Medical Dermatology", "Hair Restoration"],
      },
      {
        id: "clinic-003",
        name: "Pain Management Center",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Pain Medicine",
        address: "123 Medical Parkway, Suite 150",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1237",
        email: "pain@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Leukocyte-Rich PRP"],
        certifiedStaff: 5,
        equipmentCount: 3,
        status: "active",
        certificationExpiry: "2024-10-15",
        lastInspection: "2023-04-20",
        annualPatientVolume: 1900,
        specialties: ["Interventional Pain Management", "Spine", "Joint Pain"],
      },
      {
        id: "clinic-004",
        name: "Sports Medicine & Rehabilitation",
        hospitalId: "hospital-002",
        hospitalName: "Eastside Health System",
        department: "Sports Medicine",
        address: "456 Wellness Blvd, Suite 100",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        phone: "(425) 555-5679",
        email: "sports@eastsidehealth.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 7,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2024-11-30",
        lastInspection: "2023-05-25",
        annualPatientVolume: 2500,
        specialties: ["Sports Injuries", "Physical Therapy", "Performance Enhancement"],
      },
      {
        id: "clinic-005",
        name: "Regenerative Medicine Clinic",
        hospitalId: "hospital-002",
        hospitalName: "Eastside Health System",
        department: "Regenerative Medicine",
        address: "456 Wellness Blvd, Suite 250",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        phone: "(425) 555-5680",
        email: "regen@eastsidehealth.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP", "Platelet-Poor Plasma", "Leukocyte-Rich PRP"],
        certifiedStaff: 9,
        equipmentCount: 6,
        status: "active",
        certificationExpiry: "2025-01-15",
        lastInspection: "2023-07-10",
        annualPatientVolume: 1800,
        specialties: ["Stem Cell Therapy", "PRP Therapy", "Tissue Engineering"],
      },
      {
        id: "clinic-006",
        name: "Orthopedic Surgery Center",
        hospitalId: "hospital-003",
        hospitalName: "South County Medical Center",
        department: "Orthopedics",
        address: "789 Healthcare Drive, Suite 100",
        city: "Renton",
        state: "WA",
        zip: "98057",
        phone: "(253) 555-9013",
        email: "ortho@southcountymed.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 4,
        equipmentCount: 2,
        status: "active",
        certificationExpiry: "2024-09-30",
        lastInspection: "2023-03-15",
        annualPatientVolume: 1600,
        specialties: ["Joint Replacement", "Sports Medicine", "Hand Surgery"],
      },
      {
        id: "clinic-007",
        name: "Dermatology Center",
        hospitalId: "hospital-003",
        hospitalName: "South County Medical Center",
        department: "Dermatology",
        address: "789 Healthcare Drive, Suite 200",
        city: "Renton",
        state: "WA",
        zip: "98057",
        phone: "(253) 555-9014",
        email: "derm@southcountymed.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 3,
        equipmentCount: 2,
        status: "pending",
        certificationExpiry: "2024-08-30",
        lastInspection: "2023-04-10",
        annualPatientVolume: 1400,
        specialties: ["Medical Dermatology", "Cosmetic Procedures"],
      },
      {
        id: "clinic-008",
        name: "Spine & Neurosurgery",
        hospitalId: "hospital-004",
        hospitalName: "Pacific Specialty Hospital",
        department: "Neurosurgery",
        address: "101 Specialist Way, Suite 300",
        city: "Tacoma",
        state: "WA",
        zip: "98402",
        phone: "(253) 555-3457",
        email: "spine@pacificspecialty.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 3,
        status: "active",
        certificationExpiry: "2024-10-20",
        lastInspection: "2023-04-25",
        annualPatientVolume: 1200,
        specialties: ["Spine Surgery", "Pain Management", "Minimally Invasive Procedures"],
      },
      {
        id: "clinic-009",
        name: "Rural Health Clinic",
        hospitalId: "hospital-005",
        hospitalName: "Cascade Rural Health Center",
        department: "General Practice",
        address: "222 Mountain View Road, Suite 100",
        city: "North Bend",
        state: "WA",
        zip: "98045",
        phone: "(425) 555-7891",
        email: "clinic@cascadehealth.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 2,
        equipmentCount: 1,
        status: "active",
        certificationExpiry: "2024-07-15",
        lastInspection: "2023-01-20",
        annualPatientVolume: 950,
        specialties: ["General Medicine", "Basic Orthopedics"],
      },
      {
        id: "clinic-010",
        name: "Downtown Wellness Center",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Integrative Medicine",
        address: "101 Main Street",
        city: "Seattle",
        state: "WA",
        zip: "98104",
        phone: "(206) 555-3456",
        email: "wellness@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2024-11-20",
        lastInspection: "2023-07-05",
        annualPatientVolume: 2200,
        specialties: ["Integrative Medicine", "Preventive Care", "Wellness"],
      },
    ]
  } catch (error) {
    return rejectWithValue("Failed to fetch clinics")
  }
})

export const fetchHospitalById = createAsyncThunk(
  "clinic/fetchHospitalById",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      const hospitals = await fetchHospitals().unwrap()
      const hospital = hospitals.find((h: Hospital) => h.id === id)
      if (!hospital) {
        throw new Error("Hospital not found")
      }
      return hospital
    } catch (error) {
      return rejectWithValue("Failed to fetch hospital details")
    }
  },
)

export const fetchClinicById = createAsyncThunk("clinic/fetchClinicById", async (id: string, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate fetching from our mock data
    const clinics = [
      {
        id: "clinic-001",
        name: "Orthopedic & Sports Medicine",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Orthopedics",
        address: "123 Medical Parkway, Suite 200",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1235",
        email: "ortho@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP", "Leukocyte-Rich PRP"],
        certifiedStaff: 8,
        equipmentCount: 5,
        status: "active",
        certificationExpiry: "2024-12-31",
        lastInspection: "2023-06-15",
        annualPatientVolume: 2800,
        specialties: ["Sports Medicine", "Joint Replacement", "Spine"],
      },
      {
        id: "clinic-002",
        name: "Dermatology & Aesthetics",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Dermatology",
        address: "123 Medical Parkway, Suite 300",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1236",
        email: "derm@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2025-02-28",
        lastInspection: "2023-08-10",
        annualPatientVolume: 3200,
        specialties: ["Cosmetic Dermatology", "Medical Dermatology", "Hair Restoration"],
      },
      {
        id: "clinic-003",
        name: "Pain Management Center",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Pain Medicine",
        address: "123 Medical Parkway, Suite 150",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "(206) 555-1237",
        email: "pain@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Leukocyte-Rich PRP"],
        certifiedStaff: 5,
        equipmentCount: 3,
        status: "active",
        certificationExpiry: "2024-10-15",
        lastInspection: "2023-04-20",
        annualPatientVolume: 1900,
        specialties: ["Interventional Pain Management", "Spine", "Joint Pain"],
      },
      {
        id: "clinic-004",
        name: "Sports Medicine & Rehabilitation",
        hospitalId: "hospital-002",
        hospitalName: "Eastside Health System",
        department: "Sports Medicine",
        address: "456 Wellness Blvd, Suite 100",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        phone: "(425) 555-5679",
        email: "sports@eastsidehealth.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 7,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2024-11-30",
        lastInspection: "2023-05-25",
        annualPatientVolume: 2500,
        specialties: ["Sports Injuries", "Physical Therapy", "Performance Enhancement"],
      },
      {
        id: "clinic-005",
        name: "Regenerative Medicine Clinic",
        hospitalId: "hospital-002",
        hospitalName: "Eastside Health System",
        department: "Regenerative Medicine",
        address: "456 Wellness Blvd, Suite 250",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        phone: "(425) 555-5680",
        email: "regen@eastsidehealth.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP", "Platelet-Poor Plasma", "Leukocyte-Rich PRP"],
        certifiedStaff: 9,
        equipmentCount: 6,
        status: "active",
        certificationExpiry: "2025-01-15",
        lastInspection: "2023-07-10",
        annualPatientVolume: 1800,
        specialties: ["Stem Cell Therapy", "PRP Therapy", "Tissue Engineering"],
      },
      {
        id: "clinic-006",
        name: "Orthopedic Surgery Center",
        hospitalId: "hospital-003",
        hospitalName: "South County Medical Center",
        department: "Orthopedics",
        address: "789 Healthcare Drive, Suite 100",
        city: "Renton",
        state: "WA",
        zip: "98057",
        phone: "(253) 555-9013",
        email: "ortho@southcountymed.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 4,
        equipmentCount: 2,
        status: "active",
        certificationExpiry: "2024-09-30",
        lastInspection: "2023-03-15",
        annualPatientVolume: 1600,
        specialties: ["Joint Replacement", "Sports Medicine", "Hand Surgery"],
      },
      {
        id: "clinic-007",
        name: "Dermatology Center",
        hospitalId: "hospital-003",
        hospitalName: "South County Medical Center",
        department: "Dermatology",
        address: "789 Healthcare Drive, Suite 200",
        city: "Renton",
        state: "WA",
        zip: "98057",
        phone: "(253) 555-9014",
        email: "derm@southcountymed.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 3,
        equipmentCount: 2,
        status: "pending",
        certificationExpiry: "2024-08-30",
        lastInspection: "2023-04-10",
        annualPatientVolume: 1400,
        specialties: ["Medical Dermatology", "Cosmetic Procedures"],
      },
      {
        id: "clinic-008",
        name: "Spine & Neurosurgery",
        hospitalId: "hospital-004",
        hospitalName: "Pacific Specialty Hospital",
        department: "Neurosurgery",
        address: "101 Specialist Way, Suite 300",
        city: "Tacoma",
        state: "WA",
        zip: "98402",
        phone: "(253) 555-3457",
        email: "spine@pacificspecialty.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 3,
        status: "active",
        certificationExpiry: "2024-10-20",
        lastInspection: "2023-04-25",
        annualPatientVolume: 1200,
        specialties: ["Spine Surgery", "Pain Management", "Minimally Invasive Procedures"],
      },
      {
        id: "clinic-009",
        name: "Rural Health Clinic",
        hospitalId: "hospital-005",
        hospitalName: "Cascade Rural Health Center",
        department: "General Practice",
        address: "222 Mountain View Road, Suite 100",
        city: "North Bend",
        state: "WA",
        zip: "98045",
        phone: "(425) 555-7891",
        email: "clinic@cascadehealth.example.com",
        prpCapabilities: ["Standard PRP"],
        certifiedStaff: 2,
        equipmentCount: 1,
        status: "active",
        certificationExpiry: "2024-07-15",
        lastInspection: "2023-01-20",
        annualPatientVolume: 950,
        specialties: ["General Medicine", "Basic Orthopedics"],
      },
      {
        id: "clinic-010",
        name: "Downtown Wellness Center",
        hospitalId: "hospital-001",
        hospitalName: "Northwest Medical Center",
        department: "Integrative Medicine",
        address: "101 Main Street",
        city: "Seattle",
        state: "WA",
        zip: "98104",
        phone: "(206) 555-3456",
        email: "wellness@nwmedical.example.com",
        prpCapabilities: ["Standard PRP", "Advanced PRP"],
        certifiedStaff: 6,
        equipmentCount: 4,
        status: "active",
        certificationExpiry: "2024-11-20",
        lastInspection: "2023-07-05",
        annualPatientVolume: 2200,
        specialties: ["Integrative Medicine", "Preventive Care", "Wellness"],
      },
    ]

    const clinic = clinics.find((c) => c.id === id)
    if (!clinic) {
      return rejectWithValue("Clinic not found")
    }
    return clinic
  } catch (error) {
    return rejectWithValue("Failed to fetch clinic details")
  }
})

export const fetchClinicsByHospitalId = createAsyncThunk(
  "clinic/fetchClinicsByHospitalId",
  async (hospitalId: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      const clinics = await fetchClinics().unwrap()
      return clinics.filter((c: Clinic) => c.hospitalId === hospitalId)
    } catch (error) {
      return rejectWithValue("Failed to fetch clinics for hospital")
    }
  },
)

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    resetClinics: () => initialState,
    setSelectedClinic: (state, action: PayloadAction<Clinic | null>) => {
      state.selectedClinic = action.payload
    },
    setSelectedHospital: (state, action: PayloadAction<Hospital | null>) => {
      state.selectedHospital = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHospitals.fulfilled, (state, action: PayloadAction<Hospital[]>) => {
        state.loading = false
        state.hospitals = action.payload
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClinics.fulfilled, (state, action: PayloadAction<Clinic[]>) => {
        state.loading = false
        state.clinics = action.payload
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchHospitalById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHospitalById.fulfilled, (state, action: PayloadAction<Hospital>) => {
        state.loading = false
        state.selectedHospital = action.payload
      })
      .addCase(fetchHospitalById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchClinicById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClinicById.fulfilled, (state, action: PayloadAction<Clinic>) => {
        state.loading = false
        state.selectedClinic = action.payload
      })
      .addCase(fetchClinicById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchClinicsByHospitalId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClinicsByHospitalId.fulfilled, (state, action: PayloadAction<Clinic[]>) => {
        state.loading = false
        state.clinics = action.payload
      })
      .addCase(fetchClinicsByHospitalId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetClinics, setSelectedClinic, setSelectedHospital } = clinicSlice.actions

export default clinicSlice.reducer
