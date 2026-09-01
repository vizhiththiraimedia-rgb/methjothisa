"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Clock, Sparkles, Users } from "lucide-react";
import Link from "next/link";

interface Astrologer {
  id: string;
  name: string;
  experience: string;
  photo?: string;
  category: string;
  languages: string;
  areas: string;
  isActive: boolean;
}

export default function ConsultPage() {
  const { t, language } = useLanguage();
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  useEffect(() => {
    fetch("/api/astrologers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setAstrologers(result.data); });
  }, []);

  
  // Fallback to mock astrologers if DB is empty
  const activeAstrologers = astrologers.length > 0 ? astrologers : [
    { id: "1", name: "M.T.H. Ayoma Mallawa", experience: "18 years", photo: "https://ui-avatars.com/api/?name=AM&background=d946ef&color=fff", category: "Medical Astrology", languages: "Sinhala (Native)", areas: "Marriage, Health" },
    { id: "2", name: "Anusha kodagoda", experience: "10 years", photo: "https://ui-avatars.com/api/?name=AK&background=dc2626&color=fff", category: "Traditional Astrology", languages: "Sinhala, English", areas: "Wealth, Career" },
    { id: "3", name: "JothishyaLK", experience: "3 years", photo: "https://ui-avatars.com/api/?name=JLK&background=1a365d&color=fff", category: "Vedic Astrology", languages: "Sinhala, English", areas: "Love, Education" }
  ];
  
  const filtered = activeAstrologers.filter((a) => {

    const catMatch = !filterCategory || a.category === filterCategory;
    const langMatch = !filterLanguage || a.languages.toLowerCase().includes(filterLanguage.toLowerCase());
    return catMatch && langMatch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl ${language === 'si' ? 'elegant-sinhala text-transparent bg-clip-text bg-gradient-to-r from-[#a6192e] to-orange-500' : 'font-display text-[#1a365d]'} font-bold mb-4`}>
            {language === 'si' ? 'ජ්‍යෝතිෂවේදීන්ගෙන් උපදෙස් ලබාගන්න' : 'Consult Astrologers'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "si" ? "ඔබටම විශේෂ වු ජ්‍යොතිෂ්‍ය විග්‍රහයන් සහ මඟ පෙන්වීම් සඳහා අපගේ පළපුරුදු ජ්‍යොතිෂ්‍යවේදීන් සමඟ සම්බන්ධ වන්න." : "Connect with experienced astrologers for personalized guidance on career, marriage, health, and more."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((astrologer) => (
            <Card key={astrologer.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {astrologer.photo ? (
                    <img src={astrologer.photo} alt={astrologer.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{astrologer.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{astrologer.experience} {language === "si" ? " අත්දැකීම්" : " Exp"}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-medium">{language === "si" ? "ක්ෂේත්‍රය:" : "Category:"}</span> {astrologer.category}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-medium">{language === "si" ? "භාෂාවන්:" : "Languages:"}</span> {astrologer.languages}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="cosmic" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {language === "si" ? "අමතන්න" : "Call"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      {language === "si" ? "ඊමේල්" : "Email"}
                    </Button>
                    <Link href={`/astrologers/${astrologer.id}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        {language === "si" ? "උපදෙස් ලබාගන්න" : "Consult Now"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
