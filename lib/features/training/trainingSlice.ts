import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TrainingCourse {
  id: string
  title: string
  description: string
  type: "online" | "in-person" | "hybrid"
  level: "beginner" | "intermediate" | "advanced"
  duration: number
  credits: number
  status: "active" | "upcoming" | "archived"
  startDate: string | null
  endDate: string | null
  instructor: string
  location: string | null
  capacity: number
  enrolled: number
  prerequisites: string[]
  modules: {
    id: string
    title: string
    description: string
    duration: number
    order: number
  }[]
  completionRate: number | null
  averageRating: number | null
  testimonials: {
    id: string
    providerName: string
    text: string
    rating: number
  }[]
}

export interface ProviderCertification {
  id: string
  providerId: string
  providerName: string
  certificationType: string
  status: "active" | "expired" | "pending"
  issueDate: string
  expiryDate: string
  certificationNumber: string
  issuingAuthority: string
  trainingCompleted: {
    courseId: string
    courseTitle: string
    completionDate: string
    score: number
  }[]
}

export interface TrainingResource {
  id: string
  title: string
  description: string
  type: "document" | "video" | "presentation" | "interactive"
  url: string
  category: string
  tags: string[]
  createdDate: string
  lastModified: string
  accessLevel: "all" | "certified" | "admin"
}

export interface TrainingSchedule {
  id: string
  courseId: string
  title: string
  startDate: string
  endDate: string
  location: string
  instructor: string
  maxAttendees: number
  currentAttendees: number
  status: "scheduled" | "cancelled" | "completed"
}

export interface TrainingState {
  courses: TrainingCourse[]
  certifications: ProviderCertification[]
  resources: TrainingResource[]
  trainingSchedule: TrainingSchedule[]
  loading: boolean
  error: string | null
}

const initialState: TrainingState = {
  courses: [],
  certifications: [],
  resources: [],
  trainingSchedule: [],
  loading: false,
  error: null,
}

export const fetchTrainingData = createAsyncThunk("training/fetchTrainingData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      courses: [
        {
          id: "course-001",
          title: "PRP Fundamentals",
          description: "Introduction to platelet-rich plasma therapy principles and applications",
          type: "online",
          level: "beginner",
          duration: 8,
          credits: 8,
          status: "active",
          startDate: null,
          endDate: null,
          instructor: "Dr. Sarah Johnson",
          location: null,
          capacity: 100,
          enrolled: 78,
          prerequisites: [],
          modules: [
            {
              id: "module-001",
              title: "Introduction to PRP",
              description: "Overview of platelet-rich plasma and its components",
              duration: 1,
              order: 1,
            },
            {
              id: "module-002",
              title: "PRP Preparation Techniques",
              description: "Methods for preparing platelet-rich plasma",
              duration: 2,
              order: 2,
            },
            {
              id: "module-003",
              title: "Clinical Applications",
              description: "Common clinical applications for PRP therapy",
              duration: 3,
              order: 3,
            },
            {
              id: "module-004",
              title: "Patient Selection",
              description: "Criteria for selecting appropriate patients for PRP therapy",
              duration: 1,
              order: 4,
            },
            {
              id: "module-005",
              title: "Assessment and Certification",
              description: "Final assessment and certification process",
              duration: 1,
              order: 5,
            },
          ],
          completionRate: 85,
          averageRating: 4.7,
          testimonials: [
            {
              id: "test-001",
              providerName: "Dr. James Wilson",
              text: "Excellent introduction to PRP therapy. Comprehensive and well-structured.",
              rating: 5,
            },
            {
              id: "test-002",
              providerName: "Dr. Maria Garcia",
              text: "Great foundation course. Would recommend to all practitioners new to PRP.",
              rating: 4,
            },
          ],
        },
        {
          id: "course-002",
          title: "Advanced PRP Techniques",
          description: "Advanced techniques for platelet-rich plasma preparation and application",
          type: "hybrid",
          level: "advanced",
          duration: 16,
          credits: 16,
          status: "active",
          startDate: "2023-06-15",
          endDate: "2023-06-16",
          instructor: "Dr. Michael Chen",
          location: "Northwest Medical Center",
          capacity: 20,
          enrolled: 15,
          prerequisites: ["PRP Fundamentals"],
          modules: [
            {
              id: "module-006",
              title: "Advanced Preparation Techniques",
              description: "Specialized methods for PRP preparation",
              duration: 4,
              order: 1,
            },
            {
              id: "module-007",
              title: "Leukocyte-Rich PRP",
              description: "Preparation and application of leukocyte-rich PRP",
              duration: 4,
              order: 2,
            },
            {
              id: "module-008",
              title: "Growth Factor Enhancement",
              description: "Methods for enhancing growth factor content in PRP",
              duration: 4,
              order: 3,
            },
            {
              id: "module-009",
              title: "Hands-on Workshop",
              description: "Practical application of advanced PRP techniques",
              duration: 4,
              order: 4,
            },
          ],
          completionRate: 92,
          averageRating: 4.9,
          testimonials: [
            {
              id: "test-003",
              providerName: "Dr. Robert Kim",
              text: "The hands-on workshop was invaluable. Significantly improved my technique.",
              rating: 5,
            },
            {
              id: "test-004",
              providerName: "Dr. Jennifer Lee",
              text: "Excellent advanced course. The growth factor enhancement module was particularly useful.",
              rating: 5,
            },
          ],
        },
        {
          id: "course-003",
          title: "PRP for Musculoskeletal Conditions",
          description: "Specialized course on PRP applications for musculoskeletal conditions",
          type: "online",
          level: "intermediate",
          duration: 12,
          credits: 12,
          status: "active",
          startDate: null,
          endDate: null,
          instructor: "Dr. Emily Rodriguez",
          location: null,
          capacity: 50,
          enrolled: 32,
          prerequisites: ["PRP Fundamentals"],
          modules: [
            {
              id: "module-010",
              title: "PRP for Osteoarthritis",
              description: "Application of PRP for osteoarthritis treatment",
              duration: 3,
              order: 1,
            },
            {
              id: "module-011",
              title: "PRP for Tendinopathy",
              description: "Application of PRP for tendinopathy treatment",
              duration: 3,
              order: 2,
            },
            {
              id: "module-012",
              title: "PRP for Ligament Injuries",
              description: "Application of PRP for ligament injury treatment",
              duration: 3,
              order: 3,
            },
            {
              id: "module-013",
              title: "Case Studies and Assessment",
              description: "Review of case studies and final assessment",
              duration: 3,
              order: 4,
            },
          ],
          completionRate: 78,
          averageRating: 4.5,
          testimonials: [
            {
              id: "test-005",
              providerName: "Dr. Thomas Brown",
              text: "Great content on tendinopathy applications. Very practical information.",
              rating: 4,
            },
          ],
        },
        {
          id: "course-004",
          title: "PRP in Aesthetic Medicine",
          description: "Applications of PRP in aesthetic and dermatological procedures",
          type: "in-person",
          level: "intermediate",
          duration: 8,
          credits: 8,
          status: "upcoming",
          startDate: "2023-07-10",
          endDate: "2023-07-10",
          instructor: "Dr. Lisa Martinez",
          location: "Eastside Health Partners",
          capacity: 15,
          enrolled: 8,
          prerequisites: ["PRP Fundamentals"],
          modules: [
            {
              id: "module-014",
              title: "PRP for Skin Rejuvenation",
              description: "Application of PRP for skin rejuvenation",
              duration: 2,
              order: 1,
            },
            {
              id: "module-015",
              title: "PRP for Hair Restoration",
              description: "Application of PRP for hair restoration",
              duration: 2,
              order: 2,
            },
            {
              id: "module-016",
              title: "Combination Therapies",
              description: "Combining PRP with other aesthetic treatments",
              duration: 2,
              order: 3,
            },
            {
              id: "module-017",
              title: "Hands-on Workshop",
              description: "Practical application of aesthetic PRP techniques",
              duration: 2,
              order: 4,
            },
          ],
          completionRate: null,
          averageRating: null,
          testimonials: [],
        },
        {
          id: "course-005",
          title: "PRP Injection Techniques",
          description: "Comprehensive training on proper PRP injection techniques for various conditions",
          type: "hybrid",
          level: "intermediate",
          duration: 10,
          credits: 10,
          status: "active",
          startDate: "2023-08-05",
          endDate: "2023-08-06",
          instructor: "Dr. James Wilson",
          location: "South County Medical Group",
          capacity: 18,
          enrolled: 12,
          prerequisites: ["PRP Fundamentals"],
          modules: [
            {
              id: "module-018",
              title: "Injection Fundamentals",
              description: "Basic principles of injection techniques",
              duration: 2,
              order: 1,
            },
            {
              id: "module-019",
              title: "Ultrasound-Guided Injections",
              description: "Using ultrasound guidance for precise PRP placement",
              duration: 3,
              order: 2,
            },
            {
              id: "module-020",
              title: "Joint Injection Techniques",
              description: "Specific techniques for joint injections",
              duration: 3,
              order: 3,
            },
            {
              id: "module-021",
              title: "Soft Tissue Injection Techniques",
              description: "Specific techniques for soft tissue injections",
              duration: 2,
              order: 4,
            },
          ],
          completionRate: 85,
          averageRating: 4.6,
          testimonials: [
            {
              id: "test-006",
              providerName: "Dr. Patricia White",
              text: "The ultrasound guidance section was extremely helpful. Improved my precision significantly.",
              rating: 5,
            },
          ],
        },
        {
          id: "course-006",
          title: "PRP Research Methodology",
          description: "Training on research design and methodology for PRP clinical studies",
          type: "online",
          level: "advanced",
          duration: 14,
          credits: 14,
          status: "active",
          startDate: null,
          endDate: null,
          instructor: "Dr. Robert Kim",
          location: null,
          capacity: 30,
          enrolled: 18,
          prerequisites: ["PRP Fundamentals", "Advanced PRP Techniques"],
          modules: [
            {
              id: "module-022",
              title: "Research Design Principles",
              description: "Fundamentals of clinical research design",
              duration: 3,
              order: 1,
            },
            {
              id: "module-023",
              title: "PRP-Specific Research Considerations",
              description: "Special considerations for PRP research",
              duration: 3,
              order: 2,
            },
            {
              id: "module-024",
              title: "Outcome Measures",
              description: "Selecting and implementing appropriate outcome measures",
              duration: 3,
              order: 3,
            },
            {
              id: "module-025",
              title: "Data Analysis",
              description: "Statistical methods for PRP research data",
              duration: 3,
              order: 4,
            },
            {
              id: "module-026",
              title: "Research Protocol Development",
              description: "Creating a comprehensive research protocol",
              duration: 2,
              order: 5,
            },
          ],
          completionRate: 70,
          averageRating: 4.8,
          testimonials: [
            {
              id: "test-007",
              providerName: "Dr. Michael Chen",
              text: "Excellent course for anyone interested in conducting PRP research. Very thorough.",
              rating: 5,
            },
          ],
        },
      ],
      certifications: [
        {
          id: "cert-001",
          providerId: "provider-001",
          providerName: "Dr. Sarah Johnson",
          certificationType: "Advanced PRP Administration",
          status: "active",
          issueDate: "2022-03-15",
          expiryDate: "2024-03-15",
          certificationNumber: "APRP-2022-001",
          issuingAuthority: "American Academy of Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2022-01-20",
              score: 95,
            },
            {
              courseId: "course-002",
              courseTitle: "Advanced PRP Techniques",
              completionDate: "2022-02-28",
              score: 92,
            },
          ],
        },
        {
          id: "cert-002",
          providerId: "provider-001",
          providerName: "Dr. Sarah Johnson",
          certificationType: "Regenerative Medicine Specialist",
          status: "expired",
          issueDate: "2021-06-10",
          expiryDate: "2023-06-10",
          certificationNumber: "RMS-2021-042",
          issuingAuthority: "International Society for Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2021-04-15",
              score: 90,
            },
            {
              courseId: "course-003",
              courseTitle: "PRP for Musculoskeletal Conditions",
              completionDate: "2021-05-20",
              score: 88,
            },
          ],
        },
        {
          id: "cert-003",
          providerId: "provider-002",
          providerName: "Dr. Michael Chen",
          certificationType: "Standard PRP Administration",
          status: "active",
          issueDate: "2022-05-20",
          expiryDate: "2024-05-20",
          certificationNumber: "SPRP-2022-078",
          issuingAuthority: "American Academy of Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2022-04-10",
              score: 87,
            },
          ],
        },
        {
          id: "cert-004",
          providerId: "provider-003",
          providerName: "Dr. Emily Rodriguez",
          certificationType: "Advanced PRP Administration",
          status: "active",
          issueDate: "2022-01-10",
          expiryDate: "2024-01-10",
          certificationNumber: "APRP-2022-015",
          issuingAuthority: "American Academy of Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2021-11-15",
              score: 94,
            },
            {
              courseId: "course-002",
              courseTitle: "Advanced PRP Techniques",
              completionDate: "2021-12-20",
              score: 96,
            },
          ],
        },
        {
          id: "cert-005",
          providerId: "provider-003",
          providerName: "Dr. Emily Rodriguez",
          certificationType: "Aesthetic Medicine",
          status: "active",
          issueDate: "2021-11-05",
          expiryDate: "2023-11-05",
          certificationNumber: "AM-2021-132",
          issuingAuthority: "American Society of Aesthetic Medicine",
          trainingCompleted: [
            {
              courseId: "course-004",
              courseTitle: "PRP in Aesthetic Medicine",
              completionDate: "2021-10-15",
              score: 92,
            },
          ],
        },
        {
          id: "cert-006",
          providerId: "provider-004",
          providerName: "Dr. James Wilson",
          certificationType: "Advanced PRP Administration",
          status: "active",
          issueDate: "2022-06-15",
          expiryDate: "2024-06-15",
          certificationNumber: "APRP-2022-089",
          issuingAuthority: "American Academy of Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2022-04-20",
              score: 91,
            },
            {
              courseId: "course-002",
              courseTitle: "Advanced PRP Techniques",
              completionDate: "2022-05-25",
              score: 89,
            },
          ],
        },
        {
          id: "cert-007",
          providerId: "provider-005",
          providerName: "Dr. Lisa Martinez",
          certificationType: "Aesthetic PRP Specialist",
          status: "active",
          issueDate: "2022-08-10",
          expiryDate: "2024-08-10",
          certificationNumber: "APS-2022-042",
          issuingAuthority: "American Society of Aesthetic Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2022-06-15",
              score: 93,
            },
            {
              courseId: "course-004",
              courseTitle: "PRP in Aesthetic Medicine",
              completionDate: "2022-07-20",
              score: 95,
            },
          ],
        },
        {
          id: "cert-008",
          providerId: "provider-006",
          providerName: "Dr. Robert Kim",
          certificationType: "PRP Research Specialist",
          status: "active",
          issueDate: "2022-09-05",
          expiryDate: "2024-09-05",
          certificationNumber: "PRS-2022-015",
          issuingAuthority: "International Society for Regenerative Medicine",
          trainingCompleted: [
            {
              courseId: "course-001",
              courseTitle: "PRP Fundamentals",
              completionDate: "2022-05-10",
              score: 96,
            },
            {
              courseId: "course-002",
              courseTitle: "Advanced PRP Techniques",
              completionDate: "2022-06-15",
              score: 94,
            },
            {
              courseId: "course-006",
              courseTitle: "PRP Research Methodology",
              completionDate: "2022-08-20",
              score: 98,
            },
          ],
        },
      ],
      resources: [
        {
          id: "resource-001",
          title: "PRP Preparation Protocol Guide",
          description: "Comprehensive guide to standard PRP preparation protocols",
          type: "document",
          url: "/training/resources/prp-preparation-guide.pdf",
          category: "Protocols",
          tags: ["PRP", "Preparation", "Protocol"],
          createdDate: "2022-12-10",
          lastModified: "2023-03-15",
          accessLevel: "all",
        },
        {
          id: "resource-002",
          title: "PRP Administration Techniques",
          description: "Video demonstration of proper PRP administration techniques",
          type: "video",
          url: "/training/resources/prp-administration-video",
          category: "Techniques",
          tags: ["PRP", "Administration", "Injection"],
          createdDate: "2023-01-20",
          lastModified: "2023-01-20",
          accessLevel: "all",
        },
        {
          id: "resource-003",
          title: "Advanced PRP Applications",
          description: "Presentation on advanced applications of PRP therapy",
          type: "presentation",
          url: "/training/resources/advanced-prp-applications.pptx",
          category: "Advanced Topics",
          tags: ["PRP", "Advanced", "Applications"],
          createdDate: "2023-02-15",
          lastModified: "2023-04-10",
          accessLevel: "certified",
        },
        {
          id: "resource-004",
          title: "PRP Case Studies",
          description: "Collection of case studies demonstrating PRP outcomes",
          type: "document",
          url: "/training/resources/prp-case-studies.pdf",
          category: "Case Studies",
          tags: ["PRP", "Case Studies", "Outcomes"],
          createdDate: "2023-03-05",
          lastModified: "2023-05-01",
          accessLevel: "certified",
        },
        {
          id: "resource-005",
          title: "PRP Equipment Training",
          description: "Interactive training module for PRP equipment operation",
          type: "interactive",
          url: "/training/resources/prp-equipment-training",
          category: "Equipment",
          tags: ["PRP", "Equipment", "Training"],
          createdDate: "2023-04-15",
          lastModified: "2023-04-15",
          accessLevel: "all",
        },
        {
          id: "resource-006",
          title: "Ultrasound Guidance for PRP Injections",
          description: "Video tutorial on using ultrasound guidance for PRP injections",
          type: "video",
          url: "/training/resources/ultrasound-guidance-video",
          category: "Techniques",
          tags: ["PRP", "Ultrasound", "Injection", "Guidance"],
          createdDate: "2023-03-10",
          lastModified: "2023-03-10",
          accessLevel: "certified",
        },
        {
          id: "resource-007",
          title: "PRP Quality Control Procedures",
          description: "Guide to quality control procedures for PRP preparation",
          type: "document",
          url: "/training/resources/prp-quality-control.pdf",
          category: "Protocols",
          tags: ["PRP", "Quality Control", "Preparation"],
          createdDate: "2023-04-05",
          lastModified: "2023-04-05",
          accessLevel: "all",
        },
        {
          id: "resource-008",
          title: "Patient Selection Criteria for PRP",
          description: "Guidelines for selecting appropriate patients for PRP therapy",
          type: "document",
          url: "/training/resources/patient-selection-criteria.pdf",
          category: "Clinical Guidelines",
          tags: ["PRP", "Patient Selection", "Guidelines"],
          createdDate: "2023-02-20",
          lastModified: "2023-04-15",
          accessLevel: "all",
        },
        {
          id: "resource-009",
          title: "PRP Research Methodology",
          description: "Presentation on research design for PRP clinical studies",
          type: "presentation",
          url: "/training/resources/prp-research-methodology.pptx",
          category: "Research",
          tags: ["PRP", "Research", "Methodology"],
          createdDate: "2023-03-25",
          lastModified: "2023-03-25",
          accessLevel: "certified",
        },
        {
          id: "resource-010",
          title: "Complications and Management in PRP Therapy",
          description: "Guide to recognizing and managing complications in PRP therapy",
          type: "document",
          url: "/training/resources/prp-complications.pdf",
          category: "Clinical Guidelines",
          tags: ["PRP", "Complications", "Management"],
          createdDate: "2023-04-20",
          lastModified: "2023-04-20",
          accessLevel: "certified",
        },
        {
          id: "resource-011",
          title: "PRP for Osteoarthritis: Current Evidence",
          description: "Review of current evidence for PRP in osteoarthritis treatment",
          type: "document",
          url: "/training/resources/prp-osteoarthritis-evidence.pdf",
          category: "Evidence-Based Practice",
          tags: ["PRP", "Osteoarthritis", "Evidence"],
          createdDate: "2023-05-05",
          lastModified: "2023-05-05",
          accessLevel: "all",
        },
        {
          id: "resource-012",
          title: "Centrifugation Parameters for PRP",
          description: "Guide to optimal centrifugation parameters for different PRP preparations",
          type: "document",
          url: "/training/resources/centrifugation-parameters.pdf",
          category: "Protocols",
          tags: ["PRP", "Centrifugation", "Parameters"],
          createdDate: "2023-05-10",
          lastModified: "2023-05-10",
          accessLevel: "all",
        },
      ],
      trainingSchedule: [
        {
          id: "schedule-001",
          courseId: "course-002",
          title: "Advanced PRP Techniques - June 2023",
          startDate: "2023-06-15T09:00:00Z",
          endDate: "2023-06-16T17:00:00Z",
          location: "Northwest Medical Center",
          instructor: "Dr. Michael Chen",
          maxAttendees: 20,
          currentAttendees: 15,
          status: "scheduled",
        },
        {
          id: "schedule-002",
          courseId: "course-004",
          title: "PRP in Aesthetic Medicine - July 2023",
          startDate: "2023-07-10T09:00:00Z",
          endDate: "2023-07-10T17:00:00Z",
          location: "Eastside Health Partners",
          instructor: "Dr. Lisa Martinez",
          maxAttendees: 15,
          currentAttendees: 8,
          status: "scheduled",
        },
        {
          id: "schedule-003",
          courseId: "course-005",
          title: "PRP Injection Techniques - August 2023",
          startDate: "2023-08-05T09:00:00Z",
          endDate: "2023-08-06T17:00:00Z",
          location: "South County Medical Group",
          instructor: "Dr. James Wilson",
          maxAttendees: 18,
          currentAttendees: 12,
          status: "scheduled",
        },
        {
          id: "schedule-004",
          courseId: "course-002",
          title: "Advanced PRP Techniques - September 2023",
          startDate: "2023-09-20T09:00:00Z",
          endDate: "2023-09-21T17:00:00Z",
          location: "Downtown Wellness Center",
          instructor: "Dr. Michael Chen",
          maxAttendees: 20,
          currentAttendees: 5,
          status: "scheduled",
        },
      ],
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch training data")
  }
})

export const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    resetTraining: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrainingData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.courses = action.payload.courses
        state.certifications = action.payload.certifications
        state.resources = action.payload.resources
        state.trainingSchedule = action.payload.trainingSchedule
      })
      .addCase(fetchTrainingData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetTraining } = trainingSlice.actions

export default trainingSlice.reducer
