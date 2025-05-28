"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Widget } from "./widget"
import { Button } from "@/components/ui/button"
import { Plus, Save, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Define the widget configuration type
export interface WidgetConfig {
  id: string
  type: string
  size: "small" | "medium" | "large" | "full"
  position: number
  visible: boolean
}

// Define the available widget types
export interface AvailableWidget {
  type: string
  title: string
  description: string
  defaultSize: "small" | "medium" | "large" | "full"
  category: "metrics" | "charts" | "activity" | "management"
  component: React.ComponentType<any>
}

interface DashboardLayoutProps {
  availableWidgets: AvailableWidget[]
  defaultLayout?: WidgetConfig[]
  onLayoutChange?: (layout: WidgetConfig[]) => void
}

export function DashboardLayout({ availableWidgets, defaultLayout = [], onLayoutChange }: DashboardLayoutProps) {
  const [layout, setLayout] = useState<WidgetConfig[]>(defaultLayout)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load saved layout from localStorage on component mount
  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboardLayout")
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout))
      } catch (e) {
        console.error("Failed to parse saved layout", e)
      }
    } else if (defaultLayout.length > 0) {
      setLayout(defaultLayout)
    }
  }, [defaultLayout])

  // Save layout to localStorage when it changes
  useEffect(() => {
    if (layout.length > 0) {
      localStorage.setItem("dashboardLayout", JSON.stringify(layout))
      onLayoutChange?.(layout)
    }
  }, [layout, onLayoutChange])

  const handleAddWidget = (widgetType: string) => {
    const widgetToAdd = availableWidgets.find((w) => w.type === widgetType)
    if (!widgetToAdd) return

    const newWidget: WidgetConfig = {
      id: `${widgetType}-${Date.now()}`,
      type: widgetType,
      size: widgetToAdd.defaultSize,
      position: layout.length,
      visible: true,
    }

    setLayout((prev) => [...prev, newWidget])
    setIsDialogOpen(false)
  }

  const handleRemoveWidget = (widgetId: string) => {
    setLayout((prev) => prev.filter((widget) => widget.id !== widgetId))
  }

  const handleSaveLayout = () => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layout))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    // Reload the saved layout
    const savedLayout = localStorage.getItem("dashboardLayout")
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout))
      } catch (e) {
        console.error("Failed to parse saved layout", e)
      }
    }
    setIsEditing(false)
  }

  // Render the widgets based on the current layout
  const renderWidgets = () => {
    return layout
      .filter((widget) => widget.visible)
      .sort((a, b) => a.position - b.position)
      .map((widget) => {
        const widgetDef = availableWidgets.find((w) => w.type === widget.type)
        if (!widgetDef) return null

        const WidgetComponent = widgetDef.component

        return (
          <div
            key={widget.id}
            className={cn(
              "transition-all duration-200",
              widget.size === "small" && "col-span-1",
              widget.size === "medium" && "col-span-2",
              widget.size === "large" && "col-span-3",
              widget.size === "full" && "col-span-4",
            )}
          >
            <Widget
              id={widget.id}
              title={widgetDef.title}
              description={widgetDef.description}
              isEditing={isEditing}
              onRemove={handleRemoveWidget}
            >
              <WidgetComponent id={widget.id} />
            </Widget>
          </div>
        )
      })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveLayout}>
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </Button>
            </>
          ) : (
            <>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Widget
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add Widgets</DialogTitle>
                    <DialogDescription>
                      Select widgets to add to your dashboard. You can rearrange them later.
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="metrics" className="mt-4">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="charts">Charts</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="management">Management</TabsTrigger>
                    </TabsList>
                    {["metrics", "charts", "activity", "management"].map((category) => (
                      <TabsContent key={category} value={category} className="m-0">
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="grid grid-cols-2 gap-4">
                            {availableWidgets
                              .filter((widget) => widget.category === category)
                              .map((widget) => (
                                <div
                                  key={widget.type}
                                  className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                                  onClick={() => handleAddWidget(widget.type)}
                                >
                                  <h3 className="font-medium">{widget.title}</h3>
                                  <p className="text-sm text-muted-foreground">{widget.description}</p>
                                </div>
                              ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    ))}
                  </Tabs>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Customize
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{renderWidgets()}</div>

      {layout.length === 0 && (
        <div className="flex flex-col items-center justify-center border rounded-lg p-12 mt-8">
          <h3 className="text-xl font-medium mb-2">Your dashboard is empty</h3>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Add widgets to customize your dashboard with the metrics and information that matter most to you.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Widget
          </Button>
        </div>
      )}
    </div>
  )
}
