"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { t, language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handlePayPalClick = (packageId: string) => {
    setIsProcessing(packageId);
    // Simulate PayPal redirect/loading
    setTimeout(() => {
      alert("PayPal Integration is ready! Waiting for Admin's PayPal Client ID & Secret to complete the payment flow.");
      setIsProcessing(null);
    }, 1500);
  };

  const packages = [
    {
      id: "free",
      name: language === "si" ? "මූලික (නොමිලේ)" : "Basic (Free)",
      price: "$0",
      description: language === "si" ? "සාමාන්‍ය ජ්‍යෝතිෂ්‍ය තොරතුරු සඳහා" : "For basic astrological insights",
      features: [
        language === "si" ? "ලග්න සහ රාශි කේන්ද්‍රය (D1)" : "Basic Rasi Chart (D1)",
        language === "si" ? "ග්‍රහ පිහිටීම්" : "Planetary Positions & Degrees",
        language === "si" ? "සුරැකි කේන්ද්‍ර සටහන් (උපරිම 3)" : "Save up to 3 profiles",
      ],
      buttonText: language === "si" ? "දැන් භාවිතා කරන්න" : "Get Started",
      popular: false,
      isPayPal: false
    },
    {
      id: "premium",
      name: language === "si" ? "ප්‍රිමියම් (Premium)" : "Premium Book",
      price: "$9.99",
      description: language === "si" ? "සම්පූර්ණ කර්ම විශ්ලේෂණය සහ පලාඵල" : "Full Karmic analysis and PDF reports",
      features: [
        language === "si" ? "මූලික පහසුකම් සියල්ල" : "Everything in Basic",
        language === "si" ? "A-Z සම්පූර්ණ ජීවන වාර්තාව" : "Full A-Z Life Report",
        language === "si" ? "ගැඹුරු කර්ම විශ්ලේෂණය (Admin Updates)" : "Deep Karmic Analysis (Admin Controlled)",
        language === "si" ? "ප්‍රතිකර්ම සහ පූජා විස්තර" : "Remedial Poojas & Solutions",
        language === "si" ? "අසීමිතව කේන්ද්‍ර සටහන් සුරැකීම" : "Unlimited Saved Profiles",
        language === "si" ? "පොතක් ලෙස PDF බාගත කිරීම" : "Download Beautiful Book-style PDF",
      ],
      buttonText: "Pay with PayPal",
      popular: true,
      isPayPal: true
    },
    {
      id: "consultation",
      name: language === "si" ? "විශේෂ උපදේශන" : "Astrologer Connect",
      price: "$24.99",
      description: language === "si" ? "ප්‍රවීණ ජ්‍යෝතිෂවේදියෙකු සමඟ සාකච්ඡා" : "1-on-1 Consultation with an Astrologer",
      features: [
        language === "si" ? "ප්‍රිමියම් පහසුකම් සියල්ල" : "Everything in Premium",
        language === "si" ? "විනාඩි 30ක සජීවී උපදේශනය" : "30-Min Live Consultation",
        language === "si" ? "ප්‍රශ්න ඇසීමේ හැකියාව" : "Direct Q&A regarding your chart",
        language === "si" ? "විශේෂ මුහුර්ත සෑදීම" : "Custom Muhurtha creation",
      ],
      buttonText: "Pay with PayPal",
      popular: false,
      isPayPal: true
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-purple-950 ${language === "si" ? "elegant-sinhala" : "font-display"}`}>
            {language === "si" ? "ප්‍රිමියම් පැකේජ තෝරාගන්න" : "Choose Your Upgrade Package"}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === "si" 
              ? "ඔබගේ අවශ්‍යතාවයට සරිලන පරිදි පැකේජය තෝරාගන්න. Admin විසින් තවත් ප්‍රතිලාභ ඉදිරියේදී යාවත්කාලීන කරනු ඇත." 
              : "Upgrade your journey with our exclusive packages. Benefits are dynamically controlled by the Admin. PayPal is integrated and ready!"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${pkg.popular ? 'border-amber-400 shadow-lg scale-105 z-10' : 'border-slate-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 text-center">
                  {language === "si" ? "වඩාත් ජනප්‍රියයි" : "Most Popular"}
                </div>
              )}
              
              <CardHeader className={`pt-8 ${pkg.popular ? 'bg-amber-50/50' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${pkg.popular ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'}`}>
                    {pkg.id === 'free' && <Star className="w-6 h-6" />}
                    {pkg.id === 'premium' && <Crown className="w-6 h-6" />}
                    {pkg.id === 'consultation' && <Sparkles className="w-6 h-6" />}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">{pkg.name}</CardTitle>
                <CardDescription className="text-sm mt-1">{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                  {pkg.price !== "$0" && <span className="text-muted-foreground ml-1">/ one-time</span>}
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-0.5 ${pkg.popular ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm text-slate-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4 pb-8">
                {pkg.isPayPal ? (
                  <Button 
                    onClick={() => handlePayPalClick(pkg.id)}
                    disabled={isProcessing === pkg.id}
                    className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold h-12 shadow-md transition-colors"
                  >
                    {isProcessing === pkg.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting to PayPal...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center w-full">
                        <span className="italic mr-1">Pay</span><span className="italic text-[#00a6e0]">Pal</span>
                      </span>
                    )}
                  </Button>
                ) : (
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-100">
                      {pkg.buttonText}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Admin Info Banner */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-900 mb-1">{language === "si" ? "Admin පණිවිඩය" : "Admin Note"}</h4>
            <p className="text-blue-800/80 text-sm">
              {language === "si" 
                ? "මෙම පැකේජයන්හි අඩංගු ප්‍රතිලාභ (Benefits) Admin විසින් අනාගතයේදී වෙනස් කිරීමට සහ යාවත්කාලීන කිරීමට හැකිවන පරිදි සකසා ඇත. PayPal හරහා මුදල් ගෙවීම් පද්ධතිය සම්පූර්ණයෙන්ම සූදානම් කර ඇති අතර, Admin ගේ PayPal විස්තර ඇතුළත් කළ පසු එය සක්‍රීය වනු ඇත." 
                : "The benefits in these packages are designed so that the Admin can decide and update them in the future. The PayPal integration structure is ready, waiting only for your PayPal details to go fully live."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
