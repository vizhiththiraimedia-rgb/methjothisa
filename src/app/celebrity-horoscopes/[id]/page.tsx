"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, MapPin, Clock, Star } from "lucide-react";
import Link from 'next/link';
// Assuming we have ChartRenderer, if not we'll use a placeholder.
// import { ChartRenderer } from "@/components/astrology/chart-renderer";

const MOCK_CELEBRITY_DATA: any = {
  "kumar-sangakkara": {
    nameSi: "කුමාර් සංගක්කාර",
    nameEn: "Kumar Sangakkara",
    professionSi: "ක්‍රිකට් ක්‍රීඩක",
    professionEn: "Cricketer",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Kumar_Sangakkara_at_the_2015_World_Cup_%28cropped%29.jpg/640px-Kumar_Sangakkara_at_the_2015_World_Cup_%28cropped%29.jpg",
    birthDate: "27 October 1977",
    birthTime: "08:15 AM",
    birthPlace: "Matale, Sri Lanka",
    zodiacEn: "Scorpio",
    zodiacSi: "වෘශ්චික",
    descriptionSi: "ශ්‍රී ලංකා ජාතික ක්‍රිකට් කණ්ඩායමේ හිටපු නායකයෙකු වන කුමාර් සංගක්කාරගේ ජන්ම පත්‍රය තුළ ප්‍රබල ගුරු සහ කුජ යෝගයක් පිහිටා ඇති අතර, එය ඔහුට අසමසම ක්‍රීඩා කෞශල්‍යයක් සහ නායකත්ව ලක්ෂණ ලබා දී ඇත. ලග්නාධිපති කුජ බලවත්ව සිටීම ඔහුගේ ධෛර්යය සහ නොපසුබට උත්සාහය පෙන්නුම් කරයි.",
    descriptionEn: "Former captain of the Sri Lankan national cricket team, Kumar Sangakkara's birth chart features a powerful Guru (Jupiter) and Kuja (Mars) combination, giving him unmatched sporting skills and leadership qualities. A strong ascendant lord Mars shows his courage and perseverance."
  },
  "default": {
    nameSi: "ප්‍රසිද්ධ චරිතය",
    nameEn: "Famous Celebrity",
    professionSi: "වෘත්තිය",
    professionEn: "Profession",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
    birthDate: "01 January 1980",
    birthTime: "12:00 PM",
    birthPlace: "Colombo, Sri Lanka",
    zodiacEn: "Leo",
    zodiacSi: "සිංහ",
    descriptionSi: "මෙම ප්‍රසිද්ධ පුද්ගලයාගේ කේන්ද්‍ර සටහන තුළ සුවිශේෂී ග්‍රහ පිහිටීම් දැකගත හැක. මෙය ආදර්ශ (Mock) දත්තයක් වන අතර, Admin Panel එක මගින් නිවැරදි දත්ත ඇතුළත් කළ පසු එය මෙහි දිස්වනු ඇත.",
    descriptionEn: "This famous personality's horoscope shows unique planetary positions. This is mock data, and it will be updated once the admin enters the correct details via the Admin Panel."
  }
};

export default function CelebrityHoroscopePage() {
  const params = useParams();
  const id = params.id as string;
  const { language } = useLanguage();
  
  const celeb = MOCK_CELEBRITY_DATA[id] || MOCK_CELEBRITY_DATA["default"];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-24 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#1a365d]">{language === 'si' ? "මුල් පිටුව" : "Home"}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/celebrity-horoscopes" className="hover:text-[#1a365d]">{language === 'si' ? "ප්‍රසිද්ධ පුද්ගලයින්" : "Celebrities"}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold text-[#1a365d]">
            {language === 'si' ? celeb.nameSi : celeb.nameEn}
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#1a365d] rounded-[2rem] overflow-hidden shadow-xl mb-12 flex flex-col md:flex-row relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="md:w-1/3 h-64 md:h-auto relative">
            <img 
              src={celeb.photo} 
              className="w-full h-full object-cover"
              alt={celeb.nameEn}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + (celeb.nameEn).replace(' ', '+') + '&background=e2e8f0&color=475569';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d] md:bg-gradient-to-r md:from-transparent md:to-[#1a365d]"></div>
          </div>
          
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center relative z-10">
            <div className="inline-block bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs mb-4 self-start border border-amber-500/30">
              {language === 'si' ? celeb.professionSi : celeb.professionEn}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {language === 'si' ? celeb.nameSi : celeb.nameEn}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
              <div>
                <p className="text-xs text-white/50 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Date of Birth</p>
                <p className="font-medium">{celeb.birthDate}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Time</p>
                <p className="font-medium">{celeb.birthTime}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Place</p>
                <p className="font-medium text-sm">{celeb.birthPlace}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1 flex items-center gap-1"><Star className="w-3 h-3"/> Zodiac</p>
                <p className="font-medium text-amber-300">{language === 'si' ? celeb.zodiacSi : celeb.zodiacEn}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <h3 className="font-bold text-2xl text-[#1a365d] mb-6 border-b border-slate-100 pb-4">
                  {language === 'si' ? "ජ්‍යෝතිෂ්‍ය විග්‍රහය (Astrological Analysis)" : "Astrological Analysis"}
                </h3>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {language === 'si' ? celeb.descriptionSi : celeb.descriptionEn}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-[15px] mt-4">
                    {language === 'si' ? "මෙම පිටුව දැනට ආදර්ශ දත්ත (Mock Data) මගින් ක්‍රියාත්මක වේ. Admin Panel එක මගින් නියම දත්ත ලබා දුන් පසු, මෙහි සවිස්තරාත්මක කේන්ද්‍ර විශ්ලේෂණයක් සහ අනාගත අනාවැකි දිස්වනු ඇත." : "This page currently operates with mock data. Once real data is provided via the Admin Panel, a detailed horoscope analysis and future predictions will be displayed here."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mock Chart */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden sticky top-24">
              <div className="bg-[#1a365d] p-4 text-center">
                <h3 className="font-bold text-white">
                  {language === 'si' ? "ජන්මපත්‍ර සටහන" : "Birth Chart"}
                </h3>
              </div>
              <CardContent className="p-6 flex justify-center items-center bg-slate-50">
                {/* Mock Chart Image */}
                <img 
                  src="https://media.istockphoto.com/id/1142998632/photo/zodiac-signs-horoscope-background-concept.jpg?s=612x612&w=0&k=20&c=N2a_D7D5p8E6v2c1-q_6jL3R4K6u_uL7t_V6J7c_2k0=" 
                  alt="Kundli Chart" 
                  className="w-full max-w-[250px] rounded-lg opacity-80 mix-blend-multiply"
                />
              </CardContent>
              <div className="p-4 bg-white text-center border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {language === 'si' ? "මෙය ආදර්ශ සටහනකි." : "This is a mock chart representation."}
                </p>
              </div>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
