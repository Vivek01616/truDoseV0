"use client"

import { useEffect, useState } from "react"

export function HospitalMapWidget() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="h-full w-full bg-gray-200 animate-pulse rounded-md" />
      </div>
    )
  }

  // In a real implementation, this would be an interactive map
  return (
    <div className="relative h-[200px] w-full">
      <img
        src="/placeholder-kd9jq.png"
        alt="Hospital Distribution Map"
        className="h-full w-full object-cover rounded-md"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/80 p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium">24 Hospitals across 15 states</p>
          <p className="text-xs text-gray-500">87 associated clinics</p>
        </div>
      </div>
    </div>
  )
}
