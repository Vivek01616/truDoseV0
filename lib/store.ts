import { configureStore } from "@reduxjs/toolkit"
import patientReducer from "./features/patient/patientSlice"
import providerReducer from "./features/provider/providerSlice"
import deviceReducer from "./features/device/deviceSlice"
import clinicReducer from "./features/clinic/clinicSlice"
import protocolReducer from "./features/protocol/protocolSlice"
import billingReducer from "./features/billing/billingSlice"
import analyticsReducer from "./features/analytics/analyticsSlice"
import remoteReducer from "./features/remote/remoteSlice"
import portalReducer from "./features/portal/portalSlice"
import trainingReducer from "./features/training/trainingSlice"
import dashboardReducer from "./features/dashboard/dashboardSlice"
import qualityReducer from "./features/quality/qualitySlice"
import ticketReducer from "./features/ticket/ticketSlice"
import surveyReducer from "./features/survey/surveySlice"
import securityReducer from "./features/security/securitySlice"

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    provider: providerReducer,
    device: deviceReducer,
    clinic: clinicReducer,
    protocol: protocolReducer,
    billing: billingReducer,
    analytics: analyticsReducer,
    remote: remoteReducer,
    portal: portalReducer,
    training: trainingReducer,
    dashboard: dashboardReducer,
    quality: qualityReducer,
    ticket: ticketReducer,
    survey: surveyReducer,
    security: securityReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
