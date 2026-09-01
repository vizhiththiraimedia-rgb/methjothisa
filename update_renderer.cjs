const fs = require('fs');

const code = \"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

const ZODIAC_SIGNS = [
  "Mesha", "Vrishabha", "Mithuna", "Karka",
  "Simha", "Kanya", "Tula", "Vrischika",
  "Dhanu", "Makara", "Kumbha", "Meena"
];

const SIGN_NUMBERS: Record<string, number> = {
  "Mesha": 1, "Vrishabha": 2, "Mithuna": 3, "Karka": 4,
  "Simha": 5, "Kanya": 6, "Tula": 7, "Vrischika": 8,
  "Dhanu": 9, "Makara": 10, "Kumbha": 11, "Meena": 12
};

const SINHALA_SIGNS: Record<string, string> = {
  "Mesha": "???", "Vrishabha": "????", "Mithuna": "?????", "Karka": "???",
  "Simha": "????", "Kanya": "??????", "Tula": "????", "Vrischika": "???????",
  "Dhanu": "???", "Makara": "???", "Kumbha": "?????", "Meena": "???"
};

const SIGN_ICONS: Record<string, string> = {
  "Mesha": "?", "Vrishabha": "?", "Mithuna": "?", "Karka": "?",
  "Simha": "?", "Kanya": "?", "Tula": "?", "Vrischika": "?",
  "Dhanu": "?", "Makara": "?", "Kumbha": "?", "Meena": "?"
};

const PLANET_COLORS: Record<string, string> = {
  "Sun": "#ea580c",
  "Moon": "#2563eb",
  "Mars": "#dc2626",
  "Mercury": "#16a34a",
  "Jupiter": "#d97706",
  "Venus": "#db2777",
  "Saturn": "#4f46e5",
  "Rahu": "#0891b2",
  "Ketu": "#d97706",
  "Ascendant": "#9333ea",
  "Lagna": "#9333ea",
  "Asc": "#9333ea"
};

export function ChartRenderer({ planets, style = "kendare", className, onPlanetClick }: { planets: any[], style?: "north" | "south" | "east" | "kendare", className?: string, onPlanetClick?: (planet: any) => void }) {
  const { language } = useLanguage();
  
  const getPlanetsInSign = (signName: string) => planets.filter(p => p.sign === signName);
  
  const lagnaPlanet = planets.find(p => p.name === "Ascendant" || p.name === "Asc" || p.name === "Lagna");
  const lagnaSignName = lagnaPlanet?.sign || "Mesha";
  
  const moonPlanet = planets.find(p => p.name === "Moon");
  const moonSignName = moonPlanet?.sign || "Mesha";

  const getPlanetAbbreviation = (name: string): string => {
    if (language === "si") {
      if (name.includes("Sun")) return "?";
      if (name.includes("Moon")) return "?";
      if (name.includes("Mars")) return "??";
      if (name.includes("Mercury")) return "??";
      if (name.includes("Jupiter")) return "????";
      if (name.includes("Venus")) return "??";
      if (name.includes("Saturn")) return "?";
      if (name.includes("Rahu")) return "??";
      if (name.includes("Ketu")) return "??";
      return "?";
    } else if (language === "ta") {
      if (name.includes("Sun")) return "??";
      if (name.includes("Moon")) return "???";
      if (name.includes("Mars")) return "??";
      if (name.includes("Mercury")) return "??";
      if (name.includes("Jupiter")) return "??";
      if (name.includes("Venus")) return "??";
      if (name.includes("Saturn")) return "?";
      if (name.includes("Rahu")) return "????";
      if (name.includes("Ketu")) return "????";
      return "?";
    } else {
      if (name.includes("Sun")) return "Su";
      if (name.includes("Moon")) return "Mo";
      if (name.includes("Mars")) return "Ma";
      if (name.includes("Mercury")) return "Me";
      if (name.includes("Jupiter")) return "Ju";
      if (name.includes("Venus")) return "Ve";
      if (name.includes("Saturn")) return "Sa";
      if (name.includes("Rahu")) return "Ra";
      if (name.includes("Ketu")) return "Ke";
      return "Asc";
    }
  };

  const SignBadge = ({ signNum, isLagna }: { signNum: number, isLagna: boolean }) => (
    <div className={cn("flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border z-20", isLagna ? "bg-green-600 text-white border-green-600" : "text-slate-400 border-slate-300 bg-white")}>
      {signNum}
    </div>
  );

  const Planets = ({ planets }: { planets: any[] }) => (
    <div className="flex flex-wrap gap-[3px] mt-1 z-10 max-w-[85px] justify-center text-center">
      {planets.map((p, i) => {
        const isLagna = p.name === "Ascendant" || p.name === "Asc" || p.name === "Lagna";
        const abbr = getPlanetAbbreviation(p.name);
        const degree = isLagna ? "" : Math.floor(p.posInSign || (p.degree % 30) || 0);
        const isRet = p.retrograde;
        const text = isRet ? \(+$\{abbr})\ : abbr;
        return (
          <span key={i} onClick={(e) => { e.stopPropagation(); if (onPlanetClick) onPlanetClick(p); }} className="text-[12px] font-bold cursor-pointer hover:scale-110 transition-transform" style={{ color: PLANET_COLORS[p.name] || (isLagna ? "#9333ea" : "#4f46e5") }}>
            {text}{!isLagna && <sub className="text-[9px] ml-[1px]">{degree}</sub>}
          </span>
        );
      })}
    </div>
  );

  if (style === "kendare" || style === "south" || style === "north") {
    return (
      <div className={cn("w-full aspect-square max-w-[600px] bg-white border border-slate-400 rounded relative overflow-hidden font-body shadow-sm select-none mx-auto", className)}>
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 text-slate-800">
          
          {/* Top-Left Box */}
          <div className="relative border border-slate-300">
            <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#cbd5e1" strokeWidth="1"/></svg>
            <div className="absolute top-2 right-2 flex flex-col items-end">
               <SignBadge signNum={12} isLagna={lagnaSignName === "Meena"} />
               <Planets planets={getPlanetsInSign("Meena")} />
            </div>
            <div className="absolute bottom-2 left-2 flex flex-col items-start">
               <SignBadge signNum={1} isLagna={lagnaSignName === "Mesha"} />
               <Planets planets={getPlanetsInSign("Mesha")} />
            </div>
          </div>

          {/* Top-Mid Box */}
          <div className="relative border border-slate-300 flex items-center justify-center p-2">
            <div className="absolute top-2 left-2">
               <SignBadge signNum={11} isLagna={lagnaSignName === "Kumbha"} />
            </div>
            <div className="mt-2"><Planets planets={getPlanetsInSign("Kumbha")} /></div>
          </div>

          {/* Top-Right Box */}
          <div className="relative border border-slate-300">
            <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1="100%" y1="0" x2="0" y2="100%" stroke="#cbd5e1" strokeWidth="1"/></svg>
            <div className="absolute top-2 left-2 flex flex-col items-start">
               <SignBadge signNum={10} isLagna={lagnaSignName === "Makara"} />
               <Planets planets={getPlanetsInSign("Makara")} />
            </div>
            <div className="absolute bottom-2 right-2 flex flex-col items-end">
               <SignBadge signNum={9} isLagna={lagnaSignName === "Dhanu"} />
               <Planets planets={getPlanetsInSign("Dhanu")} />
            </div>
          </div>

          {/* Left-Mid Box */}
          <div className="relative border border-slate-300 flex items-center justify-center p-2">
            <div className="absolute top-2 left-2">
               <SignBadge signNum={2} isLagna={lagnaSignName === "Vrishabha"} />
            </div>
            <Planets planets={getPlanetsInSign("Vrishabha")} />
          </div>

          {/* Center Box */}
          <div className="relative border border-slate-300 flex flex-col items-center justify-center p-2 bg-slate-50/30">
            {moonPlanet && (
              <>
                <div className="text-sm font-bold text-slate-800">
                  {Math.floor(moonPlanet.posInSign || (moonPlanet.degree % 30) || 0)}° {Math.floor(((moonPlanet.posInSign || (moonPlanet.degree % 30) || 0) % 1) * 60)}'
                </div>
                <div className="text-3xl mt-1 text-slate-700">{SIGN_ICONS[moonPlanet.sign] || '?'}</div>
                <div className="mt-2 bg-[#0ea5e9] text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-sm">
                  {language === "si" ? SINHALA_SIGNS[moonPlanet.sign] : moonPlanet.sign}
                </div>
              </>
            )}
          </div>

          {/* Right-Mid Box */}
          <div className="relative border border-slate-300 flex items-center justify-center p-2">
            <div className="absolute top-2 right-2">
               <SignBadge signNum={8} isLagna={lagnaSignName === "Vrischika"} />
            </div>
            <Planets planets={getPlanetsInSign("Vrischika")} />
          </div>

          {/* Bottom-Left Box */}
          <div className="relative border border-slate-300">
            <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1="0" y1="100%" x2="100%" y2="0" stroke="#cbd5e1" strokeWidth="1"/></svg>
            <div className="absolute top-2 left-2 flex flex-col items-start">
               <SignBadge signNum={3} isLagna={lagnaSignName === "Mithuna"} />
               <Planets planets={getPlanetsInSign("Mithuna")} />
            </div>
            <div className="absolute bottom-2 right-2 flex flex-col items-end">
               <SignBadge signNum={4} isLagna={lagnaSignName === "Karka"} />
               <Planets planets={getPlanetsInSign("Karka")} />
            </div>
          </div>

          {/* Bottom-Mid Box */}
          <div className="relative border border-slate-300 flex items-center justify-center p-2">
            <div className="absolute top-2 left-2">
               <SignBadge signNum={5} isLagna={lagnaSignName === "Simha"} />
            </div>
            <Planets planets={getPlanetsInSign("Simha")} />
          </div>

          {/* Bottom-Right Box */}
          <div className="relative border border-slate-300">
            <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#cbd5e1" strokeWidth="1"/></svg>
            <div className="absolute bottom-2 left-2 flex flex-col items-start">
               <SignBadge signNum={6} isLagna={lagnaSignName === "Kanya"} />
               <Planets planets={getPlanetsInSign("Kanya")} />
            </div>
            <div className="absolute top-2 right-2 flex flex-col items-end">
               <SignBadge signNum={7} isLagna={lagnaSignName === "Tula"} />
               <Planets planets={getPlanetsInSign("Tula")} />
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  return null;
}
\;

fs.writeFileSync('./src/components/astrology/chart-renderer.tsx', code);
console.log('Done replacing chart-renderer.tsx');
