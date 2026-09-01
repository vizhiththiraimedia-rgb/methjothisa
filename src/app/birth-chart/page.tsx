"use client";
import React from 'react';



import { BirthChartForm } from "@/components/forms/birth-chart-form";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Sparkles, Zap, Shield } from "lucide-react";

export default function BirthChartPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {language === "si" ? "ඔබේ කේන්ද්‍ර සටහන සාදන්න" : "Generate Your Birth Chart"}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "si" ? "ගණිතමය වශයෙන් නිවැරදි කේන්ද්‍ර සටහනක් සෑදීමට ඔබගේ උපන් විස්තර ඇතුළත් කරන්න." : "Enter your birth details to generate a mathematically accurate chart."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "si" ? "උපන් විස්තර" : "Birth Details"}</CardTitle>
                  <CardDescription>{language === "si" ? "නිවැරදි ගණනය කිරීම් සඳහා ඔබගේ නිවැරදි උපන් තොරතුරු ඇතුළත් කරන්න" : "Fill in your accurate birth information for precise calculations"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <BirthChartForm />
                  </React.Suspense>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{language === "si" ? "නිවැරදි තොරතුරු වැදගත් වන්නේ ඇයි?" : "Why Accurate Details Matter"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Globe, text: language === "si" ? "නිවැරදි අක්ෂාංශ/දේශාංශ මඟින් නිශ්චිත ග්‍රහ පිහිටීම් සහතික කරයි" : "Precise latitude/longitude ensures exact planetary positions" },
                    { icon: Zap, text: language === "si" ? "නිවැරදි වේලා ගණනය කිරීම් සඳහා වේලා කලාපය සහ DST නිවැරදි කිරීම්" : "Timezone and DST corrections for accurate time calculations" },
                    { icon: Sparkles, text: language === "si" ? "වෛදික නිරවද්‍යතාවය සඳහා විවිධ අයනාංශ පද්ධති" : "Multiple Ayanamsa systems for Vedic accuracy" },
                                      ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
