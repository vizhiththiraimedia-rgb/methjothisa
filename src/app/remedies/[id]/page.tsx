"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, ChevronRight, ShieldCheck, FileText, Gift, CreditCard } from "lucide-react";

const ASTRO_SERVICES: any = {
  "1": {
    titleSi: "ජන්මපත්‍ර නිර්මාණය - දේශීය",
    titleEn: "Birth Chart Creation - Local",
    descSi: "ඔබේ උපන් තොරතුරු අනුව නිවැරදි ජන්මපත්‍රයක් සකස් කර, ග්‍රහ පිහිටීම්, නැකැත් සහ යෝග විග්‍රහ කරමින් ඔබේ ජීවිත ගමන පිළිබඳව වටිනා මඟපෙන්වීමක් ලබාදෙනු ඇත.",
    descEn: "Creating an accurate birth chart based on your birth details, analyzing planetary positions, nakshatras, and yogas to provide valuable guidance for your life journey.",
    price: 2000,
    timeSi: "දින 2 කින් ලබාදීම",
    timeEn: "Delivery in 2 Days",
    astrologer: "M.T.H. Ayoma Mallawa",
    rating: "5.0",
    reviews: "0"
  },
  "2": {
    titleSi: "පොරොන්දම් පරීක්ෂාව",
    titleEn: "Marriage Compatibility",
    descSi: "ඔබ සහ ඔබේ සහකරු/සහකාරියගේ ජන්මපත්‍ර භාවිත කරමින් විස්තරාත්මක ගැළපීම් පරීක්ෂාවක් සිදු කරයි. විවාහය සඳහා අවශ්‍ය ග්‍රහ ගැළපීම් මනාව පරීක්ෂා කරනු ලැබේ.",
    descEn: "A detailed compatibility check is performed using the birth charts of you and your partner. Planetary alignments necessary for marriage will be thoroughly examined.",
    price: 2000,
    timeSi: "දින 3 කින් ලබාදීම",
    timeEn: "Delivery in 3 Days",
    astrologer: "M.T.H. Ayoma Mallawa",
    rating: "5.0",
    reviews: "0"
  },
  "3": {
    titleSi: "අලුත උපන් දරුවන්ගේ නම් සඳහා අක්ෂර",
    titleEn: "Naming Letters for Newborns",
    descSi: "අලුත උපන් දරුවාගේ උපන් නැකතට සහ පාදයට අනුව නම ආරම්භ කළ යුතු අක්ෂර තෝරා දීම. දරුවාගේ අනාගත සාර්ථකත්වයට මෙය ඉතා වැදගත් වේ.",
    descEn: "Selecting the starting letters for the name according to the newborn baby's birth star and pada. This is very important for the child's future success.",
    price: 1000,
    timeSi: "දින 2 කින් ලබාදීම",
    timeEn: "Delivery in 2 Days",
    astrologer: "M.T.H. Ayoma Mallawa",
    rating: "5.0",
    reviews: "0"
  }
};

export default function ServiceCheckoutPage() {
  const params = useParams();
  const id = params.id as string;
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const service = ASTRO_SERVICES[id] || ASTRO_SERVICES["1"];

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate PayHere / Payment Gateway redirect
    setTimeout(() => {
      alert("Redirecting to Payment Gateway (PayHere / PayPal)...\\nUser requested to set up Paypal credentials later.");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-24 font-sans">
      <div className="container mx-auto max-w-5xl px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <span className="cursor-pointer hover:text-[#1a365d]">{language === 'si' ? "මුල් පිටුව" : "Home"}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="cursor-pointer hover:text-[#1a365d]">{language === 'si' ? "සේවාවන්" : "Services"}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold text-[#1a365d] truncate max-w-[200px]">
            {language === 'si' ? service.titleSi : service.titleEn}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Banner */}
            <div className="bg-[#a1824a] rounded-3xl overflow-hidden shadow-xl shadow-amber-900/10 flex flex-col md:flex-row relative">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <img 
                  src="https://media.istockphoto.com/id/1142998632/photo/zodiac-signs-horoscope-background-concept.jpg?s=612x612&w=0&k=20&c=N2a_D7D5p8E6v2c1-q_6jL3R4K6u_uL7t_V6J7c_2k0=" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  alt="Service"
                />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {language === 'si' ? service.titleSi : service.titleEn}
                </h1>
                <p className="text-white/80 text-sm">
                  {language === 'si' ? "ජන්ම පරීක්ෂාව සම්බන්ධ සේවා" : "Astrology Related Services"}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 self-start">
                  <span className="text-white font-bold text-xl">Rs. {service.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Service Details Tabs */}
            <Card className="shadow-lg shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
                <button className="px-6 py-4 text-sm font-bold text-[#1a365d] border-b-2 border-[#1a365d] whitespace-nowrap">
                  {language === 'si' ? "මෙම සේවාව ගැන" : "About Service"}
                </button>
                <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">
                  {language === 'si' ? "අවශ්‍ය විස්තර" : "Required Details"}
                </button>
                <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">
                  {language === 'si' ? "ඔබට ලැබෙන්නේ කුමක්ද?" : "What you will get"}
                </button>
              </div>
              
              <CardContent className="p-8">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {language === 'si' ? service.descSi : service.descEn}
                  </p>
                  
                  <h4 className="text-[#1a365d] font-bold mt-8 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {language === 'si' ? "මෙම සේවාවේ විශේෂත්වයන්" : "Service Highlights"}
                  </h4>
                  <ul className="space-y-3 text-slate-600 ml-2">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <span>{language === 'si' ? "100% ක් නිවැරදි සාම්ප්‍රදායික ජ්‍යෝතිෂ්‍ය ක්‍රමවේද" : "100% accurate traditional astrology methods"}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <span>{language === 'si' ? "පෞද්ගලිකත්වය සම්පූර්ණයෙන්ම ආරක්ෂා කරනු ලැබේ" : "Privacy is strictly maintained"}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <span>{language === 'si' ? "PDF වාර්තාවක් මගින් ඔබට ලබාදීම" : "Delivered via a comprehensive PDF report"}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Checkout Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-2xl shadow-slate-200/50 border-slate-100 rounded-[1.5rem] overflow-hidden bg-white">
                <CardContent className="p-0">
                  
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-[#1a365d] text-lg mb-1">{language === 'si' ? "ඇණවුම් සාරාංශය" : "Order Summary"}</h3>
                    <p className="text-sm text-slate-500">{language === 'si' ? "සුරක්ෂිත ගෙවීම් පද්ධතිය" : "Secure payment processing"}</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>{language === 'si' ? "සේවා ගාස්තුව" : "Service Fee"}</span>
                        <span className="font-medium">Rs. {service.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>{language === 'si' ? "බදු (Taxes)" : "Taxes"}</span>
                        <span className="font-medium">Rs. 0</span>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="font-bold text-[#1a365d]">{language === 'si' ? "මුළු මුදල" : "Total"}</span>
                        <span className="font-bold text-2xl text-emerald-600">Rs. {service.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-center gap-3 text-sm">
                      <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{language === 'si' ? "බෙදාහැරීමේ කාලය" : "Delivery Time"}</p>
                        <p className="opacity-90">{language === 'si' ? service.timeSi : service.timeEn}</p>
                      </div>
                    </div>

                    {/* Astrologer Info */}
                    <div className="border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=AM&background=d946ef&color=fff" className="w-10 h-10 rounded-full" alt="Astrologer" />
                      <div>
                        <p className="text-xs text-slate-500">{language === 'si' ? "ජ්‍යෝතිෂවේදී" : "Astrologer"}</p>
                        <p className="font-semibold text-sm text-[#1a365d]">{service.astrologer}</p>
                      </div>
                    </div>

                    <Button 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="w-full bg-[#a1824a] hover:bg-[#8a6c38] text-white shadow-lg shadow-amber-900/20 h-14 rounded-xl text-lg font-bold"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          {language === 'si' ? "දැන් මිලදී ගන්න" : "Buy Now"}
                        </span>
                      )}
                    </Button>
                    
                    {/* Trust Badges */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>100% Secure Checkout powered by PayHere</span>
                      </div>
                    </div>
                    
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
