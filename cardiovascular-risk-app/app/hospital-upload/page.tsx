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

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict-csv`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();

      if (data.success) {
        // Transform backend results to match dashboard expectations if needed
        // The backend returns: { patient_id, age, sex, risk_level, probability, risk_score }
        // Dashboard likely expects: { id, age, gender, risk, probability }

        const patients = data.results.map((p: any) => ({
          id: p.patient_id,
          age: p.age,
          gender: p.sex,
          riskLevel: p.risk_level, // 'high' or 'low'
          probability: p.probability,
          riskScore: p.risk_score,
        }));

        localStorage.setItem("hospitalPatients", JSON.stringify(patients));
        router.push("/hospital-dashboard");
      } else {
        alert("Processing failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + error);
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `age,sex,height,weight,systolic,diastolic,total_cholesterol,hdl,fasting_blood_sugar,smoking,diabetes,family_history,physical_activity,abdominal_circumference
55,male,175,82,140,90,240,45,110,yes,no,yes,low,95
42,female,165,68,120,80,180,55,90,no,no,no,moderate,80
68,male,172,90,150,95,260,40,140,yes,yes,yes,low,102
35,female,160,55,110,70,160,60,85,no,no,no,high,70
60,male,180,95,145,92,250,35,130,yes,yes,yes,low,105
45,female,168,72,125,82,190,50,95,no,no,yes,moderate,85
50,male,178,85,135,88,220,42,105,yes,no,no,low,98
72,female,158,65,155,98,270,38,150,no,yes,yes,low,92
38,male,182,88,122,78,175,52,88,no,no,no,high,90
58,female,162,78,138,85,230,48,115,yes,yes,yes,low,96
65,male,170,80,142,90,245,40,125,yes,no,yes,low,100
40,female,166,62,118,75,165,58,82,no,no,no,moderate,75
52,male,176,92,132,86,210,44,100,no,yes,no,moderate,102
75,female,155,60,160,100,280,35,160,no,yes,yes,low,88
48,male,185,98,128,84,200,46,98,yes,no,yes,moderate,108
62,female,164,75,148,94,255,39,135,yes,yes,yes,low,94
32,male,179,76,115,72,155,62,80,no,no,no,high,82
56,female,161,70,130,82,215,50,108,no,no,yes,moderate,86
69,male,174,86,152,96,265,37,145,yes,yes,yes,low,104
44,female,167,66,124,80,185,54,92,no,no,no,moderate,78
54,male,177,89,136,88,225,43,112,yes,no,yes,low,101
70,female,156,63,158,99,275,36,155,no,yes,yes,low,90
36,male,181,84,120,76,170,56,86,no,no,no,high,88
59,female,163,76,140,89,235,47,118,yes,yes,yes,low,95
66,male,171,81,144,91,248,41,128,yes,no,yes,low,99
41,female,165,64,119,77,168,57,84,no,no,no,moderate,76
53,male,175,91,134,87,212,45,102,no,yes,no,moderate,100
74,female,154,59,159,101,278,34,158,no,yes,yes,low,87
47,male,184,96,127,83,198,47,97,yes,no,yes,moderate,106
61,female,163,74,146,93,252,38,132,yes,yes,yes,low,93
33,male,178,75,116,73,158,61,81,no,no,no,high,81
57,female,160,69,131,83,218,49,109,no,no,yes,moderate,85
68,male,173,87,151,95,262,38,144,yes,yes,yes,low,103
43,female,166,65,123,79,182,55,91,no,no,no,moderate,77
55,male,176,88,137,89,228,42,113,yes,no,yes,low,100
71,female,157,64,157,98,272,37,154,no,yes,yes,low,91
37,male,180,83,121,77,172,55,87,no,no,no,high,87
60,female,162,77,141,90,238,46,119,yes,yes,yes,low,96
67,male,172,82,145,92,250,40,129,yes,no,yes,low,98
42,female,164,63,118,76,166,58,83,no,no,no,moderate,75
51,male,177,90,133,86,211,44,101,no,yes,no,moderate,99
73,female,153,58,161,102,282,33,161,no,yes,yes,low,86
46,male,183,95,126,82,195,48,96,yes,no,yes,moderate,105
63,female,161,73,147,94,254,39,134,yes,yes,yes,low,92
34,male,179,77,117,74,160,60,82,no,no,no,high,83
58,female,159,68,132,84,220,48,110,no,no,yes,moderate,84
69,male,174,88,153,97,268,36,146,yes,yes,yes,low,105
45,female,168,67,125,81,188,53,93,no,no,no,moderate,79
56,male,178,90,138,90,230,41,115,yes,no,yes,low,102
72,female,156,62,156,97,270,38,152,no,yes,yes,low,89`;

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
                  <li>age, sex, height, weight</li>
                  <li>systolic, diastolic, abdominal_circumference</li>
                  <li>total_cholesterol, hdl, fasting_blood_sugar</li>
                  <li>smoking, diabetes, family_history, physical_activity</li>
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
