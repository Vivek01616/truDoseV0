"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { MainNavigation } from "@/components/main-navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <MainNavigation />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
