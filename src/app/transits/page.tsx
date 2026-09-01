"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TransitsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Planetary Transits</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Understand how Jupiter, Saturn, Rahu, and Ketu transits affect your life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Jupiter Transit", desc: "Jupiter transit predictions for career, wealth, and relationships", href: "/offers" },
            { title: "Saturn Transit", desc: "Saturn transit effects and remedies for challenges", href: "/offers" },
            { title: "Rahu-Ketu Transit", desc: "Rahu and Ketu transit predictions and remedies", href: "/offers" },
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={item.href}><Button variant="cosmic" className="w-full">View Details</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
