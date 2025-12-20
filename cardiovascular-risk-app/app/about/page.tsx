import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartPulse, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">About CardioPredict</h1>

          <Card className="mb-6">
            <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-semibold text-foreground">How the System Works</h2>
              <p>
                CardioPredict uses advanced machine learning algorithms trained on extensive cardiovascular health
                datasets to assess your risk of cardiovascular disease. The system analyzes multiple factors including:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Demographic information (age, gender)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Physical measurements (height, weight, BMI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Blood pressure readings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cholesterol and glucose levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lifestyle factors (smoking, alcohol consumption, physical activity)</span>
                </li>
              </ul>
              <p>
                The AI model processes this information to generate a risk score and classification (Low, Medium, or
                High risk), along with personalized recommendations for improving your cardiovascular health.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Important Medical Disclaimer
              </h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p className="font-semibold text-foreground">
                  This tool is for informational and educational purposes only.
                </p>
                <p>
                  CardioPredict is NOT a substitute for professional medical advice, diagnosis, or treatment. The risk
                  assessments provided by this system should not be used as the sole basis for making medical decisions.
                </p>
                <p>
                  The predictions are based on statistical models and may not account for all individual health factors,
                  medical history, family history, or other conditions that could affect your cardiovascular risk.
                </p>
                <p className="font-semibold text-foreground">
                  Always seek the advice of qualified healthcare providers:
                </p>
                <ul className="space-y-1 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Never disregard professional medical advice because of information from this tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Never delay seeking medical attention because of results from this assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Always consult with a physician for medical advice and treatment plans</span>
                  </li>
                </ul>
                <p className="font-semibold text-destructive">
                  If you experience chest pain, shortness of breath, or other serious symptoms, seek immediate emergency
                  medical attention by calling your local emergency services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-semibold text-foreground">Data Privacy</h2>
              <p>
                We take your privacy seriously. All health data entered into this system is processed securely and is
                not stored permanently on our servers. For hospital users uploading CSV files, data is processed in
                memory and results are returned immediately without long-term storage.
              </p>
              <p className="text-sm">
                This is a demonstration application. In a production environment, proper data encryption, HIPAA
                compliance, and secure data handling procedures would be implemented.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
