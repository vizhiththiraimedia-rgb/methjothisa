"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, Star, Zap, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NumerologyPage() {
  const { t, language } = useLanguage();
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Your numerology report is being generated. This is a demo preview.");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              {language === "si" ? "සංඛ්‍යා ශාස්ත්‍රය" : "Numerology"}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "si" ? "සංඛ්‍යා විද්‍යාව හරහා ඔබගේ පෞරුෂත්වය, ඉරණම සහ අනාගතය පිළිබඳ විස්තර දැනගන්න." : "Discover the power of numbers in your life. Get insights into your personality, destiny, and future through numerology."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Hash className="h-5 w-5 text-amber-600" /> {language === "si" ? "විස්තර ඇතුළත් කරන්න" : "Enter Details"}</CardTitle>
                <CardDescription>Get your personalized numerology report</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "සම්පූර්ණ නම" : "Full Name"}</label>
                      <Input placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් දිනය" : "Date of Birth"}</label>
                      <Input type="date" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Email (for report delivery)</label>
                      <Input type="email" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <Button type="submit" variant="cosmic" size="lg" className="w-full">Generate Numerology Report</Button>
                </form>
                {result && (
                  <div className="mt-6 p-4 rounded-md bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-700 dark:text-amber-300">{result}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "si" ? "ඔබට ලැබෙන දේවල්" : "What You Get"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Hash, text: language === "si" ? "ජීවන මාර්ග අංකය විශ්ලේෂණය" : "Life path number analysis" },
                  { icon: Star, text: "Destiny number insights" },
                  { icon: Zap, text: "Soul urge number" },
                  { icon: TrendingUp, text: "Personal year predictions" },
                  { icon: Sparkles, text: language === "si" ? "වාසනාවන්ත අංක සහ වර්ණ" : "Lucky numbers and colors" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "si" ? "ආශ්‍රිත සේවාවන්" : "Related Services"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/free-horoscope"><Button variant="outline" className="w-full justify-start">Free Horoscope</Button></Link>
                <Link href="/gemstone"><Button variant="outline" className="w-full justify-start">{language === "si" ? "මැණික් නිර්දේශය" : "Gem Recommendation"}</Button></Link>
                <Link href="/reports"><Button variant="outline" className="w-full justify-start">All Reports</Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
