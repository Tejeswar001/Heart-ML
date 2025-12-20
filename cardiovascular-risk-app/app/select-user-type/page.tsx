import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Hospital, User } from "lucide-react"
import Link from "next/link"

export default function SelectUserTypePage() {
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

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Select User Type</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Choose how you would like to use CardioPredict
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Individual User</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get a personalized cardiovascular risk assessment for yourself
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Quick health data entry form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Instant risk assessment results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Personalized health recommendations</span>
                  </li>
                </ul>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/predict">Continue as Individual</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-colors">
                  <Hospital className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Hospital / Medical Official</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Upload and analyze multiple patient records at once
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Bulk CSV file upload support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Batch risk analysis for multiple patients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Dashboard with patient risk overview</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                  <Link href="/hospital-upload">Continue as Hospital</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
