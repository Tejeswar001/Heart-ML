"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartPulse, Hospital, User } from "lucide-react";
import Link from "next/link";

export default function SelectUserTypePage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
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
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B3C5D]">
              Choose How You Want to Continue
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Select the option that best describes how you will use
              CardioPredict.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Individual */}
            <Card className="rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0B3C5D]/10 flex items-center justify-center mb-6">
                  <User className="w-8 h-8 text-[#0B3C5D]" />
                </div>
                <CardTitle className="text-2xl text-[#0B3C5D]">
                  Individual User
                </CardTitle>
                <CardDescription className="text-base text-[#4B5563] leading-relaxed">
                  Get a personalized cardiovascular risk assessment for
                  yourself.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 text-sm text-[#4B5563] mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0B3C5D] mt-0.5">✓</span>
                    <span>Quick and simple health data form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0B3C5D] mt-0.5">✓</span>
                    <span>Instant risk prediction results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0B3C5D] mt-0.5">✓</span>
                    <span>Personalized lifestyle & diet advice</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full rounded-full bg-[#0B3C5D] text-white hover:bg-[#0B3C5D]/90"
                  asChild
                >
                  <Link href="/predict">Continue as Individual</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hospital */}
            <Card className="rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
                  <Hospital className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-2xl text-[#0B3C5D]">
                  Hospital / Medical Official
                </CardTitle>
                <CardDescription className="text-base text-[#4B5563] leading-relaxed">
                  Upload and analyze cardiovascular risk data for multiple
                  patients.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 text-sm text-[#4B5563] mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-0.5">✓</span>
                    <span>Bulk CSV patient data upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-0.5">✓</span>
                    <span>Batch risk analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-0.5">✓</span>
                    <span>Patient risk overview dashboard</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full rounded-full bg-pink-400 text-[#3A0F2E] hover:bg-pink-300"
                  asChild
                >
                  <Link href="/hospital-upload">Continue as Hospital</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-sm text-[#4B5563] hover:text-[#0B3C5D] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
