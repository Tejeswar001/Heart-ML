"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartPulse, Download, Filter, AlertCircle, AlertTriangle, CheckCircle2, Upload } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  age: number
  gender: string
  riskLevel: "low" | "medium" | "high"
  probability: number
}

export default function HospitalDashboardPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [riskFilter, setRiskFilter] = useState<string>("all")

  useEffect(() => {
    const storedPatients = localStorage.getItem("hospitalPatients")
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients)
      setPatients(parsedPatients)
      setFilteredPatients(parsedPatients)
    } else {
      // Add some mock data if none exists
      const mockData: Patient[] = [
        { id: "P001", age: 55, gender: "male", riskLevel: "high", probability: 0.78 },
        { id: "P002", age: 42, gender: "female", riskLevel: "low", probability: 0.15 },
        { id: "P003", age: 68, gender: "male", riskLevel: "medium", probability: 0.52 },
        { id: "P004", age: 35, gender: "female", riskLevel: "low", probability: 0.12 },
        { id: "P005", age: 71, gender: "male", riskLevel: "high", probability: 0.82 },
        { id: "P006", age: 48, gender: "female", riskLevel: "medium", probability: 0.45 },
      ]
      setPatients(mockData)
      setFilteredPatients(mockData)
    }
  }, [])

  useEffect(() => {
    if (riskFilter === "all") {
      setFilteredPatients(patients)
    } else {
      setFilteredPatients(patients.filter((p) => p.riskLevel === riskFilter))
    }
  }, [riskFilter, patients])

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return (
          <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-chart-4/10 text-chart-4 hover:bg-chart-4/20 border-0">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            High
          </Badge>
        )
    }
  }

  const downloadResults = () => {
    const csvHeader = "Patient ID,Age,Gender,Risk Level,Probability\n"
    const csvRows = filteredPatients
      .map((p) => `${p.id},${p.age},${p.gender},${p.riskLevel},${(p.probability * 100).toFixed(1)}%`)
      .join("\n")
    const csvContent = csvHeader + csvRows

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cardio_risk_results_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: patients.length,
    high: patients.filter((p) => p.riskLevel === "high").length,
    medium: patients.filter((p) => p.riskLevel === "medium").length,
    low: patients.filter((p) => p.riskLevel === "low").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <HeartPulse className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">CardioPredict</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/hospital-upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Batch
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Hospital Dashboard</h1>
          <p className="text-muted-foreground text-lg">Patient cardiovascular risk overview and analysis</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.high}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total > 0 ? ((stats.high / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medium Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-4">{stats.medium}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total > 0 ? ((stats.medium / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.low}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total > 0 ? ((stats.low / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Patient Risk Assessment Results</CardTitle>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={downloadResults} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <HeartPulse className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No patients found</p>
                <Button className="mt-4" asChild>
                  <Link href="/hospital-upload">Upload Patient Data</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead className="text-right">Probability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className={patient.riskLevel === "high" ? "bg-destructive/5" : ""}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="capitalize">{patient.gender}</TableCell>
                        <TableCell>{getRiskBadge(patient.riskLevel)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {(patient.probability * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {stats.high > 0 && (
          <Card className="mt-6 bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                High Risk Patients Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <p>
                You have <strong className="text-destructive">{stats.high}</strong> patient(s) identified with high
                cardiovascular risk. We recommend prioritizing follow-up consultations and additional testing for these
                individuals.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
