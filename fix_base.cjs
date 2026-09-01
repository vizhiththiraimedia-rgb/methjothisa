const fs = require('fs');

const missingTop = `"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Moon, Sun, Sparkles, Loader2 } from "lucide-react";
import { ChartRenderer } from "@/components/astrology/chart-renderer";

export default function ChartPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'east'>('south');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    async function fetchChart() {
      try {
        const res = await fetch(\`/api/charts/\${id}\`);
        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.error("Failed to fetch chart", err);
      } finally {
        setLoading(false);
      }
    }
    fetchChart();
  }, [id]);

  const handleExportPDF = () => { setIsExporting(true); setTimeout(() => setIsExporting(false), 2000); };
  const handleShare = () => { alert("Share link copied!"); };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-red-500">
        Failed to load chart data.
      </div>
    );
  }

  // Formatting planets array from chartData.planetaryPositions for the ChartRenderer
  const planets = Object.keys(chartData.planetaryPositions || {}).map(name => ({
    name,
    ...chartData.planetaryPositions[name]
  }));

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-900 dark:text-purple-100">Super Horoscope</h1>
          <p className="text-muted-foreground">Comprehensive Vedic Astrology Report</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Tabs defaultValue="basic" className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="flex flex-wrap w-full justify-center gap-1 bg-transparent">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="varga">Varga</TabsTrigger>
                <TabsTrigger value="maitri">Maitri</TabsTrigger>
                <TabsTrigger value="planets">Planets</TabsTrigger>
                <TabsTrigger value="analysis">Yogas</TabsTrigger>
                <TabsTrigger value="dasa">Dasa</TabsTrigger>
                <TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>
                <TabsTrigger value="mangal">Mangal Dosha</TabsTrigger>
                <TabsTrigger value="transit">Transit</TabsTrigger>
                <TabsTrigger value="sadesati">Sade Sati</TabsTrigger>
                <TabsTrigger value="ashtakavarga">Ashtakavarga</TabsTrigger>
                <TabsTrigger value="shadbala">Shadbala</TabsTrigger>
                <TabsTrigger value="sudarshana">Sudarshana</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="basic" className="space-y-6">
            </TabsContent>
            
            <TabsContent value="chart" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-100">Rasi Chart (D1)</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="flex gap-2 justify-center mb-6 bg-muted/50 p-1 rounded-lg">
                      <Button variant={chartStyle === 'north' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('north')}>North Indian</Button>
                      <Button variant={chartStyle === 'south' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('south')}>South Indian</Button>
                      <Button variant={chartStyle === 'east' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('east')}>East Indian</Button>
                    </div>
                    <ChartRenderer planets={planets} style={chartStyle} />
                  </CardContent>
                </Card>
            </TabsContent>
`;

let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// Find where the next tab starts (basic tab)
const nextTabStart = content.indexOf('<TabsContent value="planets"');
if (nextTabStart !== -1) {
    const after = content.substring(nextTabStart);
    fs.writeFileSync('src/app/charts/[id]/page.tsx', missingTop + '\\n' + after);
    console.log("Splice successful!");
} else {
    console.log("Could not find basic");
}
