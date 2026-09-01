"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, BarChart3, Heart, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const { t } = useLanguage();

  const reports = [
    { icon: Sparkles, title: "Personality Report", description: "Deep insights into your personality traits", href: "/reports/personality", color: "from-purple-500 to-indigo-500" },
    { icon: Briefcase, title: "Career Report", description: "Professional growth and opportunities", href: "/reports/career", color: "from-indigo-500 to-blue-500" },
    { icon: Heart, title: "Love & Marriage", description: "Relationship compatibility and timing", href: "/reports/love", color: "from-pink-500 to-rose-500" },
    { icon: TrendingUp, title: "Finance Report", description: "Wealth and financial prospects", href: "/reports/finance", color: "from-green-500 to-emerald-500" },
    { icon: BarChart3, title: "Yearly Predictions", description: "Comprehensive yearly forecast", href: "/reports/yearly", color: "from-amber-500 to-orange-500" },
    { icon: FileText, title: "Health Report", description: "Health analysis and remedies", href: "/reports/health", color: "from-red-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">AI-Generated Reports</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive astrological reports powered by AI with detailed insights and predictions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, i) => (
            <Link key={i} href={report.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <report.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
