"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 120) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-4 mt-4 rounded-3xl bg-[#0B3C5D]">
          <div className="container mx-auto px-6 py-5 flex items-center justify-center text-white">
            <div className="text-2xl font-extrabold tracking-wide">
              CARDIO<span className="opacity-70">PREDICT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 pt-40 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-14 text-[#0B3C5D] text-center">
            About CardioPredict
          </h1>

          {/* How it works */}
          <section className="bg-white rounded-3xl p-12 shadow-sm mb-14">
            <h2 className="text-2xl font-semibold text-[#0B3C5D] mb-6">
              How the System Works
            </h2>

            <div className="space-y-5 text-[#4B5563] leading-relaxed">
              <p>
                CardioPredict uses machine learning models trained on
                cardiovascular health datasets to assess disease risk using
                clinically relevant indicators.
              </p>

              <p>The system evaluates:</p>

              <ul className="space-y-2 pl-5 list-disc marker:text-[#0B3C5D]">
                <li>Demographic data (age, gender)</li>
                <li>Body measurements (height, weight, BMI)</li>
                <li>Blood pressure values</li>
                <li>Cholesterol and glucose levels</li>
                <li>Lifestyle factors (smoking, alcohol, activity)</li>
              </ul>

              <p>
                Results are presented as a clear risk category with practical
                recommendations for prevention and follow-up.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="rounded-3xl p-12 mb-14 bg-[#FFF7F7] border border-red-200">
            <h2 className="text-2xl font-semibold text-red-700 flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6" />
              Medical Disclaimer
            </h2>

            <div className="space-y-4 text-sm text-[#7A1F1F] leading-relaxed">
              <p className="font-semibold">
                This tool is intended for informational purposes only.
              </p>

              <p>
                CardioPredict does <strong>not</strong> replace professional
                medical advice, diagnosis, or treatment. Risk predictions are
                generated using statistical models and may not reflect all
                individual health factors.
              </p>

              <p className="font-semibold">
                Always consult qualified healthcare professionals:
              </p>

              <ul className="space-y-2 pl-5 list-disc marker:text-red-600">
                <li>Do not ignore medical advice</li>
                <li>Do not delay care based on these results</li>
                <li>Seek professional diagnosis and treatment plans</li>
              </ul>

              <p className="font-semibold text-red-700">
                For urgent symptoms such as chest pain or breathing difficulty,
                seek emergency medical care immediately.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-white rounded-3xl p-12 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0B3C5D] mb-6">
              Data Privacy
            </h2>

            <div className="space-y-4 text-[#4B5563] leading-relaxed">
              <p>
                All health data entered into CardioPredict is processed securely
                and is not stored permanently.
              </p>

              <p>
                Hospital CSV uploads are processed in memory and returned
                immediately without long-term retention.
              </p>

              <p className="text-sm text-[#6B7280]">
                This is a demonstration system. Production deployments would
                implement encryption, compliance standards (HIPAA/GDPR), and
                secure infrastructure.
              </p>
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center mt-20">
            <Button
              size="lg"
              className="rounded-full px-12 bg-[#0B3C5D] text-white hover:bg-[#0B3C5D]/90"
              asChild
            >
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
