"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ZODIAC_SIGNS = [
  { en: "Aries", si: "මේෂ", img: "/img/Aries.png" },
  { en: "Taurus", si: "වෘෂභ", img: "/img/Taurus.png" },
  { en: "Gemini", si: "මිථුන", img: "/img/Gemini.png" },
  { en: "Cancer", si: "කටක", img: "/img/Cancer.png" },
  { en: "Leo", si: "සිංහ", img: "/img/Leo.png" },
  { en: "Virgo", si: "කන්‍යා", img: "/img/Virgo.png" },
  { en: "Libra", si: "තුලා", img: "/img/Libra.png" },
  { en: "Scorpio", si: "වෘශ්චික", img: "/img/Scorpio.png" },
  { en: "Sagittarius", si: "ධනු", img: "/img/Sagittarius.png" },
  { en: "Capricorn", si: "මකර", img: "/img/Capricorn.png" },
  { en: "Aquarius", si: "කුම්භ", img: "/img/Aquarius.png" },
  { en: "Pisces", si: "මීන", img: "/img/Pisces.png" },
];

export default function CareerHoroscopePage() {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20 font-sans">
      <div className="container mx-auto max-w-5xl px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-center">
          <Link href="/" className="hover:text-[#1a365d]">{language === 'si' ? "මුල් පිටුව" : "Home"}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold text-[#1a365d]">
            {language === 'si' ? "රැකියා පලාඵල" : "Career Horoscope"}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl ${language === 'si' ? 'elegant-sinhala text-transparent bg-clip-text bg-gradient-to-r from-[#a6192e] to-orange-500' : 'font-display text-[#1a365d]'} font-bold mb-4`}>
            {language === 'si' ? "රැකියා පලාඵල" : "Career Horoscope"}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'si' 
              ? "ඔබගේ ලග්නයට අදාළව අද දවසේ ග්‍රහ ගමන් අනුව සකස් කළ දෛනික ජ්‍යෝතිෂ්‍ය අනාවැකි." 
              : "Astrological insights for your professional life and career growth."}
          </p>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full mt-6"></div>
        </div>

        <Card className="shadow-xl shadow-slate-200/50 border-slate-100 rounded-[2rem] overflow-hidden bg-white">
          <div className="bg-[#1a365d] p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {language === 'si' ? "ඔබගේ ලග්නය තෝරන්න" : "Select Your Sign"}
            </h2>
            <p className="text-indigo-200 text-sm">
              {language === 'si' ? "අද දවසේ පලාඵල කියවීම සඳහා පහතින් ලග්නය තෝරන්න" : "Choose your zodiac sign to read your career horoscope"}
            </p>
          </div>
          
          <CardContent className="p-8 md:p-12 bg-gradient-to-b from-white to-slate-50/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {ZODIAC_SIGNS.map((sign) => (
                <Link key={sign.en} href={`/horoscope/${sign.en.toLowerCase()}`} className="group flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-4 border-slate-100 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-400/20 transition-all duration-300 relative bg-white flex items-center justify-center p-2">
                    <img 
                      src={sign.img} 
                      alt={language === 'si' ? sign.si : sign.en} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-[#1a365d] text-lg text-center group-hover:text-amber-600 transition-colors">
                    {language === 'si' ? sign.si : sign.en}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium uppercase mt-1 tracking-wider">
                    {language === 'si' ? sign.en : sign.si}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
