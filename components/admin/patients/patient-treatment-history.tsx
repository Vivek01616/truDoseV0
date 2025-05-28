"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import type { TreatmentHistory } from "@/lib/features/patient/patientSlice"

interface PatientTreatmentHistoryProps {
  treatments: TreatmentHistory[]
}

export function PatientTreatmentHistory({ treatments }: PatientTreatmentHistoryProps) {
  if (!treatments || treatments.length === 0) {
    return (
      <Card className="border-[#E0E0E0]">
        <CardHeader>
          <CardTitle className="text-lg">Treatment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No treatment history available for this patient.</p>
            <Button variant="outline" className="mt-4 border-[#005566] text-[#005566]">
              Schedule Treatment
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort treatments by date, most recent first
  const sortedTreatments = [...treatments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card className="border-[#E0E0E0]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Treatment History</CardTitle>
        <Button variant="outline" className="border-[#005566] text-[#005566]">
          Schedule Treatment
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedTreatments.map((treatment) => (
          <div key={treatment.id} className="border rounded-md p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h3 className="font-medium text-lg">{treatment.protocol}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(treatment.date), "MMMM d, yyyy")}</span>
                </div>
              </div>
              <Badge
                variant={
                  treatment.outcome === "success"
                    ? "default"
                    : treatment.outcome === "pending"
                      ? "outline"
                      : "destructive"
                }
                className={
                  treatment.outcome === "success"
                    ? "bg-[#4CAF50]"
                    : treatment.outcome === "pending"
                      ? ""
                      : "bg-[#D32F2F]"
                }
              >
                {treatment.outcome.charAt(0).toUpperCase() + treatment.outcome.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Provider</p>
                  <p className="text-sm text-muted-foreground">{treatment.provider}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{treatment.clinic}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Follow-up</p>
                  <p className="text-sm text-muted-foreground">
                    {treatment.followUpDate
                      ? format(new Date(treatment.followUpDate), "MMMM d, yyyy")
                      : "None scheduled"}
                  </p>
                </div>
              </div>
            </div>

            {treatment.outcome !== "pending" && (
              <>
                <Separator className="my-4" />

                <div className="space-y-4">
                  <h4 className="font-medium">Outcome Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pain Before</p>
                      <p className="text-lg font-medium">{treatment.painScoreBefore}/10</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pain After</p>
                      <p className="text-lg font-medium">
                        {treatment.painScoreAfter !== null ? `${treatment.painScoreAfter}/10` : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobility Before</p>
                      <p className="text-lg font-medium">{treatment.mobilityScoreBefore}/10</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobility After</p>
                      <p className="text-lg font-medium">
                        {treatment.mobilityScoreAfter !== null ? `${treatment.mobilityScoreAfter}/10` : "N/A"}
                      </p>
                    </div>
                  </div>

                  {treatment.patientSatisfaction !== null && (
                    <div>
                      <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                      <p className="text-lg font-medium">{treatment.patientSatisfaction}/10</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {treatment.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm">{treatment.notes}</p>
                </div>
              </>
            )}

            {treatment.complications && treatment.complications.length > 0 && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Complications</h4>
                  <div className="flex flex-wrap gap-1">
                    {treatment.complications.map((complication, index) => (
                      <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {complication}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="border-[#005566] text-[#005566]">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
