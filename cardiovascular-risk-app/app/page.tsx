import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, HeartPulse, Hospital, ShieldCheck, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <HeartPulse className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">CardioPredict</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            <span>AI-Powered Risk Assessment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Predict Cardiovascular Disease Risk Early
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto leading-relaxed">
            Advanced machine learning technology to assess cardiovascular health risks. Get personalized insights and
            actionable health recommendations in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/select-user-type">Check Your Risk</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
              <Link href="/select-user-type">Hospital Upload</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CardioPredict</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Combining cutting-edge AI with medical expertise to provide accurate, actionable cardiovascular risk
              assessments
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced machine learning models trained on extensive cardiovascular datasets for accurate risk
                  prediction
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive tailored health recommendations based on your unique risk profile and lifestyle factors
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clinical Grade Accuracy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Medical-grade assessments validated against clinical standards for reliable results
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Hospital className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hospital Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bulk patient data upload and analysis for healthcare providers and medical institutions
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Simple interface designed for both individuals and healthcare professionals
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <HeartPulse className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Actionable Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Clear risk levels with specific diet, lifestyle, and medical recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Get your cardiovascular risk assessment in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Your Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              Provide basic health information including age, blood pressure, cholesterol, and lifestyle factors
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our machine learning model processes your data to calculate your cardiovascular risk score
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-muted-foreground leading-relaxed">
              Receive your risk assessment with personalized health recommendations and action steps
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Take Control of Your Heart Health Today</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Early detection and prevention are key to cardiovascular health. Start your risk assessment now.
          </p>
          <Button size="lg" variant="secondary" className="text-base px-8" asChild>
            <Link href="/select-user-type">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <HeartPulse className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">CardioPredict</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                Disclaimer
              </Link>
              <span>© 2025 CardioPredict</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
