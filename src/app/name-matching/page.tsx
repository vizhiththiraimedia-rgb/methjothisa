"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NameMatchingPage() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Name Matching</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Check marriage compatibility based on names using numerology.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Enter Names</CardTitle>
            <CardDescription>Provide the names of bride and groom</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Bride Name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <input type="text" placeholder="Groom Name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <Button variant="cosmic" size="lg" className="w-full mt-4">Check Name Matching</Button>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/kundli-matching"><Button variant="outline">Full Kundli Matching</Button></Link>
        </div>
      </div>
    </div>
  );
}
