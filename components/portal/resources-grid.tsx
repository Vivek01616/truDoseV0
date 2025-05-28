"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EducationResource } from "@/lib/features/portal/portalSlice"
import { FileText, Video, ImageIcon, FileCode, Eye, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ResourcesGridProps {
  resources: EducationResource[]
}

export function ResourcesGrid({ resources }: ResourcesGridProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "infographic":
        return <ImageIcon className="h-6 w-6" />
      case "document":
        return <FileText className="h-6 w-6" />
      default:
        return <FileCode className="h-6 w-6" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {getResourceIcon(resource.type)}
                <Badge variant="outline">{resource.type}</Badge>
              </div>
              {getStatusBadge(resource.status)}
            </div>
            <CardTitle className="mt-2">{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDistanceToNow(new Date(resource.lastModified), { addSuffix: true })}
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              {resource.viewCount} views
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
