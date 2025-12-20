"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeartPulse, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PredictPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    glucose: "",
    smoking: "",
    alcohol: "",
    physical_activity: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = Number.parseFloat(formData.height) / 100;
      const weightInKg = Number.parseFloat(formData.weight);
      const bmi = weightInKg / (heightInM * heightInM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store data in localStorage for results page
    localStorage.setItem("predictionData", JSON.stringify(formData));

    // Mock prediction result
    const mockResult = {
      riskLevel: "medium",
      probability: 0.45,
      formData,
    };

    localStorage.setItem("predictionResult", JSON.stringify(mockResult));

    router.push("/results");
  };

  const bmi = calculateBMI();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/*<header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <HeartPulse className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">CardioPredict</span>
          </Link>
        </div>
      </header>*/}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Cardiovascular Risk Assessment
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Please provide your health information for an accurate risk
              assessment
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Basic demographic and physical information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years) *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                      min="1"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                      required
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      required
                      min="50"
                      max="250"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 75"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      required
                      min="20"
                      max="300"
                    />
                  </div>
                </div>

                {bmi && (
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted-foreground">
                      Calculated BMI:{" "}
                      <span className="font-semibold text-foreground">
                        {bmi}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Blood Pressure & Lab Values</CardTitle>
                <CardDescription>
                  Recent measurements from your health checkup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="systolic">Systolic BP (mmHg) *</Label>
                    <Input
                      id="systolic"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.systolic}
                      onChange={(e) =>
                        handleInputChange("systolic", e.target.value)
                      }
                      required
                      min="70"
                      max="250"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upper number in blood pressure reading
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diastolic">Diastolic BP (mmHg) *</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      placeholder="e.g., 80"
                      value={formData.diastolic}
                      onChange={(e) =>
                        handleInputChange("diastolic", e.target.value)
                      }
                      required
                      min="40"
                      max="150"
                    />
                    <p className="text-xs text-muted-foreground">
                      Lower number in blood pressure reading
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cholesterol">Cholesterol Level *</Label>
                    <Select
                      value={formData.cholesterol}
                      onValueChange={(value) =>
                        handleInputChange("cholesterol", value)
                      }
                      required
                    >
                      <SelectTrigger id="cholesterol">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="above_normal">
                          Above Normal
                        </SelectItem>
                        <SelectItem value="well_above_normal">
                          Well Above Normal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="glucose">Glucose Level *</Label>
                    <Select
                      value={formData.glucose}
                      onValueChange={(value) =>
                        handleInputChange("glucose", value)
                      }
                      required
                    >
                      <SelectTrigger id="glucose">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="above_normal">
                          Above Normal
                        </SelectItem>
                        <SelectItem value="well_above_normal">
                          Well Above Normal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Lifestyle Factors</CardTitle>
                <CardDescription>
                  Information about your daily habits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smoking">Smoking *</Label>
                    <Select
                      value={formData.smoking}
                      onValueChange={(value) =>
                        handleInputChange("smoking", value)
                      }
                      required
                    >
                      <SelectTrigger id="smoking">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alcohol">Alcohol Intake *</Label>
                    <Select
                      value={formData.alcohol}
                      onValueChange={(value) =>
                        handleInputChange("alcohol", value)
                      }
                      required
                    >
                      <SelectTrigger id="alcohol">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physical_activity">
                      Physical Activity *
                    </Label>
                    <Select
                      value={formData.physical_activity}
                      onValueChange={(value) =>
                        handleInputChange("physical_activity", value)
                      }
                      required
                    >
                      <SelectTrigger id="physical_activity">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Inactive</SelectItem>
                        <SelectItem value="yes">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/select-user-type"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </Link>
              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Predict Risk"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note:</strong> This tool is
              for informational purposes only and should not replace
              professional medical advice. Always consult with a healthcare
              provider for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
