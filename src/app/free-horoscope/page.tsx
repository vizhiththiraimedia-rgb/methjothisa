"use client";
import React, { Suspense } from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Sun, Moon, Star, Zap } from "lucide-react";
import Link from "next/link";

function FreeHoroscopeContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    dob: '',
    time: '',
    place: ''
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        name: searchParams.get('name') || '',
        gender: searchParams.get('gender') || 'male',
        dob: searchParams.get('dob') || '',
        time: searchParams.get('time') || '',
        place: searchParams.get('place') || ''
      });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(language === "si" ? "ඔබගේ කේන්ද්‍රය සකස් වෙමින් පවතී..." : "Generating your horoscope...");
    
    try {
      const submitData = {
        fullName: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dob,
        birthTime: formData.time,
        birthPlace: formData.place,
        latitude: 6.9271, 
        longitude: 79.8612,
        timezone: "Asia/Colombo",
        country: "Sri Lanka",
        ayanamsa: "lahiri",
        chartSystem: "south_indian"
      };

      const response = await fetch("/api/charts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to generate chart");

      const resData = await response.json();
      window.location.href = `/charts/${resData.data.id}`;
    } catch (error) {
      console.error(error);
      setResult(language === "si" ? "දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න." : "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl ${language === 'si' ? 'elegant-sinhala text-transparent bg-clip-text bg-gradient-to-r from-[#a6192e] to-orange-500' : 'font-display text-[#1a365d]'} font-bold mb-4`}>
            {language === 'si' ? 'නොමිලේ කේන්ද්‍රය' : 'Free Horoscope'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "si" ? "ඔබේ උපන් තොරතුරු මත පදනම්ව ඔබගේ නොමිලේ කේන්ද්‍රය ලබා ගන්න. ක්‍රෙඩිට් කාඩ් අවශ්‍ය නොවේ." : "Get your free personalized horoscope based on your birth details. No credit card required."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /> {language === "si" ? "උපන් විස්තර ඇතුළත් කරන්න" : "Enter Birth Details"}</CardTitle>
                <CardDescription>{language === "si" ? "ඔබේ නොමිලේ කේන්ද්‍රය සැකසීමට විස්තර පුරවන්න" : "Fill in your details to generate your free horoscope"}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "සම්පූර්ණ නම" : "Full Name"}</label>
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder={language === "si" ? "ඔබගේ නම ඇතුළත් කරන්න" : "Enter your name"} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "ස්ත්‍රී / පුරුෂ භාවය" : "Gender"}</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="male">{language === "si" ? "පුරුෂ" : "Male"}</option>
                        <option value="female">{language === "si" ? "ස්ත්‍රී" : "Female"}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් දිනය" : "Date of Birth"}</label>
                      <Input name="dob" value={formData.dob} onChange={handleChange} type="date" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් වේලාව" : "Time of Birth"}</label>
                      <Input name="time" value={formData.time} onChange={handleChange} type="time" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">{language === "si" ? "උපන් ස්ථානය (නගරය)" : "Place of Birth (City)"}</label>
                      <Input name="place" value={formData.place} onChange={handleChange} placeholder={language === "si" ? "උපන් ස්ථානය ඇතුළත් කරන්න" : "Enter birth place"} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg font-bold">
                    {language === "si" ? "කේන්ද්‍රය සාදන්න" : "Generate Horoscope"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>{language === "si" ? "ඔබට ලැබෙන්නේ කුමක්ද?" : "What you'll get"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-foreground/10 p-2 rounded-lg">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{language === "si" ? "ලග්නය සහ ලග්න පලාඵල" : "Ascendant & Predictions"}</h3>
                    <p className="text-sm text-primary-foreground/80">{language === "si" ? "ඔබේ මූලික ගතිලක්ෂණ සහ පෞරුෂය" : "Your core traits and personality"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-foreground/10 p-2 rounded-lg">
                    <Moon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{language === "si" ? "චන්ද්‍ර රාශිය" : "Moon Sign"}</h3>
                    <p className="text-sm text-primary-foreground/80">{language === "si" ? "ඔබේ මානසික සහ චිත්තවේගීය ස්වභාවය" : "Your mental and emotional nature"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-foreground/10 p-2 rounded-lg">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{language === "si" ? "නැකත සහ දශා" : "Nakshatra & Dasha"}</h3>
                    <p className="text-sm text-primary-foreground/80">{language === "si" ? "උපන් නැකත සහ ග්‍රහ දශා කාලයන්" : "Birth star and planetary periods"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-foreground/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{language === "si" ? "දෝෂ සහ ප්‍රතිකර්ම" : "Dosha & Remedies"}</h3>
                    <p className="text-sm text-primary-foreground/80">{language === "si" ? "මූලික ග්‍රහ දෝෂ සහ ඒවාට පිළියම්" : "Basic astrological afflictions and remedies"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold text-green-800 mb-2">{language === "si" ? "සාර්ථකයි!" : "Success!"}</h2>
            <p className="text-green-700">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default function FreeHoroscopePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 flex items-center justify-center">Loading...</div>}>
      <FreeHoroscopeContent />
    </Suspense>
  );
}
