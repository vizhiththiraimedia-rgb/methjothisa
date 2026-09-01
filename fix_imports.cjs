const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');
const expectedImports = `"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Moon, Sun, Sparkles, Loader2 } from "lucide-react";
import { ChartRenderer } from "@/components/astrology/chart-renderer";

export default function ChartPage() {`;

// Replace lines 1-10 with expectedImports
const lines = content.split('\\n');
// Find where ChartPage starts
const chartPageIndex = lines.findIndex(l => l.includes('export default function ChartPage'));
if (chartPageIndex !== -1) {
    const after = lines.slice(chartPageIndex + 1).join('\\n');
    fs.writeFileSync('src/app/charts/[id]/page.tsx', expectedImports + '\\n' + after);
}
