"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeFreeHoroscopeForm } from "@/components/forms/home-free-horoscope-form";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const REPORTS_DATA: Record<string, { title: string; description: string; color: string; features: string[] }> = {
  personality: {
    title: "Personality Report",
    description: "Deep insights into your personality traits, strengths, weaknesses, and hidden potential based on your exact birth time.",
    color: "from-purple-500 to-indigo-500",
    features: ["Core Personality Traits", "Hidden Strengths & Talents", "Karmic Life Lessons", "Favorable Colors & Numbers"]
  },
  career: {
    title: "Career Report",
    description: "Professional growth, opportunities, and ideal career paths tailored to your astrological blueprint.",
    color: "from-indigo-500 to-blue-500",
    features: ["Favorable Career Paths", "Financial Success Periods", "Workplace Relationships", "Business vs. Job Analysis"]
  },
  love: {
    title: "Love & Marriage Report",
    description: "Relationship compatibility, timing of marriage, and deep emotional needs in a partner.",
    color: "from-pink-500 to-rose-500",
    features: ["Marriage Timing", "Partner Characteristics", "Kuja Dosha (Manglik) Analysis", "Relationship Dynamics"]
  },
  finance: {
    title: "Finance Report",
    description: "Wealth accumulation, financial prospects, and periods of economic prosperity.",
    color: "from-green-500 to-emerald-500",
    features: ["Wealth Generating Yogas", "Investment Success", "Periods of Financial Gain", "Debt & Loss Analysis"]
  },
  yearly: {
    title: "Yearly Predictions",
    description: "A comprehensive month-by-month forecast of your upcoming year.",
    color: "from-amber-500 to-orange-500",
    features: ["Month-by-Month Forecast", "Major Planetary Transits", "Career & Health Overview", "Important Dates to Watch"]
  },
  health: {
    title: "Health Report",
    description: "Detailed analysis of your physical well-being and astrological remedies for a healthy life.",
    color: "from-red-500 to-pink-500",
    features: ["Vulnerable Health Areas", "Dietary Recommendations", "Stress Management", "Medical Astrology Insights"]
  }
};

export default function ReportDetailPage() {
  const params = useParams();
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type || "personality";
  const report = REPORTS_DATA[type.toLowerCase()] || REPORTS_DATA["personality"];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/reports" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Report Details */}
          <div className="space-y-8">
            <div>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${report.color} text-white mb-6`}>
                <Sparkles className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">{report.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {report.description}
              </p>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">What&apos;s included in this report?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {report.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Form */}
          <Card className="border-t-4 border-t-primary shadow-xl">
            <div className="bg-primary text-primary-foreground py-4 text-center">
              <h2 className="font-bold text-lg">Generate Your {report.title}</h2>
              <p className="text-sm opacity-90">Enter your birth details below</p>
            </div>
            <CardContent className="p-6">
              <HomeFreeHoroscopeForm />
              <p className="text-xs text-muted-foreground text-center mt-4">
               We couldn&apos;t find the report type you&apos;re looking for. Your data is secure and will only be used to generate your astrological report.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
