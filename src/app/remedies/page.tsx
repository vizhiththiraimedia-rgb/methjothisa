"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface Remedy {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price?: number;
  currency: string;
  description?: string;
  image?: string;
}

export default function RemediesPage() {
  const { t } = useLanguage();
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetch("/api/remedies?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setRemedies(result.data); });
  }, []);

  const categories = Array.from(new Set(remedies.map((r) => r.category)));
  const filtered = selectedCategory ? remedies.filter((r) => r.category === selectedCategory) : remedies;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Astrology Remedies - Puja / Havan
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Spiritual remedies and puja services to overcome obstacles and enhance positive energies in your life.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button
            variant={selectedCategory === "" ? "cosmic" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "cosmic" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((remedy) => (
            <Card key={remedy.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  {remedy.image ? (
                    <img src={remedy.image} alt={remedy.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{remedy.name}</h3>
                  {remedy.subCategory && <p className="text-xs text-muted-foreground">{remedy.subCategory}</p>}
                  {remedy.price && (
                    <p className="text-sm font-semibold text-purple-600 mt-1">
                      {remedy.currency === "INR" ? "₹" : remedy.currency} {remedy.price.toLocaleString()}
                    </p>
                  )}
                  <Link href={`/remedies/${remedy.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Know More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/remedies">
            <Button variant="outline" size="lg">View All Remedies</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
