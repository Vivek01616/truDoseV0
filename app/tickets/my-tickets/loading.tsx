import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MyTicketsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-4 w-[250px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-[120px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="border rounded-md">
              <div className="h-10 border-b px-4 py-2">
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-4 w-[100px] mr-4" />
                    ))}
                </div>
              </div>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="h-16 border-b px-4 py-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-[80px] rounded-full" />
                        <Skeleton className="h-6 w-[80px] rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
