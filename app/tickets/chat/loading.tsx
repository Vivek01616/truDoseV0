import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SupportChatLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 py-2">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-0.5 mt-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-3 w-[40px]" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-[60px] rounded-full" />
                          <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="px-6 py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-3 w-[180px] mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                  ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="space-y-4">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className="flex gap-3 max-w-[80%]">
                      {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                      <div className={`space-y-1 ${i % 2 === 0 ? "order-last" : "order-first"}`}>
                        <Skeleton
                          className={`h-16 w-[200px] rounded-lg ${i % 2 === 0 ? "bg-muted" : "bg-primary/20"}`}
                        />
                        <div className={`flex ${i % 2 === 0 ? "" : "justify-end"}`}>
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                      </div>
                      {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
