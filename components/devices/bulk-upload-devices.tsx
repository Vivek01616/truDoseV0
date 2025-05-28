"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { bulkUploadDevices, resetBulkUploadStatus } from "@/lib/features/device/deviceSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, FileSpreadsheet, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function BulkUploadDevices() {
  const dispatch = useDispatch<AppDispatch>()
  const { bulkUploadStatus, bulkUploadError } = useSelector((state: RootState) => state.device)

  const [csvData, setCsvData] = useState("")
  const [jsonData, setJsonData] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parseError, setParseError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        if (selectedFile.name.endsWith(".csv")) {
          setCsvData(content)
          try {
            const parsed = parseCSV(content)
            setPreviewData(parsed.slice(0, 5)) // Preview first 5 rows
            setParseError(null)
          } catch (error) {
            setParseError("Failed to parse CSV file. Please check the format.")
            setPreviewData(null)
          }
        } else if (selectedFile.name.endsWith(".json")) {
          setJsonData(content)
          try {
            const parsed = JSON.parse(content)
            setPreviewData(Array.isArray(parsed) ? parsed.slice(0, 5) : [parsed])
            setParseError(null)
          } catch (error) {
            setParseError("Failed to parse JSON file. Please check the format.")
            setPreviewData(null)
          }
        }
      }
      reader.readAsText(selectedFile)
    }
  }

  const parseCSV = (csv: string) => {
    const lines = csv.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())

    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values = line.split(",").map((v) => v.trim())
        const obj: Record<string, string> = {}

        headers.forEach((header, index) => {
          obj[header] = values[index] || ""
        })

        return obj
      })
  }

  const handleCSVUpload = () => {
    try {
      const devices = parseCSV(csvData)
      simulateUploadProgress(() => {
        dispatch(bulkUploadDevices(devices))
      })
    } catch (error) {
      setParseError("Failed to parse CSV data. Please check the format.")
    }
  }

  const handleJSONUpload = () => {
    try {
      const devices = JSON.parse(jsonData)
      simulateUploadProgress(() => {
        dispatch(bulkUploadDevices(Array.isArray(devices) ? devices : [devices]))
      })
    } catch (error) {
      setParseError("Failed to parse JSON data. Please check the format.")
    }
  }

  const simulateUploadProgress = (callback: () => void) => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          callback()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleReset = () => {
    setCsvData("")
    setJsonData("")
    setFile(null)
    setUploadProgress(0)
    setParseError(null)
    setPreviewData(null)
    dispatch(resetBulkUploadStatus())
  }

  const renderPreview = () => {
    if (!previewData) return null

    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Preview (first 5 records):</h4>
        <div className="bg-muted p-2 rounded-md overflow-x-auto">
          <pre className="text-xs">{JSON.stringify(previewData, null, 2)}</pre>
        </div>
      </div>
    )
  }

  const renderStatus = () => {
    if (bulkUploadStatus === "loading" || (uploadProgress > 0 && uploadProgress < 100)) {
      return (
        <div className="mt-4">
          <Label>Upload Progress</Label>
          <Progress value={uploadProgress} className="mt-2" />
        </div>
      )
    }

    if (bulkUploadStatus === "success") {
      return (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Upload Successful</AlertTitle>
          <AlertDescription className="text-green-700">
            Devices have been successfully uploaded and added to the system.
          </AlertDescription>
        </Alert>
      )
    }

    if (bulkUploadStatus === "failed") {
      return (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Failed</AlertTitle>
          <AlertDescription>
            {bulkUploadError || "There was an error uploading your devices. Please try again."}
          </AlertDescription>
        </Alert>
      )
    }

    if (parseError) {
      return (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Parse Error</AlertTitle>
          <AlertDescription>{parseError}</AlertDescription>
        </Alert>
      )
    }

    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Upload Devices</CardTitle>
        <CardDescription>Upload multiple devices at once using CSV or JSON format.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="csv">CSV Text</TabsTrigger>
            <TabsTrigger value="json">JSON Text</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="file-upload">Select File</Label>
              <Input id="file-upload" type="file" accept=".csv,.json" onChange={handleFileChange} />
              <p className="text-sm text-muted-foreground">Upload a CSV or JSON file containing device information.</p>
              {file && (
                <div className="flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>{file.name}</span>
                </div>
              )}
              {renderPreview()}
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="csv-data">CSV Data</Label>
              <Textarea
                id="csv-data"
                placeholder="name,model,serialNumber,type,macAddress,clinicId,clinicName"
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">Enter CSV data with headers in the first row.</p>
              {renderPreview()}
            </div>
          </TabsContent>

          <TabsContent value="json" className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="json-data">JSON Data</Label>
              <Textarea
                id="json-data"
                placeholder='[{"name":"Device 1","model":"CC-5000","serialNumber":"SN12345","type":"Cell Counter","macAddress":"00:1A:2B:3C:4D:5E","clinicId":"clinic-001","clinicName":"Northwest Medical Center"}]'
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">Enter JSON data as an array of device objects.</p>
              {renderPreview()}
            </div>
          </TabsContent>
        </Tabs>

        {renderStatus()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button
          onClick={
            file
              ? file.name.endsWith(".csv")
                ? handleCSVUpload
                : handleJSONUpload
              : csvData
                ? handleCSVUpload
                : handleJSONUpload
          }
          disabled={bulkUploadStatus === "loading" || (!file && !csvData && !jsonData)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Devices
        </Button>
      </CardFooter>
    </Card>
  )
}
