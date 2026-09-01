"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Star, GraduationCap, Languages, Target, Clock, PhoneCall } from "lucide-react";

// Mock data based on the screenshot
const ASTROLOGER_PROFILES: any = {
  "1": {
    name: "Nadi Astrology",
    experience: "3",
    photo: "https://ui-avatars.com/api/?name=NA&background=1a365d&color=fff",
    bioSi: "පාරම්පරික නාඩි ජ්‍යෝතිෂය ඇසුරින් නිවැරදි පලාඵල විග්‍රහයන් සහ අනාගත අනාවැකි සඳහා මා සම්බන්ධ කරගන්න.",
    bioEn: "Contact me for accurate astrological analysis and future predictions based on traditional Nadi Astrology.",
    specialties: ["Nadi Astrology", "Career & Job", "Prashna"],
    languages: ["Sinhala", "Tamil"],
    aboutSi: [
      "නාඩි ජ්‍යෝතිෂය පිළිබඳ වසර 3 ක පාරම්පරික අත්දැකීම්",
      "රැකියා සහ ව්‍යාපාර දියුණුව පිළිබඳ විශේෂ උපදෙස්",
      "ප්‍රශ්න ශාස්ත්‍රය හරහා ක්ෂණික පිළිතුරු"
    ],
    aboutEn: [
      "3 years of traditional experience in Nadi Astrology",
      "Specialized advice on career and business development",
      "Instant answers through Prashna Shastra"
    ]
  },
  "2": {
    name: "JothishyaLK",
    experience: "3",
    photo: "https://ui-avatars.com/api/?name=JLK&background=1a365d&color=fff",
    bioSi: "ඔබගේ ගැටළු සඳහා නිවැරදි ජ්‍යෝතිෂ්‍ය විසඳුම් ලබාගැනීමට. සාම්ප්‍රදායික සහ නවීන විද්‍යාත්මක ක්‍රම ඔස්සේ පලාඵල විස්තර කරනු ලැබේ.",
    bioEn: "Get accurate astrological solutions for your problems. Predictions are explained using both traditional and modern scientific methods.",
    specialties: ["Vedic Astrology", "Love & Relationship", "Education"],
    languages: ["Sinhala", "English"],
    aboutSi: [
      "වෛදික ජ්‍යෝතිෂය පිළිබඳ විශේෂඥ දැනුම",
      "ප්‍රේම සබඳතා සහ අධ්‍යාපනික ගැටළු සඳහා විශේෂ උපදේශන",
      "නිවැරදි මැණික් නිර්දේශ කිරීම"
    ],
    aboutEn: [
      "Expert knowledge in Vedic Astrology",
      "Specialized counseling for love relationships and educational issues",
      "Accurate gemstone recommendations"
    ]
  },
  "3": {
    name: "Anusha kodagoda",
    experience: "10",
    photo: "https://ui-avatars.com/api/?name=AK&background=dc2626&color=fff",
    bioSi: "වසර 10ක සිට පාරම්පරික දැනුමින් ජ්‍යෝතිෂය පිළිබඳ සේවාවන් සපයයි. ඔබගේ අනාගතය පිළිබඳ නිවැරදි මඟ පෙන්වීමක් ලබාදීමට කැපවී සිටිමි.",
    bioEn: "Providing astrology services with traditional knowledge for 10 years. I am dedicated to providing accurate guidance about your future.",
    specialties: ["Traditional Astrology", "Marriage Compatibility", "Wealth"],
    languages: ["Sinhala (Native)", "English"],
    aboutSi: [
      "වසර 10 ක සාර්ථක ජ්‍යෝතිෂ්‍ය සේවා පළපුරුද්ද",
      "පොරොන්දම් පරීක්ෂාව සහ විවාහ දෝෂ නිවාරණය",
      "ධන යෝග සහ ව්‍යාපාරික කේන්ද්‍ර පරීක්ෂාව",
      "වාස්තු විද්‍යාත්මක උපදෙස්"
    ],
    aboutEn: [
      "10 years of successful astrology service experience",
      "Porondam checking and marriage dosha prevention",
      "Wealth yogas and business horoscope analysis",
      "Vastu Shastra consultations"
    ]
  },
  "5": {
    name: "ශානක ප්‍රනාන්දු",
    experience: "6",
    photo: "https://ui-avatars.com/api/?name=SP&background=1a365d&color=fff",
    bioSi: "ඔබේ අතීත සිදුවීම් අනාගතය හා සම්බන්ධ කර නිවැරදි ජ්‍යෝතිෂ්‍ය උපදෙස් ලබා දෙනු ලැබේ. වාස්තු විද්‍යා සහ ගුප්ත විද්‍යා උපදේශන.",
    bioEn: "Accurate astrological advice is given by connecting your past events to the future. Vastu and occult science consultations.",
    specialties: ["Vastu Shastra", "Occult Sciences", "Career"],
    languages: ["Sinhala (Native)"],
    aboutSi: [
      "වාස්තු විද්‍යාව පිළිබඳ පාරම්පරික දැනුම",
      "ගෘහ නිර්මාණ සහ නිවාස දෝෂ ඉවත් කිරීම",
      "ගුප්ත විද්‍යානුකූල පිළියම් සහ ආරක්ෂණ යන්ත්‍ර මන්ත්‍ර"
    ],
    aboutEn: [
      "Traditional knowledge of Vastu Shastra",
      "Architecture and removal of housing doshas",
      "Occult remedies and protective yantras/mantras"
    ]
  },
  "6": {
    name: "M.T.H. Ayoma Mallawa",
    experience: "18",
    photo: "https://ui-avatars.com/api/?name=AM&background=d946ef&color=fff",
    bioSi: "මම හෙලන් අයෝමා මල්ලව. පදිංචිය කුලියාපිටිය. දැනට ආයුර්වේද වෛද්‍යවරියක් ලෙස සේවය කරමි. පාරම්පරික ජ්‍යෝතිෂය සහ ආයුර්වේදය හරහා ඔබගේ ගැටළුවලට විසඳුම් ලබා දෙමි.",
    bioEn: "I am Helen Ayoma Mallawa, residing in Kuliyapitiya. I currently work as an Ayurvedic doctor. I provide solutions to your problems through traditional astrology and Ayurveda.",
    specialties: ["Ayurvedic Astrology", "Medical Astrology", "Marriage & Family"],
    languages: ["Sinhala (Native)"],
    aboutSi: [
      "ලියාපදිංචි සර්වාංග ආයුර්වේද වෛද්‍යතුමියක්",
      "සම්පූර්ණ ශාරීරික සෞඛ්‍යය සඳහා වෛද්‍ය සහ ජ්‍යෝතිෂ්‍ය පිළියම්",
      "ප්‍රසව හා නාරි රෝග පිළිබඳ විශේෂඥ උපදෙස්",
      "කේන්ද්‍ර පලාඵල විග්‍රහය සහ පවුල් උපදේශනය"
    ],
    aboutEn: [
      "Registered Ayurvedic Physician",
      "Medical and astrological remedies for complete physical health",
      "Expert advice on obstetrics and gynecology",
      "Horoscope analysis and family counseling"
    ]
  }
};

const ASTRO_SERVICES = [
  {
    id: 1,
    titleSi: "ජන්මපත්‍ර නිර්මාණය - දේශීය",
    titleEn: "Birth Chart Related",
    descSi: "ඔබේ උපන් තොරතුරු අනුව නිවැරදි ජන්මපත්‍රයක් සකස් කර, ග්‍රහ පිහිටීම්, නැකැත් සහ යෝග විග්‍රහ කරමින්...",
    descEn: "Comprehensive astrological services for birth chart creation, analysis, and recr...",
    price: "Rs.2000",
    time: "2 දිනක බෙදාහැරීම"
  },
  {
    id: 2,
    titleSi: "පොරොන්දම් පරීක්ෂාව",
    titleEn: "Marriage Related Services",
    descSi: "ඔබ සහ ඔබේ සහකරු/සහකාරියගේ ජන්මපත්‍ර භාවිත කරමින් විස්තරාත්මක ගැළපීම් පරීක්ෂාවක් සිදු කරයි.",
    descEn: "Expert astrological services for marriage-related matters including compatibilit...",
    price: "Rs.2000",
    time: "3 දිනක බෙදාහැරීම"
  },
  {
    id: 3,
    titleSi: "අලුත උපන් දරුවන්ගේ නම් සඳහා අක්ෂර",
    titleEn: "Children Related Services",
    descSi: "අලුත උපන් දරුවාගේ උපන් නැකතට සහ පාදයට අනුව නම ආරම්භ කළ යුතු අක්ෂර තෝරා දීම.",
    descEn: "Astrological services related to children, including naming ceremonies, first te...",
    price: "Rs.1000",
    time: "2 දිනක බෙදාහැරීම"
  }
];

export default function AstrologerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { language } = useLanguage();
  
  // Default to Ayoma Mallawa if ID not found for demo purposes
  const profile = ASTROLOGER_PROFILES[id] || ASTROLOGER_PROFILES["6"];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
      
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-[#5b3b5b] via-[#6d4d68] to-[#9b7b68] pt-24 pb-32 px-4 relative overflow-hidden">
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#5b3b5b]/50 p-1 shadow-2xl flex-shrink-0 relative overflow-hidden bg-white">
              <img 
                src={profile.photo} 
                alt={profile.name} 
                className="w-full h-full object-cover rounded-full relative z-10"
              />
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left text-white mt-4 md:mt-6 flex-1 w-full">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">{profile.name}</h1>
              </div>
              
              <div className="inline-flex mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
                <span className="px-4 py-2 text-sm font-medium">{profile.experience} {language === 'si' ? "අත්දැකීම් වසර" : "Years Experience"}</span>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
                <p className="text-white/90 leading-relaxed text-sm md:text-base">
                  {language === 'si' ? profile.bioSi : profile.bioEn}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="container mx-auto max-w-5xl px-4 mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Specializations & Education */}
          <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden">
            <CardContent className="p-8 space-y-8">
              
              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1a365d] mb-4">
                  <span className="text-[#a1824a] font-serif text-lg">Specializations</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((s: string, i: number) => (
                     <span key={i} className="inline-flex items-center justify-center bg-[#a1824a] hover:bg-[#8a6c38] text-white border-none rounded-full px-4 py-1.5 font-normal">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1a365d] mb-4">
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                  {language === 'si' ? "අධ්‍යාපනය" : "Education"}
                </h3>
                <p className="text-slate-500 text-sm ml-7">-</p>
              </div>
              
            </CardContent>
          </Card>
          
          {/* Field & Languages */}
          <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden">
            <CardContent className="p-8 space-y-8">
              
              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1a365d] mb-4">
                  <Target className="w-5 h-5 text-slate-600" />
                  {language === 'si' ? "ක්ෂේත්‍රය" : "Field"}
                </h3>
                <div className="ml-7">
                  <span className="inline-flex items-center justify-center bg-[#2d1b4e] hover:bg-[#2d1b4e]/90 text-white border-none rounded-full px-4 py-1.5 font-normal">
                    Prashana
                  </span>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1a365d] mb-4">
                  <Languages className="w-5 h-5 text-slate-600" />
                  {language === 'si' ? "භාෂාවන්" : "Languages"}
                </h3>
                <div className="flex flex-col gap-3 text-sm text-slate-600 ml-7">
                  {profile.languages.map((l: string, i: number) => {
                    const isNative = l.includes('Native');
                    const langName = l.split(' (')[0];
                    return (
                      <div key={i} className="flex justify-between items-center w-full md:w-3/4">
                        <span>{langName}</span>
                        {isNative && <span className="text-[#1a365d] font-semibold text-xs">native</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              
            </CardContent>
          </Card>
          
        </div>
        
        {/* About Me Section (Full Width) */}
        <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden mb-12">
          <CardContent className="p-8 md:p-10">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#1a365d] mb-8">
              <span className="w-4 h-4 rounded-full border-2 border-[#1a365d] flex items-center justify-center text-[10px]">👤</span>
              {language === 'si' ? "මා ගැන" : "About Me"}
            </h3>
            
            <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
              <p className="font-bold text-[#1a365d] text-base"># හෙලන් අයෝමා මල්ලව</p>
              <p className="font-medium text-[#1a365d]">## ලියාපදිංචි ආයුර්වේද වෛද්‍යවරිය හා ජ්‍යෝතිෂ්‍ය ගුරුතුමිය</p>
              <p className="flex items-center gap-1"><span className="text-red-500">📍</span> පදිංචිය: කුලියාපිටිය</p>
              
              <div className="mt-8">
                <p className="font-bold text-emerald-700 mb-3">### 🌿 ආයුර්වේද සේවා</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2"><span className="text-emerald-500">✅</span> ලියාපදිංචි සර්වාංග ආයුර්වේද වෛද්‍යකම</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">✅</span> කැඩුම් බිඳුම් සුව කිරීමේ විශේෂ සේවාව</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">✅</span> සම්පූර්ණ ශාරීරික සෞඛ්‍යය සඳහා ප්‍රතිකාර</li>
                </ul>
              </div>
              
              <div className="mt-8">
                <p className="font-bold text-amber-600 mb-3">### ⭐️ ජ්‍යෝතිෂ්‍ය විශේෂ සේවා</p>
                <ul className="space-y-2 ml-4">
                  {(language === 'si' ? profile.aboutSi : profile.aboutEn).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-blue-500">🔹</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Services Section */}
        <div className="text-center pt-8 pb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-1">{language === 'si' ? "ජ්‍යෝතිෂ සේවාවන්" : "Astrology Services"}</h2>
          <p className="text-slate-500 text-sm">{language === 'si' ? "ඉදිරිපත් කරන සේවාවන් හැඳින්වීම " + profile.name : "Services offered by " + profile.name}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ASTRO_SERVICES.map((srv, i) => (
            <Link href={`/services/${srv.id}`} key={i} className="block"><Card className="h-full shadow-lg hover:shadow-xl transition-all border-slate-100 rounded-2xl overflow-hidden flex flex-col group border-t-0 cursor-pointer hover:-translate-y-1">
              <div className="h-40 bg-[#2a134a] relative overflow-hidden p-6 flex flex-col justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <img src="https://media.istockphoto.com/id/1142998632/photo/zodiac-signs-horoscope-background-concept.jpg?s=612x612&w=0&k=20&c=N2a_D7D5p8E6v2c1-q_6jL3R4K6u_uL7t_V6J7c_2k0=" className="w-full h-full object-cover mix-blend-screen opacity-50" alt="Zodiac" />
                </div>
                <h4 className="text-white font-serif font-bold relative z-10 text-xl leading-tight">
                  {srv.titleEn}
                </h4>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h5 className="font-bold text-slate-800 mb-3 text-[15px]">
                  {language === 'si' ? srv.titleSi : srv.titleEn}
                </h5>
                <p className="text-[13px] text-slate-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {language === 'si' ? srv.descSi : srv.descEn}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-emerald-600 text-[14px]">{srv.price}</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3" />
                    {srv.time}
                  </span>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
        
      </div>
      
      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-amber-400 hover:bg-amber-500 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 z-50">
        <PhoneCall className="w-6 h-6" />
      </button>
      
    </div>
  );
}
