"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock } from "lucide-react";
import Link from "next/link";

interface Offer {
  id: string;
  title: string;
  subtitle?: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  pages?: string;
  languages?: string;
  delivery?: string;
  image?: string;
  href: string;
}

export default function OffersPage() {
  const { t } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch("/api/offers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setOffers(result.data); });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Seasonal Offers
            </span>
          </h1>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium animate-pulse">
            <Sparkles className="h-4 w-4" />
            Seasonal Offer
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-purple-500/20">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {offer.image ? (
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {offer.discount} OFF
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  {offer.subtitle && <p className="text-sm text-muted-foreground">{offer.subtitle}</p>}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground line-through">₹{offer.originalPrice.toLocaleString()}</span>
                    <span className="text-2xl font-bold text-purple-600">₹{offer.discountedPrice.toLocaleString()}</span>
                  </div>
                  {offer.pages && <p className="text-xs text-muted-foreground">Number of pages: {offer.pages}</p>}
                  {offer.languages && (
                    <div className="flex flex-wrap gap-1">
                      {offer.languages.split(",").slice(0, 4).map((lang) => (
                        <span key={lang} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{lang.trim()}</span>
                      ))}
                    </div>
                  )}
                  {offer.delivery && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Delivered as: {offer.delivery}
                    </p>
                  )}
                  <Link href={offer.href}>
                    <Button variant="cosmic" className="w-full">Buy Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
