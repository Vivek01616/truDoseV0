export interface CourseOutline {
  id: string
  courseId: string
  courseTitle: string
  version: string
  lastUpdated: string
  description: string
  learningObjectives: string[]
  prerequisites: string[]
  duration: number
  creditHours: number
  targetAudience: string[]
  sections: {
    id: string
    title: string
    description: string
    duration: number
    topics: {
      id: string
      title: string
      description: string
      duration: number
      contentType: "lecture" | "demonstration" | "hands-on" | "discussion" | "assessment"
      materials: {
        id: string
        title: string
        type: "video" | "document" | "presentation" | "quiz" | "interactive"
        url: string
        duration?: number
      }[]
    }[]
  }[]
  assessments: {
    id: string
    title: string
    description: string
    type: "quiz" | "practical" | "case-study" | "final-exam"
    passingScore: number
    questions?: number
    duration?: number
  }[]
  instructors: {
    id: string
    name: string
    title: string
    bio: string
    expertise: string[]
  }[]
}

export interface TrainingSession {
  id: string
  courseId: string
  courseTitle: string
  startDate: string
  endDate: string
  location: string
  instructor: string
  maxAttendees: number
  enrolledAttendees: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  attendees: {
    userId: string
    name: string
    email: string
    role: string
    clinic: string
    registrationDate: string
    attendance: "registered" | "attended" | "partial" | "no-show" | "cancelled"
    completionStatus?: "completed" | "incomplete" | "failed"
    score?: number
  }[]
  materials: {
    id: string
    title: string
    type: "handout" | "presentation" | "reference" | "exercise"
    url: string
  }[]
  feedback?: {
    averageRating: number
    responseRate: number
    strengths: string[]
    areasForImprovement: string[]
  }
}

export interface CertificationRequirement {
  id: string
  certificationType: string
  description: string
  requiredCourses: {
    courseId: string
    courseTitle: string
    minimumScore: number
  }[]
  additionalRequirements: string[]
  renewalPeriod: number
  renewalRequirements: string[]
  issuingAuthority: string
  certificationProcess: string[]
}

export const mockCourseOutlines: CourseOutline[] = [
  {
    id: "outline-001",
    courseId: "course-001",
    courseTitle: "PRP Fundamentals",
    version: "2.1",
    lastUpdated: "2023-03-15",
    description: "Introduction to platelet-rich plasma therapy principles and applications",
    learningObjectives: [
      "Understand the biological basis of PRP therapy",
      "Learn standard PRP preparation techniques",
      "Identify appropriate clinical applications for PRP",
      "Understand patient selection criteria",
      "Learn proper documentation and follow-up procedures",
    ],
    prerequisites: [],
    duration: 8,
    creditHours: 8,
    targetAudience: ["Physicians", "Physician Assistants", "Nurse Practitioners", "Nurses", "Technicians"],
    sections: [
      {
        id: "section-001",
        title: "Introduction to PRP",
        description: "Overview of platelet-rich plasma and its components",
        duration: 1,
        topics: [
          {
            id: "topic-001",
            title: "Biological Basis of PRP",
            description: "Understanding platelets, growth factors, and healing mechanisms",
            duration: 30,
            contentType: "lecture",
            materials: [
              {
                id: "material-001",
                title: "PRP Biology Presentation",
                type: "presentation",
                url: "/training/materials/prp-biology-presentation.pptx",
                duration: 25,
              },
              {
                id: "material-002",
                title: "Growth Factors in PRP",
                type: "document",
                url: "/training/materials/growth-factors-reference.pdf",
              },
            ],
          },
          {
            id: "topic-002",
            title: "History and Evolution of PRP",
            description: "Development of PRP therapy and evidence base",
            duration: 30,
            contentType: "lecture",
            materials: [
              {
                id: "material-003",
                title: "Evolution of PRP Therapy",
                type: "video",
                url: "/training/materials/prp-evolution-video.mp4",
                duration: 20,
              },
              {
                id: "material-004",
                title: "PRP Research Timeline",
                type: "document",
                url: "/training/materials/prp-research-timeline.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-002",
        title: "PRP Preparation Techniques",
        description: "Methods for preparing platelet-rich plasma",
        duration: 2,
        topics: [
          {
            id: "topic-003",
            title: "Blood Collection Techniques",
            description: "Proper venipuncture and sample collection",
            duration: 30,
            contentType: "demonstration",
            materials: [
              {
                id: "material-005",
                title: "Blood Collection Demonstration",
                type: "video",
                url: "/training/materials/blood-collection-demo.mp4",
                duration: 15,
              },
              {
                id: "material-006",
                title: "Venipuncture Guide",
                type: "document",
                url: "/training/materials/venipuncture-guide.pdf",
              },
            ],
          },
          {
            id: "topic-004",
            title: "Centrifugation Protocols",
            description: "Standard centrifugation settings and techniques",
            duration: 45,
            contentType: "demonstration",
            materials: [
              {
                id: "material-007",
                title: "Centrifugation Protocol Demonstration",
                type: "video",
                url: "/training/materials/centrifugation-demo.mp4",
                duration: 20,
              },
              {
                id: "material-008",
                title: "Centrifugation Parameters Guide",
                type: "document",
                url: "/training/materials/centrifugation-parameters.pdf",
              },
            ],
          },
          {
            id: "topic-005",
            title: "PRP Extraction and Handling",
            description: "Techniques for extracting and handling PRP",
            duration: 45,
            contentType: "hands-on",
            materials: [
              {
                id: "material-009",
                title: "PRP Extraction Demonstration",
                type: "video",
                url: "/training/materials/prp-extraction-demo.mp4",
                duration: 15,
              },
              {
                id: "material-010",
                title: "Hands-on Exercise Guide",
                type: "document",
                url: "/training/materials/extraction-exercise.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-003",
        title: "Clinical Applications",
        description: "Common clinical applications for PRP therapy",
        duration: 3,
        topics: [
          {
            id: "topic-006",
            title: "Musculoskeletal Applications",
            description: "PRP for joint, tendon, and muscle conditions",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-011",
                title: "Musculoskeletal Applications Presentation",
                type: "presentation",
                url: "/training/materials/musculoskeletal-applications.pptx",
                duration: 45,
              },
              {
                id: "material-012",
                title: "Case Studies: Musculoskeletal",
                type: "document",
                url: "/training/materials/musculoskeletal-cases.pdf",
              },
            ],
          },
          {
            id: "topic-007",
            title: "Dermatological Applications",
            description: "PRP for skin rejuvenation and hair restoration",
            duration: 45,
            contentType: "lecture",
            materials: [
              {
                id: "material-013",
                title: "Dermatological Applications Presentation",
                type: "presentation",
                url: "/training/materials/dermatological-applications.pptx",
                duration: 30,
              },
              {
                id: "material-014",
                title: "Case Studies: Dermatological",
                type: "document",
                url: "/training/materials/dermatological-cases.pdf",
              },
            ],
          },
          {
            id: "topic-008",
            title: "Dental Applications",
            description: "PRP in dental and oral surgery",
            duration: 30,
            contentType: "lecture",
            materials: [
              {
                id: "material-015",
                title: "Dental Applications Overview",
                type: "presentation",
                url: "/training/materials/dental-applications.pptx",
                duration: 20,
              },
            ],
          },
          {
            id: "topic-009",
            title: "Evidence-Based Practice",
            description: "Current evidence and research for PRP applications",
            duration: 45,
            contentType: "discussion",
            materials: [
              {
                id: "material-016",
                title: "PRP Research Review",
                type: "document",
                url: "/training/materials/prp-research-review.pdf",
              },
              {
                id: "material-017",
                title: "Discussion Questions",
                type: "document",
                url: "/training/materials/evidence-discussion-questions.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-004",
        title: "Patient Selection",
        description: "Criteria for selecting appropriate patients for PRP therapy",
        duration: 1,
        topics: [
          {
            id: "topic-010",
            title: "Indications and Contraindications",
            description: "When to use and when to avoid PRP therapy",
            duration: 30,
            contentType: "lecture",
            materials: [
              {
                id: "material-018",
                title: "Indications and Contraindications Presentation",
                type: "presentation",
                url: "/training/materials/indications-contraindications.pptx",
                duration: 25,
              },
              {
                id: "material-019",
                title: "Patient Screening Checklist",
                type: "document",
                url: "/training/materials/patient-screening-checklist.pdf",
              },
            ],
          },
          {
            id: "topic-011",
            title: "Patient Consultation",
            description: "Conducting effective patient consultations for PRP",
            duration: 30,
            contentType: "demonstration",
            materials: [
              {
                id: "material-020",
                title: "Patient Consultation Demonstration",
                type: "video",
                url: "/training/materials/patient-consultation-demo.mp4",
                duration: 20,
              },
              {
                id: "material-021",
                title: "Consultation Guide",
                type: "document",
                url: "/training/materials/consultation-guide.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-005",
        title: "Assessment and Certification",
        description: "Final assessment and certification process",
        duration: 1,
        topics: [
          {
            id: "topic-012",
            title: "Knowledge Assessment",
            description: "Comprehensive assessment of course material",
            duration: 45,
            contentType: "assessment",
            materials: [
              {
                id: "material-022",
                title: "Final Exam",
                type: "quiz",
                url: "/training/materials/final-exam.html",
                duration: 45,
              },
            ],
          },
          {
            id: "topic-013",
            title: "Certification Process",
            description: "Overview of certification requirements and process",
            duration: 15,
            contentType: "lecture",
            materials: [
              {
                id: "material-023",
                title: "Certification Requirements",
                type: "document",
                url: "/training/materials/certification-requirements.pdf",
              },
            ],
          },
        ],
      },
    ],
    assessments: [
      {
        id: "assessment-001",
        title: "PRP Fundamentals Final Exam",
        description: "Comprehensive assessment of course material",
        type: "final-exam",
        passingScore: 80,
        questions: 50,
        duration: 60,
      },
      {
        id: "assessment-002",
        title: "PRP Preparation Practical Assessment",
        description: "Hands-on assessment of PRP preparation techniques",
        type: "practical",
        passingScore: 85,
      },
    ],
    instructors: [
      {
        id: "instructor-001",
        name: "Dr. Sarah Johnson",
        title: "Director of Regenerative Medicine",
        bio: "Dr. Johnson is a board-certified orthopedic surgeon with over 15 years of experience in regenerative medicine.",
        expertise: ["Orthopedics", "Regenerative Medicine", "PRP Therapy", "Research"],
      },
      {
        id: "instructor-002",
        name: "Dr. Michael Chen",
        title: "Clinical Research Director",
        bio: "Dr. Chen specializes in clinical research and has published extensively on PRP applications.",
        expertise: ["Clinical Research", "Evidence-Based Medicine", "PRP Applications"],
      },
    ],
  },
  {
    id: "outline-002",
    courseId: "course-002",
    courseTitle: "Advanced PRP Techniques",
    version: "1.5",
    lastUpdated: "2023-04-10",
    description: "Advanced techniques for platelet-rich plasma preparation and application",
    learningObjectives: [
      "Master advanced PRP preparation methods",
      "Understand leukocyte-rich vs. leukocyte-poor PRP",
      "Learn techniques for enhancing growth factor content",
      "Develop skills for specialized application techniques",
      "Understand quality control measures for PRP",
    ],
    prerequisites: ["PRP Fundamentals"],
    duration: 16,
    creditHours: 16,
    targetAudience: ["Physicians", "Physician Assistants", "Nurse Practitioners"],
    sections: [
      {
        id: "section-006",
        title: "Advanced Preparation Techniques",
        description: "Specialized methods for PRP preparation",
        duration: 4,
        topics: [
          {
            id: "topic-014",
            title: "Dual-Spin Techniques",
            description: "Advanced centrifugation protocols using dual-spin methods",
            duration: 60,
            contentType: "demonstration",
            materials: [
              {
                id: "material-024",
                title: "Dual-Spin Protocol Demonstration",
                type: "video",
                url: "/training/materials/dual-spin-demo.mp4",
                duration: 30,
              },
              {
                id: "material-025",
                title: "Dual-Spin Protocol Guide",
                type: "document",
                url: "/training/materials/dual-spin-protocol.pdf",
              },
            ],
          },
          {
            id: "topic-015",
            title: "Platelet Concentration Optimization",
            description: "Techniques for optimizing platelet concentration",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-026",
                title: "Platelet Concentration Presentation",
                type: "presentation",
                url: "/training/materials/platelet-concentration.pptx",
                duration: 45,
              },
              {
                id: "material-027",
                title: "Optimization Techniques Guide",
                type: "document",
                url: "/training/materials/optimization-techniques.pdf",
              },
            ],
          },
          {
            id: "topic-016",
            title: "Quality Control Measures",
            description: "Methods for ensuring PRP quality and consistency",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-028",
                title: "Quality Control Presentation",
                type: "presentation",
                url: "/training/materials/quality-control.pptx",
                duration: 45,
              },
              {
                id: "material-029",
                title: "Quality Control Checklist",
                type: "document",
                url: "/training/materials/quality-control-checklist.pdf",
              },
            ],
          },
          {
            id: "topic-017",
            title: "Hands-on Practice: Advanced Preparation",
            description: "Supervised practice of advanced preparation techniques",
            duration: 60,
            contentType: "hands-on",
            materials: [
              {
                id: "material-030",
                title: "Advanced Preparation Exercise Guide",
                type: "document",
                url: "/training/materials/advanced-preparation-exercise.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-007",
        title: "Leukocyte-Rich PRP",
        description: "Preparation and application of leukocyte-rich PRP",
        duration: 4,
        topics: [
          {
            id: "topic-018",
            title: "Leukocyte-Rich vs. Leukocyte-Poor PRP",
            description: "Understanding the differences and clinical implications",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-031",
                title: "Leukocyte Content Presentation",
                type: "presentation",
                url: "/training/materials/leukocyte-content.pptx",
                duration: 45,
              },
              {
                id: "material-032",
                title: "Comparative Analysis",
                type: "document",
                url: "/training/materials/leukocyte-comparative-analysis.pdf",
              },
            ],
          },
          {
            id: "topic-019",
            title: "Preparation Techniques for L-PRP",
            description: "Specific techniques for leukocyte-rich PRP preparation",
            duration: 60,
            contentType: "demonstration",
            materials: [
              {
                id: "material-033",
                title: "L-PRP Preparation Demonstration",
                type: "video",
                url: "/training/materials/l-prp-preparation-demo.mp4",
                duration: 30,
              },
              {
                id: "material-034",
                title: "L-PRP Protocol Guide",
                type: "document",
                url: "/training/materials/l-prp-protocol.pdf",
              },
            ],
          },
          {
            id: "topic-020",
            title: "Clinical Applications for L-PRP",
            description: "Specific clinical scenarios for leukocyte-rich PRP",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-035",
                title: "L-PRP Applications Presentation",
                type: "presentation",
                url: "/training/materials/l-prp-applications.pptx",
                duration: 45,
              },
              {
                id: "material-036",
                title: "L-PRP Case Studies",
                type: "document",
                url: "/training/materials/l-prp-case-studies.pdf",
              },
            ],
          },
          {
            id: "topic-021",
            title: "Hands-on Practice: L-PRP",
            description: "Supervised practice of L-PRP preparation",
            duration: 60,
            contentType: "hands-on",
            materials: [
              {
                id: "material-037",
                title: "L-PRP Exercise Guide",
                type: "document",
                url: "/training/materials/l-prp-exercise.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-008",
        title: "Growth Factor Enhancement",
        description: "Methods for enhancing growth factor content in PRP",
        duration: 4,
        topics: [
          {
            id: "topic-022",
            title: "Growth Factor Biology",
            description: "Advanced understanding of growth factors in PRP",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-038",
                title: "Growth Factor Biology Presentation",
                type: "presentation",
                url: "/training/materials/growth-factor-biology.pptx",
                duration: 45,
              },
              {
                id: "material-039",
                title: "Growth Factor Reference Guide",
                type: "document",
                url: "/training/materials/growth-factor-reference.pdf",
              },
            ],
          },
          {
            id: "topic-023",
            title: "Activation Techniques",
            description: "Methods for activating platelets and releasing growth factors",
            duration: 60,
            contentType: "demonstration",
            materials: [
              {
                id: "material-040",
                title: "Activation Techniques Demonstration",
                type: "video",
                url: "/training/materials/activation-techniques-demo.mp4",
                duration: 30,
              },
              {
                id: "material-041",
                title: "Activation Protocol Guide",
                type: "document",
                url: "/training/materials/activation-protocol.pdf",
              },
            ],
          },
          {
            id: "topic-024",
            title: "Combination Approaches",
            description: "Combining PRP with other biologics for enhanced effect",
            duration: 60,
            contentType: "lecture",
            materials: [
              {
                id: "material-042",
                title: "Combination Approaches Presentation",
                type: "presentation",
                url: "/training/materials/combination-approaches.pptx",
                duration: 45,
              },
              {
                id: "material-043",
                title: "Combination Protocol Guide",
                type: "document",
                url: "/training/materials/combination-protocol.pdf",
              },
            ],
          },
          {
            id: "topic-025",
            title: "Hands-on Practice: Growth Factor Enhancement",
            description: "Supervised practice of enhancement techniques",
            duration: 60,
            contentType: "hands-on",
            materials: [
              {
                id: "material-044",
                title: "Enhancement Exercise Guide",
                type: "document",
                url: "/training/materials/enhancement-exercise.pdf",
              },
            ],
          },
        ],
      },
      {
        id: "section-009",
        title: "Hands-on Workshop",
        description: "Practical application of advanced PRP techniques",
        duration: 4,
        topics: [
          {
            id: "topic-026",
            title: "Case-Based Applications",
            description: "Applying advanced techniques to specific clinical cases",
            duration: 90,
            contentType: "hands-on",
            materials: [
              {
                id: "material-045",
                title: "Case Scenarios",
                type: "document",
                url: "/training/materials/case-scenarios.pdf",
              },
              {
                id: "material-046",
                title: "Application Guidelines",
                type: "document",
                url: "/training/materials/application-guidelines.pdf",
              },
            ],
          },
          {
            id: "topic-027",
            title: "Injection Techniques",
            description: "Advanced injection techniques for various applications",
            duration: 90,
            contentType: "hands-on",
            materials: [
              {
                id: "material-047",
                title: "Injection Techniques Demonstration",
                type: "video",
                url: "/training/materials/injection-techniques-demo.mp4",
                duration: 30,
              },
              {
                id: "material-048",
                title: "Injection Techniques Guide",
                type: "document",
                url: "/training/materials/injection-techniques.pdf",
              },
            ],
          },
          {
            id: "topic-028",
            title: "Practical Assessment",
            description: "Hands-on assessment of advanced techniques",
            duration: 60,
            contentType: "assessment",
            materials: [
              {
                id: "material-049",
                title: "Practical Assessment Guide",
                type: "document",
                url: "/training/materials/practical-assessment.pdf",
              },
            ],
          },
        ],
      },
    ],
    assessments: [
      {
        id: "assessment-003",
        title: "Advanced PRP Techniques Written Exam",
        description: "Comprehensive assessment of advanced PRP knowledge",
        type: "final-exam",
        passingScore: 85,
        questions: 75,
        duration: 90,
      },
      {
        id: "assessment-004",
        title: "Advanced Preparation Practical Assessment",
        description: "Hands-on assessment of advanced preparation techniques",
        type: "practical",
        passingScore: 90,
      },
      {
        id: "assessment-005",
        title: "Clinical Application Case Study",
        description: "Case-based assessment of clinical decision-making",
        type: "case-study",
        passingScore: 85,
      },
    ],
    instructors: [
      {
        id: "instructor-001",
        name: "Dr. Sarah Johnson",
        title: "Director of Regenerative Medicine",
        bio: "Dr. Johnson is a board-certified orthopedic surgeon with over 15 years of experience in regenerative medicine.",
        expertise: ["Orthopedics", "Regenerative Medicine", "PRP Therapy", "Research"],
      },
      {
        id: "instructor-002",
        name: "Dr. Michael Chen",
        title: "Clinical Research Director",
        bio: "Dr. Chen specializes in clinical research and has published extensively on PRP applications.",
        expertise: ["Clinical Research", "Evidence-Based Medicine", "PRP Applications"],
      },
      {
        id: "instructor-003",
        name: "Dr. Emily Rodriguez",
        title: "Advanced Techniques Specialist",
        bio: "Dr. Rodriguez has pioneered several advanced PRP preparation and application techniques.",
        expertise: ["Advanced PRP Techniques", "Growth Factor Enhancement", "Clinical Applications"],
      },
    ],
  },
]

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: "session-001",
    courseId: "course-002",
    courseTitle: "Advanced PRP Techniques",
    startDate: "2023-06-15T09:00:00Z",
    endDate: "2023-06-16T17:00:00Z",
    location: "Northwest Medical Center, Conference Room A",
    instructor: "Dr. Michael Chen",
    maxAttendees: 20,
    enrolledAttendees: 15,
    status: "scheduled",
    attendees: [
      {
        userId: "user-001",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "Provider",
        clinic: "Northwest Medical Center",
        registrationDate: "2023-05-01T10:15:00Z",
        attendance: "registered",
      },
      {
        userId: "user-003",
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        role: "Provider",
        clinic: "Eastside Health Partners",
        registrationDate: "2023-05-02T14:30:00Z",
        attendance: "registered",
      },
      {
        userId: "user-004",
        name: "Dr. James Wilson",
        email: "james.wilson@example.com",
        role: "Provider",
        clinic: "South County Medical Group",
        registrationDate: "2023-05-03T09:45:00Z",
        attendance: "registered",
      },
      {
        userId: "user-005",
        name: "Dr. Lisa Martinez",
        email: "lisa.martinez@example.com",
        role: "Provider",
        clinic: "Downtown Wellness Center",
        registrationDate: "2023-05-05T11:20:00Z",
        attendance: "registered",
      },
      {
        userId: "user-011",
        name: "Dr. Robert Kim",
        email: "robert.kim@example.com",
        role: "Provider",
        clinic: "Northwest Medical Center",
        registrationDate: "2023-05-10T15:30:00Z",
        attendance: "registered",
      },
    ],
    materials: [
      {
        id: "session-material-001",
        title: "Advanced PRP Techniques Workbook",
        type: "handout",
        url: "/training/sessions/advanced-prp-workbook.pdf",
      },
      {
        id: "session-material-002",
        title: "Course Presentation Slides",
        type: "presentation",
        url: "/training/sessions/advanced-prp-slides.pdf",
      },
      {
        id: "session-material-003",
        title: "Practical Exercise Guide",
        type: "exercise",
        url: "/training/sessions/practical-exercise-guide.pdf",
      },
      {
        id: "session-material-004",
        title: "Reference Materials",
        type: "reference",
        url: "/training/sessions/advanced-prp-references.pdf",
      },
    ],
  },
  {
    id: "session-002",
    courseId: "course-001",
    courseTitle: "PRP Fundamentals",
    startDate: "2023-05-10T09:00:00Z",
    endDate: "2023-05-10T17:00:00Z",
    location: "Eastside Health Partners, Training Room B",
    instructor: "Dr. Sarah Johnson",
    maxAttendees: 25,
    enrolledAttendees: 22,
    status: "completed",
    attendees: [
      {
        userId: "user-012",
        name: "Dr. Thomas Brown",
        email: "thomas.brown@example.com",
        role: "Provider",
        clinic: "Eastside Health Partners",
        registrationDate: "2023-04-15T10:30:00Z",
        attendance: "attended",
        completionStatus: "completed",
        score: 92,
      },
      {
        userId: "user-013",
        name: "Dr. Jennifer Lee",
        email: "jennifer.lee@example.com",
        role: "Provider",
        clinic: "Northwest Medical Center",
        registrationDate: "2023-04-16T14:15:00Z",
        attendance: "attended",
        completionStatus: "completed",
        score: 88,
      },
      {
        userId: "user-014",
        name: "Dr. David Anderson",
        email: "david.anderson@example.com",
        role: "Provider",
        clinic: "South County Medical Group",
        registrationDate: "2023-04-18T09:20:00Z",
        attendance: "attended",
        completionStatus: "completed",
        score: 95,
      },
      {
        userId: "user-015",
        name: "Dr. Patricia White",
        email: "patricia.white@example.com",
        role: "Provider",
        clinic: "Downtown Wellness Center",
        registrationDate: "2023-04-20T11:45:00Z",
        attendance: "attended",
        completionStatus: "completed",
        score: 90,
      },
      {
        userId: "user-016",
        name: "Dr. Michael Wilson",
        email: "michael.wilson@example.com",
        role: "Provider",
        clinic: "Eastside Health Partners",
        registrationDate: "2023-04-22T15:10:00Z",
        attendance: "no-show",
      },
    ],
    materials: [
      {
        id: "session-material-005",
        title: "PRP Fundamentals Workbook",
        type: "handout",
        url: "/training/sessions/prp-fundamentals-workbook.pdf",
      },
      {
        id: "session-material-006",
        title: "Course Presentation Slides",
        type: "presentation",
        url: "/training/sessions/prp-fundamentals-slides.pdf",
      },
      {
        id: "session-material-007",
        title: "Practical Exercise Guide",
        type: "exercise",
        url: "/training/sessions/fundamentals-exercise-guide.pdf",
      },
      {
        id: "session-material-008",
        title: "Reference Materials",
        type: "reference",
        url: "/training/sessions/prp-fundamentals-references.pdf",
      },
    ],
    feedback: {
      averageRating: 4.7,
      responseRate: 85,
      strengths: [
        "Clear explanations of biological principles",
        "Excellent hands-on demonstrations",
        "Comprehensive coverage of clinical applications",
        "Well-organized course materials",
      ],
      areasForImprovement: [
        "More time for hands-on practice",
        "Additional case studies would be helpful",
        "More detailed coverage of contraindications",
      ],
    },
  },
  {
    id: "session-003",
    courseId: "course-004",
    courseTitle: "PRP in Aesthetic Medicine",
    startDate: "2023-07-10T09:00:00Z",
    endDate: "2023-07-10T17:00:00Z",
    location: "Downtown Wellness Center, Conference Room C",
    instructor: "Dr. Lisa Martinez",
    maxAttendees: 15,
    enrolledAttendees: 8,
    status: "scheduled",
    attendees: [
      {
        userId: "user-003",
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        role: "Provider",
        clinic: "Eastside Health Partners",
        registrationDate: "2023-05-15T10:30:00Z",
        attendance: "registered",
      },
      {
        userId: "user-013",
        name: "Dr. Jennifer Lee",
        email: "jennifer.lee@example.com",
        role: "Provider",
        clinic: "Northwest Medical Center",
        registrationDate: "2023-05-16T14:15:00Z",
        attendance: "registered",
      },
      {
        userId: "user-015",
        name: "Dr. Patricia White",
        email: "patricia.white@example.com",
        role: "Provider",
        clinic: "Downtown Wellness Center",
        registrationDate: "2023-05-18T11:45:00Z",
        attendance: "registered",
      },
    ],
    materials: [
      {
        id: "session-material-009",
        title: "PRP in Aesthetic Medicine Workbook",
        type: "handout",
        url: "/training/sessions/prp-aesthetic-workbook.pdf",
      },
      {
        id: "session-material-010",
        title: "Course Presentation Slides",
        type: "presentation",
        url: "/training/sessions/prp-aesthetic-slides.pdf",
      },
      {
        id: "session-material-011",
        title: "Practical Exercise Guide",
        type: "exercise",
        url: "/training/sessions/aesthetic-exercise-guide.pdf",
      },
      {
        id: "session-material-012",
        title: "Reference Materials",
        type: "reference",
        url: "/training/sessions/prp-aesthetic-references.pdf",
      },
    ],
  },
]

export const mockCertificationRequirements: CertificationRequirement[] = [
  {
    id: "cert-req-001",
    certificationType: "Standard PRP Administration",
    description: "Basic certification for standard PRP preparation and administration",
    requiredCourses: [
      {
        courseId: "course-001",
        courseTitle: "PRP Fundamentals",
        minimumScore: 80,
      },
    ],
    additionalRequirements: [
      "Completion of at least 5 supervised PRP procedures",
      "Current medical license in good standing",
    ],
    renewalPeriod: 24,
    renewalRequirements: [
      "Completion of 4 hours of PRP-related continuing education",
      "Documentation of at least 10 PRP procedures performed in the renewal period",
    ],
    issuingAuthority: "American Academy of Regenerative Medicine",
    certificationProcess: [
      "Complete required course(s) with minimum score",
      "Submit documentation of supervised procedures",
      "Submit copy of current medical license",
      "Pay certification fee",
      "Receive certificate within 2-4 weeks of approval",
    ],
  },
  {
    id: "cert-req-002",
    certificationType: "Advanced PRP Administration",
    description: "Advanced certification for specialized PRP techniques and applications",
    requiredCourses: [
      {
        courseId: "course-001",
        courseTitle: "PRP Fundamentals",
        minimumScore: 85,
      },
      {
        courseId: "course-002",
        courseTitle: "Advanced PRP Techniques",
        minimumScore: 85,
      },
    ],
    additionalRequirements: [
      "Current Standard PRP Administration certification",
      "Completion of at least 20 documented PRP procedures",
      "Current medical license in good standing",
    ],
    renewalPeriod: 24,
    renewalRequirements: [
      "Completion of 8 hours of advanced PRP-related continuing education",
      "Documentation of at least 30 PRP procedures performed in the renewal period",
      "Submission of 2 case studies demonstrating advanced techniques",
    ],
    issuingAuthority: "American Academy of Regenerative Medicine",
    certificationProcess: [
      "Complete required courses with minimum scores",
      "Submit documentation of previous procedures",
      "Submit copy of current medical license",
      "Submit copy of Standard PRP Administration certificate",
      "Pay certification fee",
      "Receive certificate within 2-4 weeks of approval",
    ],
  },
  {
    id: "cert-req-003",
    certificationType: "PRP in Aesthetic Medicine",
    description: "Specialized certification for PRP applications in aesthetic and dermatological procedures",
    requiredCourses: [
      {
        courseId: "course-001",
        courseTitle: "PRP Fundamentals",
        minimumScore: 80,
      },
      {
        courseId: "course-004",
        courseTitle: "PRP in Aesthetic Medicine",
        minimumScore: 85,
      },
    ],
    additionalRequirements: [
      "Current medical license in good standing",
      "Completion of at least 10 supervised aesthetic PRP procedures",
      "Background in dermatology, plastic surgery, or aesthetic medicine",
    ],
    renewalPeriod: 24,
    renewalRequirements: [
      "Completion of 6 hours of aesthetic PRP-related continuing education",
      "Documentation of at least 20 aesthetic PRP procedures performed in the renewal period",
      "Submission of before/after documentation for at least 5 cases",
    ],
    issuingAuthority: "American Society for Aesthetic Regenerative Medicine",
    certificationProcess: [
      "Complete required courses with minimum scores",
      "Submit documentation of supervised procedures",
      "Submit copy of current medical license",
      "Submit proof of background in relevant specialty",
      "Pay certification fee",
      "Receive certificate within 2-4 weeks of approval",
    ],
  },
  {
    id: "cert-req-004",
    certificationType: "PRP in Orthopedics",
    description: "Specialized certification for PRP applications in orthopedic procedures",
    requiredCourses: [
      {
        courseId: "course-001",
        courseTitle: "PRP Fundamentals",
        minimumScore: 80,
      },
      {
        courseId: "course-003",
        courseTitle: "PRP in Orthopedics",
        minimumScore: 85,
      },
    ],
    additionalRequirements: [
      "Current medical license in good standing",
      "Completion of at least 15 supervised orthopedic PRP procedures",
      "Background in orthopedics, sports medicine, or physical medicine",
    ],
    renewalPeriod: 24,
    renewalRequirements: [
      "Completion of 8 hours of orthopedic PRP-related continuing education",
      "Documentation of at least 25 orthopedic PRP procedures performed in the renewal period",
      "Submission of outcome data for at least 10 cases",
    ],
    issuingAuthority: "American Academy of Regenerative Orthopedics",
    certificationProcess: [
      "Complete required courses with minimum scores",
      "Submit documentation of supervised procedures",
      "Submit copy of current medical license",
      "Submit proof of background in relevant specialty",
      "Pay certification fee",
      "Receive certificate within 2-4 weeks of approval",
    ],
  },
  {
    id: "cert-req-005",
    certificationType: "PRP Technician",
    description: "Certification for technical staff involved in PRP preparation",
    requiredCourses: [
      {
        courseId: "course-005",
        courseTitle: "PRP Preparation for Technicians",
        minimumScore: 85,
      },
    ],
    additionalRequirements: [
      "Completion of at least 20 supervised PRP preparations",
      "Current employment in a medical facility offering PRP treatments",
      "High school diploma or equivalent",
    ],
    renewalPeriod: 24,
    renewalRequirements: [
      "Completion of 4 hours of PRP-related continuing education",
      "Documentation of at least 50 PRP preparations performed in the renewal period",
      "Continued employment in a medical facility offering PRP treatments",
    ],
    issuingAuthority: "American Academy of Regenerative Medicine",
    certificationProcess: [
      "Complete required course with minimum score",
      "Submit documentation of supervised preparations",
      "Submit proof of current employment",
      "Submit copy of educational credentials",
      "Pay certification fee",
      "Receive certificate within 2-4 weeks of approval",
    ],
  },
]
