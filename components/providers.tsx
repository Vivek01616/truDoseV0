"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  )
}
