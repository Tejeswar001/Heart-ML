"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  HeartPulse,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export default function HospitalUploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* ---------------- Drag & Drop ---------------- */

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  /* ---------------- File Handling ---------------- */

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "text/csv") {
      alert("Please upload a CSV file");
      return;
    }
    setFile(selectedFile);
    setValidationErrors([]);
    setValidationSuccess(false);
  };

  const validateCSV = async () => {
    if (!file) return;

    setValidating(true);
    setValidationErrors([]);

    await new Promise((r) => setTimeout(r, 1500));

    // mock validation
    setValidationSuccess(true);
    setValidating(false);
  };

  const handleUpload = async () => {
    if (!file || !validationSuccess) return;

    setUploading(true);
    await new Promise((r) => setTimeout(r, 2000));

    const mockPatients = [
      { id: "P001", age: 55, gender: "male", risk: "high", probability: 0.78 },
      { id: "P002", age: 42, gender: "female", risk: "low", probability: 0.15 },
      {
        id: "P003",
        age: 68,
        gender: "male",
        risk: "medium",
        probability: 0.52,
      },
    ];

    localStorage.setItem("hospitalPatients", JSON.stringify(mockPatients));
    router.push("/hospital-dashboard");
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `age,gender,height,weight,systolic,diastolic,cholesterol,glucose,smoking,alcohol,physical_activity
55,male,175,82,140,90,above_normal,above_normal,yes,no,no
42,female,165,68,120,80,normal,normal,no,no,yes
68,male,172,90,150,95,well_above_normal,above_normal,yes,yes,no`;

    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_patients.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      {/*<header className="fixed top-0 left-0 w-full z-50">
        <div className="mx-4 mt-4 rounded-3xl bg-[#0B3C5D]">
          <div className="container mx-auto px-6 py-5 flex items-center justify-center text-white">
            <div className="text-2xl font-extrabold tracking-wide">
              CARDIO<span className="opacity-70">PREDICT</span>
            </div>
          </div>
        </div>
      </header>*/}

      {/* Content */}
      <main className="container mx-auto px-4 pt-10 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B3C5D] mb-4">
              Hospital Bulk Upload
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Upload patient records in CSV format for large-scale
              cardiovascular risk assessment.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="rounded-3xl border border-black/5 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0B3C5D]">
                  <FileText className="w-5 h-5" />
                  CSV Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#4B5563] space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>age, gender, height, weight</li>
                  <li>systolic, diastolic</li>
                  <li>cholesterol, glucose</li>
                  <li>smoking, alcohol, physical_activity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-black/5 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0B3C5D]">Sample CSV</CardTitle>
                <CardDescription>Download a template file</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={downloadSampleCSV}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upload */}
          <Card className="rounded-3xl border border-black/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#0B3C5D]">
                Upload Patient Data
              </CardTitle>
              <CardDescription>
                Drag & drop or browse your CSV file
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div
                className={`border-2 border-dashed rounded-2xl p-14 text-center transition-colors ${
                  dragActive
                    ? "border-[#0B3C5D] bg-[#0B3C5D]/5"
                    : "border-black/10 hover:border-[#0B3C5D]/40"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-3">
                    <FileText className="mx-auto w-10 h-10 text-[#0B3C5D]" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-[#6B7280]">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFile(null);
                        setValidationSuccess(false);
                      }}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto w-10 h-10 text-[#0B3C5D]" />
                    <p className="font-medium">
                      Drag & drop your CSV file here
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      Browse Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleFileSelect(e.target.files[0])
                      }
                    />
                  </div>
                )}
              </div>

              {file && !validationSuccess && (
                <Button
                  onClick={validateCSV}
                  disabled={validating}
                  size="lg"
                  className="w-full rounded-full"
                >
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

              {validationSuccess && (
                <>
                  <Alert className="border-pink-200 bg-pink-50">
                    <CheckCircle2 className="h-4 w-4 text-pink-600" />
                    <AlertDescription className="text-pink-700">
                      File validated successfully. Ready to process.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    size="lg"
                    className="w-full rounded-full bg-pink-400 text-[#3A0F2E] hover:bg-pink-300"
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

          <div className="text-center mt-12">
            <Link
              href="/select-user-type"
              className="text-sm text-[#4B5563] hover:text-[#0B3C5D]"
            >
              ← Back to User Selection
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
