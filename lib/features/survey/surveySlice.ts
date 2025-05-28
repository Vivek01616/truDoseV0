import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { msqTemplate } from "../../mock/msq-template"
import { mockSurveyResponses, mockSurveyAssignments } from "../../mock/msq-template"
import type { SurveyTemplate, SurveyResponse, SurveyAssignment } from "../../models/survey-templates"

export interface SurveyQuestion {
  id: string
  text: string
  type: "scale" | "checkbox" | "radio" | "text" | "multipleChoice" | "date"
  options?: string[]
  required: boolean
  minValue?: number
  maxValue?: number
  category?: string
}

// Define the state interface
interface SurveyState {
  templates: SurveyTemplate[]
  currentTemplate: SurveyTemplate | null
  responses: SurveyResponse[]
  assignments: SurveyAssignment[]
  loading: {
    templates: boolean
    currentTemplate: boolean
    responses: boolean
    assignments: boolean
    submission: boolean
  }
  error: {
    templates: string | null
    currentTemplate: string | null
    responses: string | null
    assignments: string | null
    submission: string | null
  }
  selectedTemplate: SurveyTemplate | null
  selectedResponse: SurveyResponse | null
  status: "idle" | "loading" | "succeeded" | "failed"
}

// Initial state
const initialState: SurveyState = {
  templates: [],
  currentTemplate: null,
  responses: [],
  assignments: [],
  loading: {
    templates: false,
    currentTemplate: false,
    responses: false,
    assignments: false,
    submission: false,
  },
  error: {
    templates: null,
    currentTemplate: null,
    responses: null,
    assignments: null,
    submission: null,
  },
  selectedTemplate: null,
  selectedResponse: null,
  status: "idle",
}

// Async thunks
export const fetchSurveyTemplates = createAsyncThunk("survey/fetchTemplates", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [msqTemplate]
  } catch (error) {
    return rejectWithValue("Failed to fetch survey templates")
  }
})

export const fetchSurveyTemplateById = createAsyncThunk(
  "survey/fetchTemplateById",
  async (id: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      if (id === msqTemplate.id) {
        return msqTemplate
      }
      return rejectWithValue("Survey template not found")
    } catch (error) {
      return rejectWithValue("Failed to fetch survey template")
    }
  },
)

export const fetchSurveyResponses = createAsyncThunk("survey/fetchResponses", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return mockSurveyResponses
  } catch (error) {
    return rejectWithValue("Failed to fetch survey responses")
  }
})

export const fetchSurveyAssignments = createAsyncThunk("survey/fetchAssignments", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 900))
    return mockSurveyAssignments
  } catch (error) {
    return rejectWithValue("Failed to fetch survey assignments")
  }
})

export const submitSurveyResponse = createAsyncThunk(
  "survey/submitResponse",
  async (response: Partial<SurveyResponse>, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newResponse: SurveyResponse = {
        id: `response-${Date.now()}`,
        templateId: response.templateId || "",
        patientId: response.patientId || "",
        completedAt: new Date().toISOString(),
        answers: response.answers || [],
        score: response.score,
        status: "complete",
      }
      return newResponse
    } catch (error) {
      return rejectWithValue("Failed to submit survey response")
    }
  },
)

export const createSurveyAssignment = createAsyncThunk(
  "survey/createAssignment",
  async (assignment: Partial<SurveyAssignment>, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newAssignment: SurveyAssignment = {
        id: `assignment-${Date.now()}`,
        templateId: assignment.templateId || "",
        patientId: assignment.patientId || "",
        assignedBy: assignment.assignedBy || "",
        assignedAt: new Date().toISOString(),
        dueDate: assignment.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending",
        protocolId: assignment.protocolId,
        repetitionCount: assignment.repetitionCount || 1,
        totalRepetitions: assignment.totalRepetitions || 1,
        nextDueDate: assignment.nextDueDate,
      }
      return newAssignment
    } catch (error) {
      return rejectWithValue("Failed to create survey assignment")
    }
  },
)

// Create the slice
const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    clearCurrentTemplate: (state) => {
      state.currentTemplate = null
    },
    clearErrors: (state) => {
      state.error = {
        templates: null,
        currentTemplate: null,
        responses: null,
        assignments: null,
        submission: null,
      }
    },
    resetSurvey: () => initialState,
    setSelectedTemplate: (state, action: PayloadAction<SurveyTemplate | null>) => {
      state.selectedTemplate = action.payload
    },
    setSelectedResponse: (state, action: PayloadAction<SurveyResponse | null>) => {
      state.selectedResponse = action.payload
    },
    addSurveyTemplate: (state, action: PayloadAction<SurveyTemplate>) => {
      state.templates.push(action.payload)
    },
    updateSurveyTemplate: (state, action: PayloadAction<SurveyTemplate>) => {
      const index = state.templates.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.templates[index] = action.payload
      }
    },
    deleteSurveyTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload)
    },
    addSurveyResponse: (state, action: PayloadAction<SurveyResponse>) => {
      state.responses.push(action.payload)
      // Update response count for the template
      // const template = state.templates.find((t) => t.id === action.payload.surveyId)
      // if (template) {
      //   template.responseCount += 1
      // }
    },
    addSurveyAssignment: (state, action: PayloadAction<SurveyAssignment>) => {
      state.assignments.push(action.payload)
    },
    updateSurveyAssignment: (state, action: PayloadAction<SurveyAssignment>) => {
      const index = state.assignments.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) {
        state.assignments[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    // Handle fetchSurveyTemplates
    builder
      .addCase(fetchSurveyTemplates.pending, (state) => {
        state.loading.templates = true
        state.error.templates = null
      })
      .addCase(fetchSurveyTemplates.fulfilled, (state, action) => {
        state.loading.templates = false
        state.templates = action.payload
      })
      .addCase(fetchSurveyTemplates.rejected, (state, action) => {
        state.loading.templates = false
        state.error.templates = action.payload as string
      })

    // Handle fetchSurveyTemplateById
    builder
      .addCase(fetchSurveyTemplateById.pending, (state) => {
        state.loading.currentTemplate = true
        state.error.currentTemplate = null
      })
      .addCase(fetchSurveyTemplateById.fulfilled, (state, action) => {
        state.loading.currentTemplate = false
        state.currentTemplate = action.payload
      })
      .addCase(fetchSurveyTemplateById.rejected, (state, action) => {
        state.loading.currentTemplate = false
        state.error.currentTemplate = action.payload as string
      })

    // Handle fetchSurveyResponses
    builder
      .addCase(fetchSurveyResponses.pending, (state) => {
        state.loading.responses = true
        state.error.responses = null
      })
      .addCase(fetchSurveyResponses.fulfilled, (state, action) => {
        state.loading.responses = false
        state.responses = action.payload
      })
      .addCase(fetchSurveyResponses.rejected, (state, action) => {
        state.loading.responses = false
        state.error.responses = action.payload as string
      })

    // Handle fetchSurveyAssignments
    builder
      .addCase(fetchSurveyAssignments.pending, (state) => {
        state.loading.assignments = true
        state.error.assignments = null
      })
      .addCase(fetchSurveyAssignments.fulfilled, (state, action) => {
        state.loading.assignments = false
        state.assignments = action.payload
      })
      .addCase(fetchSurveyAssignments.rejected, (state, action) => {
        state.loading.assignments = false
        state.error.assignments = action.payload as string
      })

    // Handle submitSurveyResponse
    builder
      .addCase(submitSurveyResponse.pending, (state) => {
        state.loading.submission = true
        state.error.submission = null
      })
      .addCase(submitSurveyResponse.fulfilled, (state, action) => {
        state.loading.submission = false
        state.responses.push(action.payload)
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        state.loading.submission = false
        state.error.submission = action.payload as string
      })

    // Handle createSurveyAssignment
    builder
      .addCase(createSurveyAssignment.pending, (state) => {
        state.loading.assignments = true
        state.error.assignments = null
      })
      .addCase(createSurveyAssignment.fulfilled, (state, action) => {
        state.loading.assignments = false
        state.assignments.push(action.payload)
      })
      .addCase(createSurveyAssignment.rejected, (state, action) => {
        state.loading.assignments = false
        state.error.assignments = action.payload as string
      })
  },
})

export const {
  clearCurrentTemplate,
  clearErrors,
  resetSurvey,
  setSelectedTemplate,
  setSelectedResponse,
  addSurveyTemplate,
  updateSurveyTemplate,
  deleteSurveyTemplate,
  addSurveyResponse,
  addSurveyAssignment,
  updateSurveyAssignment,
} = surveySlice.actions
export default surveySlice.reducer
export type { SurveyTemplate, SurveyResponse, SurveyAssignment, SurveyQuestion }
