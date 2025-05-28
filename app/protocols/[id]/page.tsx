"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProtocolById } from "@/lib/features/protocol/protocolSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, FileEdit, Copy, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProtocolDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedProtocol, loading, error } = useSelector((state: RootState) => state.protocol)

  useEffect(() => {
    if (id) {
      dispatch(fetchProtocolById(id as string))
    }
  }, [dispatch, id])

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    router.push(`/protocols/${id}/edit`)
  }

  const handleClone = () => {
    // Implement clone functionality
    console.log("Cloning protocol:", id)
  }

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Deleting protocol:", id)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading protocol details...</div>
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading protocol</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">Please try the following:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Refresh the page</li>
                  <li>Check if the protocol ID is correct</li>
                  <li>
                    Return to the{" "}
                    <a href="/protocols" className="font-medium underline">
                      protocols list
                    </a>{" "}
                    and try again
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedProtocol) {
    return <div className="text-red-500">Protocol not found</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{selectedProtocol.name}</h1>
          <Badge
            variant={
              selectedProtocol.status === "active"
                ? "default"
                : selectedProtocol.status === "draft"
                  ? "outline"
                  : "secondary"
            }
          >
            {selectedProtocol.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClone}>
            <Copy className="mr-2 h-4 w-4" />
            Clone
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="steps">Protocol Steps</TabsTrigger>
          <TabsTrigger value="dosing">Dosing Guidelines</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Protocol Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                    <dd className="text-sm">{selectedProtocol.description}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Version</dt>
                    <dd className="text-sm">{selectedProtocol.version}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Created By</dt>
                    <dd className="text-sm">{selectedProtocol.createdBy}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Created Date</dt>
                    <dd className="text-sm">{selectedProtocol.createdDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Last Modified</dt>
                    <dd className="text-sm">{selectedProtocol.lastModified}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Approved By</dt>
                    <dd className="text-sm">{selectedProtocol.approvedBy || "Not approved"}</dd>
                  </div>
                  {selectedProtocol.approvedDate && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Approved Date</dt>
                      <dd className="text-sm">{selectedProtocol.approvedDate}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Target Platelet Count</dt>
                    <dd className="text-sm">{selectedProtocol.targetPlateletCount || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Target Leukocyte Count</dt>
                    <dd className="text-sm">{selectedProtocol.targetLeukocyteCount || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Anticoagulant</dt>
                    <dd className="text-sm">{selectedProtocol.anticoagulant || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Activation Method</dt>
                    <dd className="text-sm">{selectedProtocol.activationMethod || "None"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Average Duration</dt>
                    <dd className="text-sm">{selectedProtocol.averageDuration} minutes</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Indications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedProtocol.indications.map((indication, index) => (
                    <li key={index} className="text-sm">
                      {indication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contraindications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedProtocol.contraindications.map((contraindication, index) => (
                    <li key={index} className="text-sm">
                      {contraindication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Steps</CardTitle>
              <CardDescription>
                Total Duration: {selectedProtocol.steps.reduce((total, step) => total + step.duration, 0)} minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedProtocol.steps.map((step) => (
                  <Card key={step.id} className={step.criticalStep ? "border-red-200" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {step.order}. {step.title}
                          {step.criticalStep && (
                            <Badge variant="destructive" className="ml-2">
                              Critical
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{step.duration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{step.description}</p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Required Equipment:</h4>
                        <div className="flex flex-wrap gap-1">
                          {step.requiredEquipment.map((equipment, index) => (
                            <Badge key={index} variant="outline">
                              {equipment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dosing">
          <Card>
            <CardHeader>
              <CardTitle>Dosing Guidelines</CardTitle>
              <CardDescription>Recommended dosing for various conditions based on clinical evidence</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedProtocol.doseGuidelines && selectedProtocol.doseGuidelines.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>Injection Site</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Concentration</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProtocol.doseGuidelines.map((guideline) => (
                      <TableRow key={guideline.id}>
                        <TableCell className="font-medium">{guideline.condition}</TableCell>
                        <TableCell>{guideline.site}</TableCell>
                        <TableCell>{guideline.volume}</TableCell>
                        <TableCell>{guideline.concentration}</TableCell>
                        <TableCell>{guideline.notes || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No dosing guidelines available for this protocol
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{selectedProtocol.successRate}%</div>
                  {selectedProtocol.successRate >= 80 ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : selectedProtocol.successRate >= 60 ? (
                    <CheckCircle className="h-8 w-8 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Based on clinical outcomes and patient feedback</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Usage Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{selectedProtocol.usageCount}</div>
                <p className="text-sm text-muted-foreground mt-2">Total number of times this protocol has been used</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{selectedProtocol.averageDuration} min</div>
                <p className="text-sm text-muted-foreground mt-2">Average time to complete the full protocol</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Common Questions & Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What equipment is needed for this protocol?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.from(new Set(selectedProtocol.steps.flatMap((step) => step.requiredEquipment))).map(
                        (equipment, index) => (
                          <li key={index} className="text-sm">
                            {equipment}
                          </li>
                        ),
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the expected recovery time?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      Recovery time varies by condition and treatment site. Generally, patients can resume normal
                      activities within 24-48 hours, with full recovery and results developing over 2-6 weeks.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How many treatments are typically needed?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      Most conditions require a series of 2-3 treatments spaced 4-6 weeks apart for optimal results.
                      Chronic conditions may require maintenance treatments every 6-12 months.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
