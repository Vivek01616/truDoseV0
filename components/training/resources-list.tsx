"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrainingResource } from "@/lib/features/training/trainingSlice"
import { FileText, Video, FileIcon as FilePresentation, Code, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourcesListProps {
  resources: TrainingResource[]
}

export function ResourcesList({ resources }: ResourcesListProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "presentation":
        return <FilePresentation className="h-6 w-6" />
      case "interactive":
        return <Code className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "all":
        return <Badge variant="outline">All Users</Badge>
      case "certified":
        return <Badge variant="secondary">Certified Users</Badge>
      case "admin":
        return <Badge variant="default">Admins Only</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">{getResourceIcon(resource.type)}</div>
              <div>
                <CardTitle className="text-base">{resource.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{resource.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getAccessLevelBadge(resource.accessLevel)}
              <Button size="sm" variant="outline" className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <p className="text-sm text-muted-foreground">{resource.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
