"use client";
import React from 'react';

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BirthChartForm } from "@/components/forms/birth-chart-form";

export default function FreeBirthChartPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Free Birth Chart</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get your free Vedic birth chart with planetary positions and houses.</p>
        </div>
        <Card className="max-w-4xl mx-auto border-primary/30 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle>Enter Birth Details</CardTitle>
            <CardDescription>Fill in your details to generate your free birth chart</CardDescription>
          </CardHeader>
          <CardContent>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BirthChartForm />
            </React.Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
