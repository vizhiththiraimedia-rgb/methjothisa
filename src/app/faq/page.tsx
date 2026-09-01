"use client";

import React from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { ChevronRight } from "lucide-react";

export default function Page() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-24 font-sans">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#1a365d]">{language === 'si' ? "මුල් පිටුව" : "Home"}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold text-[#1a365d]">
            {language === 'si' ? "නිතර අසන ප්‍රශ්න (FAQ)" : "Frequently Asked Questions (FAQ)"}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a365d] mb-4">
            {language === 'si' ? "නිතර අසන ප්‍රශ්න (FAQ)" : "Frequently Asked Questions (FAQ)"}
          </h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <Card className="shadow-xl shadow-slate-200/50 border-slate-100 rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-[16px] whitespace-pre-wrap">
              {language === 'si' ? "ඔබට ඇතිවිය හැකි සාමාන්‍ය ගැටළු සහ ඒවාට පිළිතුරු මෙහි අන්තර්ගත වේ. ඔබගේ කේන්ද්‍රය ලබා ගන්නේ කෙසේද යන්න පිළිබඳව මෙතනින් දැනගත හැක." : "Common questions and answers you might have are included here. You can learn how to get your horoscope from here."}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <Link href="/">
                <button className="bg-[#1a365d] hover:bg-[#1a365d]/90 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                  {language === 'si' ? "මුල් පිටුවට යන්න" : "Back to Home"}
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
