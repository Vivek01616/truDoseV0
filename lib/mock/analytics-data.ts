export interface PerformanceMetric {
  id: string
  name: string
  description: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  changePercentage: number
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  category: string
  subcategory?: string
  target?: number
  status: "above_target" | "on_target" | "below_target" | "no_target"
  lastUpdated: string
}

export interface TreatmentOutcome {
  id: string
  protocolId: string
  protocolName: string
  condition: string
  totalPatients: number
  successRate: number
  averagePainReduction: number
  averageFunctionalImprovement: number
  averagePatientSatisfaction: number
  averageRecoveryTime: number
  complicationRate: number
  returnToActivityRate: number
  followupAdherence: number
}

export interface RevenueAnalysis {
  id: string
  period: string
  totalRevenue: number
  insuranceRevenue: number
  selfPayRevenue: number
  procedureBreakdown: {
    procedureCode: string
    procedureName: string
    revenue: number
    count: number
  }[]
  clinicBreakdown: {
    clinicId: string
    clinicName: string
    revenue: number
    count: number
  }[]
  providerBreakdown: {
    providerId: string
    providerName: string
    revenue: number
    count: number
  }[]
  revenuePerPatient: number
  collectionRate: number
  denialRate: number
}

export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: "metric-001",
    name: "Treatment Volume",
    description: "Total number of PRP treatments performed",
    value: 245,
    unit: "treatments",
    trend: "up",
    changePercentage: 12.5,
    period: "monthly",
    category: "Operations",
    target: 220,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-002",
    name: "Average Treatment Success Rate",
    description: "Percentage of treatments meeting success criteria",
    value: 87.3,
    unit: "%",
    trend: "up",
    changePercentage: 3.5,
    period: "monthly",
    category: "Clinical Outcomes",
    target: 85,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-003",
    name: "Patient Satisfaction Score",
    description: "Average patient satisfaction rating (1-5 scale)",
    value: 4.7,
    unit: "rating",
    trend: "stable",
    changePercentage: 0.2,
    period: "monthly",
    category: "Patient Experience",
    target: 4.5,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-004",
    name: "Average Revenue Per Treatment",
    description: "Average revenue generated per PRP treatment",
    value: 725.5,
    unit: "USD",
    trend: "up",
    changePercentage: 5.8,
    period: "monthly",
    category: "Financial",
    target: 700,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-005",
    name: "Insurance Approval Rate",
    description: "Percentage of insurance claims approved",
    value: 68.2,
    unit: "%",
    trend: "down",
    changePercentage: 2.1,
    period: "monthly",
    category: "Financial",
    subcategory: "Insurance",
    target: 75,
    status: "below_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-006",
    name: "Average Treatment Time",
    description: "Average time to complete a PRP treatment",
    value: 42.5,
    unit: "minutes",
    trend: "down",
    changePercentage: 3.2,
    period: "monthly",
    category: "Operations",
    subcategory: "Efficiency",
    target: 45,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-007",
    name: "New Patient Acquisition",
    description: "Number of new patients receiving PRP treatment",
    value: 78,
    unit: "patients",
    trend: "up",
    changePercentage: 15.3,
    period: "monthly",
    category: "Growth",
    target: 65,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-008",
    name: "Follow-up Adherence",
    description: "Percentage of patients attending follow-up appointments",
    value: 82.7,
    unit: "%",
    trend: "up",
    changePercentage: 4.1,
    period: "monthly",
    category: "Patient Care",
    target: 80,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-009",
    name: "Complication Rate",
    description: "Percentage of treatments with reported complications",
    value: 1.2,
    unit: "%",
    trend: "down",
    changePercentage: 0.3,
    period: "monthly",
    category: "Clinical Outcomes",
    subcategory: "Safety",
    target: 2,
    status: "above_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
  {
    id: "metric-010",
    name: "Provider Certification Rate",
    description: "Percentage of providers with up-to-date certifications",
    value: 95.5,
    unit: "%",
    trend: "stable",
    changePercentage: 0.5,
    period: "monthly",
    category: "Compliance",
    target: 100,
    status: "below_target",
    lastUpdated: "2023-05-31T23:59:59Z",
  },
]

export const mockTreatmentOutcomes: TreatmentOutcome[] = [
  {
    id: "outcome-001",
    protocolId: "protocol-001",
    protocolName: "Standard PRP Protocol",
    condition: "Knee Osteoarthritis",
    totalPatients: 120,
    successRate: 87.5,
    averagePainReduction: 65.2,
    averageFunctionalImprovement: 58.7,
    averagePatientSatisfaction: 4.6,
    averageRecoveryTime: 28.5,
    complicationRate: 1.7,
    returnToActivityRate: 92.3,
    followupAdherence: 85.0,
  },
  {
    id: "outcome-002",
    protocolId: "protocol-002",
    protocolName: "Advanced PRP Protocol",
    condition: "Knee Osteoarthritis",
    totalPatients: 85,
    successRate: 92.1,
    averagePainReduction: 72.8,
    averageFunctionalImprovement: 67.3,
    averagePatientSatisfaction: 4.8,
    averageRecoveryTime: 21.3,
    complicationRate: 2.4,
    returnToActivityRate: 95.1,
    followupAdherence: 88.2,
  },
  {
    id: "outcome-003",
    protocolId: "protocol-003",
    protocolName: "Leukocyte-Rich PRP Protocol",
    condition: "Tendinopathy",
    totalPatients: 65,
    successRate: 76.9,
    averagePainReduction: 58.4,
    averageFunctionalImprovement: 52.1,
    averagePatientSatisfaction: 4.2,
    averageRecoveryTime: 32.7,
    complicationRate: 3.1,
    returnToActivityRate: 87.5,
    followupAdherence: 79.8,
  },
  {
    id: "outcome-004",
    protocolId: "protocol-004",
    protocolName: "Standard PRP Protocol",
    condition: "Plantar Fasciitis",
    totalPatients: 45,
    successRate: 86.7,
    averagePainReduction: 68.9,
    averageFunctionalImprovement: 62.5,
    averagePatientSatisfaction: 4.5,
    averageRecoveryTime: 35.2,
    complicationRate: 0.0,
    returnToActivityRate: 91.1,
    followupAdherence: 82.2,
  },
  {
    id: "outcome-005",
    protocolId: "protocol-005",
    protocolName: "Growth Factor-Enhanced PRP",
    condition: "Cartilage Defects",
    totalPatients: 30,
    successRate: 89.3,
    averagePainReduction: 70.1,
    averageFunctionalImprovement: 65.8,
    averagePatientSatisfaction: 4.7,
    averageRecoveryTime: 19.5,
    complicationRate: 3.3,
    returnToActivityRate: 93.3,
    followupAdherence: 90.0,
  },
]

export const mockRevenueAnalysis: RevenueAnalysis[] = [
  {
    id: "revenue-2023-05",
    period: "May 2023",
    totalRevenue: 178250.0,
    insuranceRevenue: 124775.0,
    selfPayRevenue: 53475.0,
    procedureBreakdown: [
      {
        procedureCode: "0232T",
        procedureName: "PRP Injection",
        revenue: 85000.0,
        count: 100,
      },
      {
        procedureCode: "20926",
        procedureName: "Tissue grafts",
        revenue: 32500.0,
        count: 50,
      },
      {
        procedureCode: "20610",
        procedureName: "Arthrocentesis, major joint",
        revenue: 17500.0,
        count: 50,
      },
      {
        procedureCode: "76942",
        procedureName: "Ultrasonic guidance",
        revenue: 12500.0,
        count: 50,
      },
      {
        procedureCode: "0481T",
        procedureName: "Autologous white blood cell concentrate",
        revenue: 19000.0,
        count: 20,
      },
      {
        procedureCode: "J7999",
        procedureName: "PRP kit",
        revenue: 11750.0,
        count: 170,
      },
    ],
    clinicBreakdown: [
      {
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        revenue: 71300.0,
        count: 85,
      },
      {
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        revenue: 53475.0,
        count: 65,
      },
      {
        clinicId: "clinic-003",
        clinicName: "South County Medical Group",
        revenue: 35650.0,
        count: 45,
      },
      {
        clinicId: "clinic-004",
        clinicName: "Downtown Wellness Center",
        revenue: 17825.0,
        count: 25,
      },
    ],
    providerBreakdown: [
      {
        providerId: "provider-001",
        providerName: "Dr. Sarah Johnson",
        revenue: 53475.0,
        count: 65,
      },
      {
        providerId: "provider-002",
        providerName: "Dr. Michael Chen",
        revenue: 44562.5,
        count: 55,
      },
      {
        providerId: "provider-003",
        providerName: "Dr. Emily Rodriguez",
        revenue: 35650.0,
        count: 45,
      },
      {
        providerId: "provider-004",
        providerName: "Dr. James Wilson",
        revenue: 26737.5,
        count: 35,
      },
      {
        providerId: "provider-005",
        providerName: "Dr. Lisa Martinez",
        revenue: 17825.0,
        count: 20,
      },
    ],
    revenuePerPatient: 1048.53,
    collectionRate: 92.5,
    denialRate: 7.5,
  },
  {
    id: "revenue-2023-04",
    period: "April 2023",
    totalRevenue: 156750.0,
    insuranceRevenue: 109725.0,
    selfPayRevenue: 47025.0,
    procedureBreakdown: [
      {
        procedureCode: "0232T",
        procedureName: "PRP Injection",
        revenue: 76500.0,
        count: 90,
      },
      {
        procedureCode: "20926",
        procedureName: "Tissue grafts",
        revenue: 26000.0,
        count: 40,
      },
      {
        procedureCode: "20610",
        procedureName: "Arthrocentesis, major joint",
        revenue: 15750.0,
        count: 45,
      },
      {
        procedureCode: "76942",
        procedureName: "Ultrasonic guidance",
        revenue: 11250.0,
        count: 45,
      },
      {
        procedureCode: "0481T",
        procedureName: "Autologous white blood cell concentrate",
        revenue: 17100.0,
        count: 18,
      },
      {
        procedureCode: "J7999",
        procedureName: "PRP kit",
        revenue: 10150.0,
        count: 148,
      },
    ],
    clinicBreakdown: [
      {
        clinicId: "clinic-001",
        clinicName: "Northwest Medical Center",
        revenue: 62700.0,
        count: 75,
      },
      {
        clinicId: "clinic-002",
        clinicName: "Eastside Health Partners",
        revenue: 47025.0,
        count: 58,
      },
      {
        clinicId: "clinic-003",
        clinicName: "South County Medical Group",
        revenue: 31350.0,
        count: 40,
      },
      {
        clinicId: "clinic-004",
        clinicName: "Downtown Wellness Center",
        revenue: 15675.0,
        count: 22,
      },
    ],
    providerBreakdown: [
      {
        providerId: "provider-001",
        providerName: "Dr. Sarah Johnson",
        revenue: 47025.0,
        count: 58,
      },
      {
        providerId: "provider-002",
        providerName: "Dr. Michael Chen",
        revenue: 39187.5,
        count: 50,
      },
      {
        providerId: "provider-003",
        providerName: "Dr. Emily Rodriguez",
        revenue: 31350.0,
        count: 40,
      },
      {
        providerId: "provider-004",
        providerName: "Dr. James Wilson",
        revenue: 23512.5,
        count: 30,
      },
      {
        providerId: "provider-005",
        providerName: "Dr. Lisa Martinez",
        revenue: 15675.0,
        count: 17,
      },
    ],
    revenuePerPatient: 1058.45,
    collectionRate: 91.2,
    denialRate: 8.8,
  },
]
