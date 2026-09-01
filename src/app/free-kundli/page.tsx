"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FreeKundliPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Free Kundli</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Generate your free Janam Kundli with accurate planetary positions.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Enter Birth Details</CardTitle>
            <CardDescription>Fill in your details to generate your free Kundli</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="date" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="time" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="text" placeholder="Birth Place" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <Button variant="cosmic" size="lg" className="w-full mt-4">Generate Free Kundli</Button>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/birth-chart"><Button variant="outline">Or generate detailed Birth Chart</Button></Link>
        </div>
      </div>
    </div>
  );
}
