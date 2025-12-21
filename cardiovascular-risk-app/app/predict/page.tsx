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
    sex: "",
    height: "",
    weight: "",
    systolic: "",
    diastolic: "",
    total_cholesterol: "",
    hdl: "",
    fasting_blood_sugar: "",
    smoking: "",
    diabetes: "",
    physical_activity: "",
    family_history: "",
    abdominal_circumference: "",
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();

      // Store data in localStorage for results page
      localStorage.setItem("predictionData", JSON.stringify(formData));
      localStorage.setItem("predictionResult", JSON.stringify(result));

      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      // Handle error (maybe show a toast)
    } finally {
      setLoading(false);
    }
  };

  const bmi = calculateBMI();

  return (
    <div className="min-h-screen bg-background">
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
                    <Label htmlFor="sex">Sex *</Label>
                    <Select
                      value={formData.sex}
                      onValueChange={(value) => handleInputChange("sex", value)}
                      required
                    >
                      <SelectTrigger id="sex">
                        <SelectValue placeholder="Select sex" />
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

                  <div className="space-y-2">
                    <Label htmlFor="abdominal_circumference">
                      Abdominal Circumference (cm) *
                    </Label>
                    <Input
                      id="abdominal_circumference"
                      type="number"
                      placeholder="e.g., 90"
                      value={formData.abdominal_circumference}
                      onChange={(e) =>
                        handleInputChange(
                          "abdominal_circumference",
                          e.target.value
                        )
                      }
                      required
                      min="40"
                      max="200"
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_cholesterol">
                      Total Cholesterol (mg/dL) *
                    </Label>
                    <Input
                      id="total_cholesterol"
                      type="number"
                      placeholder="e.g., 200"
                      value={formData.total_cholesterol}
                      onChange={(e) =>
                        handleInputChange("total_cholesterol", e.target.value)
                      }
                      required
                      min="50"
                      max="500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hdl">HDL Cholesterol (mg/dL) *</Label>
                    <Input
                      id="hdl"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.hdl}
                      onChange={(e) => handleInputChange("hdl", e.target.value)}
                      required
                      min="10"
                      max="150"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fasting_blood_sugar">
                      Fasting Blood Sugar (mg/dL) *
                    </Label>
                    <Input
                      id="fasting_blood_sugar"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.fasting_blood_sugar}
                      onChange={(e) =>
                        handleInputChange("fasting_blood_sugar", e.target.value)
                      }
                      required
                      min="50"
                      max="500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Lifestyle & History</CardTitle>
                <CardDescription>
                  Information about your daily habits and medical history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smoking">Smoking Status *</Label>
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
                    <Label htmlFor="diabetes">Diabetes Status *</Label>
                    <Select
                      value={formData.diabetes}
                      onValueChange={(value) =>
                        handleInputChange("diabetes", value)
                      }
                      required
                    >
                      <SelectTrigger id="diabetes">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family_history">
                      Family History of CVD *
                    </Label>
                    <Select
                      value={formData.family_history}
                      onValueChange={(value) =>
                        handleInputChange("family_history", value)
                      }
                      required
                    >
                      <SelectTrigger id="family_history">
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
                      Physical Activity Level *
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
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
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
