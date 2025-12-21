"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion, easeInOut, useInView } from "framer-motion";
import {
  Activity,
  TrendingUp,
  ShieldCheck,
  Hospital,
  Users,
  HeartPulse,
} from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: 140,
    rotate: direction * -4,
  }),
  visible: (direction: number) => ({
    opacity: 1,
    y: 0,
    rotate: direction * -1.5,
    transition: {
      duration: 0.9,
      ease: easeInOut,
    },
  }),
  exit: (direction: number) => ({
    opacity: 0,
    y: -120,
    rotate: direction * 2,
    transition: {
      duration: 0.7,
      ease: easeInOut,
    },
  }),
};

const features = [
  {
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning models trained on extensive cardiovascular datasets for accurate risk prediction.",
    icon: Activity,
  },
  {
    title: "Personalized Insights",
    description:
      "Receive tailored health recommendations based on your unique risk profile and lifestyle factors.",
    icon: TrendingUp,
  },
  {
    title: "Clinical Grade Accuracy",
    description:
      "Medical-grade assessments validated against clinical standards for reliable results.",
    icon: ShieldCheck,
  },
  {
    title: "Hospital Integration",
    description:
      "Bulk patient data upload and analysis for healthcare providers and medical institutions.",
    icon: Hospital,
  },
  {
    title: "For Everyone",
    description:
      "Simple interface designed for both individuals and healthcare professionals.",
    icon: Users,
  },
  {
    title: "Actionable Results",
    description:
      "Clear risk levels with specific diet, lifestyle, and medical recommendations.",
    icon: HeartPulse,
  },
];

export default function HomePage() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
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
    <div className="min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-4 mt-4 rounded-3xl bg-[#0B3C5D]">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between text-white">
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/predict">Individual</Link>
              <Link href="/hospital-upload">Hospital</Link>
              <Link href="https://github.com/Tejeswar001/Heart-ML">GitHub</Link>
            </nav>

            <div className="text-2xl font-extrabold">
              CARDIO<span className="opacity-70">PREDICT</span>
            </div>

            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/about">About</Link>
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How it works</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#0B3C5D] text-white overflow-hidden rounded-3xl m-4">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
              <Activity className="w-4 h-4" />
              <span>AI-Powered Risk Assessment</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
              PREDICT
              <br />
              <span className="relative inline-block mt-4">
                <span className="relative z-10 px-6 py-3 text-[#3A0F2E]">
                  HEART DISEASE RISK
                </span>
                <span className="absolute inset-0 bg-pink-300 rounded-md -z-0"></span>
              </span>
              <br />
              EARLY
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              Advanced machine learning to assess cardiovascular risk and
              deliver personalized diet, lifestyle, and medical recommendations
              in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="inline-flex items-center bg-white rounded-full p-1 gap-1">
              <Button
                size="lg"
                className="rounded-full px-8 text-base bg-pink-400 text-[#3A0F2E] hover:bg-pink-300"
                asChild
              >
                <Link href="/select-user-type">I am an Individual</Link>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-8 text-base text-[#0B3C5D] hover:bg-gray-100"
                asChild
              >
                <Link href="/select-user-type">I am a Hospital</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Left Illustration Placeholder */}
        <div className="absolute left-20 bottom-10 hidden md:flex w-60 h-60  items-center justify-center text-6xl">
          <img
            src="https://phamilypharma.com/media/site/cc4d463c61-1724944687/hands-hello.svg"
            alt="Heart Illustration"
            className="w-60 h-60"
          />
        </div>

        {/* Right Illustration Placeholder */}
        <div className="absolute right-20 top-32 hidden md:flex w-60 h-60 items-center justify-center">
          <img
            src="https://phamilypharma.com/media/site/f4ecf8b800-1724944688/hands-heart.svg"
            alt="Heart Illustration"
            className="w-60 h-60"
          />
        </div>
      </section>
      {/* Features Grid */}
      <section id="features" className="bg-[#FBF8F3] py-32">
        {/* Section Heading */}
        <div className="container mx-auto px-4 mb-16 text-center">
          <p className="text-sm font-semibold text-[#0B3C5D] mb-3">
            Our solution
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            SMART HEART CARE.
            <br />
            <span className="relative inline-block mt-3">
              <span className="relative z-10 px-4 py-2 text-[#3A0F2E]">
                ZERO CONFUSION
              </span>
              <span className="absolute inset-0 bg-pink-300 -z-0 rounded-md" />
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-10 shadow-sm border border-black/5
             hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0B3C5D]/10 flex items-center justify-center mb-6">
                    <Icon
                      className="w-7 h-7 text-[#0B3C5D]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-semibold text-[#0B3C5D] mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-[#4B5563] leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#F7F9FC] py-32">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-[#0B3C5D] mb-3">
              Simple Process
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              How It Works
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Get your cardiovascular risk assessment in three clear, easy steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5 text-center">
              <div
                className="w-14 h-14 rounded-full bg-[#0B3C5D]/10 text-[#0B3C5D]
                        flex items-center justify-center text-xl font-bold mx-auto mb-6"
              >
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#0B3C5D]">
                Enter Your Data
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                Provide basic health information such as age, blood pressure,
                cholesterol, and lifestyle factors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5 text-center">
              <div
                className="w-14 h-14 rounded-full bg-[#0B3C5D]/10 text-[#0B3C5D]
                        flex items-center justify-center text-xl font-bold mx-auto mb-6"
              >
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#0B3C5D]">
                AI Analysis
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                Our machine learning model analyzes your data to calculate your
                cardiovascular disease risk.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5 text-center">
              <div
                className="w-14 h-14 rounded-full bg-[#0B3C5D]/10 text-[#0B3C5D]
                        flex items-center justify-center text-xl font-bold mx-auto mb-6"
              >
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#0B3C5D]">
                Get Results
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                Receive clear risk levels along with personalized diet,
                lifestyle, and medical recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B3C5D] py-32">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-[#0B3C5D] text-white px-10 py-20 text-center overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

            <h2 className="relative text-4xl md:text-5xl font-extrabold mb-6">
              Take Control of Your Heart Health Today
            </h2>

            <p className="relative text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Early detection and prevention are key to cardiovascular health.
              Get your AI-powered risk assessment in minutes.
            </p>

            <Button
              size="lg"
              className="relative rounded-full px-10 text-base bg-pink-400 text-[#3A0F2E]
                   hover:bg-pink-300"
              asChild
            >
              <Link href="/select-user-type">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B3C5D] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold">
                Cardio<span className="opacity-70">Predict</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-white/70">
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </Link>
              <span className="text-white/50">© 2025 CardioPredict</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
