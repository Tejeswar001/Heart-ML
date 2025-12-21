"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  HeartPulse,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Apple,
  Activity,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PredictionResult {
  riskLevel: "low" | "medium" | "high";
  probability: number;
  formData: any;
}

interface Recommendation {
  category: string;
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      router.push("/predict");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const getRiskConfig = () => {
    switch (result.riskLevel) {
      case "low":
        return {
          color: "text-accent",
          bgColor: "bg-accent/10",
          borderColor: "border-accent",
          label: "Low Risk",
          icon: <CheckCircle2 className="w-8 h-8" />,
          message:
            "Your cardiovascular risk is low. Keep up the good work with your healthy lifestyle!",
        };
      case "medium":
        return {
          color: "text-chart-4",
          bgColor: "bg-chart-4/10",
          borderColor: "border-chart-4",
          label: "Medium Risk",
          icon: <AlertTriangle className="w-8 h-8" />,
          message:
            "Your cardiovascular risk is moderate. Consider making some lifestyle changes to improve your health.",
        };
      case "high":
        return {
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive",
          label: "High Risk",
          icon: <AlertCircle className="w-8 h-8" />,
          message:
            "Your cardiovascular risk is elevated. We strongly recommend consulting with a healthcare provider soon.",
        };
      default:
        return {
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          borderColor: "border-muted",
          label: "Unknown Risk",
          icon: <AlertCircle className="w-8 h-8" />,
          message: "Unable to determine risk level.",
        };
    }
  };

  const riskConfig = getRiskConfig();
  const probabilityPercent = Math.round(result.probability * 100);

  const getRecommendations = (): Recommendation[] => {
    const baseRecommendations: Recommendation[] = [];

    // Diet recommendations
    const dietItems: string[] = [];
    const totalCholesterol = Number(result.formData.total_cholesterol);
    const fastingBloodSugar = Number(result.formData.fasting_blood_sugar);

    if (totalCholesterol > 200) {
      dietItems.push("Limit saturated fats and cholesterol-rich foods");
      dietItems.push("Increase fiber intake with whole grains and vegetables");
    }
    if (fastingBloodSugar > 100) {
      dietItems.push("Reduce sugar and refined carbohydrate intake");
      dietItems.push("Choose low glycemic index foods");
    }
    dietItems.push("Eat more fruits, vegetables, and lean proteins");
    dietItems.push("Reduce sodium intake to control blood pressure");

    if (result.formData.weight && result.formData.height) {
      const bmi =
        Number.parseFloat(result.formData.weight) /
        Math.pow(Number.parseFloat(result.formData.height) / 100, 2);
      if (bmi > 25) {
        dietItems.push("Consider portion control to achieve healthy weight");
      }
    }

    baseRecommendations.push({
      category: "diet",
      icon: <Apple className="w-5 h-5" />,
      title: "Diet Recommendations",
      items: dietItems,
    });

    // Lifestyle recommendations
    const lifestyleItems: string[] = [];
    if (result.formData.smoking === "yes") {
      lifestyleItems.push(
        "Quit smoking - this is the most important change you can make"
      );
      lifestyleItems.push("Seek support through smoking cessation programs");
    }
    if (result.formData.physical_activity === "low") {
      lifestyleItems.push(
        "Start with 30 minutes of moderate exercise 5 days a week"
      );
      lifestyleItems.push(
        "Include both cardio and strength training activities"
      );
    }

    lifestyleItems.push(
      "Manage stress through relaxation techniques or meditation"
    );
    lifestyleItems.push("Ensure adequate sleep (7-9 hours per night)");
    lifestyleItems.push("Monitor your blood pressure regularly at home");

    baseRecommendations.push({
      category: "lifestyle",
      icon: <Activity className="w-5 h-5" />,
      title: "Lifestyle Changes",
      items: lifestyleItems,
    });

    // Medical recommendations
    const medicalItems: string[] = [];
    if (result.riskLevel === "high") {
      medicalItems.push("Schedule an appointment with a cardiologist soon");
      medicalItems.push(
        "Discuss medication options with your healthcare provider"
      );
    } else if (result.riskLevel === "medium") {
      medicalItems.push("Consult with your primary care physician");
      medicalItems.push("Consider more frequent health check-ups");
    }
    medicalItems.push("Get regular cardiovascular health screenings");
    medicalItems.push(
      "Keep track of your blood pressure and cholesterol levels"
    );
    if (
      Number(result.formData.systolic) > 130 ||
      Number(result.formData.diastolic) > 80
    ) {
      medicalItems.push("Discuss blood pressure management with your doctor");
    }
    medicalItems.push(
      "Consider cardiac stress tests if recommended by your doctor"
    );

    baseRecommendations.push({
      category: "medical",
      icon: <Stethoscope className="w-5 h-5" />,
      title: "Medical Advice",
      items: medicalItems,
    });

    return baseRecommendations;
  };

  const recommendations = getRecommendations();

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
          <div className="mb-6">
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Assessment
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your Risk Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Based on the information you provided
            </p>
          </div>

          {/* Risk Level Card */}
          <Card className={`border-2 ${riskConfig.borderColor} mb-8`}>
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${riskConfig.bgColor}`}
                >
                  <div className={riskConfig.color}>{riskConfig.icon}</div>
                </div>
                <div>
                  <Badge
                    className={`${riskConfig.bgColor} ${riskConfig.color} border-0 text-base px-4 py-1.5 font-semibold`}
                  >
                    {riskConfig.label}
                  </Badge>
                  <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
                    {riskConfig.message}
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Risk Probability
                    </span>
                    <span className={`font-semibold ${riskConfig.color}`}>
                      {probabilityPercent}%
                    </span>
                  </div>
                  <Progress value={probabilityPercent} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Personalized Health Recommendations
            </h2>
            <div className="space-y-6">
              {recommendations.map((rec, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {rec.icon}
                      </div>
                      {rec.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {rec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>
                This risk assessment is for informational purposes only and
                should not be considered as medical advice, diagnosis, or
                treatment.
              </p>
              <p>
                The results are based on machine learning models and may not
                account for all individual health factors. Always consult with
                qualified healthcare professionals for medical decisions and
                personalized advice.
              </p>
              <p>
                If you experience chest pain, shortness of breath, or other
                serious symptoms, seek immediate medical attention.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/predict">Take Another Assessment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
