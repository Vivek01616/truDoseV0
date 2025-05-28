import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface EducationResource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "infographic" | "document"
  url: string
  thumbnailUrl?: string
  category: string
  tags: string[]
  createdBy: string
  createdDate: string
  lastModified: string
  status: "published" | "draft" | "archived"
  viewCount: number
}

export interface CommunicationTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: "email" | "sms" | "portal"
  category: string
  tags: string[]
  createdBy: string
  createdDate: string
  lastModified: string
  status: "active" | "draft" | "archived"
  usageCount: number
}

export interface PortalState {
  educationResources: EducationResource[]
  communicationTemplates: CommunicationTemplate[]
  loading: boolean
  error: string | null
}

const initialState: PortalState = {
  educationResources: [],
  communicationTemplates: [],
  loading: false,
  error: null,
}

export const fetchPortalData = createAsyncThunk("portal/fetchPortalData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // Simulating API response for demo
    return {
      educationResources: [
        {
          id: "resource-001",
          title: "Understanding PRP Therapy",
          description: "A comprehensive guide to platelet-rich plasma therapy and its benefits",
          type: "article",
          url: "/resources/understanding-prp-therapy",
          thumbnailUrl: "/images/prp-therapy-thumb.jpg",
          category: "Patient Education",
          tags: ["PRP", "Overview", "Benefits"],
          createdBy: "Dr. Sarah Johnson",
          createdDate: "2023-01-15",
          lastModified: "2023-03-10",
          status: "published",
          viewCount: 1245,
        },
        {
          id: "resource-002",
          title: "PRP Treatment Process",
          description: "Video walkthrough of what to expect during a PRP treatment session",
          type: "video",
          url: "/resources/prp-treatment-process-video",
          thumbnailUrl: "/images/prp-process-thumb.jpg",
          category: "Treatment Information",
          tags: ["PRP", "Process", "What to Expect"],
          createdBy: "Dr. Michael Chen",
          createdDate: "2023-02-20",
          lastModified: "2023-02-20",
          status: "published",
          viewCount: 876,
        },
        {
          id: "resource-003",
          title: "PRP for Joint Pain",
          description: "How PRP therapy can help with various types of joint pain",
          type: "article",
          url: "/resources/prp-for-joint-pain",
          thumbnailUrl: "/images/joint-pain-thumb.jpg",
          category: "Condition Specific",
          tags: ["PRP", "Joint Pain", "Osteoarthritis"],
          createdBy: "Dr. Emily Rodriguez",
          createdDate: "2023-03-05",
          lastModified: "2023-04-15",
          status: "published",
          viewCount: 932,
        },
        {
          id: "resource-004",
          title: "PRP Recovery Timeline",
          description: "Infographic showing the typical recovery timeline after PRP treatment",
          type: "infographic",
          url: "/resources/prp-recovery-timeline",
          thumbnailUrl: "/images/recovery-thumb.jpg",
          category: "Recovery Information",
          tags: ["PRP", "Recovery", "Timeline"],
          createdBy: "Dr. Sarah Johnson",
          createdDate: "2023-04-10",
          lastModified: "2023-04-10",
          status: "published",
          viewCount: 654,
        },
        {
          id: "resource-005",
          title: "PRP vs. Other Treatments",
          description: "Comparison of PRP therapy with other treatment options",
          type: "article",
          url: "/resources/prp-vs-other-treatments",
          thumbnailUrl: "/images/comparison-thumb.jpg",
          category: "Treatment Information",
          tags: ["PRP", "Comparison", "Treatment Options"],
          createdBy: "Dr. Michael Chen",
          createdDate: "2023-05-01",
          lastModified: "2023-05-01",
          status: "draft",
          viewCount: 0,
        },
        {
          id: "resource-006",
          title: "PRP for Sports Injuries",
          description: "How athletes can benefit from PRP therapy for faster recovery",
          type: "article",
          url: "/resources/prp-for-sports-injuries",
          thumbnailUrl: "/images/sports-injuries-thumb.jpg",
          category: "Condition Specific",
          tags: ["PRP", "Sports", "Athletes", "Recovery"],
          createdBy: "Dr. James Wilson",
          createdDate: "2023-03-15",
          lastModified: "2023-04-20",
          status: "published",
          viewCount: 1087,
        },
        {
          id: "resource-007",
          title: "PRP Preparation Process",
          description: "Video demonstration of how PRP is prepared from a blood sample",
          type: "video",
          url: "/resources/prp-preparation-video",
          thumbnailUrl: "/images/preparation-thumb.jpg",
          category: "Treatment Information",
          tags: ["PRP", "Preparation", "Process"],
          createdBy: "Dr. Lisa Martinez",
          createdDate: "2023-02-10",
          lastModified: "2023-02-10",
          status: "published",
          viewCount: 765,
        },
        {
          id: "resource-008",
          title: "Post-PRP Treatment Care",
          description: "Guidelines for patients to follow after receiving PRP treatment",
          type: "document",
          url: "/resources/post-prp-care-guide",
          thumbnailUrl: "/images/post-care-thumb.jpg",
          category: "Recovery Information",
          tags: ["PRP", "Aftercare", "Guidelines"],
          createdBy: "Dr. Emily Rodriguez",
          createdDate: "2023-04-05",
          lastModified: "2023-05-10",
          status: "published",
          viewCount: 543,
        },
        {
          id: "resource-009",
          title: "PRP for Hair Restoration",
          description: "How PRP therapy can help with hair loss and promote hair growth",
          type: "article",
          url: "/resources/prp-for-hair-restoration",
          thumbnailUrl: "/images/hair-restoration-thumb.jpg",
          category: "Condition Specific",
          tags: ["PRP", "Hair Loss", "Restoration"],
          createdBy: "Dr. Robert Kim",
          createdDate: "2023-04-25",
          lastModified: "2023-04-25",
          status: "published",
          viewCount: 876,
        },
        {
          id: "resource-010",
          title: "Understanding PRP Blood Tests",
          description: "Explanation of blood tests performed before PRP treatment",
          type: "infographic",
          url: "/resources/prp-blood-tests",
          thumbnailUrl: "/images/blood-tests-thumb.jpg",
          category: "Patient Education",
          tags: ["PRP", "Blood Tests", "Preparation"],
          createdBy: "Dr. Sarah Johnson",
          createdDate: "2023-05-05",
          lastModified: "2023-05-05",
          status: "draft",
          viewCount: 0,
        },
        {
          id: "resource-011",
          title: "PRP Treatment FAQ",
          description: "Answers to frequently asked questions about PRP therapy",
          type: "document",
          url: "/resources/prp-faq",
          thumbnailUrl: "/images/faq-thumb.jpg",
          category: "Patient Education",
          tags: ["PRP", "FAQ", "Questions"],
          createdBy: "Dr. Michael Chen",
          createdDate: "2023-03-20",
          lastModified: "2023-05-15",
          status: "published",
          viewCount: 1432,
        },
        {
          id: "resource-012",
          title: "PRP for Facial Rejuvenation",
          description: "How PRP therapy is used in cosmetic procedures for facial rejuvenation",
          type: "article",
          url: "/resources/prp-facial-rejuvenation",
          thumbnailUrl: "/images/facial-rejuvenation-thumb.jpg",
          category: "Condition Specific",
          tags: ["PRP", "Cosmetic", "Facial", "Rejuvenation"],
          createdBy: "Dr. Lisa Martinez",
          createdDate: "2023-04-15",
          lastModified: "2023-04-15",
          status: "published",
          viewCount: 987,
        },
      ],
      communicationTemplates: [
        {
          id: "template-001",
          name: "PRP Treatment Appointment Confirmation",
          subject: "Your PRP Treatment Appointment Confirmation",
          body: "Dear [Patient Name],\n\nThis is to confirm your PRP treatment appointment scheduled for [Appointment Date] at [Appointment Time] with [Provider Name] at [Clinic Name].\n\nPlease arrive 15 minutes early to complete any necessary paperwork. If you need to reschedule, please contact us at least 24 hours in advance.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Appointment",
          tags: ["Confirmation", "PRP", "Appointment"],
          createdBy: "Admin",
          createdDate: "2023-01-10",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 325,
        },
        {
          id: "template-002",
          name: "PRP Treatment Reminder",
          subject: "Reminder: Your PRP Treatment Tomorrow",
          body: "Dear [Patient Name],\n\nThis is a friendly reminder about your PRP treatment appointment tomorrow, [Appointment Date] at [Appointment Time] with [Provider Name].\n\nPlease remember to:\n- Bring your ID and insurance card\n- Arrive 15 minutes early\n- Avoid anti-inflammatory medications for 48 hours prior to treatment\n\nIf you have any questions, please contact us.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Appointment",
          tags: ["Reminder", "PRP", "Appointment"],
          createdBy: "Admin",
          createdDate: "2023-01-15",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 298,
        },
        {
          id: "template-003",
          name: "PRP Treatment Follow-up",
          subject: "Follow-up: Your Recent PRP Treatment",
          body: "Dear [Patient Name],\n\nThank you for choosing [Clinic Name] for your recent PRP treatment. We hope you are doing well.\n\nAs part of our commitment to your care, we would like to check in on your progress. Please let us know how you're feeling since your treatment on [Treatment Date].\n\nIf you're experiencing any concerns or have questions, please don't hesitate to contact us. Your follow-up appointment is scheduled for [Follow-up Date] at [Follow-up Time].\n\nBest regards,\n[Provider Name]\n[Clinic Name]",
          type: "email",
          category: "Follow-up",
          tags: ["Follow-up", "PRP", "Treatment"],
          createdBy: "Admin",
          createdDate: "2023-01-20",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 245,
        },
        {
          id: "template-004",
          name: "PRP Treatment Appointment Reminder - SMS",
          subject: "",
          body: "Reminder: Your PRP treatment appointment is tomorrow at [Appointment Time] with [Provider Name] at [Clinic Name]. Please arrive 15 mins early. Reply C to confirm or R to reschedule.",
          type: "sms",
          category: "Appointment",
          tags: ["Reminder", "PRP", "Appointment", "SMS"],
          createdBy: "Admin",
          createdDate: "2023-02-05",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 187,
        },
        {
          id: "template-005",
          name: "New Education Resource Notification",
          subject: "New Resource Available: [Resource Title]",
          body: "Dear [Patient Name],\n\nWe've added a new educational resource to your patient portal that may be relevant to your treatment:\n\n[Resource Title]\n\nThis resource provides valuable information about [Resource Description].\n\nYou can access this resource by logging into your patient portal and visiting the Education Resources section.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Education",
          tags: ["Education", "Resource", "Notification"],
          createdBy: "Admin",
          createdDate: "2023-03-01",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 112,
        },
        {
          id: "template-006",
          name: "PRP Treatment Cancellation",
          subject: "Your PRP Treatment Appointment Has Been Cancelled",
          body: "Dear [Patient Name],\n\nThis is to confirm that your PRP treatment appointment scheduled for [Appointment Date] at [Appointment Time] with [Provider Name] has been cancelled as requested.\n\nIf you would like to reschedule, please contact our office at your earliest convenience.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Appointment",
          tags: ["Cancellation", "PRP", "Appointment"],
          createdBy: "Admin",
          createdDate: "2023-02-10",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 87,
        },
        {
          id: "template-007",
          name: "Insurance Verification Confirmation",
          subject: "Insurance Verification for Your PRP Treatment",
          body: "Dear [Patient Name],\n\nWe have completed the verification of your insurance coverage for your upcoming PRP treatment. Based on the information provided by your insurance company:\n\n- Coverage Status: [Coverage Status]\n- Estimated Patient Responsibility: $[Patient Responsibility]\n- Authorization Required: [Yes/No]\n- Authorization Number (if applicable): [Authorization Number]\n\nPlease note that this is an estimate based on the information provided by your insurance company and actual costs may vary. If you have any questions about your coverage, please contact our billing department.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Insurance",
          tags: ["Insurance", "Verification", "PRP"],
          createdBy: "Admin",
          createdDate: "2023-03-05",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 156,
        },
        {
          id: "template-008",
          name: "PRP Treatment Preparation Instructions",
          subject: "Preparation Instructions for Your PRP Treatment",
          body: "Dear [Patient Name],\n\nYour PRP treatment is scheduled for [Appointment Date] at [Appointment Time]. To ensure the best possible results, please follow these preparation instructions:\n\n1. Stay well hydrated for 24-48 hours before your appointment\n2. Avoid anti-inflammatory medications (e.g., ibuprofen, aspirin) for 7 days before treatment\n3. Avoid corticosteroid injections for 4 weeks before treatment\n4. Eat a normal meal before your appointment\n5. Wear comfortable clothing\n\nIf you have any questions about these instructions, please contact our office.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Treatment Information",
          tags: ["Preparation", "Instructions", "PRP"],
          createdBy: "Admin",
          createdDate: "2023-03-10",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 201,
        },
        {
          id: "template-009",
          name: "PRP Treatment Aftercare Instructions",
          subject: "Aftercare Instructions for Your PRP Treatment",
          body: "Dear [Patient Name],\n\nThank you for completing your PRP treatment with us today. To ensure optimal results and recovery, please follow these aftercare instructions:\n\n1. Avoid washing the treated area for 24 hours\n2. Avoid strenuous activities for 48-72 hours\n3. Avoid anti-inflammatory medications for 2 weeks\n4. Apply ice to the treated area for 10-15 minutes every 2-3 hours if needed for discomfort\n5. Follow any specific instructions provided by your provider\n\nIf you experience severe pain, excessive swelling, or signs of infection, please contact our office immediately.\n\nBest regards,\n[Provider Name]\n[Clinic Name]",
          type: "email",
          category: "Treatment Information",
          tags: ["Aftercare", "Instructions", "PRP"],
          createdBy: "Admin",
          createdDate: "2023-03-15",
          lastModified: "2023-03-15",
          status: "active",
          usageCount: 189,
        },
        {
          id: "template-010",
          name: "Patient Satisfaction Survey",
          subject: "Please Share Your Feedback on Your PRP Treatment Experience",
          body: "Dear [Patient Name],\n\nThank you for choosing [Clinic Name] for your PRP treatment. We value your feedback and would appreciate if you could take a few minutes to complete our patient satisfaction survey.\n\nYour responses will help us improve our services and ensure we're providing the best possible care to all our patients.\n\nPlease click the link below to access the survey:\n[Survey Link]\n\nThank you for your time and feedback.\n\nBest regards,\n[Clinic Name] Team",
          type: "email",
          category: "Survey",
          tags: ["Satisfaction", "Survey", "Feedback"],
          createdBy: "Admin",
          createdDate: "2023-03-20",
          lastModified: "2023-03-20",
          status: "active",
          usageCount: 167,
        },
        {
          id: "template-011",
          name: "PRP Treatment Results Discussion",
          subject: "Discussing Your PRP Treatment Results",
          body: "Dear [Patient Name],\n\nNow that you've completed your PRP treatment and had some time for recovery, we'd like to discuss your results and next steps.\n\nPlease schedule a follow-up appointment at your convenience to review your progress, discuss any concerns, and determine if additional treatments would be beneficial.\n\nYou can schedule your appointment by calling our office or using our online scheduling system.\n\nWe look forward to seeing you soon.\n\nBest regards,\n[Provider Name]\n[Clinic Name]",
          type: "email",
          category: "Follow-up",
          tags: ["Results", "Discussion", "Follow-up"],
          createdBy: "Admin",
          createdDate: "2023-04-01",
          lastModified: "2023-04-01",
          status: "active",
          usageCount: 98,
        },
        {
          id: "template-012",
          name: "PRP Treatment Series Completion",
          subject: "Congratulations on Completing Your PRP Treatment Series",
          body: "Dear [Patient Name],\n\nCongratulations on completing your series of PRP treatments! We hope you're pleased with the results and experiencing the benefits of the therapy.\n\nAs part of your ongoing care, we recommend scheduling a final follow-up appointment to assess your overall results and discuss any maintenance treatments that might be beneficial in the future.\n\nThank you for choosing [Clinic Name] for your regenerative medicine needs.\n\nBest regards,\n[Provider Name]\n[Clinic Name]",
          type: "email",
          category: "Follow-up",
          tags: ["Completion", "Series", "Follow-up"],
          createdBy: "Admin",
          createdDate: "2023-04-15",
          lastModified: "2023-04-15",
          status: "active",
          usageCount: 76,
        },
      ],
      portalSettings: {
        branding: {
          primaryColor: "#0070f3",
          secondaryColor: "#106cc8",
          logoUrl: "/logo.png",
          faviconUrl: "/favicon.ico",
          portalName: "TruDose Patient Portal",
        },
        features: {
          appointmentScheduling: true,
          onlinePayments: true,
          documentUpload: true,
          messagingEnabled: true,
          surveyEnabled: true,
          educationResourcesEnabled: true,
        },
        security: {
          sessionTimeoutMinutes: 30,
          passwordExpiryDays: 90,
          mfaEnabled: true,
          hipaaComplianceLevel: "full",
        },
        notifications: {
          emailEnabled: true,
          smsEnabled: true,
          pushEnabled: false,
          defaultReminderHours: 24,
        },
      },
    }
  } catch (error) {
    return rejectWithValue("Failed to fetch portal data")
  }
})

export const portalSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    resetPortal: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortalData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPortalData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.educationResources = action.payload.educationResources
        state.communicationTemplates = action.payload.communicationTemplates
      })
      .addCase(fetchPortalData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetPortal } = portalSlice.actions

export default portalSlice.reducer
