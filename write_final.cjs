const fs = require('fs');

const imports = `"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Moon, Sun, Sparkles, Loader2 } from "lucide-react";
import { ChartRenderer } from "@/components/astrology/chart-renderer";
`;

const functionalComponent = `
export default function ChartPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'east'>('south');

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

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!chartData) return <div>Failed to load chart</div>;

  const planets = Object.keys(chartData.planetaryPositions || {}).map(name => ({
    name,
    ...chartData.planetaryPositions[name]
  }));

  const renderTabTrigger = (val, label) => (
    <TabsTrigger value={val} className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
      {label}
    </TabsTrigger>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-900">Super Horoscope</h1>
      
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="flex flex-wrap w-full justify-start gap-2 bg-transparent mb-6">
          {renderTabTrigger("chart", "Rasi Chart")}
          {renderTabTrigger("planets", "Planetary Positions")}
          {renderTabTrigger("vargas", "Varga Charts")}
          {renderTabTrigger("ashtakavarga", "Ashtakavarga")}
          {renderTabTrigger("shadbala", "Shadbala")}
          {renderTabTrigger("transit", "Live Transit")}
        </TabsList>

        <TabsContent value="chart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rasi Chart (D1)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" onClick={() => setChartStyle('north')}>North</Button>
                  <Button variant="outline" onClick={() => setChartStyle('south')}>South</Button>
                </div>
                <ChartRenderer planets={planets} style={chartStyle} />
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="planets" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Planetary Positions</CardTitle></CardHeader>
              <CardContent>
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-purple-50"><th className="p-2 border">Planet</th><th className="p-2 border">Sign</th><th className="p-2 border">Degree</th></tr>
                  </thead>
                  <tbody>
                    {planets.map(p => (
                      <tr key={p.name}>
                        <td className="p-2 border font-bold">{p.name}</td>
                        <td className="p-2 border">{p.sign}</td>
                        <td className="p-2 border">{p.degree.toFixed(2)}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="vargas" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Varga Charts (Navamsha D9)</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center">
                <ChartRenderer planets={chartData.vargas?.D9 || []} style={chartStyle} />
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="ashtakavarga" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Ashtakavarga Bindus (SAV)</CardTitle></CardHeader>
              <CardContent>
                <pre>{JSON.stringify(chartData.ashtakavarga?.sav || {}, null, 2)}</pre>
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="shadbala" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Shadbala Strength</CardTitle></CardHeader>
              <CardContent>
                <pre>{JSON.stringify(chartData.shadbala || {}, null, 2)}</pre>
              </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="transit" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Live Transits</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center">
                <ChartRenderer planets={chartData.transit?.planets || []} style={chartStyle} />
              </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
`;

fs.writeFileSync('src/app/charts/[id]/page.tsx', imports + functionalComponent);
