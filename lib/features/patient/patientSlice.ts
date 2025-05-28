import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LabResult {
  id: string
  date: string
  type: string
  result: string | number
  unit: string
  referenceRange: string
  status: "normal" | "low" | "high" | "critical"
  notes?: string
}

export interface PlateletCount {
  id: string
  date: string
  count: number
  unit: string
  status: "normal" | "low" | "high"
}

export interface TreatmentHistory {
  id: string
  date: string
  protocol: string
  protocolId: string
  provider: string
  providerId: string
  clinic: string
  clinicId: string
  hospital: string
  hospitalId: string
  outcome: "success" | "pending" | "failed"
  notes: string
  followUpDate: string | null
  painScoreBefore: number
  painScoreAfter: number
  mobilityScoreBefore: number
  mobilityScoreAfter: number
  patientSatisfaction: number
  complications: string[]
}

export interface ConsentForm {
  id: string
  name: string
  signed: boolean
  signedDate: string | null
  expiryDate: string | null
  documentUrl: string
  requiredByProtocol: string[]
}

export interface Insurance {
  id: string
  provider: string
  policyNumber: string
  groupNumber: string
  primary: boolean
  coverageStartDate: string
  coverageEndDate: string | null
  verificationStatus: "verified" | "pending" | "failed"
  verificationDate: string | null
  coverageDetails: string
}

export interface Allergy {
  id: string
  allergen: string
  severity: "mild" | "moderate" | "severe"
  reaction: string
  diagnosed: string
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string | null
  prescribedBy: string
  reason: string
}

export interface MedicalHistory {
  id: string
  condition: string
  diagnosisDate: string
  status: "active" | "resolved" | "managed"
  notes: string
  relevantToPRP: boolean
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  gender: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  status: "active" | "inactive" | "pending"
  treatmentHistory: TreatmentHistory[]
  consentForms: ConsentForm[]
  primaryProvider: string
  primaryProviderId: string
  primaryClinic: string
  primaryClinicId: string
  primaryHospital: string
  primaryHospitalId: string
  lastVisit: string | null
  nextAppointment: string | null
  insurance: Insurance[]
  allergies: Allergy[]
  medications: Medication[]
  medicalHistory: MedicalHistory[]
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  plateletCounts: PlateletCount[]
  labResults: LabResult[]
  notes: string
  referredBy: string
  referralDate: string
  prpEligibility: "eligible" | "conditional" | "ineligible"
  prpEligibilityNotes: string
  treatmentCount: number
  successRate: number
}

export interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  loading: boolean
  error: string | null
  status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
  status: "idle",
}

export const fetchPatients = createAsyncThunk("patient/fetchPatients", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return [
      {
        id: "patient-001",
        name: "John Smith",
        dateOfBirth: "1975-08-15",
        gender: "Male",
        email: "jsmith@example.com",
        phone: "(206) 555-1234",
        address: "123 Main St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-001",
            date: "2023-05-10",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Sarah Johnson",
            providerId: "provider-001",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Patient responded well to treatment. No complications.",
            followUpDate: "2023-06-10",
            painScoreBefore: 7,
            painScoreAfter: 3,
            mobilityScoreBefore: 5,
            mobilityScoreAfter: 8,
            patientSatisfaction: 9,
            complications: [],
          },
          {
            id: "treatment-002",
            date: "2023-02-15",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Sarah Johnson",
            providerId: "provider-001",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Initial treatment. Patient experienced mild discomfort but resolved within 24 hours.",
            followUpDate: "2023-03-15",
            painScoreBefore: 8,
            painScoreAfter: 5,
            mobilityScoreBefore: 4,
            mobilityScoreAfter: 6,
            patientSatisfaction: 7,
            complications: ["Mild bruising at injection site"],
          },
        ],
        consentForms: [
          {
            id: "consent-001",
            name: "Standard PRP Treatment Consent",
            signed: true,
            signedDate: "2023-02-10",
            expiryDate: "2024-02-10",
            documentUrl: "/documents/consent-001.pdf",
            requiredByProtocol: ["Standard PRP", "Leukocyte-Rich PRP"],
          },
          {
            id: "consent-002",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-02-10",
            expiryDate: null,
            documentUrl: "/documents/consent-002.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Sarah Johnson",
        primaryProviderId: "provider-001",
        primaryClinic: "Northwest Medical Center",
        primaryClinicId: "clinic-001",
        primaryHospital: "University Medical Center",
        primaryHospitalId: "hospital-001",
        lastVisit: "2023-05-10",
        nextAppointment: "2023-06-10",
        insurance: [
          {
            id: "insurance-001",
            provider: "Blue Cross Blue Shield",
            policyNumber: "BCBS12345678",
            groupNumber: "GRP987654",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "verified",
            verificationDate: "2023-02-05",
            coverageDetails: "PRP treatments covered at 70% after deductible",
          },
        ],
        allergies: [
          {
            id: "allergy-001",
            allergen: "Penicillin",
            severity: "moderate",
            reaction: "Rash and hives",
            diagnosed: "2010-03-15",
          },
        ],
        medications: [
          {
            id: "med-001",
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            startDate: "2020-05-10",
            endDate: null,
            prescribedBy: "Dr. Robert Wilson",
            reason: "Hypertension",
          },
        ],
        medicalHistory: [
          {
            id: "history-001",
            condition: "Hypertension",
            diagnosisDate: "2020-05-01",
            status: "managed",
            notes: "Well controlled with medication",
            relevantToPRP: false,
          },
          {
            id: "history-002",
            condition: "Osteoarthritis - Right Knee",
            diagnosisDate: "2022-11-15",
            status: "active",
            notes: "Primary reason for PRP treatment",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Mary Smith",
          relationship: "Spouse",
          phone: "(206) 555-5678",
        },
        plateletCounts: [
          { id: "platelet-001", date: "2023-01-15", count: 250, unit: "K/µL", status: "normal" },
          { id: "platelet-002", date: "2023-02-15", count: 245, unit: "K/µL", status: "normal" },
          { id: "platelet-003", date: "2023-03-15", count: 260, unit: "K/µL", status: "normal" },
          { id: "platelet-004", date: "2023-04-15", count: 270, unit: "K/µL", status: "normal" },
          { id: "platelet-005", date: "2023-05-15", count: 255, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-001",
            date: "2023-05-15",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-002",
            date: "2023-05-15",
            type: "White Blood Cells",
            result: 7.2,
            unit: "K/µL",
            referenceRange: "4.5-11.0",
            status: "normal",
          },
          {
            id: "lab-003",
            date: "2023-05-15",
            type: "Red Blood Cells",
            result: 4.8,
            unit: "M/µL",
            referenceRange: "4.5-5.9",
            status: "normal",
          },
          {
            id: "lab-004",
            date: "2023-05-15",
            type: "Hemoglobin",
            result: 14.2,
            unit: "g/dL",
            referenceRange: "13.5-17.5",
            status: "normal",
          },
          {
            id: "lab-005",
            date: "2023-05-15",
            type: "Hematocrit",
            result: 42.1,
            unit: "%",
            referenceRange: "41-50",
            status: "normal",
          },
          {
            id: "lab-006",
            date: "2023-05-15",
            type: "C-Reactive Protein",
            result: 2.1,
            unit: "mg/L",
            referenceRange: "0-3.0",
            status: "normal",
          },
          {
            id: "lab-007",
            date: "2023-05-15",
            type: "Erythrocyte Sedimentation Rate",
            result: 8,
            unit: "mm/hr",
            referenceRange: "0-15",
            status: "normal",
          },
          {
            id: "lab-008",
            date: "2023-05-15",
            type: "Interleukin-6",
            result: 1.8,
            unit: "pg/mL",
            referenceRange: "0-5.9",
            status: "normal",
          },
        ],
        notes:
          "Patient has responded well to initial PRP treatments for knee osteoarthritis. Considering a third treatment to maximize benefits.",
        referredBy: "Dr. James Wilson",
        referralDate: "2023-01-05",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy based on condition and health status.",
        treatmentCount: 2,
        successRate: 100,
      },
      {
        id: "patient-002",
        name: "Mary Johnson",
        dateOfBirth: "1982-04-23",
        gender: "Female",
        email: "mjohnson@example.com",
        phone: "(206) 555-5678",
        address: "456 Pine St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-003",
            date: "2023-05-05",
            protocol: "Advanced PRP",
            protocolId: "protocol-002",
            provider: "Dr. Emily Rodriguez",
            providerId: "provider-003",
            clinic: "Eastside Health Partners",
            clinicId: "clinic-002",
            hospital: "Eastside Regional Hospital",
            hospitalId: "hospital-002",
            outcome: "pending",
            notes: "Treatment administered. Awaiting follow-up to assess results.",
            followUpDate: "2023-06-05",
            painScoreBefore: 8,
            painScoreAfter: null,
            mobilityScoreBefore: 6,
            mobilityScoreAfter: null,
            patientSatisfaction: null,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-003",
            name: "Advanced PRP Treatment Consent",
            signed: true,
            signedDate: "2023-05-01",
            expiryDate: "2024-05-01",
            documentUrl: "/documents/consent-003.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
          {
            id: "consent-004",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-05-01",
            expiryDate: null,
            documentUrl: "/documents/consent-004.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Emily Rodriguez",
        primaryProviderId: "provider-003",
        primaryClinic: "Eastside Health Partners",
        primaryClinicId: "clinic-002",
        primaryHospital: "Eastside Regional Hospital",
        primaryHospitalId: "hospital-002",
        lastVisit: "2023-05-05",
        nextAppointment: "2023-06-05",
        insurance: [
          {
            id: "insurance-002",
            provider: "Aetna",
            policyNumber: "AET87654321",
            groupNumber: "GRP123456",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "pending",
            verificationDate: "2023-05-02",
            coverageDetails: "Verification in progress",
          },
        ],
        allergies: [
          {
            id: "allergy-002",
            allergen: "Latex",
            severity: "mild",
            reaction: "Skin irritation",
            diagnosed: "2015-07-22",
          },
        ],
        medications: [
          {
            id: "med-002",
            name: "Levothyroxine",
            dosage: "50mcg",
            frequency: "Once daily",
            startDate: "2018-03-10",
            endDate: null,
            prescribedBy: "Dr. Lisa Chen",
            reason: "Hypothyroidism",
          },
        ],
        medicalHistory: [
          {
            id: "history-003",
            condition: "Hypothyroidism",
            diagnosisDate: "2018-03-01",
            status: "managed",
            notes: "Well controlled with medication",
            relevantToPRP: false,
          },
          {
            id: "history-004",
            condition: "Tennis Elbow",
            diagnosisDate: "2023-04-10",
            status: "active",
            notes: "Primary reason for PRP treatment",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Robert Johnson",
          relationship: "Spouse",
          phone: "(206) 555-9012",
        },
        plateletCounts: [
          { id: "platelet-006", date: "2023-04-25", count: 280, unit: "K/µL", status: "normal" },
          { id: "platelet-007", date: "2023-05-05", count: 275, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-009",
            date: "2023-05-05",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-010",
            date: "2023-05-05",
            type: "Thyroid Stimulating Hormone",
            result: 2.8,
            unit: "mIU/L",
            referenceRange: "0.4-4.0",
            status: "normal",
          },
          {
            id: "lab-011",
            date: "2023-05-05",
            type: "Free T4",
            result: 1.2,
            unit: "ng/dL",
            referenceRange: "0.8-1.8",
            status: "normal",
          },
        ],
        notes:
          "First-time PRP patient seeking treatment for tennis elbow. Plays tennis recreationally 2-3 times per week.",
        referredBy: "Self-referred",
        referralDate: "2023-04-15",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy based on condition and health status.",
        treatmentCount: 1,
        successRate: 0,
      },
      {
        id: "patient-003",
        name: "Robert Davis",
        dateOfBirth: "1968-11-30",
        gender: "Male",
        email: "rdavis@example.com",
        phone: "(206) 555-9012",
        address: "789 Oak St",
        city: "Bellevue",
        state: "WA",
        zip: "98004",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-004",
            date: "2023-04-20",
            protocol: "Leukocyte-Rich PRP",
            protocolId: "protocol-003",
            provider: "Dr. Michael Chen",
            providerId: "provider-002",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Patient responded exceptionally well to treatment.",
            followUpDate: "2023-05-20",
            painScoreBefore: 9,
            painScoreAfter: 2,
            mobilityScoreBefore: 3,
            mobilityScoreAfter: 8,
            patientSatisfaction: 10,
            complications: [],
          },
          {
            id: "treatment-005",
            date: "2023-01-15",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Michael Chen",
            providerId: "provider-002",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "failed",
            notes: "Patient did not respond to initial treatment. Recommended alternative protocol.",
            followUpDate: "2023-02-15",
            painScoreBefore: 8,
            painScoreAfter: 7,
            mobilityScoreBefore: 4,
            mobilityScoreAfter: 5,
            patientSatisfaction: 3,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-005",
            name: "Leukocyte-Rich PRP Treatment Consent",
            signed: true,
            signedDate: "2023-04-15",
            expiryDate: "2024-04-15",
            documentUrl: "/documents/consent-005.pdf",
            requiredByProtocol: ["Leukocyte-Rich PRP"],
          },
          {
            id: "consent-006",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-01-10",
            expiryDate: null,
            documentUrl: "/documents/consent-006.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Michael Chen",
        primaryProviderId: "provider-002",
        primaryClinic: "Northwest Medical Center",
        primaryClinicId: "clinic-001",
        primaryHospital: "University Medical Center",
        primaryHospitalId: "hospital-001",
        lastVisit: "2023-04-20",
        nextAppointment: "2023-05-20",
        insurance: [
          {
            id: "insurance-003",
            provider: "UnitedHealthcare",
            policyNumber: "UHC56789012",
            groupNumber: "GRP345678",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "verified",
            verificationDate: "2023-01-12",
            coverageDetails: "PRP treatments covered at 80% after deductible for specific diagnoses",
          },
        ],
        allergies: [],
        medications: [
          {
            id: "med-003",
            name: "Ibuprofen",
            dosage: "800mg",
            frequency: "As needed for pain",
            startDate: "2022-12-01",
            endDate: null,
            prescribedBy: "Dr. Michael Chen",
            reason: "Chronic shoulder pain",
          },
        ],
        medicalHistory: [
          {
            id: "history-005",
            condition: "Rotator Cuff Tear",
            diagnosisDate: "2022-11-01",
            status: "active",
            notes: "Partial tear of the supraspinatus tendon",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Susan Davis",
          relationship: "Spouse",
          phone: "(206) 555-3456",
        },
        plateletCounts: [
          { id: "platelet-008", date: "2023-01-10", count: 230, unit: "K/µL", status: "normal" },
          { id: "platelet-009", date: "2023-04-15", count: 240, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-012",
            date: "2023-04-15",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-013",
            date: "2023-04-15",
            type: "C-Reactive Protein",
            result: 1.8,
            unit: "mg/L",
            referenceRange: "0-3.0",
            status: "normal",
          },
        ],
        notes:
          "Patient did not respond to standard PRP but had excellent results with Leukocyte-Rich PRP for rotator cuff tear.",
        referredBy: "Dr. Thomas Lee",
        referralDate: "2022-12-10",
        prpEligibility: "eligible",
        prpEligibilityNotes:
          "Good candidate for Leukocyte-Rich PRP based on condition and response to previous treatment.",
        treatmentCount: 2,
        successRate: 50,
      },
      {
        id: "patient-004",
        name: "Jennifer Lee",
        dateOfBirth: "1990-03-12",
        gender: "Female",
        email: "jlee@example.com",
        phone: "(425) 555-3456",
        address: "101 Elm St",
        city: "Kirkland",
        state: "WA",
        zip: "98033",
        status: "pending",
        treatmentHistory: [],
        consentForms: [
          {
            id: "consent-007",
            name: "Standard PRP Treatment Consent",
            signed: false,
            signedDate: null,
            expiryDate: null,
            documentUrl: "/documents/consent-007.pdf",
            requiredByProtocol: ["Standard PRP"],
          },
          {
            id: "consent-008",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-05-15",
            expiryDate: null,
            documentUrl: "/documents/consent-008.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Lisa Martinez",
        primaryProviderId: "provider-005",
        primaryClinic: "South County Medical Group",
        primaryClinicId: "clinic-003",
        primaryHospital: "South County Hospital",
        primaryHospitalId: "hospital-003",
        lastVisit: null,
        nextAppointment: "2023-05-25",
        insurance: [
          {
            id: "insurance-004",
            provider: "Cigna",
            policyNumber: "CIG12345678",
            groupNumber: "GRP567890",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "pending",
            verificationDate: null,
            coverageDetails: "Verification in progress",
          },
        ],
        allergies: [
          {
            id: "allergy-003",
            allergen: "Sulfa Drugs",
            severity: "severe",
            reaction: "Anaphylaxis",
            diagnosed: "2010-05-18",
          },
        ],
        medications: [],
        medicalHistory: [
          {
            id: "history-006",
            condition: "Plantar Fasciitis",
            diagnosisDate: "2023-04-01",
            status: "active",
            notes: "Chronic heel pain, conservative treatments have failed",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Michael Lee",
          relationship: "Brother",
          phone: "(425) 555-7890",
        },
        plateletCounts: [{ id: "platelet-010", date: "2023-05-15", count: 320, unit: "K/µL", status: "normal" }],
        labResults: [
          {
            id: "lab-014",
            date: "2023-05-15",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
        ],
        notes:
          "New patient with chronic plantar fasciitis. Conservative treatments including physical therapy and orthotics have failed.",
        referredBy: "Dr. James Peterson",
        referralDate: "2023-05-01",
        prpEligibility: "eligible",
        prpEligibilityNotes:
          "Good candidate for PRP therapy based on condition and failure of conservative treatments.",
        treatmentCount: 0,
        successRate: 0,
      },
      {
        id: "patient-005",
        name: "William Brown",
        dateOfBirth: "1955-07-08",
        gender: "Male",
        email: "wbrown@example.com",
        phone: "(206) 555-7890",
        address: "222 Cedar St",
        city: "Seattle",
        state: "WA",
        zip: "98115",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-006",
            date: "2023-05-01",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Sarah Johnson",
            providerId: "provider-001",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Patient responded well to treatment. Mild improvement observed.",
            followUpDate: "2023-06-01",
            painScoreBefore: 7,
            painScoreAfter: 4,
            mobilityScoreBefore: 6,
            mobilityScoreAfter: 8,
            patientSatisfaction: 8,
            complications: [],
          },
          {
            id: "treatment-007",
            date: "2023-03-15",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Sarah Johnson",
            providerId: "provider-001",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Initial treatment. Patient tolerated procedure well.",
            followUpDate: "2023-04-15",
            painScoreBefore: 8,
            painScoreAfter: 6,
            mobilityScoreBefore: 5,
            mobilityScoreAfter: 6,
            patientSatisfaction: 7,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-009",
            name: "Standard PRP Treatment Consent",
            signed: true,
            signedDate: "2023-03-10",
            expiryDate: "2024-03-10",
            documentUrl: "/documents/consent-009.pdf",
            requiredByProtocol: ["Standard PRP"],
          },
          {
            id: "consent-010",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-03-10",
            expiryDate: null,
            documentUrl: "/documents/consent-010.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Sarah Johnson",
        primaryProviderId: "provider-001",
        primaryClinic: "Northwest Medical Center",
        primaryClinicId: "clinic-001",
        primaryHospital: "University Medical Center",
        primaryHospitalId: "hospital-001",
        lastVisit: "2023-05-01",
        nextAppointment: "2023-06-01",
        insurance: [
          {
            id: "insurance-005",
            provider: "Medicare",
            policyNumber: "MED12345678",
            groupNumber: "",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: null,
            verificationStatus: "verified",
            verificationDate: "2023-03-05",
            coverageDetails: "PRP treatments covered for specific diagnoses only",
          },
        ],
        allergies: [],
        medications: [
          {
            id: "med-004",
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            startDate: "2018-06-15",
            endDate: null,
            prescribedBy: "Dr. Robert Wilson",
            reason: "Type 2 Diabetes",
          },
          {
            id: "med-005",
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "Once daily",
            startDate: "2019-03-10",
            endDate: null,
            prescribedBy: "Dr. Robert Wilson",
            reason: "High Cholesterol",
          },
        ],
        medicalHistory: [
          {
            id: "history-007",
            condition: "Type 2 Diabetes",
            diagnosisDate: "2018-06-01",
            status: "managed",
            notes: "Well controlled with medication and diet",
            relevantToPRP: false,
          },
          {
            id: "history-008",
            condition: "High Cholesterol",
            diagnosisDate: "2019-03-01",
            status: "managed",
            notes: "Well controlled with medication",
            relevantToPRP: false,
          },
          {
            id: "history-009",
            condition: "Knee Osteoarthritis",
            diagnosisDate: "2022-12-15",
            status: "active",
            notes: "Bilateral knee osteoarthritis, more severe in right knee",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Barbara Brown",
          relationship: "Spouse",
          phone: "(206) 555-8901",
        },
        plateletCounts: [
          { id: "platelet-011", date: "2023-03-10", count: 210, unit: "K/µL", status: "normal" },
          { id: "platelet-012", date: "2023-05-01", count: 215, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-015",
            date: "2023-05-01",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-016",
            date: "2023-05-01",
            type: "Hemoglobin A1c",
            result: 6.8,
            unit: "%",
            referenceRange: "<7.0",
            status: "normal",
          },
          {
            id: "lab-017",
            date: "2023-05-01",
            type: "Total Cholesterol",
            result: 185,
            unit: "mg/dL",
            referenceRange: "<200",
            status: "normal",
          },
          {
            id: "lab-018",
            date: "2023-05-01",
            type: "LDL Cholesterol",
            result: 110,
            unit: "mg/dL",
            referenceRange: "<130",
            status: "normal",
          },
          {
            id: "lab-019",
            date: "2023-05-01",
            type: "HDL Cholesterol",
            result: 45,
            unit: "mg/dL",
            referenceRange: ">40",
            status: "normal",
          },
          {
            id: "lab-020",
            date: "2023-05-01",
            type: "Triglycerides",
            result: 150,
            unit: "mg/dL",
            referenceRange: "<150",
            status: "normal",
          },
        ],
        notes:
          "Patient has shown gradual improvement with PRP treatments for bilateral knee osteoarthritis. Considering a third treatment to maximize benefits.",
        referredBy: "Dr. Robert Wilson",
        referralDate: "2023-02-20",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy despite comorbidities, as they are well-controlled.",
        treatmentCount: 2,
        successRate: 100,
      },
      {
        id: "patient-006",
        name: "Elizabeth Taylor",
        dateOfBirth: "1988-09-25",
        gender: "Female",
        email: "etaylor@example.com",
        phone: "(425) 555-9012",
        address: "333 Maple Ave",
        city: "Redmond",
        state: "WA",
        zip: "98052",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-008",
            date: "2023-04-12",
            protocol: "Advanced PRP",
            protocolId: "protocol-002",
            provider: "Dr. Emily Rodriguez",
            providerId: "provider-003",
            clinic: "Eastside Health Partners",
            clinicId: "clinic-002",
            hospital: "Eastside Regional Hospital",
            hospitalId: "hospital-002",
            outcome: "success",
            notes: "Patient responded well to treatment for facial rejuvenation.",
            followUpDate: "2023-05-12",
            painScoreBefore: 0,
            painScoreAfter: 0,
            mobilityScoreBefore: 0,
            mobilityScoreAfter: 0,
            patientSatisfaction: 9,
            complications: ["Mild bruising"],
          },
        ],
        consentForms: [
          {
            id: "consent-011",
            name: "Advanced PRP Treatment Consent",
            signed: true,
            signedDate: "2023-04-05",
            expiryDate: "2024-04-05",
            documentUrl: "/documents/consent-011.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
          {
            id: "consent-012",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-04-05",
            expiryDate: null,
            documentUrl: "/documents/consent-012.pdf",
            requiredByProtocol: ["All"],
          },
          {
            id: "consent-013",
            name: "Aesthetic Procedure Consent",
            signed: true,
            signedDate: "2023-04-05",
            expiryDate: "2024-04-05",
            documentUrl: "/documents/consent-013.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
        ],
        primaryProvider: "Dr. Emily Rodriguez",
        primaryProviderId: "provider-003",
        primaryClinic: "Eastside Health Partners",
        primaryClinicId: "clinic-002",
        primaryHospital: "Eastside Regional Hospital",
        primaryHospitalId: "hospital-002",
        lastVisit: "2023-04-12",
        nextAppointment: "2023-07-12",
        insurance: [
          {
            id: "insurance-006",
            provider: "Self-Pay",
            policyNumber: "",
            groupNumber: "",
            primary: true,
            coverageStartDate: "2023-04-01",
            coverageEndDate: null,
            verificationStatus: "verified",
            verificationDate: "2023-04-05",
            coverageDetails: "Patient is self-pay for aesthetic procedures",
          },
        ],
        allergies: [],
        medications: [],
        medicalHistory: [],
        emergencyContact: {
          name: "Michael Taylor",
          relationship: "Spouse",
          phone: "(425) 555-3456",
        },
        plateletCounts: [{ id: "platelet-013", date: "2023-04-05", count: 290, unit: "K/µL", status: "normal" }],
        labResults: [
          {
            id: "lab-021",
            date: "2023-04-05",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
        ],
        notes: "Patient seeking PRP for facial rejuvenation. No medical concerns.",
        referredBy: "Self-referred",
        referralDate: "2023-03-20",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Excellent candidate for aesthetic PRP applications.",
        treatmentCount: 1,
        successRate: 100,
      },
      {
        id: "patient-007",
        name: "Michael Wilson",
        dateOfBirth: "1979-12-05",
        gender: "Male",
        email: "mwilson@example.com",
        phone: "(206) 555-2345",
        address: "444 Birch St",
        city: "Seattle",
        state: "WA",
        zip: "98105",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-009",
            date: "2023-03-25",
            protocol: "Leukocyte-Rich PRP",
            protocolId: "protocol-003",
            provider: "Dr. Michael Chen",
            providerId: "provider-002",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Patient responded well to treatment for Achilles tendinopathy.",
            followUpDate: "2023-04-25",
            painScoreBefore: 8,
            painScoreAfter: 3,
            mobilityScoreBefore: 5,
            mobilityScoreAfter: 8,
            patientSatisfaction: 9,
            complications: [],
          },
          {
            id: "treatment-010",
            date: "2023-04-25",
            protocol: "Leukocyte-Rich PRP",
            protocolId: "protocol-003",
            provider: "Dr. Michael Chen",
            providerId: "provider-002",
            clinic: "Northwest Medical Center",
            clinicId: "clinic-001",
            hospital: "University Medical Center",
            hospitalId: "hospital-001",
            outcome: "success",
            notes: "Second treatment. Further improvement observed.",
            followUpDate: "2023-05-25",
            painScoreBefore: 3,
            painScoreAfter: 1,
            mobilityScoreBefore: 8,
            mobilityScoreAfter: 9,
            patientSatisfaction: 10,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-014",
            name: "Leukocyte-Rich PRP Treatment Consent",
            signed: true,
            signedDate: "2023-03-20",
            expiryDate: "2024-03-20",
            documentUrl: "/documents/consent-014.pdf",
            requiredByProtocol: ["Leukocyte-Rich PRP"],
          },
          {
            id: "consent-015",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-03-20",
            expiryDate: null,
            documentUrl: "/documents/consent-015.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Michael Chen",
        primaryProviderId: "provider-002",
        primaryClinic: "Northwest Medical Center",
        primaryClinicId: "clinic-001",
        primaryHospital: "University Medical Center",
        hospitalId: "hospital-001",
        lastVisit: "2023-04-25",
        nextAppointment: "2023-05-25",
        insurance: [
          {
            id: "insurance-007",
            provider: "Blue Cross Blue Shield",
            policyNumber: "BCBS87654321",
            groupNumber: "GRP123789",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "verified",
            verificationDate: "2023-03-18",
            coverageDetails: "PRP treatments covered at 70% after deductible",
          },
        ],
        allergies: [],
        medications: [
          {
            id: "med-006",
            name: "Naproxen",
            dosage: "500mg",
            frequency: "As needed for pain",
            startDate: "2023-01-15",
            endDate: "2023-03-25",
            prescribedBy: "Dr. Michael Chen",
            reason: "Achilles tendinopathy pain",
          },
        ],
        medicalHistory: [
          {
            id: "history-010",
            condition: "Achilles Tendinopathy",
            diagnosisDate: "2023-01-10",
            status: "improving",
            notes: "Chronic Achilles tendinopathy, failed conservative treatment",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Sarah Wilson",
          relationship: "Spouse",
          phone: "(206) 555-6789",
        },
        plateletCounts: [
          { id: "platelet-014", date: "2023-03-20", count: 265, unit: "K/µL", status: "normal" },
          { id: "platelet-015", date: "2023-04-20", count: 270, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-022",
            date: "2023-03-20",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
        ],
        notes:
          "Recreational runner with chronic Achilles tendinopathy. Excellent response to Leukocyte-Rich PRP treatment.",
        referredBy: "Dr. James Peterson",
        referralDate: "2023-02-15",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Excellent candidate for PRP therapy based on condition and health status.",
        treatmentCount: 2,
        successRate: 100,
      },
      {
        id: "patient-008",
        name: "Patricia Martinez",
        dateOfBirth: "1965-06-18",
        gender: "Female",
        email: "pmartinez@example.com",
        phone: "(253) 555-6789",
        address: "555 Spruce St",
        city: "Tacoma",
        state: "WA",
        zip: "98402",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-011",
            date: "2023-05-08",
            protocol: "Standard PRP",
            protocolId: "protocol-001",
            provider: "Dr. Lisa Martinez",
            providerId: "provider-005",
            clinic: "South County Medical Group",
            clinicId: "clinic-003",
            hospital: "South County Hospital",
            hospitalId: "hospital-003",
            outcome: "pending",
            notes: "Initial treatment for hip osteoarthritis. Patient tolerated procedure well.",
            followUpDate: "2023-06-08",
            painScoreBefore: 7,
            painScoreAfter: null,
            mobilityScoreBefore: 5,
            mobilityScoreAfter: null,
            patientSatisfaction: null,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-016",
            name: "Standard PRP Treatment Consent",
            signed: true,
            signedDate: "2023-05-01",
            expiryDate: "2024-05-01",
            documentUrl: "/documents/consent-016.pdf",
            requiredByProtocol: ["Standard PRP"],
          },
          {
            id: "consent-017",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-05-01",
            expiryDate: null,
            documentUrl: "/documents/consent-017.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Lisa Martinez",
        primaryProviderId: "provider-005",
        primaryClinic: "South County Medical Group",
        primaryClinicId: "clinic-003",
        primaryHospital: "South County Hospital",
        primaryHospitalId: "hospital-003",
        lastVisit: "2023-05-08",
        nextAppointment: "2023-06-08",
        insurance: [
          {
            id: "insurance-008",
            provider: "Medicare",
            policyNumber: "MED87654321",
            groupNumber: "",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: null,
            verificationStatus: "verified",
            verificationDate: "2023-04-28",
            coverageDetails: "PRP treatments covered for specific diagnoses only",
          },
        ],
        allergies: [
          {
            id: "allergy-004",
            allergen: "Iodine",
            severity: "moderate",
            reaction: "Rash",
            diagnosed: "2005-11-30",
          },
        ],
        medications: [
          {
            id: "med-007",
            name: "Amlodipine",
            dosage: "5mg",
            frequency: "Once daily",
            startDate: "2020-03-15",
            endDate: null,
            prescribedBy: "Dr. Robert Wilson",
            reason: "Hypertension",
          },
          {
            id: "med-008",
            name: "Acetaminophen",
            dosage: "500mg",
            frequency: "As needed for pain",
            startDate: "2022-12-01",
            endDate: null,
            prescribedBy: "Dr. Lisa Martinez",
            reason: "Hip pain",
          },
        ],
        medicalHistory: [
          {
            id: "history-011",
            condition: "Hypertension",
            diagnosisDate: "2020-03-01",
            status: "managed",
            notes: "Well controlled with medication",
            relevantToPRP: false,
          },
          {
            id: "history-012",
            condition: "Hip Osteoarthritis",
            diagnosisDate: "2022-11-15",
            status: "active",
            notes: "Moderate osteoarthritis of the left hip",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Carlos Martinez",
          relationship: "Spouse",
          phone: "(253) 555-0123",
        },
        plateletCounts: [{ id: "platelet-016", date: "2023-05-01", count: 235, unit: "K/µL", status: "normal" }],
        labResults: [
          {
            id: "lab-023",
            date: "2023-05-01",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-024",
            date: "2023-05-01",
            type: "Blood Pressure",
            result: "138/82",
            unit: "mmHg",
            referenceRange: "<140/90",
            status: "normal",
          },
        ],
        notes: "Patient with moderate hip osteoarthritis seeking PRP as an alternative to surgery.",
        referredBy: "Dr. Thomas Lee",
        referralDate: "2023-04-10",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy based on condition and health status.",
        treatmentCount: 1,
        successRate: 0,
      },
      {
        id: "patient-009",
        name: "James Anderson",
        dateOfBirth: "1972-02-28",
        gender: "Male",
        email: "janderson@example.com",
        phone: "(425) 555-0123",
        address: "666 Fir St",
        city: "Bellevue",
        state: "WA",
        zip: "98007",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-012",
            date: "2023-04-05",
            protocol: "Advanced PRP",
            protocolId: "protocol-002",
            provider: "Dr. Emily Rodriguez",
            providerId: "provider-003",
            clinic: "Eastside Health Partners",
            clinicId: "clinic-002",
            hospital: "Eastside Regional Hospital",
            hospitalId: "hospital-002",
            outcome: "success",
            notes: "Patient responded well to treatment for knee osteoarthritis.",
            followUpDate: "2023-05-05",
            painScoreBefore: 8,
            painScoreAfter: 3,
            mobilityScoreBefore: 4,
            mobilityScoreAfter: 7,
            patientSatisfaction: 9,
            complications: [],
          },
          {
            id: "treatment-013",
            date: "2023-05-05",
            protocol: "Advanced PRP",
            protocolId: "protocol-002",
            provider: "Dr. Emily Rodriguez",
            providerId: "provider-003",
            clinic: "Eastside Health Partners",
            clinicId: "clinic-002",
            hospital: "Eastside Regional Hospital",
            hospitalId: "hospital-002",
            outcome: "pending",
            notes: "Second treatment. Patient tolerated procedure well.",
            followUpDate: "2023-06-05",
            painScoreBefore: 3,
            painScoreAfter: null,
            mobilityScoreBefore: 7,
            mobilityScoreAfter: null,
            patientSatisfaction: null,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-018",
            name: "Advanced PRP Treatment Consent",
            signed: true,
            signedDate: "2023-04-01",
            expiryDate: "2024-04-01",
            documentUrl: "/documents/consent-018.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
          {
            id: "consent-019",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-04-01",
            expiryDate: null,
            documentUrl: "/documents/consent-019.pdf",
            requiredByProtocol: ["All"],
          },
        ],
        primaryProvider: "Dr. Emily Rodriguez",
        primaryProviderId: "provider-003",
        primaryClinic: "Eastside Health Partners",
        primaryClinicId: "clinic-002",
        primaryHospital: "Eastside Regional Hospital",
        primaryHospitalId: "hospital-002",
        lastVisit: "2023-05-05",
        nextAppointment: "2023-06-05",
        insurance: [
          {
            id: "insurance-009",
            provider: "Premera Blue Cross",
            policyNumber: "PBC12345678",
            groupNumber: "GRP456789",
            primary: true,
            coverageStartDate: "2023-01-01",
            coverageEndDate: "2023-12-31",
            verificationStatus: "verified",
            verificationDate: "2023-03-28",
            coverageDetails: "PRP treatments covered at 80% after deductible",
          },
        ],
        allergies: [],
        medications: [
          {
            id: "med-009",
            name: "Meloxicam",
            dosage: "15mg",
            frequency: "Once daily",
            startDate: "2022-10-15",
            endDate: "2023-04-01",
            prescribedBy: "Dr. Emily Rodriguez",
            reason: "Knee pain",
          },
        ],
        medicalHistory: [
          {
            id: "history-013",
            condition: "Knee Osteoarthritis",
            diagnosisDate: "2022-09-20",
            status: "active",
            notes: "Moderate to severe osteoarthritis of the right knee",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Linda Anderson",
          relationship: "Spouse",
          phone: "(425) 555-4567",
        },
        plateletCounts: [
          { id: "platelet-017", date: "2023-04-01", count: 280, unit: "K/µL", status: "normal" },
          { id: "platelet-018", date: "2023-05-01", count: 275, unit: "K/µL", status: "normal" },
        ],
        labResults: [
          {
            id: "lab-025",
            date: "2023-04-01",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
        ],
        notes: "Former athlete with knee osteoarthritis. Excellent response to first PRP treatment.",
        referredBy: "Dr. Michael Chen",
        referralDate: "2023-03-15",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Excellent candidate for PRP therapy based on condition and health status.",
        treatmentCount: 2,
        successRate: 50,
      },
      {
        id: "patient-010",
        name: "Linda Garcia",
        dateOfBirth: "1985-11-12",
        gender: "Female",
        email: "lgarcia@example.com",
        phone: "(206) 555-4567",
        address: "777 Pine St",
        city: "Seattle",
        state: "WA",
        zip: "98122",
        status: "active",
        treatmentHistory: [
          {
            id: "treatment-014",
            date: "2023-05-15",
            protocol: "Advanced PRP",
            protocolId: "protocol-002",
            provider: "Dr. Emily Rodriguez",
            providerId: "provider-003",
            clinic: "Eastside Health Partners",
            clinicId: "clinic-002",
            hospital: "Eastside Regional Hospital",
            hospitalId: "hospital-002",
            outcome: "pending",
            notes: "Initial treatment for hair restoration. Patient tolerated procedure well.",
            followUpDate: "2023-06-15",
            painScoreBefore: 0,
            painScoreAfter: null,
            mobilityScoreBefore: 0,
            mobilityScoreAfter: null,
            patientSatisfaction: null,
            complications: [],
          },
        ],
        consentForms: [
          {
            id: "consent-020",
            name: "Advanced PRP Treatment Consent",
            signed: true,
            signedDate: "2023-05-10",
            expiryDate: "2024-05-10",
            documentUrl: "/documents/consent-020.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
          {
            id: "consent-021",
            name: "HIPAA Consent",
            signed: true,
            signedDate: "2023-05-10",
            expiryDate: null,
            documentUrl: "/documents/consent-021.pdf",
            requiredByProtocol: ["All"],
          },
          {
            id: "consent-022",
            name: "Aesthetic Procedure Consent",
            signed: true,
            signedDate: "2023-05-10",
            expiryDate: "2024-05-10",
            documentUrl: "/documents/consent-022.pdf",
            requiredByProtocol: ["Advanced PRP"],
          },
        ],
        primaryProvider: "Dr. Emily Rodriguez",
        primaryProviderId: "provider-003",
        primaryClinic: "Eastside Health Partners",
        primaryClinicId: "clinic-002",
        primaryHospital: "Eastside Regional Hospital",
        primaryHospitalId: "hospital-002",
        lastVisit: "2023-05-15",
        nextAppointment: "2023-06-15",
        insurance: [
          {
            id: "insurance-010",
            provider: "Self-Pay",
            policyNumber: "",
            groupNumber: "",
            primary: true,
            coverageStartDate: "2023-05-01",
            coverageEndDate: null,
            verificationStatus: "verified",
            verificationDate: "2023-05-10",
            coverageDetails: "Patient is self-pay for aesthetic procedures",
          },
        ],
        allergies: [],
        medications: [],
        medicalHistory: [
          {
            id: "history-014",
            condition: "Female Pattern Hair Loss",
            diagnosisDate: "2022-12-10",
            status: "active",
            notes: "Moderate female pattern hair loss",
            relevantToPRP: true,
          },
        ],
        emergencyContact: {
          name: "Carlos Garcia",
          relationship: "Spouse",
          phone: "(206) 555-8901",
        },
        plateletCounts: [{ id: "platelet-019", date: "2023-05-10", count: 310, unit: "K/µL", status: "normal" }],
        labResults: [
          {
            id: "lab-026",
            date: "2023-05-10",
            type: "Complete Blood Count",
            result: "Normal",
            unit: "",
            referenceRange: "Normal",
            status: "normal",
            notes: "All values within normal range",
          },
          {
            id: "lab-027",
            date: "2023-05-10",
            type: "Ferritin",
            result: 45,
            unit: "ng/mL",
            referenceRange: "15-150",
            status: "normal",
          },
          {
            id: "lab-028",
            date: "2023-05-10",
            type: "Thyroid Stimulating Hormone",
            result: 2.1,
            unit: "mIU/L",
            referenceRange: "0.4-4.0",
            status: "normal",
          },
          {
            id: "lab-029",
            date: "2023-05-10",
            type: "Vitamin D",
            result: 38,
            unit: "ng/mL",
            referenceRange: "30-100",
            status: "normal",
          },
        ],
        notes: "Patient seeking PRP for female pattern hair loss. No medical concerns.",
        referredBy: "Self-referred",
        referralDate: "2023-04-25",
        prpEligibility: "eligible",
        prpEligibilityNotes: "Good candidate for PRP therapy for hair restoration.",
        treatmentCount: 1,
        successRate: 0,
      },
    ]
  } catch (error) {
    return rejectWithValue("Failed to fetch patients")
  }
})

export const fetchPatientById = createAsyncThunk(
  "patient/fetchPatientById",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      console.log("Fetching patient with ID:", id) // Add logging

      // Get patients from the current state if available
      const state = getState() as { patient: PatientState }
      let patients = state.patient.patients

      // If patients array is empty, fetch them first
      if (patients.length === 0) {
        console.log("No patients in state, fetching all patients first")
        // Use unwrap to get the actual payload
        const patientsResponse = await fetchPatients().unwrap()
        patients = patientsResponse
      }

      // Find the patient with the matching ID
      const patient = patients.find((p) => p.id === id)

      if (!patient) {
        console.error("Patient not found with ID:", id) // Add error logging
        return rejectWithValue("Patient not found")
      }

      console.log("Found patient:", patient.name) // Add success logging
      return patient
    } catch (error) {
      console.error("Error fetching patient:", error) // Add error logging
      return rejectWithValue(`Failed to fetch patient details: ${error}`)
    }
  },
)

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetPatients: () => initialState,
    setSelectedPatient: (state, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
        state.error = null
        state.status = "loading"
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loading = false
        state.patients = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.status = "failed"
      })
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientById.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false
        state.selectedPatient = action.payload
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetPatients, setSelectedPatient } = patientSlice.actions

export default patientSlice.reducer
