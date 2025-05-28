"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Check, Hospital, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function HospitalOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    accreditation: "",
    accreditationExpiry: "",
    totalBeds: "",
    primaryContact: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },
    billingContact: {
      name: "",
      email: "",
      phone: "",
    },
    technicalContact: {
      name: "",
      email: "",
      phone: "",
    },
    notes: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would submit the data to your API
    console.log("Submitting hospital data:", formData)

    setIsSubmitting(false)
    router.push("/hospitals?onboarded=success")
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  // Render step indicators without using Tabs component
  const renderStepIndicators = () => {
    return (
      <div className="grid w-full grid-cols-4 gap-2 mb-6">
        {["Basic Information", "Contact Details", "System Integration", "Review & Submit"].map((step, index) => {
          const stepNumber = index + 1
          const isActive = currentStep === stepNumber
          const isPast = currentStep > stepNumber

          return (
            <div
              key={stepNumber}
              className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isPast
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
              onClick={() => stepNumber <= currentStep && setCurrentStep(stepNumber)}
            >
              <div className="text-sm font-medium">{step}</div>
              <div className="text-xs mt-1">Step {stepNumber} of 4</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the hospital's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter hospital name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Hospital Type</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select hospital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="specialty">Specialty</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="ZIP code"
                    value={formData.zip}
                    onChange={(e) => updateFormData("zip", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accreditation">Accreditation</Label>
                  <Input
                    id="accreditation"
                    placeholder="Accreditation type"
                    value={formData.accreditation}
                    onChange={(e) => updateFormData("accreditation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accreditationExpiry">Accreditation Expiry</Label>
                  <Input
                    id="accreditationExpiry"
                    type="date"
                    value={formData.accreditationExpiry}
                    onChange={(e) => updateFormData("accreditationExpiry", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalBeds">Total Beds</Label>
                <Input
                  id="totalBeds"
                  type="number"
                  placeholder="Number of beds"
                  value={formData.totalBeds}
                  onChange={(e) => updateFormData("totalBeds", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={nextStep}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Provide contact information for key personnel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Primary Contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryName">Name</Label>
                    <Input
                      id="primaryName"
                      placeholder="Contact name"
                      value={formData.primaryContact.name}
                      onChange={(e) => updateNestedFormData("primaryContact", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryTitle">Title</Label>
                    <Input
                      id="primaryTitle"
                      placeholder="Job title"
                      value={formData.primaryContact.title}
                      onChange={(e) => updateNestedFormData("primaryContact", "title", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryEmail">Email</Label>
                    <Input
                      id="primaryEmail"
                      type="email"
                      placeholder="Email address"
                      value={formData.primaryContact.email}
                      onChange={(e) => updateNestedFormData("primaryContact", "email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryPhone">Phone</Label>
                    <Input
                      id="primaryPhone"
                      placeholder="Phone number"
                      value={formData.primaryContact.phone}
                      onChange={(e) => updateNestedFormData("primaryContact", "phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Billing Contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Name</Label>
                    <Input
                      id="billingName"
                      placeholder="Contact name"
                      value={formData.billingContact.name}
                      onChange={(e) => updateNestedFormData("billingContact", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Email</Label>
                    <Input
                      id="billingEmail"
                      type="email"
                      placeholder="Email address"
                      value={formData.billingContact.email}
                      onChange={(e) => updateNestedFormData("billingContact", "email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingPhone">Phone</Label>
                  <Input
                    id="billingPhone"
                    placeholder="Phone number"
                    value={formData.billingContact.phone}
                    onChange={(e) => updateNestedFormData("billingContact", "phone", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Technical Contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="techName">Name</Label>
                    <Input
                      id="techName"
                      placeholder="Contact name"
                      value={formData.technicalContact.name}
                      onChange={(e) => updateNestedFormData("technicalContact", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="techEmail">Email</Label>
                    <Input
                      id="techEmail"
                      type="email"
                      placeholder="Email address"
                      value={formData.technicalContact.email}
                      onChange={(e) => updateNestedFormData("technicalContact", "email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techPhone">Phone</Label>
                  <Input
                    id="techPhone"
                    placeholder="Phone number"
                    value={formData.technicalContact.phone}
                    onChange={(e) => updateNestedFormData("technicalContact", "phone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={nextStep}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Integration</CardTitle>
              <CardDescription>Configure system integration settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hospital className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Hospital Integration Options</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the integration options for this hospital. These settings determine how data will be shared
                  between Trudose and the hospital's systems.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 items-center">
                      <input id="ehr-integration" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                    <div className="leading-none">
                      <label htmlFor="ehr-integration" className="text-sm font-medium">
                        EHR Integration
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Enable integration with the hospital's Electronic Health Record system
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 items-center">
                      <input id="billing-integration" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                    <div className="leading-none">
                      <label htmlFor="billing-integration" className="text-sm font-medium">
                        Billing System Integration
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Enable integration with the hospital's billing and payment systems
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 items-center">
                      <input id="lab-integration" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                    <div className="leading-none">
                      <label htmlFor="lab-integration" className="text-sm font-medium">
                        Laboratory System Integration
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Enable integration with the hospital's laboratory information system
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="sso-integration"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                    <div className="leading-none">
                      <label htmlFor="sso-integration" className="text-sm font-medium">
                        Single Sign-On (SSO)
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Enable SSO integration with the hospital's identity provider
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes or special requirements"
                  className="min-h-[100px]"
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={nextStep}>
                Review & Submit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review the hospital information before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Basic Information</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="font-medium">Hospital Name:</div>
                  <div>{formData.name || "Not provided"}</div>

                  <div className="font-medium">Type:</div>
                  <div>
                    {formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : "Not provided"}
                  </div>

                  <div className="font-medium">Address:</div>
                  <div>{formData.address || "Not provided"}</div>

                  <div className="font-medium">City:</div>
                  <div>{formData.city || "Not provided"}</div>

                  <div className="font-medium">State:</div>
                  <div>{formData.state || "Not provided"}</div>

                  <div className="font-medium">ZIP Code:</div>
                  <div>{formData.zip || "Not provided"}</div>

                  <div className="font-medium">Phone:</div>
                  <div>{formData.phone || "Not provided"}</div>

                  <div className="font-medium">Email:</div>
                  <div>{formData.email || "Not provided"}</div>

                  <div className="font-medium">Accreditation:</div>
                  <div>{formData.accreditation || "Not provided"}</div>

                  <div className="font-medium">Accreditation Expiry:</div>
                  <div>{formData.accreditationExpiry || "Not provided"}</div>

                  <div className="font-medium">Total Beds:</div>
                  <div>{formData.totalBeds || "Not provided"}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Primary Contact</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{formData.primaryContact.name || "Not provided"}</div>

                      <div className="text-muted-foreground">Title:</div>
                      <div>{formData.primaryContact.title || "Not provided"}</div>

                      <div className="text-muted-foreground">Email:</div>
                      <div>{formData.primaryContact.email || "Not provided"}</div>

                      <div className="text-muted-foreground">Phone:</div>
                      <div>{formData.primaryContact.phone || "Not provided"}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Billing Contact</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{formData.billingContact.name || "Not provided"}</div>

                      <div className="text-muted-foreground">Email:</div>
                      <div>{formData.billingContact.email || "Not provided"}</div>

                      <div className="text-muted-foreground">Phone:</div>
                      <div>{formData.billingContact.phone || "Not provided"}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Technical Contact</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{formData.technicalContact.name || "Not provided"}</div>

                      <div className="text-muted-foreground">Email:</div>
                      <div>{formData.technicalContact.email || "Not provided"}</div>

                      <div className="text-muted-foreground">Phone:</div>
                      <div>{formData.technicalContact.phone || "Not provided"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Additional Notes</h3>
                <p className="text-sm">{formData.notes || "No additional notes provided."}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Complete Onboarding
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Onboard New Hospital</h1>
        <p className="text-muted-foreground">Add a new hospital to the Trudose platform</p>
      </div>

      {renderStepIndicators()}
      {renderStepContent()}
    </div>
  )
}
