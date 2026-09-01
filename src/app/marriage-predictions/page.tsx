"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Calendar, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function MarriagePredictionsPage() {
  const { t, language } = useLanguage();
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Your marriage predictions are being generated. This is a demo preview.");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {language === "si" ? "විවාහ අනාවැකි" : "Marriage Predictions"}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "si" ? "ඔබේ විවාහය සිදුවන කාලය, සහකරුගේ/සහකාරියගේ ලක්ෂණ සහ සබඳතා පිළිබඳ නිවැරදි අනාවැකි." : "Accurate marriage timing, spouse characteristics, and relationship insights based on your birth chart."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-pink-600" /> {language === "si" ? "උපන් විස්තර ඇතුළත් කරන්න" : "Enter Birth Details"}</CardTitle>
                <CardDescription>Get detailed marriage and relationship predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "සම්පූර්ණ නම" : "Full Name"}</label>
                      <Input placeholder={language === "si" ? "ඔබගේ නම ඇතුළත් කරන්න" : "Enter your name"} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "ස්ත්‍රී / පුරුෂ භාවය" : "Gender"}</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="male">{language === "si" ? "පුරුෂ" : "Male"}</option>
                        <option value="female">{language === "si" ? "ස්ත්‍රී" : "Female"}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් දිනය" : "Date of Birth"}</label>
                      <Input type="date" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් වේලාව" : "Birth Time"}</label>
                      <Input type="time" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් ස්ථානය" : "Birth Place"}</label>
                      <Input placeholder={language === "si" ? "නගරය, රට" : "City, Country"} required />
                    </div>
                  </div>
                  <Button type="submit" variant="cosmic" size="lg" className="w-full">{language === "si" ? "විවාහ අනාවැකි ලබාගන්න" : "Generate Marriage Predictions"}</Button>
                </form>
                {result && (
                  <div className="mt-6 p-4 rounded-md bg-pink-500/10 border border-pink-500/20">
                    <p className="text-sm text-pink-700 dark:text-pink-300">{result}</p>
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
                  { icon: Calendar, text: language === "si" ? "විවාහය සිදුවිය හැකි කාලය" : "Likely marriage timing" },
                  { icon: Users, text: language === "si" ? "සහකරුගේ / සහකාරියගේ ලක්ෂණ" : "Spouse characteristics" },
                  { icon: Heart, text: language === "si" ? "විවාහ ජීවිතය පිළිබඳ අනාවැකි" : "Married life predictions" },
                  { icon: Sparkles, text: language === "si" ? "ගැළපෙන සාධක" : "Compatibility factors" },
                  { icon: CheckCircle2, text: language === "si" ? "විවාහය ප්‍රමාද වීමට පිළියම්" : "Remedies for delayed marriage" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-pink-600" />
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
                <Link href="/kundli-matching"><Button variant="outline" className="w-full justify-start">Kundli Matching</Button></Link>
                <Link href="/compatibility"><Button variant="outline" className="w-full justify-start">{language === "si" ? "ආදර ගැළපීම" : "Love Compatibility"}</Button></Link>
                <Link href="/free-horoscope"><Button variant="outline" className="w-full justify-start">Free Horoscope</Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
