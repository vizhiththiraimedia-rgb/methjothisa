"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSlider } from "@/components/hero-slider";
import { HomeFreeHoroscopeForm } from "@/components/forms/home-free-horoscope-form";
import { ZODIAC_SIGNS, SERVICES, ASTROLOGERS, REMEDIES, OFFERS, CELEBRITIES, TESTIMONIALS } from "@/lib/home-data";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";
import { 
  ArrowRight, Sparkles, BarChart3, Moon, Sun, Heart, TrendingUp, Shield, Globe, Gem,
  ChevronLeft, ChevronRight, Phone, Mail, Clock
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [offers, setOffers] = useState<any[]>([]);
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/testimonials?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setTestimonials(result.data); });

    fetch("/api/celebrities?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setCelebrities(result.data); });

    fetch("/api/offers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setOffers(result.data); });

    fetch("/api/astrologers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setAstrologers(result.data); });
  }, []);

  const activeAstrologers = astrologers && astrologers.length > 0 ? astrologers : ASTROLOGERS;
  const filteredAstrologers = activeAstrologers.filter((a) => {
    const catMatch = !filterCategory || a.category === filterCategory;
    const langMatch = !filterLanguage || (a.languages || "").toLowerCase().includes(filterLanguage.toLowerCase());
    return catMatch && langMatch;
  });
  const [horoscopeType, setHoroscopeType] = useState("daily");

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3, Moon, Sun, Heart, TrendingUp, Shield, Globe, Gem,
  };

  return (
    <div className="overflow-hidden">
      {/* Zodiac Signs Section */}
      <section className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-primary">{language === "si" ? "ඔබේ ලග්නය තෝරන්න" : "Choose Your Zodiac Sign"}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs rounded-full bg-primary text-primary-foreground">Daily</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs rounded-full">Weekly</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs rounded-full">Monthly</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs rounded-full">Yearly</Button>
            </div>
          </div>
          <div className="flex gap-4 pb-2 w-max">
            {ZODIAC_SIGNS.map((sign) => (
              <Link 
                href={`/horoscope/${sign.name.toLowerCase()}`}
                key={sign.name} 
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer min-w-[80px]"
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-border flex items-center justify-center text-xl overflow-hidden">
                   {/* fallback to icon if img fails, but prefer local image */}
                   <img src={`/img/${sign.name}.png`} alt={sign.name} className="w-9 h-9 object-contain drop-shadow-sm" onError={(e) => { (e.target as any).style.display='none'; (e.target as any).nextSibling.style.display='block'; }} />
                   <span style={{display:'none'}}>{sign.icon}</span>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-primary">{language === 'si' ? sign.nameSi : sign.name}</div>
                  <div className="text-[8px] text-muted-foreground">{sign.dates}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Hero / Free Horoscope Form */}
      <HeroSlider />

      {/* Free Horoscope Form Section (Separated from Slider) */}
      <section className="py-12 bg-slate-50 relative border-b border-border">
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <Card className="w-full bg-white shadow-xl border border-slate-200 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[#fefce8] opacity-50 z-0"></div>
              <div className="bg-[#a6192e] text-white py-5 px-6 text-center relative z-10">
                <h2 className="font-bold text-lg md:text-xl leading-snug">
                  {language === 'si' ? "තත්පර 30කින් නොමිලේ ලග්න පලාඵල වාර්තාව ලබාගන්න." : "Get Your Free Horoscope Report in 30 Seconds"}
                </h2>
              </div>
              <CardContent className="p-6 md:p-8 relative z-10">
                <HomeFreeHoroscopeForm />
                <p className="text-[10px] text-slate-500 text-center mt-6 px-4">
                  {language === 'si' ? "ඉදිරියට යාමෙන් ඔබ අපගේ සේවා නියමයන් සහ රහස්‍යතා ප්‍රතිපත්තියට එකඟ වේ." : t("form.agreeTerms")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white relative border-b border-border">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-4 text-primary`}>{t("section.services")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.description")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <Link key={i} href={service.href}>
                <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border border-white/5 bg-background/60 backdrop-blur-md h-full cursor-pointer">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {(() => { const Comp = iconMap[service.icon]; return Comp ? <Comp className="h-6 w-6" /> : null; })()}
                    </div>
                    <h3 className="font-semibold text-lg">{t(service.translationKey) || service.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Astrologer Consultation */}
      <section className="py-16 relative bg-slate-50/50">
        <div className="container mx-auto px-4 relative max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-4 text-[#1a365d]`}>{t("section.astrologers")}</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg mb-8">{t("section.astrologersDesc")}</p>
          </div>
          
          {/* Slider Navigation Buttons (Visual only, to match screenshot) */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors hidden md:flex border border-slate-100 z-10 -ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
            {filteredAstrologers.slice(0,3).map((astrologer, i) => (
              <Link href={`/astrologers/${i+1}`} key={i} className="block bg-white rounded-[1.5rem] p-6 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col items-center">
                
                {/* Experience Badge */}
                <div className="absolute top-4 left-4 bg-[#1a365d] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {(astrologer.experience || astrologer.exp || "0 yrs").replace(' years', '').replace(' yrs', '')} yrs
                </div>
                
                {/* Circular Avatar */}
                <div className="w-24 h-24 rounded-full border-4 border-[#1a365d] p-1 mt-6 mb-4">
                  <img 
                    src={astrologer.photo || astrologer.img || "https://ui-avatars.com/api/?name=" + astrologer.name.replace(' ', '+') + "&background=e2e8f0&color=475569"} 
                    alt={astrologer.name} 
                    className="w-full h-full object-cover rounded-full bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + astrologer.name.replace(' ', '+') + '&background=e2e8f0&color=475569';
                    }}
                  />
                </div>
                
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <span className="text-sm font-medium text-slate-400 ml-1">(0)</span>
                </div>
                
                {/* Name */}
                <h3 className="font-serif text-xl font-bold text-[#1a365d] mb-3">{astrologer.name}</h3>
                
                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                  {astrologer.description || (language === 'si' ? "ඔබේ අතීත සිදුවීම් අනාගතය..." : "Expert astrological guidance tailored to...")}
                </p>
                
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 relative z-0">
            {filteredAstrologers.slice(3,6).map((astrologer, i) => (
              <Link href={`/astrologers/${i+1}`} key={i} className="block bg-white rounded-[1.5rem] p-6 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col items-center">
                
                {/* Experience Badge */}
                <div className="absolute top-4 left-4 bg-[#1a365d] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {(astrologer.experience || astrologer.exp || "0 yrs").replace(' years', '').replace(' yrs', '')} yrs
                </div>
                
                {/* Circular Avatar */}
                <div className="w-24 h-24 rounded-full border-4 border-[#1a365d] p-1 mt-6 mb-4">
                  <img 
                    src={astrologer.photo || astrologer.img || "https://ui-avatars.com/api/?name=" + astrologer.name.replace(' ', '+') + "&background=e2e8f0&color=475569"} 
                    alt={astrologer.name} 
                    className="w-full h-full object-cover rounded-full bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + astrologer.name.replace(' ', '+') + '&background=e2e8f0&color=475569';
                    }}
                  />
                </div>
                
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <span className="text-sm font-medium text-slate-400 ml-1">(0)</span>
                </div>
                
                {/* Name */}
                <h3 className="font-serif text-xl font-bold text-[#1a365d] mb-3">{astrologer.name}</h3>
                
                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                  {astrologer.description || (language === 'si' ? "ඔබේ අතීත සිදුවීම් අනාගතය..." : "Expert astrological guidance tailored to...")}
                </p>
                
              </Link>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors hidden md:flex border border-slate-100 z-10 -mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          
        </div>
      </section>

      {/* Remedies / Puja */}
      <section className="py-16 bg-slate-50/50 relative border-t border-slate-100">
        <div className="container mx-auto px-4 relative max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-2 text-[#1a365d]`}>{t("section.remedies")}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{language === 'si' ? "ඔබගේ ග්‍රහ අපල දුරුකර ගැනීමට අවශ්‍ය සියලුම ශාන්තිකර්ම සහ පූජාවන්" : "Find the right rituals and pujas to overcome your astrological obstacles."}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {REMEDIES.map((remedy: any, i) => (
              <Link key={i} href={remedy.href} className="group block">
                <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[1.5rem] border border-slate-100 bg-white h-full flex flex-col">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="aspect-square bg-slate-100 relative overflow-hidden">
                      <img 
                        src={remedy.img} 
                        alt={remedy.nameEn} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://media.istockphoto.com/id/1142998632/photo/zodiac-signs-horoscope-background-concept.jpg?s=612x612&w=0&k=20&c=N2a_D7D5p8E6v2c1-q_6jL3R4K6u_uL7t_V6J7c_2k0=';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          {language === 'si' ? "විස්තර බලන්න" : "View Details"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 text-center flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="font-bold text-[15px] text-[#1a365d] leading-tight mb-1">{language === 'si' ? remedy.nameSi : remedy.nameEn}</h3>
                        <p className="text-xs text-slate-500 mb-2">{language === 'si' ? remedy.nameEn : remedy.nameSi}</p>
                      </div>
                      <p className="text-[15px] font-bold text-amber-600 bg-amber-50 rounded-lg py-1 mt-2">{remedy.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/remedies">
              <Button className="bg-white border-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white rounded-full px-8 py-6 h-auto text-sm font-bold transition-all shadow-md">
                {language === 'si' ? "සියලුම පූජා බලන්න" : "View All Remedies"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 relative bg-gradient-to-br from-red-50 to-orange-50 border-t border-red-100 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="container mx-auto px-4 relative max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-6 text-[#1a365d]`}>{t("section.offers")}</h2>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-100 border border-red-200 text-red-700 font-bold shadow-sm animate-pulse">
              <Sparkles className="h-5 w-5" />
              {language === 'si' ? "ලංකාවට ආවේණික සුවිශේෂී දීමනා" : "Exclusive Sri Lankan Offers"}
            </div>
          </div>

          {(() => {
            const MOCK_OFFERS = [
              {
                titleSi: "අලුත් අවුරුදු විශේෂ කේන්ද්‍ර පරීක්ෂාව",
                titleEn: "Sinhala New Year Special Horoscope",
                subtitleSi: "සිංහල අලුත් අවුරුදු සුබ මුහුර්ත, ලග්න පලාඵල සහ වසරේ දෝෂ",
                subtitleEn: "Auspicious times, zodiac predictions and yearly doshas",
                image: "https://media.istockphoto.com/id/1310165507/photo/avurudu-sweets-sri-lanka.jpg?s=612x612&w=0&k=20&c=L5F1r8e3U4b7N6J2K9L5F1r8e3U4b7N6J2K9=", // Fallback to a nice traditional looking image
                discount: "20% OFF",
                originalPrice: "Rs. 2,500",
                discountedPrice: "Rs. 2,000",
                pages: "15+",
                href: "/services/avurudu-special"
              },
              {
                titleSi: "විවාහ පොරොන්දම් විශේෂ පැකේජය",
                titleEn: "Marriage Porondam Special Package",
                subtitleSi: "දෙදෙනාගේම කේන්ද්‍ර සහ පොරොන්දම් 20ක පරීක්ෂාව",
                subtitleEn: "Checking both horoscopes and 20 Porondams completely",
                image: "https://media.istockphoto.com/id/1149098711/photo/poruwa-ceremony-traditional-sri-lankan-wedding.jpg?s=612x612&w=0&k=20&c=L5F1r8e3U4b7N6J2K9L5F1r8e3U4b7N6J2K9=",
                discount: "15% OFF",
                originalPrice: "Rs. 3,000",
                discountedPrice: "Rs. 2,550",
                pages: "20+",
                href: "/services/marriage-special"
              },
              {
                titleSi: "නව නිවාස වාස්තු පරීක්ෂාව",
                titleEn: "New House Vastu Checking",
                subtitleSi: "නිවාස සැලසුම් පරීක්ෂාව සහ මූලික වාස්තු උපදෙස්",
                subtitleEn: "House plan checking and basic Vastu advice",
                image: "https://media.istockphoto.com/id/479679124/photo/sri-lankan-traditional-house.jpg?s=612x612&w=0&k=20&c=L5F1r8e3U4b7N6J2K9L5F1r8e3U4b7N6J2K9=",
                discount: "Rs. 1000 OFF",
                originalPrice: "Rs. 10,000",
                discountedPrice: "Rs. 9,000",
                pages: "10+",
                href: "/services/vastu-special"
              }
            ];
            
            const activeOffers = offers && offers.length > 0 ? offers : MOCK_OFFERS;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeOffers.map((offer: any, i: number) => (
                  <Card key={i} className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[1.5rem] border border-white/50 bg-white/80 backdrop-blur-md flex flex-col group">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                        <img 
                          src={offer.image || offer.img || ""} 
                          alt={offer.titleSi} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://media.istockphoto.com/id/1283856230/photo/traditional-oil-lamp-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=ZtHl3T9Xo5L5F1r8e3U4b7N6J2K9L5F1r8e3U4b7N6J2K9=';
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-red-600/30 tracking-wide">
                          {offer.discount}
                        </div>
                      </div>
                      <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-xl text-[#1a365d] leading-tight mb-2">
                            {language === 'si' ? offer.titleSi : offer.titleEn}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {language === 'si' ? offer.subtitleSi : offer.subtitleEn}
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-slate-400 line-through mb-1">{offer.originalPrice}</p>
                              <p className="text-2xl font-black text-emerald-600">{offer.discountedPrice}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-center">
                              <p className="text-[10px] text-slate-400 font-semibold uppercase">{language === 'si' ? "පිටු ගණන" : "Pages"}</p>
                              <p className="text-sm font-bold text-[#1a365d]">{offer.pages}</p>
                            </div>
                          </div>
                          
                          <Link href={offer.href || "/services/1"}>
                            <Button className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90 text-white h-12 rounded-xl text-[15px] font-bold shadow-lg shadow-[#1a365d]/20 transition-all active:scale-95">
                              {language === 'si' ? "දැන්ම ඇණවුම් කරන්න" : "Order Now"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Celebrity Horoscope */}
      <section className="py-20 bg-slate-50 relative border-t border-slate-100">
        <div className="container mx-auto px-4 relative max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className={`text-3xl md:text-4xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold text-[#1a365d] mb-2`}>{language === 'si' ? "ප්‍රසිද්ධ පුද්ගලයින්ගේ කේන්ද්‍ර සටහන්" : "Celebrity Horoscopes"}</h2>
              <p className="text-slate-500">{language === 'si' ? "ලංකාවේ ජනප්‍රිය චරිතවල ජ්‍යෝතිෂ්‍ය රහස්" : "Astrological secrets of popular Sri Lankan figures"}</p>
            </div>
            <div className="flex gap-2 hidden md:flex">
              <Button className="h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-500 hover:border-[#1a365d] hover:text-[#1a365d]" variant="outline" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button className="h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-500 hover:border-[#1a365d] hover:text-[#1a365d]" variant="outline" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {(() => {
            const MOCK_CELEBRITIES = [
              {
                nameSi: "කුමාර් සංගක්කාර",
                nameEn: "Kumar Sangakkara",
                professionSi: "ක්‍රිකට් ක්‍රීඩක",
                professionEn: "Cricketer",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Kumar_Sangakkara_at_the_2015_World_Cup_%28cropped%29.jpg/640px-Kumar_Sangakkara_at_the_2015_World_Cup_%28cropped%29.jpg",
                href: "/celebrity-horoscopes/kumar-sangakkara"
              },
              {
                nameSi: "සනත් ජයසූරිය",
                nameEn: "Sanath Jayasuriya",
                professionSi: "ක්‍රිකට් ක්‍රීඩක",
                professionEn: "Cricketer",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Sanath_Jayasuriya_2.jpg/640px-Sanath_Jayasuriya_2.jpg",
                href: "/celebrity-horoscopes/sanath-jayasuriya"
              },
              {
                nameSi: "යොහානි ද සිල්වා",
                nameEn: "Yohani De Silva",
                professionSi: "ගායිකා",
                professionEn: "Singer",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Yohani_2022.jpg/640px-Yohani_2022.jpg",
                href: "/celebrity-horoscopes/yohani"
              },
              {
                nameSi: "ජැකලින් ෆර්නැන්ඩස්",
                nameEn: "Jacqueline Fernandez",
                professionSi: "නිළිය",
                professionEn: "Actress",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jacqueline_Fernandez_in_2018.jpg/640px-Jacqueline_Fernandez_in_2018.jpg",
                href: "/celebrity-horoscopes/jacqueline"
              },
              {
                nameSi: "භාතිය ජයකොඩි",
                nameEn: "Bathiya Jayakody",
                professionSi: "ගායක",
                professionEn: "Singer",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bathiya_Jayakody.jpg/640px-Bathiya_Jayakody.jpg",
                href: "/celebrity-horoscopes/bathiya"
              },
              {
                nameSi: "මහේල ජයවර්ධන",
                nameEn: "Mahela Jayawardene",
                professionSi: "ක්‍රිකට් ක්‍රීඩක",
                professionEn: "Cricketer",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mahela_Jayawardene_Batting_2015_World_Cup_%28cropped%29.jpg/640px-Mahela_Jayawardene_Batting_2015_World_Cup_%28cropped%29.jpg",
                href: "/celebrity-horoscopes/mahela"
              }
            ];
            
            const activeCelebs = celebrities && celebrities.length > 0 ? celebrities : MOCK_CELEBRITIES;
            
            return (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {activeCelebs.slice(0,6).map((celeb: any, i: number) => (
                  <Link key={i} href={celeb.href || "/celebrity-horoscopes/1"} className="group block">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-[1.5rem] border-none bg-white h-full hover:-translate-y-2">
                      <CardContent className="p-0">
                        <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                          <img 
                            src={celeb.photo || celeb.img || ""} 
                            alt={language === 'si' ? celeb.nameSi : celeb.nameEn} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + (celeb.nameEn || 'C').replace(' ', '+') + '&background=e2e8f0&color=475569';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/90 via-[#1a365d]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="font-bold text-white text-[15px] leading-tight mb-1">
                              {language === 'si' ? (celeb.nameSi || celeb.name) : (celeb.nameEn || celeb.name)}
                            </h3>
                            <p className="text-amber-400 text-xs font-medium">
                              {language === 'si' ? celeb.professionSi : celeb.professionEn}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            );
          })()}
          
          <div className="text-center mt-10 md:hidden">
             <div className="flex justify-center gap-4">
                <Button className="h-12 w-12 rounded-full border-2 border-slate-200 bg-white text-slate-500" variant="outline" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button className="h-12 w-12 rounded-full border-2 border-slate-200 bg-white text-slate-500" variant="outline" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
             </div>
          </div>
          
        </div>
      </section>

      {/* Vedic Astrology Content */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className={`text-3xl md:text-4xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold text-primary`}>{t("section.vedicAstrology")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("vedic.para1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("vedic.para2")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <Card className="text-center">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">110M+</div>
                  <p className="text-sm text-muted-foreground">{t("stats.customers")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <p className="text-sm text-muted-foreground">{t("stats.languages")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">35+</div>
                  <p className="text-sm text-muted-foreground">{t("stats.research")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative border-t border-slate-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -ml-20"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20"></div>
        
        <div className="container mx-auto px-4 relative max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-4 text-[#1a365d]`}>
              {language === 'si' ? "ජ්‍යෝතිෂවේදීන්ගේ සහ ගනුදෙනුකරුවන්ගේ අදහස්" : "Testimonials & Reviews"}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {language === 'si' ? "අපගේ සේවාවන් ලබා ගත් පාරිභෝගිකයින්ගේ සත්‍ය අත්දැකීම්" : "Real experiences from our valued customers and partner astrologers"}
            </p>
          </div>
          
          {(() => {
            const MOCK_TESTIMONIALS = [
              {
                nameSi: "සුනිල් පෙරේරා",
                nameEn: "Sunil Perera",
                roleSi: "ව්‍යාපාරික",
                roleEn: "Businessman",
                textSi: "මෙම වෙබ් අඩවියෙන් මා ලබා ගත් කේන්ද්‍ර සටහන ඉතා නිවැරදියි. වසර ගණනාවක් තිබූ ගැටළු වලට පැහැදිලි පිළිතුරු ලැබුණා. සේවාව ඉතාමත් විශිෂ්ටයි.",
                textEn: "The horoscope I got from this website is very accurate. Got clear answers to problems I had for years. Excellent service.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
              },
              {
                nameSi: "නයෝමි ද සිල්වා",
                nameEn: "Nayomi De Silva",
                roleSi: "ගුරුවරියක",
                roleEn: "Teacher",
                textSi: "මගේ දුවගේ විවාහ පොරොන්දම් පරීක්ෂාව සඳහා මම මේ සේවාව ලබා ගත්තා. ඉක්මනින් සහ ඉතා විස්තරාත්මක වාර්තාවක් ලැබුණා. බොහෝම ස්තූතියි!",
                textEn: "I used this service for my daughter's marriage compatibility check. Received a quick and detailed report. Thank you very much!",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
              },
              {
                nameSi: "කමල් වීරසිංහ",
                nameEn: "Kamal Weerasinghe",
                roleSi: "ඉංජිනේරු",
                roleEn: "Engineer",
                textSi: "ජ්‍යෝතිෂවේදීන්ගේ සහයෝගය ඉතා ඉහළයි. මගේ ව්‍යාපාරික කටයුතු සඳහා ලබා දුන් වාස්තු උපදෙස් ඉතා සාර්ථක වුණා. විශ්වාසයෙන් යුතුව නිර්දේශ කළ හැක.",
                textEn: "The support from astrologers is very high. The Vastu advice given for my business was very successful. Highly recommended.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
              },
              {
                nameSi: "ආචාර්ය ධර්මරත්න",
                nameEn: "Dr. Dharmarathna",
                roleSi: "ප්‍රවීණ ජ්‍යෝතිෂවේදී",
                roleEn: "Expert Astrologer",
                textSi: "සාම්ප්‍රදායික ජ්‍යෝතිෂ විද්‍යාව සහ නවීන තාක්ෂණය ඉතා මැනවින් මුසු කර ඇති විශිෂ්ට සේවාවක්. පලාඵල විස්තරය ඉතාමත් නිවැරදියි.",
                textEn: "An excellent service that blends traditional astrology and modern technology perfectly. The predictions are very accurate.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
              }
            ];
            
            const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activeTestimonials.slice(0, 4).map((testimonial: any, i: number) => (
                  <Card key={i} className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] border-none bg-white shadow-xl shadow-slate-200/40">
                    <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                      <div className="sm:w-40 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.photo || testimonial.img || ""} 
                          alt={language === 'si' ? testimonial.nameSi : testimonial.nameEn} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + (testimonial.nameEn || 'U').replace(' ', '+') + '&background=fef3c7&color=b45309';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col justify-center relative">
                        <svg className="absolute top-4 right-6 w-8 h-8 text-amber-200/50 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        
                        <p className="text-slate-600 leading-relaxed italic relative z-10 text-[15px] mb-6">
                          &quot;{language === 'si' ? testimonial.textSi : testimonial.textEn}&quot;
                        </p>
                        
                        <div className="mt-auto">
                          <h3 className="font-bold text-[#1a365d] text-lg">
                            {language === 'si' ? (testimonial.nameSi || testimonial.name) : (testimonial.nameEn || testimonial.name)}
                          </h3>
                          <p className="text-amber-600 text-sm font-medium">
                            {language === 'si' ? testimonial.roleSi : testimonial.roleEn}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className={`text-3xl md:text-5xl ${language === 'si' ? 'elegant-sinhala' : 'font-display'} font-bold mb-6 drop-shadow-lg`}>{language === "si" ? "ඔබගේ අනාගතය පිළිබඳව නිවැරදිව දැනගැනීමට සූදානම්ද?" : "Ready to Explore Your Cosmic Blueprint?"}</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg font-medium">{language === "si" ? "මෙත් ජ්‍යෝතිෂය හරහා ඉතා නිවැරදි ජ්‍යෝතිෂ්‍ය සේවාවන් ලබා ගන්නා දහස් ගණනක් වූ පිරිස සමඟ ඔබත් එක්වන්න." : "Join millions who trust Methjothisa for accurate, AI-enhanced astrological insights."}</p>
          <Link href="/birth-chart">
            <Button variant="secondary" size="lg" className="group">
              {language === "si" ? "ඔබගේ ජන්මපත්‍රය නිර්මාණය කරන්න" : "Generate Your Birth Chart"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
