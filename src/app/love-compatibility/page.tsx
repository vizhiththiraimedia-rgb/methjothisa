"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoveCompatibilityPage() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Love Compatibility</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Check romantic compatibility between two zodiac signs.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{language === "si" ? "විස්තර ඇතුළත් කරන්න" : "Enter Details"}</CardTitle>
            <CardDescription>Provide birth details for both partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Person 1 Name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="text" placeholder="Person 2 Name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="date" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="date" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <Button variant="cosmic" size="lg" className="w-full mt-4">Check Love Compatibility</Button>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/compatibility"><Button variant="outline">Full Horoscope Matching</Button></Link>
        </div>
      </div>
    </div>
  );
}
