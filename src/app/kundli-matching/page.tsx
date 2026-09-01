"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function KundliMatchingPage() {
  const { t, language } = useLanguage();
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult("පොරොන්දම් විශ්ලේෂණය ගණනය වෙමින් පවතී. මෙය ආදර්ශයකි.");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl ${language === 'si' ? 'elegant-sinhala text-transparent bg-clip-text bg-gradient-to-r from-[#a6192e] to-orange-500' : 'font-display text-[#1a365d]'} font-bold mb-4`}>
            {language === 'si' ? 'පොරොන්දම් පරීක්ෂාව' : 'Kundli Matching'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "si" ? "වෛදික ජ්‍යෝතිෂය භාවිතා කරමින් විවාහ ගැළපුම පරීක්ෂා කරන්න. අෂ්ටකූට ගැළපීම සහ දෝෂ පිළිබඳ සවිස්තරාත්මක විශ්ලේෂණයක් ලබා ගන්න." : "Check marriage compatibility using Vedic astrology. Detailed analysis of Ashtakoota matching and doshas."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-pink-600" /> {language === "si" ? "විස්තර ඇතුළත් කරන්න" : "Enter Details"}</CardTitle>
                <CardDescription>{language === "si" ? "මනාලියගේ සහ මනාලයාගේ උපන් විස්තර ලබා දෙන්න" : "Provide birth details for both bride and groom"}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-pink-600">{language === "si" ? "මනාලියගේ විස්තර" : "Bride Details"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder={language === "si" ? "සම්පූර්ණ නම" : "Full Name"} required />
                      <Input type="date" required />
                      <Input type="time" required />
                      <Input placeholder={language === "si" ? "උපන් ස්ථානය" : "Birth Place"} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-blue-600">{language === "si" ? "මනාලයාගේ විස්තර" : "Groom Details"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder={language === "si" ? "සම්පූර්ණ නම" : "Full Name"} required />
                      <Input type="date" required />
                      <Input type="time" required />
                      <Input placeholder={language === "si" ? "උපන් ස්ථානය" : "Birth Place"} required />
                    </div>
                  </div>
                  <Button type="submit" variant="cosmic" size="lg" className="w-full">{language === "si" ? "ගැළපුම පරීක්ෂා කරන්න" : "Check Compatibility"}</Button>
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
                <CardTitle className="text-lg">{language === "si" ? "අප විශ්ලේෂණය කරන දෑ" : "What We Analyze"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Users, text: language === "si" ? "අෂ්ටකූට ගැළපීම (ලකුණු 36)" : "Ashtakoota matching (36 points)" },
                  { icon: Heart, text: language === "si" ? "නැකැත් ගැළපීම" : "Nakshatra compatibility" },
                  { icon: Sparkles, text: language === "si" ? "භෞම / කුජ දෝෂ පරීක්ෂාව" : "Mangal Dosha check" },
                  { icon: CheckCircle2, text: language === "si" ? "ගුණ සම්පත් විශ්ලේෂණය" : "Guna Milan analysis" },
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
                <Link href="/marriage-predictions"><Button variant="outline" className="w-full justify-start">{language === "si" ? "විවාහ අනාවැකි" : "Marriage Predictions"}</Button></Link>
                <Link href="/compatibility"><Button variant="outline" className="w-full justify-start">{language === "si" ? "ආදර ගැළපීම" : "Love Compatibility"}</Button></Link>
                <Link href="/numerology"><Button variant="outline" className="w-full justify-start">{language === "si" ? "සංඛ්‍යා විද්‍යා ගැළපීම" : "Numerology Matching"}</Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
