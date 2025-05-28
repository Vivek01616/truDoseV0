"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface WidgetProps {
  id: string
  title: string
  description?: string
  defaultSize?: "small" | "medium" | "large" | "full"
  defaultPosition?: number
  children: React.ReactNode
  onRemove?: (id: string) => void
  isEditing?: boolean
  className?: string
}

export function Widget({ id, title, description, children, onRemove, isEditing = false, className }: WidgetProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isDragging && "ring-2 ring-primary ring-offset-2 opacity-70",
        isEditing && "hover:shadow-md",
        className,
      )}
      data-widget-id={id}
    >
      <CardHeader className="relative pb-2">
        {isEditing && (
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move touch-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <div className={cn("flex justify-between items-start", isEditing && "pl-6")}>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {isEditing && onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Remove widget"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
