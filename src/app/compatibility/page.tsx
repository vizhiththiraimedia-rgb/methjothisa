"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CompatibilityPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Compatibility Analysis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Check compatibility between two individuals using Vedic and Western astrology systems.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-pink-600" /> Match Making</CardTitle>
              <CardDescription>Enter details for both individuals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Person 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder={language === "si" ? "සම්පූර්ණ නම" : "Full Name"} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="date" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="time" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="text" placeholder={language === "si" ? "උපන් ස්ථානය" : "Birth Place"} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Person 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder={language === "si" ? "සම්පූර්ණ නම" : "Full Name"} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="date" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="time" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="text" placeholder={language === "si" ? "උපන් ස්ථානය" : "Birth Place"} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <Button variant="cosmic" className="w-full">Check Compatibility</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
