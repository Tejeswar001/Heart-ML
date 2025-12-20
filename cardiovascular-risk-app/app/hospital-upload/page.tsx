"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HeartPulse, Upload, FileText, CheckCircle2, AlertCircle, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ValidationError {
  row: number
  field: string
  message: string
}

export default function HospitalUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [validating, setValidating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [validationSuccess, setValidationSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setValidationErrors([])
      setValidationSuccess(false)
    } else {
      alert("Please upload a CSV file")
    }
  }

  const validateCSV = async () => {
    if (!file) return

    setValidating(true)
    setValidationErrors([])

    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation - in real app, parse CSV and validate
    const mockErrors: ValidationError[] = []

    if (mockErrors.length > 0) {
      setValidationErrors(mockErrors)
      setValidationSuccess(false)
    } else {
      setValidationSuccess(true)
    }

    setValidating(false)
  }

  const handleUpload = async () => {
    if (!file || !validationSuccess) return

    setUploading(true)

    // Simulate upload and processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock patient data
    const mockPatients = [
      {
        id: "P001",
        age: 55,
        gender: "male",
        riskLevel: "high",
        probability: 0.78,
      },
      {
        id: "P002",
        age: 42,
        gender: "female",
        riskLevel: "low",
        probability: 0.15,
      },
      {
        id: "P003",
        age: 68,
        gender: "male",
        riskLevel: "medium",
        probability: 0.52,
      },
    ]

    localStorage.setItem("hospitalPatients", JSON.stringify(mockPatients))
    router.push("/hospital-dashboard")
  }

  const downloadSampleCSV = () => {
    const sampleCSV = `age,gender,height,weight,systolic,diastolic,cholesterol,glucose,smoking,alcohol,physical_activity
55,male,175,82,140,90,above_normal,above_normal,yes,no,no
42,female,165,68,120,80,normal,normal,no,no,yes
68,male,172,90,150,95,well_above_normal,above_normal,yes,yes,no
35,female,168,65,110,75,normal,normal,no,no,yes`

    const blob = new Blob([sampleCSV], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample_patients.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <HeartPulse className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">CardioPredict</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Hospital Bulk Upload</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Upload patient data in CSV format for bulk risk assessment
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  CSV Format Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium">Required columns:</p>
                  <ul className="space-y-1 text-muted-foreground ml-4">
                    <li>• age, gender, height, weight</li>
                    <li>• systolic, diastolic</li>
                    <li>• cholesterol, glucose</li>
                    <li>• smoking, alcohol, physical_activity</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    All fields are required. Values must match the expected format.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample CSV File</CardTitle>
                <CardDescription>Download a template to see the correct format</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadSampleCSV} variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample CSV
                </Button>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  Use this template to format your patient data correctly before uploading.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload Patient Data</CardTitle>
              <CardDescription>Select or drag and drop your CSV file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFile(null)
                        setValidationErrors([])
                        setValidationSuccess(false)
                      }}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Drag and drop your CSV file here</p>
                      <p className="text-sm text-muted-foreground">or</p>
                    </div>
                    <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                      Browse Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileSelect(e.target.files[0])
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {file && !validationSuccess && (
                <Button onClick={validateCSV} disabled={validating} className="w-full" size="lg">
                  {validating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    "Validate File"
                  )}
                </Button>
              )}

              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-2">Validation errors found:</p>
                    <ul className="text-sm space-y-1">
                      {validationErrors.slice(0, 5).map((error, idx) => (
                        <li key={idx}>
                          Row {error.row}: {error.field} - {error.message}
                        </li>
                      ))}
                      {validationErrors.length > 5 && <li>...and {validationErrors.length - 5} more errors</li>}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {validationSuccess && (
                <>
                  <Alert className="border-accent bg-accent/5">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-accent-foreground">
                      File validated successfully! Ready to upload and process patient data.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Upload and Process"
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link
              href="/select-user-type"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to User Selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
